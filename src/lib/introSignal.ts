// Module-level singleton so any client component can subscribe to intro completion.
// Works across hot-reloads: once `done` is true it stays true for the session.

let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Subscribe to the intro-complete signal. Returns an unsubscribe fn. */
export function onIntroDone(fn: () => void): () => void {
  if (done) {
    const id = setTimeout(fn, 0);
    return () => clearTimeout(id);
  }
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

export function isIntroDone() {
  return done;
}
