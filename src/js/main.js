function bodyClickHandler() {
  const body = document.querySelector('body');
  const navOpenBackground = document.querySelector('.nav-open-background');
  const navEl = document.querySelector('.nav');

  navOpenBackground.addEventListener('click', () => {
    body.classList.remove('nav--open');
    navEl.classList.add('nav--closed');
    resizeNavBubbles();
  });
}

function navBubbleHandler() {
  const navLinks = document.getElementsByClassName('nav__link');
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          // Element has entered the viewport
          const truncatedEntryId = entry.target.id[entry.target.id.length - 1];

          for (let i = 1; i <= navLinks.length; i++) {
            if (truncatedEntryId == i) {
              navLinks[i - 1].parentElement.classList.add('active');
            } else {
              navLinks[i - 1].parentElement.classList.remove('active');
            }
          }
      }
    });
  }, options);

  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    observer.observe(panel);
  });
}

function resizeNavBubbles() {
  const navEl = document.querySelector('.nav');
  const navItems = document.querySelectorAll('.nav__item');
  const navLabels = document.querySelectorAll('.nav__panel-label');
  const radius = navEl.offsetWidth / 2;

  const numNavItems = navItems.length;
  const angleIncrement = (2 * Math.PI) / numNavItems;

  const collapsedNavArea = Math.floor(radius ** 2 * Math.PI);
  const areaPerItem = collapsedNavArea / numNavItems;
  let itemDiameter = Math.floor(Math.sqrt(areaPerItem / Math.PI));

  navItems.forEach((element, index) => {
    const angle = index * angleIncrement;
    let x = radius / 2 * Math.cos(angle);
    let y = radius / 2 * Math.sin(angle);

    element.firstElementChild.style.height = `${itemDiameter}px`;
    element.firstElementChild.style.width = `${itemDiameter}px`;
    element.style.left = `${x + radius}px`;
    element.style.top = `${y + radius / 2}px`;
    navLabels[index].style.marginLeft = `-${itemDiameter * 1.25}px`;
  });
}

function navCollapsedClickHandler () {
  const body = document.querySelector('body');
  const navEl = document.querySelector('.nav');
  const navCover = document.querySelector('.nav__cover');

  navCover.addEventListener('click', () => {
    body.classList.add('nav--open');
    navEl.classList.remove('nav--closed');
    resizeNavBubbles();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  bodyClickHandler();
  navCollapsedClickHandler();
  navBubbleHandler();
  resizeNavBubbles();
});

window.addEventListener('resize', () => {
  resizeNavBubbles();
});
