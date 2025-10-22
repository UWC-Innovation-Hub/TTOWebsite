(function loadHeader() {
  var headerContainer = document.getElementById('header');
  if (!headerContainer) return;

  fetch('/components/header.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      headerContainer.innerHTML = html;

      // Ensure tto.css is loaded once
      var cssHref = '/assests/css/tto.css';
      if (!document.querySelector('link[href="' + cssHref + '"]')) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = cssHref;
        document.head.appendChild(l);
      }

      // Bootstrap injection moved to components/header.html to centralize and ensure CSS is added early.

      // Ensure dropdown.js is loaded once
      var jsSrc = '/assests/js/dropdown.js';
      if (!document.querySelector('script[src="' + jsSrc + '"]')) {
        var s = document.createElement('script');
        s.src = jsSrc;
        s.defer = true;
        document.body.appendChild(s);
      }
    })
    .catch(function (err) {
      console.error('Header load failed', err);
    });
})();

/* Header dropdown toggle (accessible) */
(function () {
  if (!document || !document.querySelector) return;

  function closeAllDropdowns() {
    document.querySelectorAll('.header-center .nav-item.open').forEach(li => {
      li.classList.remove('open');
      const link = li.querySelector('.nav-link');
      const menu = li.querySelector('.dropdown-menu');
      if (link) link.setAttribute('aria-expanded', 'false');
      if (menu) menu.setAttribute('hidden', '');
    });
  }

  function toggleDropdown(li) {
    const isOpen = li.classList.contains('open');
    if (isOpen) {
      li.classList.remove('open');
      const link = li.querySelector('.nav-link');
      const menu = li.querySelector('.dropdown-menu');
      if (link) link.setAttribute('aria-expanded', 'false');
      if (menu) menu.setAttribute('hidden', '');
    } else {
      closeAllDropdowns();
      li.classList.add('open');
      const link = li.querySelector('.nav-link');
      const menu = li.querySelector('.dropdown-menu');
      if (link) link.setAttribute('aria-expanded', 'true');
      if (menu) menu.removeAttribute('hidden');
    }
  }

  // click handlers on nav links for items that have dropdowns
  document.addEventListener('click', function (e) {
    const link = e.target.closest && e.target.closest('.header-center .nav-item.has-dropdown > .nav-link');
    if (link) {
      // prevent navigation when toggling the dropdown
      e.preventDefault();
      const li = link.closest('.nav-item');
      toggleDropdown(li);
      return;
    }

    // close when clicking outside
    if (!e.target.closest || !e.target.closest('.header-center')) {
      closeAllDropdowns();
    }
  }, true);

  // close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') closeAllDropdowns();
  });

  // optional: open on hover for pointer devices
  const prefersHover = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (prefersHover) {
    document.querySelectorAll('.header-center .nav-item.has-dropdown').forEach(li => {
      li.addEventListener('mouseenter', () => {
        li.classList.add('open');
        const link = li.querySelector('.nav-link');
        const menu = li.querySelector('.dropdown-menu');
        if (link) link.setAttribute('aria-expanded', 'true');
        if (menu) menu.removeAttribute('hidden');
      });
      li.addEventListener('mouseleave', () => {
        li.classList.remove('open');
        const link = li.querySelector('.nav-link');
        const menu = li.querySelector('.dropdown-menu');
        if (link) link.setAttribute('aria-expanded', 'false');
        if (menu) menu.setAttribute('hidden', '');
      });
    });
  }
})();
