// ===== PARTICLE VOID ANIMATION CODE =====
const canvas = document.getElementById("voidCanvas");
const ctx = canvas.getContext("2d");

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
const fontSize = 18;
const totalParticles = 6000;
const speed = 0.7;
const eventHorizon = 80;

let particles = [];
const liquidMetalImage = new Image();
liquidMetalImage.src = "images/liquid-metal-texture.jpg"; // Path to your image

// Load custom font
const fontFamily = "Orbitron";
const fontFace = new FontFace(
  fontFamily,
  "url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap')"
);

fontFace.load().then(() => {
  document.fonts.add(fontFace);
  ctx.font = `${fontSize}px ${fontFamily}`;
  initParticles();
  drawVoid();
});

function initParticles() {
  particles = [];
  for (let i = 0; i < totalParticles; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * Math.max(canvas.width, canvas.height);

    particles.push({
      x: canvas.width / 2 + Math.cos(angle) * radius,
      y: canvas.height / 2 + Math.sin(angle) * radius,
      char: chars.charAt(Math.floor(Math.random() * chars.length)),
      speed: speed * (Math.random() * 0.8 + 0.2),
    });
  }
}

function drawVoid() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw event horizon
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, eventHorizon, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();

  // Draw particles
  if (liquidMetalImage.complete) {
    particles.forEach((p) => {
      ctx.font = `${fontSize}px ${fontFamily}`;
      const pattern = ctx.createPattern(liquidMetalImage, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillText(p.char, p.x, p.y);

      const dx = canvas.width / 2 - p.x;
      const dy = canvas.height / 2 - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      p.x += (dx / distance) * p.speed;
      p.y += (dy / distance) * p.speed;

      if (distance < eventHorizon) {
        const randomAngle = Math.random() * Math.PI * 2;
        const randomRadius = Math.max(canvas.width, canvas.height);
        p.x = canvas.width / 2 + Math.cos(randomAngle) * randomRadius;
        p.y = canvas.height / 2 + Math.sin(randomAngle) * randomRadius;
      }
    });
  }

  requestAnimationFrame(drawVoid);
}

liquidMetalImage.onload = () => {
  initParticles();
  drawVoid();
};

// ===== SHOW/HIDE the Signup Modal =====
function showSignupForm() {
  const modal = document.getElementById('popupModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeSignupForm() {
  const modal = document.getElementById('popupModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// ===== HANDLE THE WAITLIST FORM SUBMISSION =====
document.addEventListener('DOMContentLoaded', function() {
  const waitlistForm = document.getElementById('waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const emailInput = waitlistForm.querySelector('input[name="email"]');
      const email = emailInput.value.trim();

      // IMPORTANT: If you don't have a server on 127.0.0.1:8080 with POST /api/waitlist,
      // you'll get a 405 or fetch error. Adjust to your actual backend URL if different.
      const serverUrl = '/api/waitlist';

      try {
        const response = await fetch(serverUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();

        if (data.success) {
          alert('Thank you! You have been added to the waitlist.');
          emailInput.value = '';
          closeSignupForm();
        } else {
          alert('Oops! Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again later.');
      }
    });
  }
});
