import { useEffect, useRef } from 'react';
import './Hero.css';

// Pose de repouso e quanto o cubo vira pra acompanhar o mouse (graus)
const BASE = { x: -14, y: 24 };
const LOOK_Y = 50;
const LOOK_X = 35;
const FOLLOW = 0.08;

// Cubo mágico: embaralha, pausa e resolve sozinho
const HOLD_MS = 3200;
const PAUSE_MS = 700;
const MOVES = 16;
const TURN_MS = 260; // por quarto de volta
const TURN_GAP_MS = 30;

// Clique: as peças se afastam uma a uma, mostram o núcleo e voltam
const OPEN_STAGGER_MS = 24;
const OPEN_MS = 500;
const OPEN_TOTAL_MS = 3000; // quando o clique começa a fechar
const CLOSE_STAGGER_MS = 14;
const CLOSE_MS = 400;
const SPREAD = 0.9;

// Glitch aleatório da projeção
const GLITCH_MIN_MS = 3500;
const GLITCH_MAX_MS = 9500;
const GLITCH_MS = 550;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const easeOut = (x) => 1 - (1 - x) ** 3;
const easeInOut = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);

/* ---- álgebra mínima: rotações de 90° em matrizes inteiras ---- */
const IDENT = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const AXIS_FN = ['rotateX', 'rotateY', 'rotateZ'];

const mul = (A, B) =>
  A.map((_, i) => B[0].map((__, j) => A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j]));
const mulv = (A, v) => A.map((row) => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]);

// Mesma convenção do CSS (rotateX/Y/Z), com ângulo = dir * 90°
const rot90 = (axis, dir) => {
  const s = dir;
  if (axis === 0) return [[1, 0, 0], [0, 0, -s], [0, s, 0]];
  if (axis === 1) return [[0, 0, s], [0, 1, 0], [-s, 0, 0]];
  return [[0, -s, 0], [s, 0, 0], [0, 0, 1]];
};

const matrix3d = (R) =>
  `matrix3d(${R[0][0]},${R[1][0]},${R[2][0]},0,${R[0][1]},${R[1][1]},${R[2][1]},0,${R[0][2]},${R[1][2]},${R[2][2]},0,0,0,0,1)`;

/* ---- as 26 peças (o centro é o núcleo) ---- */
const CUBIES = [];
for (let x = -1; x <= 1; x += 1) {
  for (let y = -1; y <= 1; y += 1) {
    for (let z = -1; z <= 1; z += 1) {
      if (x || y || z) CUBIES.push({ id: CUBIES.length, p0: [x, y, z] });
    }
  }
}

// Cada peça só ganha adesivo nas faces que começam voltadas pra fora
const FACE_DEFS = [
  { name: 'top', axis: 1, sign: -1, t: 'rotateX(90deg)' },
  { name: 'bottom', axis: 1, sign: 1, t: 'rotateX(-90deg)' },
  { name: 'front', axis: 2, sign: 1, t: '' },
  { name: 'back', axis: 2, sign: -1, t: 'rotateY(180deg)' },
  { name: 'right', axis: 0, sign: 1, t: 'rotateY(90deg)' },
  { name: 'left', axis: 0, sign: -1, t: 'rotateY(-90deg)' },
].map((f) => ({ ...f, transform: `${f.t} translateZ(calc(var(--u) / 2))`.trim() }));

// Ordem de abertura: centro das faces → arestas → quinas
const RANK = CUBIES.map((c) => c.id).sort(
  (a, b) =>
    CUBIES[a].p0.reduce((n, v) => n + Math.abs(v), 0) - CUBIES[b].p0.reduce((n, v) => n + Math.abs(v), 0),
);
const RANK_OF = [];
RANK.forEach((id, r) => { RANK_OF[id] = r; });

const genMoves = () => {
  const moves = [];
  while (moves.length < MOVES) {
    const m = {
      axis: Math.floor(Math.random() * 3),
      layer: Math.floor(Math.random() * 3) - 1,
      dir: Math.random() < 0.5 ? -1 : 1,
      steps: Math.random() < 0.3 ? 2 : 1, // meia volta de vez em quando
    };
    const prev = moves[moves.length - 1];
    if (!prev || prev.axis !== m.axis || prev.layer !== m.layer) moves.push(m);
  }
  return moves;
};

const Cube = ({ isLoaded }) => {
  const wrapRef = useRef(null);
  const holoRef = useRef(null);
  const rigRef = useRef(null);
  const coreRef = useRef(null);
  const cubieEls = useRef([]);
  const clickRef = useRef({ pending: false });

  // Movimento: seguir o mouse + cubo mágico + abertura no clique
  useEffect(() => {
    const wrap = wrapRef.current;
    const holo = holoRef.current;
    const rig = rigRef.current;
    const core = coreRef.current;
    if (!wrap || !holo || !rig || !core) return undefined;

    const state = CUBIES.map((c) => ({ p: [...c.p0], R: IDENT }));
    const exArr = new Array(CUBIES.length).fill(0);
    const cur = { ...BASE };
    const target = { ...BASE };

    const applyRig = () => {
      rig.style.transform = `rotateX(${cur.x}deg) rotateY(${cur.y}deg)`;
    };

    const renderAll = (turn) => {
      for (let i = 0; i < state.length; i += 1) {
        const { p, R } = state[i];
        const f = 1 + SPREAD * exArr[i];
        const spin = turn && p[turn.axis] === turn.layer ? `${AXIS_FN[turn.axis]}(${turn.angle}deg) ` : '';
        cubieEls.current[i].style.transform =
          `${spin}translate3d(calc(var(--u) * ${(p[0] * f).toFixed(3)}), calc(var(--u) * ${(p[1] * f).toFixed(3)}), calc(var(--u) * ${(p[2] * f).toFixed(3)})) ${matrix3d(R)}`;
      }
    };

    const setCore = (v) => {
      holo.style.setProperty('--ex', v.toFixed(3));
      if (v <= 0.001) {
        core.style.display = 'none';
      } else {
        core.style.display = 'block';
        core.style.transform = `scale(${v.toFixed(3)})`;
      }
    };

    applyRig();
    renderAll(null);
    setCore(0);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    // O cubo "olha" pro cursor: quanto mais longe do centro, mais ele vira
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const nx = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2), -1, 1);
      const ny = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2), -1, 1);
      target.y = BASE.y + nx * LOOK_Y;
      target.x = BASE.x - ny * LOOK_X;
    };
    const onLeave = () => {
      target.x = BASE.x;
      target.y = BASE.y;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    const sched = { mode: 'hold', clock: 0, idx: 0, moves: [], turn: null };
    const open = { phase: 'idle', t: 0, closing: false };
    const closeEnd = OPEN_TOTAL_MS + (CUBIES.length - 1) * CLOSE_STAGGER_MS + CLOSE_MS;

    const startTurn = (m) => {
      sched.turn = { ...m, t: 0, angle: 0 };
    };

    const commitTurn = (t) => {
      let Rm = rot90(t.axis, t.dir);
      if (t.steps === 2) Rm = mul(Rm, Rm);
      state.forEach((s) => {
        if (s.p[t.axis] === t.layer) {
          s.p = mulv(Rm, s.p);
          s.R = mul(Rm, s.R);
        }
      });
    };

    const stepSchedule = (dt) => {
      if (sched.turn) {
        const t = sched.turn;
        t.t += dt;
        const p = clamp(t.t / (TURN_MS * (0.6 + 0.4 * t.steps)), 0, 1);
        t.angle = t.dir * t.steps * 90 * easeInOut(p);
        if (p >= 1) {
          commitTurn(t);
          sched.turn = null;
          sched.clock = 0;
          renderAll(null);
        } else {
          renderAll(t);
        }
        return;
      }

      sched.clock += dt;
      if (sched.mode === 'hold') {
        if (sched.clock >= HOLD_MS) {
          sched.moves = genMoves();
          sched.idx = 0;
          sched.mode = 'scramble';
          sched.clock = 0;
        }
      } else if (sched.mode === 'scramble') {
        if (sched.clock >= TURN_GAP_MS) {
          sched.clock = 0;
          if (sched.idx < sched.moves.length) {
            startTurn(sched.moves[sched.idx]);
            sched.idx += 1;
          } else {
            sched.mode = 'pause';
          }
        }
      } else if (sched.mode === 'pause') {
        if (sched.clock >= PAUSE_MS) {
          sched.mode = 'solve';
          sched.idx = sched.moves.length - 1;
          sched.clock = 0;
        }
      } else if (sched.clock >= TURN_GAP_MS) {
        sched.clock = 0;
        if (sched.idx >= 0) {
          const m = sched.moves[sched.idx];
          sched.idx -= 1;
          startTurn({ ...m, dir: -m.dir });
        } else {
          sched.mode = 'hold';
        }
      }
    };

    const stepOpen = (dt) => {
      open.t += dt;
      if (!open.closing && open.t >= OPEN_TOTAL_MS) {
        open.closing = true;
        holo.classList.remove('open');
      }
      for (let i = 0; i < exArr.length; i += 1) {
        const r = RANK_OF[i];
        const grow = easeOut(clamp((open.t - r * OPEN_STAGGER_MS) / OPEN_MS, 0, 1));
        const shrink = easeOut(
          clamp((open.t - OPEN_TOTAL_MS - (exArr.length - 1 - r) * CLOSE_STAGGER_MS) / CLOSE_MS, 0, 1),
        );
        exArr[i] = grow * (1 - shrink);
      }
      const coreIn = easeOut(clamp(open.t / 700, 0, 1));
      const coreOut = easeOut(clamp((open.t - OPEN_TOTAL_MS) / 600, 0, 1));
      setCore(coreIn * (1 - coreOut));

      if (open.t >= closeEnd) {
        open.phase = 'idle';
        exArr.fill(0);
        setCore(0);
      }
      renderAll(null);
    };

    const startOpen = () => {
      open.phase = 'run';
      open.t = 0;
      open.closing = false;
      holo.classList.add('open');
      holo.classList.remove('shock');
      void holo.offsetWidth; // reflow pra reiniciar a onda
      holo.classList.add('shock');
    };

    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;

      const dx = target.x - cur.x;
      const dy = target.y - cur.y;
      if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
        cur.x += dx * FOLLOW;
        cur.y += dy * FOLLOW;
        applyRig();
      }

      // Espera a jogada em curso terminar antes de abrir
      if (clickRef.current.pending && open.phase === 'idle' && !sched.turn) {
        clickRef.current.pending = false;
        startOpen();
      }

      if (open.phase === 'run') stepOpen(dt);
      else stepSchedule(dt);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Glitch em tempos aleatórios, como falha natural da projeção
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    let off;
    const schedule = () => {
      timer = setTimeout(() => {
        const holo = holoRef.current;
        if (holo) {
          holo.classList.remove('glitch', 'mini');
          void holo.offsetWidth; // reflow pra reiniciar a animação
          holo.classList.add('glitch', 'mini');
          off = setTimeout(() => holo.classList.remove('glitch', 'mini'), GLITCH_MS);
        }
        schedule();
      }, GLITCH_MIN_MS + Math.random() * (GLITCH_MAX_MS - GLITCH_MIN_MS));
    };
    schedule();
    return () => {
      clearTimeout(timer);
      clearTimeout(off);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`cube-wrap ${isLoaded ? 'loaded' : ''}`}
      onClick={() => { clickRef.current.pending = true; }}
    >
      <div ref={holoRef} className="holo">
        <div className="holo-glow" />
        <div className="holo-shock" />

        <div className="holo-base">
          <span className="beam" />
          <span className="plate" />
          <span className="ring" />
          <span className="ring r2" />
        </div>

        <div ref={rigRef} className="cube-rig">
          <div className="cube">
            {CUBIES.map((c, i) => (
              <div key={c.id} ref={(el) => { cubieEls.current[i] = el; }} className="cubie">
                {FACE_DEFS.map((f) => (
                  <div
                    key={f.name}
                    className={`cface ${f.name}${c.p0[f.axis] === f.sign ? ' sticker' : ''}`}
                    style={{ transform: f.transform }}
                  />
                ))}
              </div>
            ))}

            <div ref={coreRef} className="core">
              <div className="core-cube">
                <i /><i /><i /><i /><i /><i />
              </div>
              <div className="core-cube inner">
                <i /><i /><i /><i /><i /><i />
              </div>
              <span className="core-ring a" />
              <span className="core-ring b" />
              <span className="core-ring c" />
            </div>
          </div>
        </div>

        <div className="holo-scan" />
      </div>
    </div>
  );
};

export default Cube;
