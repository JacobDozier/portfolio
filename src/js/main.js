window.addEventListener("DOMContentLoaded", () => {
  mobileMenuButtonClickHandler();
  navLinkIntersectionHandler();
  navClickHandler();
});

const navLinkIntersectionHandler = () => {
  const middleLine = document.querySelector(".middle-line");
  const navLinks = document.getElementsByClassName("nav__link");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const truncatedEntryId = entry.target.id[entry.target.id.length - 1];

        for (let i = 1; i <= navLinks.length; i++) {
          if (truncatedEntryId == i) {
            navLinks[i - 1].classList.add("nav__link--active");
          } else {
            navLinks[i - 1].classList.remove("nav__link--active");
          }
        }
      }
    });
  }, options);

  const panels = document.querySelectorAll(".panel");
  panels.forEach((panel) => {
    observer.observe(panel);
  });
};

const mobileMenuButtonClickHandler = () => {
  const mobileMenuButton = document.querySelector(".nav__mobile-menu-button");

  mobileMenuButton.addEventListener("click", () => {
    toggleMobileNav();
  });
};

const navClickHandler = () => {
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      navLinks.forEach((link) => {
        link.classList.remove("nav__link--active");
      });
      navLink.classList.add("nav__link--active");

      if (document.querySelector("body.nav--mobile-open")) {
        toggleMobileNav();
      }
    });
  });
};

const toggleMobileNav = () => {
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const navList = document.querySelector(".nav__list");

  body.classList.toggle("nav--mobile-open");
  header.classList.toggle("nav--mobile-open");
  navList.classList.toggle("nav--mobile-open");
};
