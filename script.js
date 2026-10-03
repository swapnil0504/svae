document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".desktop-nav");
  const announcement = document.querySelector(".announcement");
  const announcementClose = document.querySelector(".announcement-close");
  const contactForm = document.querySelector("#contactForm");
  const formStatus = document.querySelector(".form-status");

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  // Close mobile menu after navigation
  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Announcement bar
  announcementClose?.addEventListener("click", () => {
    announcement.style.display = "none";
  });

  // Demo contact form
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();

    formStatus.textContent =
      `Thanks${name ? `, ${name}` : ""}! Your message has been captured. Connect this form to your backend/email service to send it.`;

    contactForm.reset();
  });

  // Add a subtle active state while scrolling
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".desktop-nav a:not(.nav-cta)")];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));
});
