(function () {
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const hamburger = document.getElementById("hamburger");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const mobileDropdown = document.getElementById("mobileDropdown");
  const navLinks = document.querySelectorAll("[data-section]");
  const sections = document.querySelectorAll("section[id]");
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") { html.classList.add("dark"); }
  else if (!savedTheme && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) { html.classList.add("dark"); }

  const moonSvg = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  const sunSvg = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

  function updateIcon() {
    if (themeIcon) { themeIcon.innerHTML = html.classList.contains("dark") ? sunSvg : moonSvg; }
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      html.classList.toggle("dark");
      localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
      updateIcon();
    });
  }
  updateIcon();

  if (hamburger && mobileDropdown) {
    const hamSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    const closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    hamburger.addEventListener("click", function () {
      mobileDropdown.classList.toggle("open");
      if (hamburgerIcon) { hamburgerIcon.innerHTML = mobileDropdown.classList.contains("open") ? closeSvg : hamSvg; }
    });

    document.querySelectorAll('.mobile-dropdown a').forEach(function (link) {
      link.addEventListener("click", function () {
        mobileDropdown.classList.remove("open");
        if (hamburgerIcon) { hamburgerIcon.innerHTML = hamSvg; }
      });
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    });
  });

  document.querySelectorAll('.btn-fill[href^="#"], .btn-outline[href^="#"]').forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));
      if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  if (sections.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.remove("active");
            var section = link.getAttribute("data-section");
            if (section && entry.target.id === section) { link.classList.add("active"); }
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (section) { observer.observe(section); });
  }

  if (contactForm && submitBtn) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var orig = submitBtn.innerHTML;
      submitBtn.innerHTML = "Message Sent \u2713";
      contactForm.reset();
      setTimeout(function () { submitBtn.innerHTML = orig; }, 3000);
    });
  }
})();
