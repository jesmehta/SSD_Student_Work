const MODEL_URL = "./model/";
let model;
let webcam;
let animationFrame;

const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const webcamHost = document.querySelector("#webcam");
const predictions = document.querySelector("#predictions");
const heading = document.querySelector("#experiment-title");
const cameraState = document.querySelector("#camera-state");
const error = document.querySelector("#error");

function setBusy(busy) {
  startButton.disabled = busy;
  startButton.textContent = busy ? "Loading…" : "Start camera";
}

async function startExperiment() {
  error.textContent = "";
  setBusy(true);
  try {
    if (!window.isSecureContext && location.hostname !== "localhost") {
      throw new Error("Camera access requires HTTPS. Publish or preview this page over a secure connection.");
    }
    model ||= await tmImage.load(`${MODEL_URL}model.json`, `${MODEL_URL}metadata.json`);
    webcam = new tmImage.Webcam(520, 520, true);
    await webcam.setup({ facingMode: "user" });
    await webcam.play();
    webcamHost.replaceChildren(webcam.canvas);
    predictions.replaceChildren(...model.getClassLabels().map(label => {
      const row = document.createElement("div");
      row.className = "prediction";
      row.dataset.label = label;
      row.innerHTML = `<div class="prediction-row"><span>${label}</span><span class="value">0%</span></div><div class="meter"><span></span></div>`;
      return row;
    }));
    cameraState.textContent = "Camera is live";
    stopButton.disabled = false;
    startButton.hidden = true;
    loop();
  } catch (cause) {
    error.textContent = cause?.message || "The camera or model could not be started.";
    setBusy(false);
  }
}

async function loop() {
  if (!webcam) return;
  webcam.update();
  const result = await model.predict(webcam.canvas);
  const strongest = [...result].sort((a, b) => b.probability - a.probability)[0];
  heading.textContent = strongest.probability > .6 ? strongest.className : "Looking…";
  result.forEach(item => {
    const row = [...predictions.children].find(element => element.dataset.label === item.className);
    if (!row) return;
    const percent = Math.round(item.probability * 100);
    row.querySelector(".value").textContent = `${percent}%`;
    row.querySelector(".meter span").style.width = `${percent}%`;
  });
  animationFrame = requestAnimationFrame(loop);
}

function stopExperiment() {
  cancelAnimationFrame(animationFrame);
  webcam?.stop();
  webcam = undefined;
  webcamHost.replaceChildren();
  cameraState.textContent = "Camera is off";
  heading.textContent = "Ready when you are.";
  predictions.replaceChildren();
  stopButton.disabled = true;
  startButton.hidden = false;
  setBusy(false);
}

startButton.addEventListener("click", startExperiment);
stopButton.addEventListener("click", stopExperiment);
document.addEventListener("visibilitychange", () => { if (document.hidden && webcam) stopExperiment(); });
