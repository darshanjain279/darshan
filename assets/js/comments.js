// Giscus (GitHub Discussions) comments.
//
// Each detail page's #giscus-comments container carries a data-term
// (baked in at build time by scripts/lib/render.js's commentsSection())
// that uniquely identifies the page — giscus maps one discussion thread
// per term. These terms intentionally still match the old hash-routed
// SPA's formula (e.g. "c-programming/core-syntax", "daily/2026-07-01",
// "blog/uart-framing-bug") rather than the new nested URL shape, so
// existing GitHub Discussions threads keep mapping to the right page.
(function comments() {
  var GISCUS = {
    repo: 'darshanjain279/darshandev',
    repoId: 'R_kgDOTYjxXA',
    category: 'Comments',
    categoryId: 'DIC_kwDOTYjxXM4DBM0z'
  };

  function isDark() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr) return attr === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function mount(container, term) {
    if (!container) return;
    var script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS.repo);
    script.setAttribute('data-repo-id', GISCUS.repoId);
    script.setAttribute('data-category', GISCUS.category);
    script.setAttribute('data-category-id', GISCUS.categoryId);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', term);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', isDark() ? 'dark' : 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    container.appendChild(script);
  }

  function sendToGiscus(message) {
    var iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  }

  // Re-theme the live iframe in place instead of remounting it, so toggling
  // dark/light mid-read doesn't reload the thread or lose scroll position.
  window.addEventListener('darshandev-theme-change', function () {
    sendToGiscus({ setConfig: { theme: isDark() ? 'dark' : 'light' } });
  });

  var container = document.getElementById('giscus-comments');
  if (container) {
    var term = container.getAttribute('data-term');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            mount(container, term);
            observer.unobserve(container);
          }
        });
      }, { rootMargin: '200px' });
      observer.observe(container);
    } else {
      mount(container, term);
    }
  }
})();
