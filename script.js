// ================================
// CONTENT DATABASE (TOP MOST)
// ================================
const contentDatabase = {
  animation: { title: "Animation", items: [] },
  programming: { title: "Programming", items: [] },
  gamedesign: { title: "Game Design", items: [] },
  techart: { title: "Technical Art", items: [] },
  gameartist: { title: "Game Art", topics: [] }
};

// ================================
// GLOBAL STATE
// ================================
let currentCategoryData = null;

const categoryKeys = ["animation", "programming", "gamedesign", "techart","gameartist"];

// ================================
// TABS RENDER FUNCTION
// ================================
function renderTabs() {
  const tabsContainer = document.querySelector(".doc-tabs");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = "";

  categoryKeys.forEach(key => {
    const tab = document.createElement("div");
    tab.classList.add("doc-tab");

    if (
      currentCategoryData &&
      currentCategoryData.title === contentDatabase[key].title
    ) {
      tab.classList.add("active");
    }

    tab.innerText = contentDatabase[key].title;

    tab.addEventListener("click", () => {
      openCategory(key);
    });

    tabsContainer.appendChild(tab);
  });
}

// ================================
// CATEGORY OPEN FUNCTION
// ================================
function openCategory(key) {
  const data = contentDatabase[key];
  if (!data) return;

  currentCategoryData = data;

  // Example UI toggles (keep or modify if needed)
  document.getElementById("overview")?.classList.add("hidden");
  document.getElementById("documentation-view")?.classList.add("active");

  // TODO: load sidebar + content here if you already have logic

  renderTabs();
}

// ================================
// DOM READY
// ================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio site loaded ✔");

  // NAV ACTIVE LINK
  document.querySelectorAll("nav a").forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  // FADE-IN SCROLL ANIMATION
  const faders = document.querySelectorAll(".fade-in");
  const appearOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
  );

  faders.forEach(el => appearOnScroll.observe(el));

  // PROJECT MODAL HANDLER
  const modal = document.querySelector(".project-modal");
  const modalContent = document.querySelector(".project-modal-content");
  const modalClose = document.querySelector(".modal-close");

  if (modal && modalContent && modalClose) {
    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", () => {
        const title = card.dataset.title || "Game Project";
        const desc = card.dataset.desc || "No description added yet.";
        const video = card.dataset.video || "";

        modalContent.innerHTML = `
          <h2>${title}</h2>
          <p>${desc}</p>
          ${
            video
              ? `<div class="video-wrapper">
                   <iframe src="${video}" frameborder="0" allowfullscreen></iframe>
                 </div>`
              : ""
          }
        `;

        modal.classList.add("open");
      });
    });

    modalClose.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.remove("open");
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") modal.classList.remove("open");
    });
  }

  // VIDEO PLAY OVERLAY
  document.querySelectorAll(".play-overlay").forEach(overlay => {
    overlay.addEventListener("click", () => {
      const iframe = overlay.nextElementSibling;
      if (iframe) iframe.src += "&autoplay=1";
      overlay.remove();
    });
  });

  // OPTIONAL: Auto-open first tab when docs load
  // openCategory(categoryKeys[0]);
});

