// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event
function handleScroll() {
  const targetElement = document.getElementById('panel-2');

  if (isElementInViewport(targetElement)) {
    // The target element is in the viewport
    console.log('Element is in the viewport!');
    
    // You can add your custom code here to perform actions when the element is scrolled to
  }
}

// Attach the scroll event listener to the window
// window.addEventListener('scroll', handleScroll);

window.addEventListener('DOMContentLoaded', () => {
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

  // Observe each element with class "box"
  const panels = document.querySelectorAll('.panel');
  panels.forEach(panel => {
    observer.observe(panel);
  });
});

