// Collection Log tab switching, home page only. The tabs/panels themselves
// are rendered at build time (scripts/build-site.js) from data/collection.js
// — this just toggles which panel is visible, reading subject slugs
// straight off the pre-rendered data-subject attributes instead of a
// client-side data array.
(function collectionLog() {
  var tabsEl = document.getElementById('logTabs');
  if (!tabsEl) return;

  tabsEl.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.log-tab');
    if (!btn) return;
    var target = btn.getAttribute('data-subject');
    tabsEl.querySelectorAll('.log-tab').forEach(function (tab) {
      var slug = tab.getAttribute('data-subject');
      var panel = document.getElementById('log-' + slug);
      var active = slug === target;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      if (panel) panel.hidden = !active;
    });
  });
})();
