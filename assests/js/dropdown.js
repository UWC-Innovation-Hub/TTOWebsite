document.querySelectorAll('.nav-item.dropdown').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const dropdown = new bootstrap.Dropdown(item.querySelector('.dropdown-toggle'));
    dropdown.show();
  });
  item.addEventListener('mouseleave', () => {
    const dropdown = bootstrap.Dropdown.getInstance(item.querySelector('.dropdown-toggle'));
    dropdown.hide();
  });
});