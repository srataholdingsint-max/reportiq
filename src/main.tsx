// Defensive patch against browser extension content scripts attempting to set window.fetch
try {
  const _orig = window.fetch;
  let _current = _orig;
  Object.defineProperty(window, 'fetch', {
    configurable: true,
    enumerable: true,
    get() {
      return _current;
    },
    set(fn) {
      _current = fn;
    }
  });
} catch (_) {}

window.addEventListener('error', (event) => {
  if (
    (event.filename && event.filename.includes('chrome-extension:')) ||
    (event.message && event.message.includes('fetch of #<Window>'))
  ) {
    event.stopImmediatePropagation?.();
    event.preventDefault?.();
  }
}, true);

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
