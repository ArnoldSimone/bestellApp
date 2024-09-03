function scrolly() {
    const sections = document.querySelectorAll(".ctnMealsCategory");
    const navLinks = document.querySelectorAll(".linkNavbar");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 350;
        const sectionHeight = section.offsetHeight;
        const scrollY = window.scrollY;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.querySelector("h1").id;
        }
      });
      navLinks.forEach((link) => {
        link.classList.remove("activeNav");
      });
      if (current) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href").includes(current)) {
            link.classList.add("activeNav");
          }
        });
      }
    });
  }