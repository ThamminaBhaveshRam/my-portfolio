document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio site loaded ✔");

  // NAV ACTIVE LINK
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  // FADE-IN SCROLL ANIMATION
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // PROJECT MODAL HANDLER
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.querySelector(".project-modal");
  const modalContent = document.querySelector(".project-modal-content");
  const modalClose = document.querySelector(".modal-close");

  if (modal && modalContent && modalClose) {
    projectCards.forEach(card => {
      card.addEventListener("click", () => {
        const title = card.dataset.title || "Game Project";
        const desc = card.dataset.desc || "No description added yet.";
        const video = card.dataset.video || "";

        modalContent.innerHTML = `
          <h2>${title}</h2>
          <p>${desc}</p>
          ${
            video
              ? `<div class="video-wrapper"><iframe width="100%" height="250" src="${video}" frameborder="0" allowfullscreen></iframe></div>`
              : ""
          }
        `;
        modal.classList.add("open");
      });
    });

    modalClose.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") modal.classList.remove("open");
    });
  }
});
document.querySelectorAll(".play-overlay").forEach(overlay => {
  overlay.addEventListener("click", () => {
    const iframe = overlay.nextElementSibling;
    iframe.src += "&autoplay=1";
    overlay.remove();
  });
});


