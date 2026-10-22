// Detecta conexão lenta e expõe o resultado como store (useSyncExternalStore)
// e como atributo `data-connection="slow"` no <html> para o CSS reagir.

const SLOW_TYPES = ['slow-2g', '2g', '3g'];
const MIN_MBPS = 1.5; // Network Information API: abaixo disso consideramos lenta
const MEASURED_MBPS = 2.5; // vazão medida inclui a latência, então o corte é mais folgado
const MEASURE_MIN_BYTES = 30 * 1024; // ignora recursos pequenos demais p/ medir

const listeners = new Set();
let slow = false;

const apply = (value) => {
  if (value === slow) return;
  slow = value;
  document.documentElement.dataset.connection = value ? 'slow' : 'fast';
  listeners.forEach((fn) => fn());
};

// Network Information API (Chromium/Android). Retorna null se indisponível.
const fromConnectionApi = () => {
  const c = navigator.connection;
  if (!c) return null;
  if (c.saveData) return true;
  if (SLOW_TYPES.includes(c.effectiveType)) return true;
  if (typeof c.downlink === 'number' && c.downlink > 0 && c.downlink < MIN_MBPS) return true;
  return false;
};

// Estima a vazão real pelos arquivos grandes já baixados (o bundle JS já conta).
// Funciona em qualquer navegador e pega throttling que a API de conexão não reporta.
const fromResourceTiming = () => {
  const mbps = performance
    .getEntriesByType('resource')
    .filter((r) => r.transferSize >= MEASURE_MIN_BYTES && r.duration > 0)
    .map((r) => (r.transferSize * 8) / r.duration / 1000);
  if (!mbps.length) return null;
  return Math.min(...mbps) < MEASURED_MBPS;
};

const evaluate = () => fromConnectionApi() === true || fromResourceTiming() === true;

export const initConnection = () => {
  const forced = new URLSearchParams(window.location.search).get('slow');
  if (forced !== null) {
    apply(forced !== '0');
    return;
  }

  apply(evaluate());

  navigator.connection?.addEventListener('change', () => apply(evaluate()));
  if (document.readyState === 'complete') apply(evaluate());
  else window.addEventListener('load', () => apply(evaluate()), { once: true });
};

export const subscribeConnection = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const isSlowConnection = () => slow;
