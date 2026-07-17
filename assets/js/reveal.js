// Scroll-reveal: settles .specimen/.plate/.sub-card/.detail-meta cards
// into place a few px as they enter the viewport (see the "scroll reveal"
// rules in assets/css/styles.css). Opacity never changes, so nothing is
// lost if the observer never fires. No-ops entirely under
// prefers-reduced-motion or without IntersectionObserver support.
(function reveal() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.specimen, .plate, .sub-card, .detail-meta').forEach(function (el) {
    el.classList.add('reveal-pending');
    observer.observe(el);
  });
})();
