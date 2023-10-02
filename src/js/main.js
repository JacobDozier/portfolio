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

window.addEventListener('DOMContentLoaded', () => {
  navBubbleHandler();
});

