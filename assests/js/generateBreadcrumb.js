// ...existing code...
(function () {
  function titleize(s) {
    return s.replace('.html', '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  // optional mapping for custom labels
  const map = {
    'admission': 'Admission & Financial Aid',
    'undergraduate': 'Undergraduate Admission',
    // add other friendly names here
  };

  window.generateBreadcrumb = function (targetId = 'site-breadcrumb') {
    const ol = document.getElementById(targetId);
    if (!ol) return;

    const parts = location.pathname.split('/').filter(Boolean);
    let html = `<li class="breadcrumb-item"><a href="/"><span class="bi bi-house-fill" aria-hidden="true"></span> Home</a></li>`;
    let acc = '/';

    parts.forEach((p, i) => {
      acc += p + (i < parts.length - 1 ? '/' : '');
      const key = p.replace('.html', '');
      const label = map[key.toLowerCase()] || titleize(key);
      if (i === parts.length - 1) {
        html += `<li class="breadcrumb-item active" aria-current="page">${label}</li>`;
      } else {
        html += `<li class="breadcrumb-item"><a href="${acc}">${label}</a></li>`;
      }
    });

    ol.innerHTML = html;
  };
})();