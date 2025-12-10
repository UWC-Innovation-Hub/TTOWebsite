(function loadHeader() {
  var headerContainer = document.getElementById('header');
  if (!headerContainer) return;

  fetch('/components/header.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      headerContainer.innerHTML = html;
    })
    .catch(function (err) {
      console.error('Header load failed', err);
    });
})();

/* Header dropdown toggle */
(function () {
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

  document.addEventListener('click', function (e) {
    const link = e.target.closest && e.target.closest('.header-center .nav-item.has-dropdown > .nav-link');
    if (link) {
      e.preventDefault();
      const li = link.closest('.nav-item');
      toggleDropdown(li);
      return;
    }

    if (!e.target.closest || !e.target.closest('.header-center')) {
      closeAllDropdowns();
    }
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') closeAllDropdowns();
  });

  // Hover for desktop
  const prefersHover = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (prefersHover) {
    document.addEventListener('DOMContentLoaded', function() {
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
    });
  }
})();