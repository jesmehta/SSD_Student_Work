const projects = [
  {
    "order": 1,
    "folder": "Dhruv_Belekar_project1",
    "student": "Dhruv Belekar",
    "project": "Project 1",
    "thumb": "Dhruv_Belekar_project1.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 2,
    "folder": "Dhruv_Belekar_code",
    "student": "Dhruv Belekar",
    "project": "Code",
    "thumb": "Dhruv_Belekar_code.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 3,
    "folder": "Kashvi_Shah",
    "student": "Kashvi Shah",
    "project": "Kashvi Shah",
    "thumb": "Kashvi_Shah.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 4,
    "folder": "kaushik",
    "student": "kaushik",
    "project": "Kaushik",
    "thumb": "kaushik.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 5,
    "folder": "kumkum_bharambe",
    "student": "kumkum bharambe",
    "project": "Kumkum Bharambe",
    "thumb": "kumkum_bharambe.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 6,
    "folder": "Mitali_Yeole",
    "student": "Mitali Yeole",
    "project": "Mitali Yeole",
    "thumb": "Mitali_Yeole.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 7,
    "folder": "Reet_singh",
    "student": "Reet singh",
    "project": "Reet Singh",
    "thumb": "Reet_singh.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 8,
    "folder": "Scarlett_Dsouza",
    "student": "Scarlett Dsouza",
    "project": "Scarlett Dsouza",
    "thumb": "Scarlett_Dsouza.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 9,
    "folder": "Sia_Jariwala",
    "student": "Sia Jariwala",
    "project": "Sia Jariwala",
    "thumb": "Sia_Jariwala.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 10,
    "folder": "Siddhi_Shethia",
    "student": "Siddhi Shethia",
    "project": "Siddhi Shethia",
    "thumb": "Siddhi_Shethia.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 11,
    "folder": "soham_G",
    "student": "soham G",
    "project": "Soham G",
    "thumb": "soham_G.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 12,
    "folder": "Tanay_Shetty",
    "student": "Tanay Shetty",
    "project": "Tanay Shetty",
    "thumb": "Tanay_Shetty.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 13,
    "folder": "Vaishnavi_Shetty",
    "student": "Vaishnavi Shetty",
    "project": "Vaishnavi Shetty",
    "thumb": "Vaishnavi_Shetty.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 14,
    "folder": "vignesh_shetty",
    "student": "vignesh shetty",
    "project": "vignesh shetty",
    "thumb": "vignesh_shetty.png",
    "instructions": "Explore the interactive sketch"
  },
  {
    "order": 15,
    "folder": "Vivan_gupta",
    "student": "Vivan.gupta",
    "project": "Vivan.gupta",
    "thumb": "Vivan_gupta.png",
    "instructions": "Explore the interactive sketch"
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
