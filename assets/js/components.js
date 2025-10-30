(function() {
  'use strict';

  // Load header
  function loadHeader() {
    var headerContainer = document.getElementById('header');
    if (!headerContainer) return;

    fetch('/components/header.html')
      .then(r => r.text())
      .then(html => {
        headerContainer.innerHTML = html;
      })
      .catch(err => console.error('Header load failed', err));
  }

  // Load footer
  function loadFooter() {
    var footerContainer = document.getElementById('footer');
    if (!footerContainer) return;

    fetch('/components/footer.html')
      .then(r => r.text())
      .then(html => {
        footerContainer.innerHTML = html;
      })
      .catch(err => console.error('Footer load failed', err));
  }

  // Load breadcrumb
  function loadBreadcrumb() {
    var breadcrumbContainer = document.getElementById('breadcrumb-placeholder');
    if (!breadcrumbContainer) return;

    fetch('/components/breadcrumb.html')
      .then(r => r.text())
      .then(html => {
        breadcrumbContainer.innerHTML = html;
        
        // Load and execute breadcrumb generator
        var script = document.createElement('script');
        script.src = '/assets/js/generateBreadcrumb.js';
        script.onload = function() {
          if (window.generateBreadcrumb) {
            window.generateBreadcrumb('site-breadcrumb');
          }
        };
        document.body.appendChild(script);
      })
      .catch(err => console.error('Breadcrumb load failed', err));
  }

  // Initialize all components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadHeader();
      loadFooter();
      loadBreadcrumb();
    });
  } else {
    loadHeader();
    loadFooter();
    loadBreadcrumb();
  }
})();