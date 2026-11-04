const slides = [
  { title: "Game engine-ek – game jam előtti áttekintés" },
  { title: "A game engine technikai magja" },
  { title: "Fejlesztőeszközök technikai kategóriái" },
  {
    title: "Twine és Bitsy: két eltérő eszköztípus",
    links: [
      ["Twine – elágazó utak példája", "https://curriculum.codevirginia.org/twine-trail-guide/locations/branching-paths"],
      ["Bitsy – bevezető dokumentáció", "https://make.bitsy.org/docs/introduction/overview/index.html"]
    ]
  },
  {
    title: "GameMaker: fókuszált 2D workflow",
    links: [["GameMaker – Drag and Drop áttekintés", "https://manual.gamemaker.io/monthly/en/Drag_And_Drop/Drag_And_Drop_Overview/DnD_Overview.htm"]]
  },
  {
    title: "Godot: könnyű, nyílt és rugalmas",
    links: [["Godot – hivatalos képernyőképek", "https://github.com/godotengine/godot-design/tree/master/screenshots"]]
  },
  {
    title: "Unity: széles ökoszisztéma, nagyobb előkészítés",
    links: [["Unity – hivatalos oldal", "https://unity.com/"]]
  },
  {
    title: "Blueprint és erős 3D: Unreal Engine",
    links: [["Unreal Engine – Blueprint bevezető", "https://dev.epicgames.com/documentation/en-us/unreal-engine/introduction-to-blueprints"]]
  },
  { title: "Összehasonlítás" },
  { title: "Engine-választás a játék működése alapján" },
  { title: "Game jam fejlesztési workflow" },
  {
    title: "Indulás előtti ellenőrzőlista",
    links: [
      ["Twine", "https://www.twinery.org/"],
      ["Bitsy", "https://make.bitsy.org/docs/introduction/overview/index.html"],
      ["GameMaker", "https://gamemaker.io/en/features"],
      ["Godot", "https://godotengine.org/features/"],
      ["Unity", "https://unity.com/products/unity-engine"],
      ["Unreal Engine", "https://www.unrealengine.com/en-US"]
    ]
  }
].map((slide, index) => ({
  ...slide,
  number: index + 1,
  image: `slides/slide-${String(index + 1).padStart(2, "0")}.png`
}));

const el = {
  image: document.querySelector("#slideImage"),
  current: document.querySelector("#currentNumber"),
  total: document.querySelector("#totalNumber"),
  progress: document.querySelector("#progressBar"),
  prev: document.querySelector("#prevButton"),
  next: document.querySelector("#nextButton"),
  prevZone: document.querySelector("#prevZone"),
  nextZone: document.querySelector("#nextZone"),
  overviewButton: document.querySelector("#overviewButton"),
  linksButton: document.querySelector("#linksButton"),
  fullscreenButton: document.querySelector("#fullscreenButton"),
  overviewDialog: document.querySelector("#overviewDialog"),
  linksDialog: document.querySelector("#linksDialog"),
  overviewGrid: document.querySelector("#overviewGrid"),
  linkList: document.querySelector("#linkList")
};

let currentIndex = parseHash();
let touchStartX = 0;
let touchStartY = 0;

el.total.textContent = slides.length;

function parseHash() {
  const value = Number(location.hash.replace("#", ""));
  return Number.isInteger(value) && value >= 1 && value <= slides.length ? value - 1 : 0;
}

function render() {
  const slide = slides[currentIndex];
  el.image.classList.add("is-loading");
  el.image.src = slide.image;
  el.image.alt = `${slide.number}. dia: ${slide.title}`;
  document.title = `${slide.number}/${slides.length} – ${slide.title}`;
  el.current.textContent = slide.number;
  el.progress.style.width = `${(slide.number / slides.length) * 100}%`;
  el.prev.disabled = currentIndex === 0;
  el.next.disabled = currentIndex === slides.length - 1;
  el.linksButton.hidden = !(slide.links?.length);
  location.replace(`#${slide.number}`);
  updateOverviewSelection();
  preload(currentIndex + 1);
  preload(currentIndex - 1);
}

function goTo(index) {
  const next = Math.max(0, Math.min(slides.length - 1, index));
  if (next === currentIndex) return;
  currentIndex = next;
  render();
}

function preload(index) {
  if (!slides[index]) return;
  const img = new Image();
  img.src = slides[index].image;
}

function buildOverview() {
  el.overviewGrid.replaceChildren(...slides.map((slide, index) => {
    const button = document.createElement("button");
    button.className = "overview-card";
    button.type = "button";
    button.dataset.index = index;
    button.setAttribute("aria-label", `${slide.number}. dia: ${slide.title}`);
    button.innerHTML = `<img src="${slide.image}" alt="" loading="lazy"><span><strong>${slide.number}.</strong> ${slide.title}</span>`;
    button.addEventListener("click", () => {
      goTo(index);
      el.overviewDialog.close();
    });
    return button;
  }));
}

function updateOverviewSelection() {
  el.overviewGrid.querySelectorAll(".overview-card").forEach((card, index) => {
    card.setAttribute("aria-current", index === currentIndex ? "true" : "false");
  });
}

function showLinks() {
  const links = slides[currentIndex].links || [];
  el.linkList.replaceChildren(...links.map(([label, url]) => {
    const link = document.createElement("a");
    link.className = "link-item";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerHTML = `<span>${label}</span><small>Megnyitás ↗</small>`;
    return link;
  }));
  el.linksDialog.showModal();
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch (_) {
    // A böngésző vagy a beágyazott nézet letilthatja a teljes képernyőt.
  }
}

function closeOpenDialog() {
  const dialog = document.querySelector("dialog[open]");
  if (dialog) dialog.close();
  return Boolean(dialog);
}

el.image.addEventListener("load", () => el.image.classList.remove("is-loading"));
el.prev.addEventListener("click", () => goTo(currentIndex - 1));
el.next.addEventListener("click", () => goTo(currentIndex + 1));
el.prevZone.addEventListener("click", () => goTo(currentIndex - 1));
el.nextZone.addEventListener("click", () => goTo(currentIndex + 1));
el.overviewButton.addEventListener("click", () => el.overviewDialog.showModal());
el.linksButton.addEventListener("click", showLinks);
el.fullscreenButton.addEventListener("click", toggleFullscreen);

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => document.querySelector(`#${button.dataset.close}`).close());
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && closeOpenDialog()) return;
  if (document.querySelector("dialog[open]")) return;
  if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); goTo(currentIndex + 1); }
  if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); goTo(currentIndex - 1); }
  if (event.key === "Home") goTo(0);
  if (event.key === "End") goTo(slides.length - 1);
  if (event.key.toLowerCase() === "f") toggleFullscreen();
  if (event.key.toLowerCase() === "o") el.overviewDialog.showModal();
  if (event.key.toLowerCase() === "l" && slides[currentIndex].links?.length) showLinks();
});

window.addEventListener("hashchange", () => {
  const index = parseHash();
  if (index !== currentIndex) { currentIndex = index; render(); }
});

document.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", event => {
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) goTo(currentIndex + (dx < 0 ? 1 : -1));
}, { passive: true });

buildOverview();
render();
