let toggler = document.querySelector('.toggler');
let togglerOpen = document.getElementById('open');
let togglerClose = document.getElementById('close');
let navbar = document.querySelector('.nav-m');
let width = screen.width;
let navOpen = false;
togglerClose.style.display = 'none';
navbar.style.display = 'none';

if (width <= 768) {
  toggler.addEventListener('click', function () {
    if (!navOpen) {
      navbar.style.display = 'flex';
      navbar.style.animationName = 'nav-open';
      navbar.style.transform = 'scale(1)';
      togglerOpen.style.display = 'none';
      togglerClose.style.display = 'block';
      navOpen = true;

    } else {
      navOpen = false;
      navbar.style.animationName = 'nav-close';
      togglerOpen.style.display = 'block';
      navbar.style.transform = 'scale(0)';
      togglerClose.style.display = 'none';
    }
  });
}