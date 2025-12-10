(function() {
  'use strict';

  // Calculate base path based on current page location
  function getBasePath() {
    var path = window.location.pathname;
    var depth = (path.match(/\//g) || []).length - 1;
    if (depth <= 0) return './';
    return '../'.repeat(depth);
  }

  // Transform paths in HTML content from absolute to relative
  function transformPaths(html, basePath) {
    // Replace src="/... and href="/... with relative paths
    return html
      .replace(/src="\//g, 'src="' + basePath)
      .replace(/href="\//g, 'href="' + basePath);
  }

  var basePath = getBasePath();

  // Load header
  function loadHeader() {
    var headerContainer = document.getElementById('header');
    if (!headerContainer) return;

    fetch(basePath + 'components/header.html')
      .then(r => r.text())
      .then(html => {
        headerContainer.innerHTML = transformPaths(html, basePath);
      })
      .catch(err => console.error('Header load failed', err));
  }

  // Load footer
  function loadFooter() {
    var footerContainer = document.getElementById('footer');
    if (!footerContainer) return;

    fetch(basePath + 'components/footer.html')
      .then(r => r.text())
      .then(html => {
        footerContainer.innerHTML = transformPaths(html, basePath);
      })
      .catch(err => console.error('Footer load failed', err));
  }

  // Load breadcrumb
  function loadBreadcrumb() {
    var breadcrumbContainer = document.getElementById('breadcrumb-placeholder');
    if (!breadcrumbContainer) return;

    fetch(basePath + 'components/breadcrumb.html')
      .then(r => r.text())
      .then(html => {
        breadcrumbContainer.innerHTML = transformPaths(html, basePath);

        // Load and execute breadcrumb generator
        var script = document.createElement('script');
        script.src = basePath + 'assets/js/generateBreadcrumb.js';
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
