const projects = [
    {
    "order": 1,
    "folder": "Parth",
    "student": "Parth",
    "project": "Aerodynamics Simulation",
    "thumb": "Parth.png",
    "instructions": "Windtunnel for cars"
  },
  {
    "order": 3,
    "folder": "Aarya_TOSSBIN",
    "student": "Aarya",
    "project": "TOSSBIN",
    "thumb": "Aarya.png",
    "instructions": "Bounce trash into the bin"
  },
  {
    "order": 2,
    "folder": "Dhruvi_Assignment_2",
    "student": "Dhruvi",
    "project": "Coloring Book",
    "thumb": "Dhruvi.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 2,
    "folder": "Arnav",
    "student": "Arnav",
    "project": "Scared Particles",
    "thumb": "Arnav.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 1,
    "folder": "Deepika_Pest_Control",
    "student": "Deepika",
    "project": "Pest Control",
    "thumb": "Deepika.png",
    "instructions": "Click pests to catch them"
  },
  {
    "order": 5,
    "folder": "Harshdeep_YE_hai_JURRY_WALLA_copy",
    "student": "Harshdeep",
    "project": "Khalsa Fruit Center",
    "thumb": "Harshdeep.png",
    "instructions": "Let the camera judge you"
  },
  {
    "order": 6,
    "folder": "Ishan",
    "student": "Ishan",
    "project": "Aim Trainer",
    "thumb": "Ishan.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 7,
    "folder": "Jiya_my_name_fliesss",
    "student": "Jiya",
    "project": "my name fliesss",
    "thumb": "Jiya.png",
    "instructions": "Make the letters fly"
  },
  {
    "order": 8,
    "folder": "Kamlesh_guitar_1_final_ver1",
    "student": "Kamlesh",
    "project": "Guitar",
    "thumb": "Kamlesh.png",
    "instructions": "Use mouse to strum guitar"
  },
  {
    "order": 9,
    "folder": "Pushti_DINOEATS",
    "student": "Pushti",
    "project": "DINOEATS",
    "thumb": "Pushti_DinoEats.png",
    "instructions": "Feed the dinosaur to survive"
  },
  {
    "order": 10,
    "folder": "Sharvani_assignment2.v7",
    "student": "Sharvani",
    "project": "Pong",
    "thumb": "Sharvani.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 2,
    "folder": "Sharvil_i_like_ball_final_copy",
    "student": "Sharvil",
    "project": "i like ball final copy",
    "thumb": "Sharvil.png",
    "instructions": "Move and bounce the ball"
  },
  {
    "order": 12,
    "folder": "Siah_FINAL_GAME_NEON_JUICE_CENTER",
    "student": "Siah",
    "project": "FINAL GAME NEON JUICE CENTER",
    "thumb": "Siah.png",
    "instructions": "Serve neon juice fast"
  }
];

const particleCanvas = document.querySelector("#particleCanvas");
const grid = document.querySelector("#showcaseGrid");

function cleanTitle(text) {
  return text
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function startParticleBackground() {
  if (!particleCanvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const context = particleCanvas.getContext("2d");
  const particleCount = Math.floor(Math.random() * 10) + 5;
  const particles = [];

  function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    particleCanvas.width = Math.floor(window.innerWidth * pixelRatio);
    particleCanvas.height = Math.floor(window.innerHeight * pixelRatio);
    particleCanvas.style.width = `${window.innerWidth}px`;
    particleCanvas.style.height = `${window.innerHeight}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function createParticle() {
    const speed = 0.9 + Math.random() * 0.9;
    const angle = Math.random() * Math.PI * 2;

    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 2.5 + Math.random() * 3,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: ["#ff3df2", "#2afcff", "#c8ff35", "#ff9b28"][Math.floor(Math.random() * 4)]
    };
  }

  function nearestParticle(source) {
    let nearest = null;
    let nearestDistanceSquared = Infinity;

    particles.forEach((target) => {
      if (target === source) {
        return;
      }

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distanceSquared = dx * dx + dy * dy;

      if (distanceSquared < nearestDistanceSquared) {
        nearest = target;
        nearestDistanceSquared = distanceSquared;
      }
    });

    return nearest;
  }

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < particle.radius || particle.x > window.innerWidth - particle.radius) {
        particle.vx *= -1;
      }

      if (particle.y < particle.radius || particle.y > window.innerHeight - particle.radius) {
        particle.vy *= -1;
      }

      const nearest = nearestParticle(particle);

      if (nearest) {
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(nearest.x, nearest.y);
        context.strokeStyle = "rgba(255, 248, 223, 0.16)";
        context.lineWidth = 1;
        context.stroke();
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = particle.color;
      context.fill();
    });

    requestAnimationFrame(draw);
  }

  resizeCanvas();

  for (let index = 0; index < particleCount; index += 1) {
    particles.push(createParticle());
  }

  window.addEventListener("resize", resizeCanvas);
  draw();
}

// Edit the order numbers above to rearrange the landing-page cards.
// Lower numbers appear first. Matching order numbers keep the list's original order.
const orderedProjects = [...projects].sort((a, b) => a.order - b.order);

startParticleBackground();

orderedProjects.forEach((item, index) => {
  const card = document.createElement("a");
  card.className = "project-card";
  card.href = `./${item.folder}/`;
  card.style.setProperty("--tilt", `${[-1.5, 1.2, -0.8, 1.8, -1.1, 0.9][index % 6]}deg`);

  card.innerHTML = `
    <div class="thumb">
      <img src="./${item.thumb}" alt="${item.project} by ${item.student}" loading="lazy">
    </div>
    <div class="card-text">
      <h2 class="project-name">${cleanTitle(item.project)}</h2>
      <p class="student-name">${item.student}</p>
      <p class="project-instructions">${item.instructions || "Open the interactive sketch"}</p>
    </div>
  `;

  grid.appendChild(card);
});
