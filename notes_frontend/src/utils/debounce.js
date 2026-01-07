/**
 * Creates a debounced version of a function.
 * The debounced function delays invoking `fn` until `delayMs` have elapsed
 * since the last time the debounced function was invoked.
 *
 * Note: used to debounce search input updates.
 *
 * @param {Function} fn Function to debounce.
 * @param {number} delayMs Delay in milliseconds.
 * @returns {Function} Debounced function with a `.cancel()` method.
 */
// PUBLIC_INTERFACE
export function debounce(fn, delayMs) {
  let timerId = null;

  function debounced(...args) {
    if (timerId) window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      timerId = null;
      fn(...args);
    }, delayMs);
  }

  debounced.cancel = () => {
    if (timerId) window.clearTimeout(timerId);
    timerId = null;
  };

  return debounced;
}
