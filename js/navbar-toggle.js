let toggler = document.querySelector('.toggler');
let togglerOpen = document.getElementById('open');
let togglerClose = document.getElementById('close');
let navbar = document.querySelector('.nav-m');
let width = screen.width;
let navOpen = false;
togglerClose.style.display = 'none';

if (width <= 768) {
  toggler.addEventListener('click', function () {
    if (!navOpen) {
      navbar.style.display = 'flex';
      navbar.style.animationName = 'nav-open';
      navbar.style.transform = 'translateY(0)';
      togglerOpen.style.display = 'none';
      togglerClose.style.display = 'block';
      navOpen = true;
    } else {
      navOpen = false;
      navbar.style.animationName = 'nav-close';
      navbar.style.transform = 'translateY(-31rem)';
      togglerOpen.style.display = 'block';
      togglerClose.style.display = 'none';
    }
  });
}