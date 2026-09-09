const works = [
  ["Aadit Vanjari & Bhakti Sharma", "Car Game", "Change lanes, dodge traffic and survive as the road accelerates.", "physical game", "exercises/aadit-car-game/index.html"],
  ["Aadit Vanjari & Bhakti Sharma", "Joystick Maze", "Navigate an increasingly intricate procedural maze without touching its walls.", "physical game", "exercises/aadit-joystick-maze/index.html"],
  ["Aadit Vanjari", "Throw & Pinch", "Sculpt and throw virtual clay using hand gestures captured by a camera.", "camera web", "exercises/aadit-throw-and-pinch/index.html"],
  ["Ananya Raut", "Caterpillar", "Guide a smiling caterpillar through a meadow of flowers.", "physical game", "exercises/ananya-caterpillar/index.html"],
  ["Ananya Raut", "VOID", "Collect energy while surviving inside a collapsing geometric system.", "physical game", "exercises/ananya-void/index.html"],
  ["Ananya Raut", "GOD.EXE", "A cinematic interactive simulation of elemental powers.", "web", "exercises/ananya-god-exe/index.html"],
  ["Anaya Raul", "India Atlas", "Guess, discover and celebrate the cultures of India's states and union territories.", "web game", "exercises/anaya-india-atlas/index.html"],
  ["Atharva Aware & Avaneesh Chavan", "Arrow of Judgement", "Aim, charge and fire through a journey between heaven and hell.", "physical game", "exercises/atharva-bow-game/index.html"],
  ["Atharva Aware", "Find the Cat", "Search a strange illustrated environment for a hidden cat.", "web game", "exercises/atharva-find-the-cat/index.html"],
  ["Bhakti Sharma", "Make Your Own Wine", "Combine unlikely ingredients and discover an expanding cellar of fictional wines.", "web game", "exercises/bhakti-make-your-own-wine/index.html"],
  ["Diti Pokar", "Where Did My ___ Go?", "Solve a whimsical detective mystery by following clues.", "web game", "exercises/diti-where-did-my-go/index.html"],
  ["Gloria Mathew", "Dorothy’s Maze", "Find the ruby shoes and escape a maze patrolled by wolves and flying monkeys.", "physical game", "exercises/gloria-dorothys-maze/index.html"],
  ["Gloria Mathew", "Objectively Matched", "A humorous matchmaking experience for everyday objects.", "web", "exercises/gloria-objectively-matched/index.html"],
  ["Madhav Kansara", "Human Physics Playground", "Drag and collide human figures in a browser physics sandbox.", "web game", "exercises/madhav-human-physics/index.html"],
  ["Madhav Kansara", "Assaniation Game", "Clear 20 guarded floors, rescue hostages, gather loot and defeat escalating bosses.", "game", "exercises/madhav-assaniation-game/index.html"],
  ["Parikshitsingh Bisht", "Chain of Events", "Build and simulate branching interactive stories.", "web", "exercises/parikshit-chain-of-events/index.html"],
  ["Pratyush Girap", "Sleepwalker — Version 1", "An early camera-guided sleepwalking game prototype.", "camera game", "exercises/pratyush-sleepwalker-v1/index.html"],
  ["Pratyush Girap", "Sleepwalker — Version 2", "A refined hand-tracked sleepwalking experiment.", "camera game", "exercises/pratyush-sleepwalker-v2/index.html"],
  ["Pratyush Girap", "Sleepwalker — Version 3", "The latest supplied iteration of the hand-controlled game.", "camera game", "exercises/pratyush-sleepwalker-v3/index.html"],
  ["Radhika Mistry", "Neon Maze", "Collect food, avoid poison and move through a level-based game.", "physical game", "exercises/radhika-joystick-game/index.html"],
  ["Radhika Mistry", "Focus Tracker", "Choose a character in a surreal focus-themed interface.", "web", "exercises/radhika-focus-tracker/index.html"],
  ["Sara Khan", "Stitch & Survive", "Collect textile tools, avoid zombies and reach a final roadside confrontation.", "physical game", "exercises/sara-stitch-and-survive/index.html"],
  ["Sharvari Joshi", "Memory Space", "Build personal constellations of photographs, objects and memories.", "web", "exercises/sharvari-memory-space/index.html"],
  ["Shreeya", "Apex Drift", "Drift a neon aerocraft through score gates and around laser barriers.", "game", "exercises/shreeya-apex-drift/index.html"],
  ["Swayam Kadam", "Let’s Be Friends", "Meet a digital character through face, mask and hand interactions.", "camera web", "exercises/swayam-lets-be-friends/index.html"],
  ["Swayam Kadam", "Finding India", "Sail across an illustrated world in an exploratory browser game.", "web game", "exercises/swayam-finding-india/index.html"],
  ["Swayam Kadam", "Internet 1995", "Explore a nostalgic interactive simulation of a Windows 95 desktop.", "web", "exercises/swayam-internet-1995/index.html"],
  ["Swayam Kadam", "Surviving SSD", "Dodge academic hazards for sixty seconds and graduate without collecting six K.T.s.", "physical game", "exercises/swayam-surviving-ssd/index.html"],
  ["Damiyan", "Breakline — Rooftop Escape", "Escape across neon rooftops in a fast browser action game.", "web game", "exercises/damiyan-breakline/index.html"],
  ["Sayli", "Cat News Network", "Browse breaking stories from an absurd feline news universe.", "web", "exercises/sayli-cat-news-network/index.html"],
  ["Gloria Mathew, Prachi & Damiyan", "Open Eyes / Closed Eyes", "A webcam model trained to recognise whether the viewer’s eyes appear open or closed.", "camera web", "exercises/eyes-open-closed/index.html"],
  ["Gloria Mathew, Prachi & Damiyan", "Pose Parade", "Try four playful poses and see how a custom machine-learning model responds.", "camera web", "exercises/pose-classifier/index.html"]
].map(([student, title, description, tags, href], index) => ({
  student,
  title,
  description,
  tags: tags.split(" "),
  index: index + 1,
  href
}));

const grid = document.querySelector("#work-grid");
const count = document.querySelector("#work-count");
const filters = [...document.querySelectorAll(".filter")];
const accents = ["#c8ff35", "#9c78ff", "#ff7548", "#50d8ff"];

function render(filter = "all") {
  const visible = filter === "all" ? works : works.filter(work => work.tags.includes(filter));
  count.textContent = `${visible.length} ${visible.length === 1 ? "work" : "works"}`;
  grid.replaceChildren(...visible.map(work => {
    const article = document.createElement("article");
    article.className = "work-card";
    article.style.setProperty("--card-accent", accents[(work.index - 1) % accents.length]);
    article.innerHTML = `
      <div class="card-top">
        <span class="tag">${work.tags.join(" · ")}</span>
        <span class="index">${String(work.index).padStart(2, "0")}</span>
      </div>
      <h3>${work.title}</h3>
      <p class="student">${work.student}</p>
      <p class="description">${work.description}</p>
      ${work.href ? `<a class="card-link" href="${work.href}" aria-label="Open ${work.title}"></a>` : ""}
      <span class="status">${work.href ? "Open exercise ↗" : "Queued for conversion"}</span>`;
    return article;
  }));
}

filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.toggle("is-active", item === button));
  render(button.dataset.filter);
}));

render();
