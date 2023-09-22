const selectors = {
  closed: 'closed',
  body: 'body',
  hamburgerMenuButton: 'hamburger-menu-button',
  hamburgerMenuClose: 'hamburger-menu-close',
  isMobile: 'is-mobile',
  mobileNavOpen: 'mobile-nav-open',
  navElement: 'nav-menu',
  navSection: 'nav-section',
}

let bodyEl
let hamburgerMenuButtonEl;
let hamburgerMenuCloseEl;
let navEl;
let navSectionEl;
let screenWidth = screen.width;

document.addEventListener("DOMContentLoaded", (event) => {
  hamburgerMenuButtonEl = document.querySelector(`.${selectors.hamburgerMenuButton}`);
  hamburgerMenuCloseEl = document.querySelector(`.${selectors.hamburgerMenuClose}`);
  navEl = document.querySelector(`.${selectors.navElement}`);
  navSectionEl = document.querySelector(`#${selectors.navSection}`);

  hamburgerMenuCloseEl.classList.add(selectors.closed);
  screenWidth = screen.width;

  if (screenWidth < 768) {
    bodyEl = document.querySelector(selectors.body);

    bodyEl.classList.add(selectors.isMobile);
  } else {
    navEl.classList.remove(selectors.closed);
  }

  hamburgerMenuButtonEl.addEventListener('click', (event) => {
    navSectionEl.classList.toggle(selectors.mobileNavOpen);
    navEl.classList.toggle(selectors.closed);
    hamburgerMenuButtonEl.classList.toggle(selectors.closed);
    hamburgerMenuCloseEl.classList.toggle(selectors.closed);
  });

  hamburgerMenuCloseEl.addEventListener('click', (event) => {
    navSectionEl.classList.toggle(selectors.mobileNavOpen);
    navEl.classList.toggle(selectors.closed);
    hamburgerMenuButtonEl.classList.toggle(selectors.closed);
    hamburgerMenuCloseEl.classList.toggle(selectors.closed);
  });
});

window.addEventListener('resize', (event) => {
  bodyEl = document.querySelector(selectors.body);
  hamburgerMenuButtonEl = document.querySelector(`.${selectors.hamburgerMenuButton}`);
  hamburgerMenuCloseEl = document.querySelector(`.${selectors.hamburgerMenuClose}`);
  navEl = document.querySelector(`.${selectors.navElement}`);
  navSectionEl = document.querySelector(`#${selectors.navSection}`);

  screenWidth = screen.width;

  if (screenWidth < 768) {
    bodyEl.classList.add(selectors.isMobile);
    hamburgerMenuButtonEl.classList.remove(selectors.closed);
    hamburgerMenuCloseEl.classList.add(selectors.closed);
    navEl.classList.add(selectors.closed);
    navSectionEl.classList.remove(selectors.mobileNavOpen);
  } else if (screenWidth >= 768) {
    bodyEl.classList.remove(selectors.isMobile);
    hamburgerMenuButtonEl.classList.add(selectors.closed);
    hamburgerMenuCloseEl.classList.add(selectors.closed);
    navEl.classList.remove(selectors.closed);
    navSectionEl.classList.remove(selectors.mobileNavOpen);
  }
});
