// Theme toggle: dark/light via data-theme on <html>, persisted to
// localStorage. The FOUC guard that reads any stored preference before
// first paint lives inline in <head> on every page (see
// scripts/lib/page-shell.js) — this only wires up the toggle button and
// paints its icon to match whatever theme is already active.
(function themeToggle() {
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var icon = document.getElementById('themeIcon');

  function currentIsDark() {
    var attr = root.getAttribute('data-theme');
    if (attr) return attr === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function paint() { icon.textContent = currentIsDark() ? '☀' : '☾'; }
  paint();

  toggle.addEventListener('click', function () {
    var next = currentIsDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('darshandev-theme', next); } catch (e) {}
    paint();
    window.dispatchEvent(new Event('darshandev-theme-change'));
  });
})();
