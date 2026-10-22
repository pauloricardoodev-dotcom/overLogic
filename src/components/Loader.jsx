import { useState, useEffect } from 'react';
import { isSlowConnection } from '../utils/connection';
import './Loader.css';

const NAME = 'Paulo Rinaldi';
const NAME_SPLIT = 5; // "Paulo" fica vermelho
const GREETINGS = ['Olá', 'Hello'];
const STATUS = [
  'Compilando café...',
  'Alinhando divs...',
  'Resolvendo conflito de merge...',
  'Removendo console.log esquecidos...',
];

const GREET_MS = 1000;
const LAST_GREET_MS = 1000;
const TYPE_MS = 110;
const HOLD_MS = 700;
const STATUS_MS = 1700;
const LOAD_GRACE_MS = 1200; // depois da sequência, espera o load só até aqui
const READY_MS = 500; // "Pronto ✓" visível antes do mosaico
const EXIT_MS = 900;

const TILE_COLS = 12;
const TILE_ROWS = 8;
const TILE_MAX_DELAY = 450;

let consoleGreeted = false;
const greetConsole = () => {
  if (consoleGreeted) return;
  consoleGreeted = true;
  console.log(
    '%cCurioso, hein? 👀%c\nVamos conversar → role até o contato.',
    'color:#e6172c;font-size:16px;font-weight:800',
    'color:inherit;font-size:12px',
  );
};

const Loader = () => {
  // Conexão lenta ou movimento reduzido: sem sequência, só o nome parado
  const [instant] = useState(
    () => isSlowConnection() || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [greetIdx, setGreetIdx] = useState(0);
  const [naming, setNaming] = useState(instant);
  const [typed, setTyped] = useState(instant ? NAME.length : 0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [seqDone, setSeqDone] = useState(false);
  const [loaded, setLoaded] = useState(() => document.readyState === 'complete');
  const [graceOver, setGraceOver] = useState(false);
  const ready = seqDone && (loaded || graceOver);
  const [isDone, setIsDone] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const [tileDelays] = useState(() =>
    Array.from({ length: TILE_COLS * TILE_ROWS }, () => Math.round(Math.random() * TILE_MAX_DELAY)),
  );

  useEffect(() => {
    greetConsole();
  }, []);

  useEffect(() => {
    if (loaded) return undefined;
    const onLoad = () => setLoaded(true);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, [loaded]);

  // Sequência: saudações -> nome digitado -> pausa
  useEffect(() => {
    const timers = [];
    if (instant) {
      timers.push(setTimeout(() => setSeqDone(true), 600));
    } else {
      let t = 0;
      GREETINGS.forEach((_, i) => {
        timers.push(setTimeout(() => setGreetIdx(i), t));
        t += i === GREETINGS.length - 1 ? LAST_GREET_MS : GREET_MS;
      });
      timers.push(setTimeout(() => setNaming(true), t));
      for (let i = 1; i <= NAME.length; i += 1) {
        t += TYPE_MS;
        timers.push(setTimeout(() => setTyped(i), t));
      }
      timers.push(setTimeout(() => setSeqDone(true), t + HOLD_MS));
    }
    return () => timers.forEach(clearTimeout);
  }, [instant]);

  // Não deixa um recurso lento (ex.: foto lazy) segurar o loader pra sempre
  useEffect(() => {
    if (!seqDone) return undefined;
    const timer = setTimeout(() => setGraceOver(true), LOAD_GRACE_MS);
    return () => clearTimeout(timer);
  }, [seqDone]);

  // Frases de status
  useEffect(() => {
    if (instant || ready) return undefined;
    const id = setInterval(() => setStatusIdx((i) => (i + 1) % STATUS.length), STATUS_MS);
    return () => clearInterval(id);
  }, [instant, ready]);

  // ready = sequência acabou E a página carregou
  useEffect(() => {
    if (!ready) return undefined;
    const timer = setTimeout(() => setIsDone(true), READY_MS);
    return () => clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    if (!isDone) return undefined;
    const timer = setTimeout(() => setIsGone(true), EXIT_MS);
    return () => clearTimeout(timer);
  }, [isDone]);

  useEffect(() => {
    if (isGone) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isGone]);

  if (isGone) return null;

  const visible = NAME.slice(0, typed);
  const hidden = NAME.slice(typed); // reserva a largura pra o nome não "pular" ao digitar
  const status = ready ? 'Pronto ✓' : STATUS[statusIdx];

  return (
    <div
      className={`loader ${isDone ? 'done' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Carregando"
    >
      <div className="loader-tiles" aria-hidden="true">
        {tileDelays.map((delay, i) => (
          <span key={i} className="loader-tile" style={{ transitionDelay: `${delay}ms` }} />
        ))}
      </div>
      <div className="loader-dots" aria-hidden="true" />

      <div className="loader-content" aria-hidden="true">
        <div className="loader-title">
          {naming ? (
            <>
              <span className="over">{visible.slice(0, NAME_SPLIT)}</span>
              <span>{visible.slice(NAME_SPLIT)}</span>
              <span className="loader-cursor">_</span>
              <span className="loader-ghost">{hidden}</span>
            </>
          ) : (
            <span key={greetIdx} className="loader-greet">
              {GREETINGS[greetIdx]}
            </span>
          )}
        </div>
        <div className={`loader-status ${ready ? 'ready' : ''}`}>
          <span className="prompt">&gt;</span>{' '}
          <span key={status} className="loader-status-text">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
