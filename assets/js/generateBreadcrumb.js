(function () {
  function titleize(s) {
    return s.replace('.html', '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  // Calculate base path based on current page location
  function getBasePath() {
    var path = window.location.pathname;
    var depth = (path.match(/\//g) || []).length - 1;
    if (depth <= 0) return './';
    return '../'.repeat(depth);
  }

  // optional mapping for custom labels
  const map = {
    'admission': 'Admission & Financial Aid',
    'undergraduate': 'Undergraduate Admission',
    'for-innovators': 'For Innovators',
    'for-stakeholders': 'For Stakeholders',
    // add other friendly names here
  };

  // Specific page mappings (full path or filename)
  const pageMap = {
    'about.html': 'Innovation and Technology',
    'about/about.html': 'Innovation and Technology',
    '/about/about.html': 'Innovation and Technology'
  };

  window.generateBreadcrumb = function (targetId = 'site-breadcrumb') {
    const ol = document.getElementById(targetId);
    if (!ol) return;

    const basePath = getBasePath();
    const parts = location.pathname.split('/').filter(Boolean);
    let html = `<li class="breadcrumb-item"><a href="${basePath}index.html"><span class="bi bi-house-fill" aria-hidden="true"></span> Home</a></li>`;
    let acc = basePath;

    parts.forEach((p, i) => {
      if (i < parts.length - 1) {
        acc += p + '/';
      } else {
        acc += p;
      }
      const key = p.replace('.html', '');
      const label = map[key.toLowerCase()] || titleize(key);

      if (i === parts.length - 1) {
        // Last item - always active/non-clickable
        html += `<li class="breadcrumb-item active" aria-current="page">${label}</li>`;
      } else if (i === 0) {
        // Second item in breadcrumb (index 0 of parts) - non-clickable
        html += `<li class="breadcrumb-item active">${label}</li>`;
      } else {
        // Middle items - clickable
        html += `<li class="breadcrumb-item"><a href="${acc}">${label}</a></li>`;
      }
    });

    ol.innerHTML = html;
  };
})();
