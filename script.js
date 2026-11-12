
import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// THREE.JS BACKGROUND
const canvas = document.querySelector("#scene");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 17;

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});

renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// Floating particles
const count = 180;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 35;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
}

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  color: 0xb77bc4,
  size: 0.08,
  transparent: true,
  opacity: 0.8
});

const stars = new THREE.Points(geometry, material);
scene.add(stars);

// Floating glowing orbs
const orbs = [];

for (let i = 0; i < 25; i++) {
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 12, 12),
    new THREE.MeshBasicMaterial({
      color: i % 2 ? 0xe6a5d8 : 0xbba2ee,
      transparent: true,
      opacity: 0.7
    })
  );

  orb.position.set(
    (Math.random() - 0.5) * 25,
    (Math.random() - 0.5) * 17,
    (Math.random() - 0.5) * 8
  );

  scene.add(orb);
  orbs.push(orb);
}

function animate() {
  requestAnimationFrame(animate);

  const time = performance.now() * 0.0003;

  stars.rotation.y = time * 0.2;
  stars.rotation.x = Math.sin(time) * 0.04;

  orbs.forEach((orb, i) => {
    orb.position.y += Math.sin(time * 4 + i) * 0.001;
    orb.position.x += Math.cos(time * 3 + i) * 0.0005;
  });

  renderer.render(scene, camera);
}

animate();

// Responsive canvas
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

// GIFT POPUP
const modal = document.querySelector("#giftModal");

function openGift() {
  modal.classList.add("open");
  confetti(100);
}

function closeGift() {
  modal.classList.remove("open");
}

document.querySelector("#openGift")
  .addEventListener("click", openGift);

document.querySelector("#gift3d")
  .addEventListener("click", openGift);

document.querySelector("#closeGift")
  .addEventListener("click", closeGift);

document.querySelector("#modalCelebrate")
  .addEventListener("click", () => {
    closeGift();
    confetti(180);
  });

document.querySelector("#celebrate")
  .addEventListener("click", () => confetti(200));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeGift();
});

// QUICK LINKS
document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", () => {
    document.getElementById(
      tile.dataset.target
    ).scrollIntoView({ behavior: "smooth" });
  });
});

// BIRTHDAY CAKE
let wished = false;

document.querySelector("#cakeButton")
  .addEventListener("click", () => {

    const feedback =
      document.querySelector("#wishFeedback");

    if (!wished) {
      feedback.textContent =
        "Your wish has been sent! ✨";

      wished = true;
      confetti(120);

    } else {
      feedback.textContent =
        "May all your wishes come true, Aadil! ♡";

      confetti(70);
    }
  });

// MUSIC PLAYER
const musicInput =
  document.querySelector("#musicFile");

const player =
  document.querySelector("#audioPlayer");

musicInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (!file) return;

  player.src = URL.createObjectURL(file);
  player.play().catch(() => {});

  document.querySelector("#musicStatus")
    .textContent = "Now playing: " + file.name;
});

// CONFETTI
function confetti(amount = 100) {

  const colors = [
    "#bd83d2",
    "#f39bcf",
    "#ffd86e",
    "#ffffff",
    "#a99be9",
    "#f5c8e8"
  ];

  for (let i = 0; i < amount; i++) {

    const piece = document.createElement("i");

    piece.className = "confetti";

    piece.style.left =
      Math.random() * 100 + "vw";

    piece.style.width =
      5 + Math.random() * 7 + "px";

    piece.style.height =
      8 + Math.random() * 9 + "px";

    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDuration =
      2 + Math.random() * 2 + "s";

    piece.style.animationDelay =
      Math.random() * 0.4 + "s";

    document.body.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 5000);
  }
}
