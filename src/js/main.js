function closeNav() {
  const body = document.querySelector('body');
  const navCloseButton = document.querySelector('.nav-close-button');
  const navEl = document.querySelector('.nav');

  body.classList.remove('nav--open');
  navCloseButton.style.display = 'none';
  navEl.classList.add('nav--closed');
  topRightNavBubbles();
  setTimeout(resizeNavBubbles, 1000);
}

function navBubbleIntersectionHandler() {
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

function navCloseBodyHandler() {
  const navOpenBackground = document.querySelector('.nav-open-background');

  navOpenBackground.addEventListener('click', () => {
    closeNav();
  });
}

function navCloseButtonHandler() {
  const navCloseButton = document.querySelector('.nav-close-button');

  navCloseButton.addEventListener('click', () => {
    closeNav();
  });
}

function navCollapsedClickHandler () {
  const body = document.querySelector('body');
  const navCover = document.querySelector('.nav__cover');
  const navCloseButton = document.querySelector('.nav-close-button');
  const navEl = document.querySelector('.nav');

  navCover.addEventListener('click', () => {
    centerNavBubbles();

    body.classList.add('nav--open');
    navEl.classList.remove('nav--closed');
    setTimeout(() => {
      resizeNavBubbles();
      navCloseButton.style.display = 'block';
      navCloseButton.focus();
      focusNavAfterNavClose();
    }, 1000);
  });
}

function navItemClickHandler() {
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });
}

function centerNavBubbles() {
  const navItems = document.querySelectorAll('.nav__item');

  navItems.forEach((element, index) => {
    element.style.left = `50%`;
    element.style.top = `50%`;
  });
}

function topRightNavBubbles() {
  const navItems = document.querySelectorAll('.nav__item');

  navItems.forEach((element, index) => {
    element.style.left = `50%`;
    element.style.top = `50%`;
    element.firstElementChild.style.height = `10px`;
    element.firstElementChild.style.width = `10px`;
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
    element.style.top = `${y + radius}px`;
    navLabels[index].style.marginLeft = `-${itemDiameter * 1.25}px`;
  });
}

function focusNavAfterNavClose() {
  const navCloseButton = document.querySelector('.nav-close-button');

  navCloseButton.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      let navItems = document.getElementsByClassName('nav__item');
      navItems[0].firstElementChild.focus();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  navBubbleIntersectionHandler();
  navCloseBodyHandler();
  navCloseButtonHandler()
  navCollapsedClickHandler();
  navItemClickHandler();
  resizeNavBubbles();
});

window.addEventListener('resize', () => {
  resizeNavBubbles();
});
