import { competences } from './competencesData.js';

// Sélection des éléments
const overlay = document.getElementById("overlayCompetences");
const cercleCentral = document.getElementById("cercleCentral");
const closeOverlay = document.getElementById("closeOverlay");
const container = document.getElementById("cardsContainer");

// détecte la version demandée par la page
const body = document.body;
const version = body.dataset.version || 'desktop';
// exemple de données des cartes
const cards = [
  { title: "frontend", type: "mobile" },
  { title: "backend", type: "mobile" },
  { title: "exploration", type: "mobile" },
  { title: "creation", type: "mobile" },
{ title: "softskills", type: "mobile" },
];
// injection filtrée selon la page
cards.forEach(card => {
  if (version === "mobile" && card.type === "mobile") {
    const div = document.createElement('div');
    div.className = "card bg-black/40 p-4 rounded-lg mb-4";
    div.textContent = card.title;
    container.appendChild(div);
  } else if (version === "desktop" && card.type === "desktop") {
    const div = document.createElement('div');
    div.className = "card bg-black/40 p-4 rounded-lg mb-4";
    div.textContent = card.title;
    container.appendChild(div);
  }
});

// ================== TOGGLE ==================
function toggleCompetences() {
  overlay.classList.toggle("hidden");

  const isOpen = !overlay.classList.contains("hidden");

  // Bloque le scroll du body UNIQUEMENT quand ouvert
  document.body.style.overflow = isOpen ? "hidden" : "auto";

  if (isOpen) {
    setTimeout(positionCardsInCircle, 100);
  }
}

if (cercleCentral) cercleCentral.addEventListener("click", toggleCompetences);
if (closeOverlay) closeOverlay.addEventListener("click", toggleCompetences);

console.log("overlay:", overlay);
console.log("container:", container);
console.log("cercleCentral:", cercleCentral);

if (!container) {
  console.error("cardsContainer introuvable !");
  if (cercleCentral) {
  cercleCentral.addEventListener("click", () => {
    console.log("cercle cliqué !");
    overlay.classList.remove("hidden");
  });
}

if (closeOverlay) {
  closeOverlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });
}
}
// ================== CREATE SVG CIRCLE ==================
function createCircleSkill(name, value, color) {

  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col items-center mb-4";

  const label = document.createElement("span");
  label.className = "mb-2 font-medium text-white text-center";
  label.textContent = name;

  const size = 80;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", "0 0 80 80");

  // Cercle fond
  const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  bgCircle.setAttribute("cx", "40");
  bgCircle.setAttribute("cy", "40");
  bgCircle.setAttribute("r", radius);
  bgCircle.setAttribute("stroke", "#e5e5e5");
  bgCircle.setAttribute("stroke-width", "8");
  bgCircle.setAttribute("fill", "none");

  // Cercle progression
  const progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  progressCircle.setAttribute("cx", "40");
  progressCircle.setAttribute("cy", "40");
  progressCircle.setAttribute("r", radius);
  progressCircle.setAttribute("stroke", color);
  progressCircle.setAttribute("stroke-width", "8");
  progressCircle.setAttribute("fill", "none");
  progressCircle.setAttribute("stroke-linecap", "round");
  progressCircle.setAttribute("stroke-dasharray", circumference);
  progressCircle.setAttribute("stroke-dashoffset", offset);
  progressCircle.setAttribute("transform", "rotate(-90 40 40)");
  progressCircle.style.transition = "stroke-dashoffset 0.8s ease";

  // Texte %
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", "40");
  text.setAttribute("y", "45");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "16");
  text.setAttribute("font-weight", "bold");
  text.setAttribute("fill", "white");
  text.textContent = value + "%";

  svg.appendChild(bgCircle);
  svg.appendChild(progressCircle);
  svg.appendChild(text);

  wrapper.appendChild(label);
  wrapper.appendChild(svg);

  return wrapper;
}
// ================== CREATE CARD ==================
function createCardButton(title, data, color) {

  const cardWrapper = document.createElement("div");
  cardWrapper.className =`
    flex flex-col items-center w-full mb-6 md
  `;

  const btn = document.createElement("button");
  btn.textContent = title;
  btn.className = "bg-white text-red-700 font-bold rounded-lg p-3 w-44 md:w-48 cursor-pointer";

  btn.style.background =
    "radial-gradient(circle at 30% 30%, white 0%, white 30%, #f3f3f3 60%, #d9d9d9 80%, #bdbdbd 100%)";

  btn.style.boxShadow =
    "inset -10px -20px 40px rgba(0,0,0,0.3), inset 10px 10px 30px rgba(255,255,255,0.6), 0 20px 40px rgba(0,0,0,0.4)";

    // le contenu de la carte
  const card = document.createElement("div");
  card.className = "card-content hidden mt-2 w-full text-sm rounded-lg p-3 space-y-2";
  card.style.backgroundColor = color + "40";
  card.style.color = "#eacbcb"; // couleur texte cartes
  
  data.forEach(item => {
    const div = document.createElement("div");

/*     if (item.value) {
      div.innerHTML = `
        <div class="flex justify-between font-medium">
          <span>${item.name}</span>
          <span><b>${item.value}%</b></span>
        </div>
        <div class="w-full bg-gray-300 rounded-full h-3 mt-1 overflow-hidden">
          <div class="h-3 rounded-full transition-all duration-700"
               style="width:${item.value}%; background-color:${color};">
          </div>
        </div>`;
    }  */if (item.value) {
  const circle = createCircleSkill(item.name, item.value, color);
  div.appendChild(circle);
}else if (item.desc) {
      div.innerHTML = `<b>${item.name}:</b><p>${item.desc}</p>`;
    }
    card.appendChild(div);
  });

  btn.addEventListener("click", () => card.classList.toggle("hidden"));

  cardWrapper.appendChild(btn);
  cardWrapper.appendChild(card);
  container.appendChild(cardWrapper);
}


// ================== GENERATION ==================


// Ordre pour correspondre au desktop

const isMobile = version === "mobile";

if (isMobile) {
  createCardButton("BACK-END & API", competences.backend, "#16a34a");
  createCardButton("FRONT-END", competences.frontend, "#2563eb");
  createCardButton("Autres Logiciels", competences.exploration, "#d5951e");
  createCardButton("CRÉATION", competences.creation, "#dc2626");
  createCardButton("Soft Skills", competences.softskills, "#9333ea");
}

// ================== POSITION EN CERCLE ==================
function positionCardsInCircle() {
  if (version === "mobile") return; // 
  
  const cards = container.children;

  // MOBILE → on remet en position normale
  if (window.innerWidth < 768) {
    for (let card of cards) {
      card.style.left = "";
      card.style.top = "";
      card.style.position = "";
    }
    return;
  }
// DESKTOP → cartes autour de la sphère
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;

  // Récupère la taille max des cartes pour éviter chevauchement
  const cardWidths = Array.from(cards).map(c => c.offsetWidth);
  const cardHeights = Array.from(cards).map(c => c.offsetHeight);
  const maxWidth = Math.max(...cardWidths);
  const maxHeight = Math.max(...cardHeights);

  const offsetX = 250; // horizontal
  const offsetY = 200; // vertical

  const positions = [
    { x: centerX - offsetX + 45, y: centerY - offsetY }, // Backend
    { x: centerX + offsetX - 45, y: centerY - offsetY }, // Frontend
    { x: centerX - offsetX - 155, y: centerY },           // Exploration
    { x: centerX + offsetX +155, y: centerY },           // Création
    { x: centerX,       y: centerY + offsetY + maxHeight / 2 } // Soft Skills
  ];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.style.position = "absolute";
    card.style.left = positions[i].x - card.offsetWidth / 2 + "px";
    card.style.top  = positions[i].y - card.offsetHeight / 2 + "px";

    const btn = card.querySelector("button");
    if (btn) card.style.width = btn.offsetWidth + "px";
  }
}

// ================== RESIZE ==================
positionCardsInCircle();
window.addEventListener("resize", positionCardsInCircle);

// Scrollable overlay et espacement mobile
overlay.classList.add("overflow-y-auto", "min-h-screen", "p-4");