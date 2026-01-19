// ================================
// CONTENT DATABASE
// ================================
const contentDatabase = {
  animation: {
    title: "Animation System",
    topics: [
      {
        title: "Unity Animator & Blend Trees",
        description: "Mastering animator layers, blend trees, and transitions for smooth character motion."
      },
      {
        title: "Inverse Kinematics (IK)",
        description: "Implement procedural IK setups for realistic limb movement and interactions."
      },
      {
        title: "Procedural Animation",
        description: "Generate animations dynamically using code for reactive gameplay."
      }
    ]
  },
  programming: {
    title: "Programming (C#)",
    topics: [
      { title: "Design Patterns", description: "Singleton, Observer, and Factory patterns for scalable architecture." },
      { title: "Data Structures", description: "Lists, dictionaries, queues, and custom structures for game systems." },
      { title: "AI & Pathfinding", description: "Implement navigation meshes, A*, and simple decision-making AI." }
    ]
  },
  gamedesign: {
    title: "Game Design",
    topics: [
      { title: "Level Design", description: "Plan and design levels that engage players and guide their progression." },
      { title: "UI/UX & Accessibility", description: "Create interfaces that are intuitive and inclusive." },
      { title: "Game Loop Balancing", description: "Optimize mechanics and pacing to keep players hooked." }
    ]
  },
  techart: {
    title: "Technical Art",
    topics: [
      { title: "Shader Graph & HLSL", description: "Custom shader creation for performance and aesthetics." },
      { title: "Particle Systems (VFX Graph)", description: "Design complex particle effects efficiently." },
      { title: "Performance Profiling", description: "Analyze and optimize GPU/CPU usage in Unity projects." }
    ]
  },
  gameartist: {
    title: "Game Art",
    topics: [
      { title: "Character & Environment Art", description: "Design 2D/3D assets for games with style and clarity." },
      { title: "Textures & Materials", description: "Create realistic or stylized textures using Substance or Photoshop." },
      { title: "Animation Integration", description: "Combine art and animation assets seamlessly in Unity." }
    ]
  }
};

// ================================
// GLOBAL STATE
// ================================
let currentCategoryKey = null;

// ================================
// HELPER FUNCTIONS
// ================================
function renderTabs() {
  const tabsContainer = document.querySelector(".doc-tabs");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = "";

  Object.keys(contentDatabase).forEach(key => {
    const tab = document.createElement("div");
    tab.classList.add("doc-tab");
    if (currentCategoryKey === key) tab.classList.add("active");
    tab.innerText = contentDatabase[key].title;
    tab.addEventListener("click", () => openCategory(key));
    tabsContainer.appendChild(tab);
  });
}

function renderSidebar(key) {
  const sidebarList = document.getElementById("sidebar-list");
  if (!sidebarList) return;
  sidebarList.innerHTML = "";

  const topics = contentDatabase[key].topics;
  topics.forEach((topic, index) => {
    const li = document.createElement("li");
    li.innerText = topic.title;
    if (index === 0) li.classList.add("active");
    li.addEventListener("click", () => {
      document.querySelectorAll("#sidebar-list li").forEach(el => el.classList.remove("active"));
      li.classList.add("active");
      renderDynamicContent(topic);
    });
    sidebarList.appendChild(li);
  });

  // Auto-load first topic
  if (topics.length) renderDynamicContent(topics[0]);
}

function renderDynamicContent(topic) {
  const content = document.getElementById("dynamic-content");
  if (!content) return;
  content.innerHTML = `
    <h2>${topic.title}</h2>
    <p>${topic.description}</p>
  `;
}

// ================================
// OPEN CATEGORY FUNCTION
// ================================
function openCategory(key) {
  if (!contentDatabase[key]) return;

  currentCategoryKey = key;

  // Hide overview and show documentation view
  document.getElementById("overview")?.classList.add("hidden");
  document.getElementById("documentation-view")?.classList.add("active");

  renderTabs();
  renderSidebar(key);
}

// ================================
// CLOSE CATEGORY / BACK BUTTON
// ================================
function closeCategory() {
  document.getElementById("overview")?.classList.remove("hidden");
  document.getElementById("documentation-view")?.classList.remove("active");
  currentCategoryKey = null;
  renderTabs();
}

// ================================
// DOM READY
// ================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio site loaded ✔");

  // NAV ACTIVE LINK
  document.querySelectorAll("nav a").forEach(link => {
    if (link.href === window.location.href) link.classList.add("active");
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

  // OPTIONAL: auto-open first category for UX
  // openCategory(Object.keys(contentDatabase)[0]);
});

