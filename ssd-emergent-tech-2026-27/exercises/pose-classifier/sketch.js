const MODEL_URL = "./model/";
let model;
let webcam;
let context;
let animationFrame;

const canvas = document.querySelector("#canvas");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resultHeading = document.querySelector("#result");
const predictions = document.querySelector("#predictions");
const cameraState = document.querySelector("#camera-state");
const error = document.querySelector("#error");

async function startExperiment() {
  error.textContent = "";
  startButton.disabled = true;
  startButton.textContent = "Loading…";
  try {
    if (!window.isSecureContext && location.hostname !== "localhost") {
      throw new Error("Camera access requires HTTPS. Publish or preview this page over a secure connection.");
    }
    model ||= await tmPose.load(`${MODEL_URL}model.json`, `${MODEL_URL}metadata.json`);
    webcam = new tmPose.Webcam(560, 560, true);
    await webcam.setup({ facingMode: "user" });
    await webcam.play();
    context = canvas.getContext("2d");
    predictions.replaceChildren(...model.getClassLabels().map(label => {
      const row = document.createElement("div");
      row.className = "prediction";
      row.dataset.label = label;
      row.innerHTML = `<span>${label}</span><strong>0%</strong>`;
      return row;
    }));
    cameraState.textContent = "Camera is live";
    stopButton.disabled = false;
    startButton.hidden = true;
    loop();
  } catch (cause) {
    error.textContent = cause?.message || "The camera or model could not be started.";
    startButton.disabled = false;
    startButton.textContent = "Start camera";
  }
}

async function loop() {
  if (!webcam) return;
  webcam.update();
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  const result = await model.predict(posenetOutput);
  const strongest = [...result].sort((a, b) => b.probability - a.probability)[0];
  resultHeading.textContent = strongest.probability > .55 ? strongest.className : "Keep posing…";
  result.forEach(item => {
    const row = [...predictions.children].find(element => element.dataset.label === item.className);
    if (row) row.querySelector("strong").textContent = `${Math.round(item.probability * 100)}%`;
  });
  drawPose(pose);
  animationFrame = requestAnimationFrame(loop);
}

function drawPose(pose) {
  if (!webcam || !context) return;
  context.drawImage(webcam.canvas, 0, 0, canvas.width, canvas.height);
  if (pose) {
    const minConfidence = .5;
    tmPose.drawKeypoints(pose.keypoints, minConfidence, context);
    tmPose.drawSkeleton(pose.keypoints, minConfidence, context);
  }
}

function stopExperiment() {
  cancelAnimationFrame(animationFrame);
  webcam?.stop();
  webcam = undefined;
  context?.clearRect(0, 0, canvas.width, canvas.height);
  predictions.replaceChildren();
  resultHeading.textContent = "Ready?";
  cameraState.textContent = "Camera is off";
  stopButton.disabled = true;
  startButton.hidden = false;
  startButton.disabled = false;
  startButton.textContent = "Start camera";
}

startButton.addEventListener("click", startExperiment);
stopButton.addEventListener("click", stopExperiment);
document.addEventListener("visibilitychange", () => { if (document.hidden && webcam) stopExperiment(); });
