/* =========================================
   DOM ELEMENTS
   ========================================= */

const dialogueText =
    document.getElementById("dialogue-text");

const inputContainer =
    document.getElementById("input-container");

const nameInput =
    document.getElementById("name-input");

const nameSubmit =
    document.getElementById("name-submit");

const choiceContainer =
    document.getElementById("choice-container");

const yesButton =
    document.getElementById("yes-button");

const noButton =
    document.getElementById("no-button");


/* =========================================
   CAMERA INTERACTION ELEMENTS
   ========================================= */

const cameraInteractionContainer =
    document.getElementById(
        "camera-interaction-container"
    );

const waveButton =
    document.getElementById(
        "wave-button"
    );

const smileButton =
    document.getElementById(
        "smile-button"
    );


/* =========================================
   CAMERA ELEMENTS
   ========================================= */

const cameraContainer =
    document.getElementById(
        "camera-container"
    );

const cameraVideo =
    document.getElementById(
        "camera-video"
    );

const videoCallContainer =
    document.getElementById(
        "video-call-container"
    );

const pickupButton =
    document.getElementById(
        "pickup-button"
    );

const declineCallButton =
    document.getElementById(
        "decline-call-button"
    );


/* =========================================
   FACE TRACKING ELEMENTS
   ========================================= */

const faceTrackingStatus =
    document.getElementById(
        "face-tracking-status"
    );

const faceStatusText =
    document.getElementById(
        "face-status-text"
    );

/* =========================================
   REPLICA DELAY SYSTEM
   ========================================= */

/* =========================================
   PLAYER DATA
   ========================================= */

let playerName = "";


/* =========================================
   CAMERA STATE
   ========================================= */

let cameraStream = null;


/* =========================================
   DIALOGUE STATE
   ========================================= */

let dialogueSession = 0;


/* =========================================
   TYPING STATE
   ========================================= */

let currentTypingInterval = null;

let currentTypingTimeout = null;

let currentDialogueDelayTimeout = null;

let currentTypingText = "";

let currentTypingComplete = null;

let currentTypingIndex = 0;

let isTyping = false;


/* =========================================
   FACE TRACKING STATE
   ========================================= */

let faceLandmarker = null;

let handDetectionFrameCounter = 0;

let faceTrackingRunning = false;

let faceTrackingFrameID = null;

let lastFaceDetectionTime = 0;

let faceTrackingReady = false;

/* =========================================
   HAND TRACKING STATE
   ========================================= */

let handLandmarker = null;

let handTrackingReady = false;

let handWaveDetectionEnabled = false;

let handWaveTriggered = false;

let handWaveLastTime = 0;

let handWaveDirection = 0;

let handWaveDirectionChanges = 0;

let handWaveStartedAt = 0;

let handWavePreviousX = null;

let handWaveMinX = 1;

let handWaveMaxX = 0;


/* =========================================
   HAND WAVE CALIBRATION
   ========================================= */

const HAND_WAVE_MIN_MOVEMENT = 0.06;

const HAND_WAVE_MIN_SPAN = 0.06;

const HAND_WAVE_REQUIRED_DIRECTION_CHANGES = 2;

const HAND_WAVE_MAX_DURATION = 5000;

const HAND_WAVE_COOLDOWN = 1800;

/* =========================================
   SMILE TRACKING STATE
   ========================================= */

let smileDetected = false;

let smileDetectionEnabled = false;

let smileStartedAt = 0;

let smileResponseTriggered = false;

let currentSmileValue = 0;


/* =========================================
   FACE POSITION STATE
   ========================================= */

let facePosition = {

    x: 0.5,

    y: 0.5,

    width: 0,

    height: 0,

    centerX: 0.5,

    centerY: 0.5

};


let facePositionDebugElement = null;


/* =========================================
   HEAD MOVEMENT STATE
   ========================================= */

let headMovement = {

    yaw: 0,

    pitch: 0,

    roll: 0,

    direction: "CENTER"

};


let headMovementDebugElement = null;

/* =========================================
   FACIAL LANDMARK DEBUG
   ========================================= */

let faceLandmarkCanvas = null;

let faceLandmarkContext = null;


/* =========================================
   SMILE CALIBRATION
   ========================================= */

const SMILE_THRESHOLD = 0.45;

const SMILE_HOLD_TIME = 350;


/* =========================================
   HEAD MOVEMENT CALIBRATION
   ========================================= */

const HEAD_YAW_THRESHOLD = 0.25;

const HEAD_PITCH_THRESHOLD = 0.08;

const HEAD_ROLL_THRESHOLD = 10;


/* =========================================
   MEDIAPIPE SETTINGS
   ========================================= */

const MEDIAPIPE_WASM_PATH =
    "../../vendor/mediapipe-tasks-vision-0.10.22/wasm";

const FACE_LANDMARKER_MODEL_PATH =
    "assets/models/face_landmarker.task";

const HAND_LANDMARKER_MODEL_PATH =
    "../../vendor/shared-models/hand_landmarker.task";


/* =========================================
   INITIALIZATION
   ========================================= */

startExperience();


function startExperience() {

    playDialogue(
        DIALOGUE.opening,
        showNameQuestion
    );

}


/* =========================================
   DIALOGUE SYSTEM
   ========================================= */

function playDialogue(
    lines,
    onComplete
) {

    const sessionID =
        ++dialogueSession;

    let currentIndex = 0;


    function playNextLine() {

        if (
            sessionID !==
            dialogueSession
        ) {

            return;

        }


        if (
            currentIndex >=
            lines.length
        ) {

            if (onComplete) {

                onComplete();

            }

            return;

        }


        const line =
            lines[currentIndex];


        typeDialogue(
            line,
            () => {

                if (
                    sessionID !==
                    dialogueSession
                ) {

                    return;

                }


                currentIndex++;


                currentDialogueDelayTimeout =
                    setTimeout(
                        () => {

                            currentDialogueDelayTimeout =
                                null;


                            if (
                                sessionID !==
                                dialogueSession
                            ) {

                                return;

                            }


                            playNextLine();

                        },
                        SETTINGS.dialogueDelay
                    );

            }
        );

    }


    playNextLine();

}


/* =========================================
   TYPING EFFECT
   ========================================= */

function typeDialogue(
    text,
    onComplete
) {

    stopCurrentTyping();


    currentTypingText =
        text;

    currentTypingIndex =
        0;

    currentTypingComplete =
        onComplete;

    isTyping =
        true;


    dialogueText.classList.remove(
        "fade-out"
    );

    dialogueText.classList.add(
        "fade-in"
    );

    dialogueText.classList.add(
        "typing"
    );

    dialogueText.classList.remove(
        "hidden"
    );


    dialogueText.textContent =
        "";


    currentTypingTimeout =
        setTimeout(
            () => {

                currentTypingTimeout =
                    null;


                if (!isTyping) {

                    return;

                }


                currentTypingInterval =
                    setInterval(
                        () => {

                            if (!isTyping) {

                                return;

                            }


                            dialogueText.textContent +=
                                currentTypingText.charAt(
                                    currentTypingIndex
                                );


                            currentTypingIndex++;


                            if (
                                currentTypingIndex >=
                                currentTypingText.length
                            ) {

                                finishCurrentTyping();

                            }

                        },
                        SETTINGS.typingSpeed
                    );

            },
            SETTINGS.typingStartDelay
        );

}


/* =========================================
   FINISH CURRENT TYPING
   ========================================= */

function finishCurrentTyping() {

    if (!isTyping) {

        return;

    }


    if (
        currentTypingTimeout !==
        null
    ) {

        clearTimeout(
            currentTypingTimeout
        );

        currentTypingTimeout =
            null;

    }


    if (
        currentTypingInterval !==
        null
    ) {

        clearInterval(
            currentTypingInterval
        );

        currentTypingInterval =
            null;

    }


    dialogueText.textContent =
        currentTypingText;


    dialogueText.classList.remove(
        "typing"
    );


    isTyping =
        false;


    const callback =
        currentTypingComplete;


    currentTypingComplete =
        null;


    if (callback) {

        callback();

    }

}


/* =========================================
   STOP CURRENT TYPING
   ========================================= */

function stopCurrentTyping() {

    if (
        currentTypingTimeout !==
        null
    ) {

        clearTimeout(
            currentTypingTimeout
        );

        currentTypingTimeout =
            null;

    }


    if (
        currentTypingInterval !==
        null
    ) {

        clearInterval(
            currentTypingInterval
        );

        currentTypingInterval =
            null;

    }


    if (
        currentDialogueDelayTimeout !==
        null
    ) {

        clearTimeout(
            currentDialogueDelayTimeout
        );

        currentDialogueDelayTimeout =
            null;

    }


    isTyping =
        false;

    currentTypingComplete =
        null;

}


/* =========================================
   SPACE BAR — SKIP CURRENT LINE
   ========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            SETTINGS.skipDialogueKey
        ) {

            if (
                document.activeElement ===
                nameInput
            ) {

                return;

            }


            event.preventDefault();


            if (isTyping) {

                finishCurrentTyping();

            }

        }

    }
);


/* =========================================
   CTRL + S — DEVELOPMENT SHORTCUT
   ========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();


            skipToVideoCall();

        }

    }
);

/* =========================================
   F — SHOW CURRENT FACE DATA
   ========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase() === "f"
        ) {

            if (
                document.activeElement === nameInput
            ) {
                return;
            }

            const currentFaceData =
                window.evilReplicaCurrentLandmarks;

            console.log(
                "CURRENT FACE LANDMARKS:",
                currentFaceData
            );

            console.log(
                "LANDMARK COUNT:",
                currentFaceData
                    ? currentFaceData.length
                    : 0
            );

        }

    }
);

/* =========================================
   SKIP TO VIDEO CALL
   ========================================= */

function skipToVideoCall() {

    dialogueSession++;


    stopCurrentTyping();


    inputContainer.classList.add(
        "hidden"
    );

    choiceContainer.classList.add(
        "hidden"
    );

    cameraInteractionContainer.classList.add(
        "hidden"
    );


    dialogueText.classList.add(
        "hidden"
    );


    showIncomingVideoCall();

}


/* =========================================
   NAME QUESTION
   ========================================= */

function showNameQuestion() {

    playDialogue(
        DIALOGUE.introduction,
        showNameInput
    );

}


/* =========================================
   NAME INPUT
   ========================================= */

function showNameInput() {

    inputContainer.classList.remove(
        "hidden"
    );

    nameInput.focus();

}


nameSubmit.addEventListener(
    "click",
    submitName
);


if (
    SETTINGS.allowEnterKey
) {

    nameInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "Enter"
            ) {

                submitName();

            }

        }
    );

}


function submitName() {

    const enteredName =
        nameInput.value.trim();


    if (
        enteredName === ""
    ) {

        nameInput.focus();

        return;

    }


    playerName =
        enteredName;


    inputContainer.classList.add(
        "hidden"
    );


    beginPersonalConversation();

}


/* =========================================
   PERSONAL CONVERSATION
   ========================================= */

function beginPersonalConversation() {

    const greetingLines =
        DIALOGUE.greeting.map(
            (line) => {

                return line.replaceAll(
                    "{name}",
                    playerName
                );

            }
        );


    playDialogue(
        greetingLines,
        askFirstQuestion
    );

}


/* =========================================
   FIRST QUESTION
   ========================================= */

function askFirstQuestion() {

    showDialogueQuestion(
        DIALOGUE.firstQuestion.question,
        DIALOGUE.firstQuestion.choices,
        askSecondQuestion
    );

}


/* =========================================
   SECOND QUESTION
   ========================================= */

function askSecondQuestion() {

    showDialogueQuestion(
        DIALOGUE.friendshipQuestion.question,
        DIALOGUE.friendshipQuestion.choices,
        showVulnerability
    );

}


/* =========================================
   GENERIC QUESTION
   ========================================= */

function showDialogueQuestion(
    question,
    choices,
    onChoiceComplete
) {

    typeDialogue(
        question,
        () => {

            setupChoiceButtons(
                choices,
                onChoiceComplete
            );


            choiceContainer.classList.remove(
                "hidden"
            );

        }
    );

}


/* =========================================
   CHOICE BUTTONS
   ========================================= */

function setupChoiceButtons(
    choices,
    onChoiceComplete
) {

    yesButton.textContent =
        choices[0].text;

    noButton.textContent =
        choices[1].text;


    yesButton.onclick =
        () => {

            handleChoice(
                choices[0],
                onChoiceComplete
            );

        };


    noButton.onclick =
        () => {

            handleChoice(
                choices[1],
                onChoiceComplete
            );

        };

}


/* =========================================
   HANDLE CHOICE
   ========================================= */

function handleChoice(
    choice,
    onChoiceComplete
) {

    choiceContainer.classList.add(
        "hidden"
    );


    playDialogue(
        choice.response,
        () => {

            if (
                onChoiceComplete
            ) {

                onChoiceComplete(
                    choice
                );

            }

        }
    );

}


/* =========================================
   VULNERABILITY
   ========================================= */

function showVulnerability() {

    playDialogue(
        DIALOGUE.vulnerability,
        askFriendshipQuestion
    );

}


/* =========================================
   FRIENDSHIP QUESTION
   ========================================= */

function askFriendshipQuestion() {

    const friendshipQuestion =
        DIALOGUE.friendship.question
            .replaceAll(
                "{name}",
                playerName
            );


    showDialogueQuestion(
        friendshipQuestion,
        DIALOGUE.friendship.choices,
        showFriendshipAfter
    );

}


/* =========================================
   AFTER FRIENDSHIP
   ========================================= */

function showFriendshipAfter() {

    playDialogue(
        DIALOGUE.friendshipAfter,
        askPermissionToAsk
    );

}


/* =========================================
   PERMISSION TO ASK SOMETHING
   ========================================= */

function askPermissionToAsk() {

    showDialogueQuestion(
        DIALOGUE.cameraQuestion.question,
        DIALOGUE.cameraQuestion.choices,
        handleFirstPermissionChoice
    );

}


/* =========================================
   FIRST PERMISSION CHOICE
   ========================================= */

function handleFirstPermissionChoice(
    choice
) {

    if (
        choice.text ===
        "Sure!"
    ) {

        startCameraInvitation();

        return;

    }


    playDialogue(
        choice.response,
        askPermissionAgain
    );

}


/* =========================================
   ASK AGAIN
   ========================================= */

function askPermissionAgain() {

    showDialogueQuestion(
        DIALOGUE.cameraQuestionAgain.question,
        DIALOGUE.cameraQuestionAgain.choices,
        handleSecondPermissionChoice
    );

}


/* =========================================
   SECOND PERMISSION CHOICE
   ========================================= */

function handleSecondPermissionChoice(
    choice
) {

    if (
        choice.text ===
        "Okay!"
    ) {

        startCameraInvitation();

        return;

    }


    playDialogue(
        choice.response,
        finishVersion
    );

}


/* =========================================
   CAMERA INVITATION
   ========================================= */

function startCameraInvitation() {

    playDialogue(
        DIALOGUE.cameraInvitation,
        showIncomingVideoCall
    );

}


/* =========================================
   INCOMING VIDEO CALL
   ========================================= */

function showIncomingVideoCall() {

    dialogueSession++;


    stopCurrentTyping();


    dialogueText.classList.add(
        "hidden"
    );

    inputContainer.classList.add(
        "hidden"
    );

    choiceContainer.classList.add(
        "hidden"
    );

    cameraInteractionContainer.classList.add(
        "hidden"
    );


    videoCallContainer.classList.remove(
        "hidden"
    );


    console.log(
        "Incoming video call displayed."
    );

}


/* =========================================
   PICK UP VIDEO CALL
   ========================================= */

pickupButton.addEventListener(
    "click",
    handlePickupCall
);


async function handlePickupCall() {

    videoCallContainer.classList.add(
        "hidden"
    );


    dialogueSession++;


    stopCurrentTyping();


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        showCameraPermissionDenied();

        return;

    }


    try {

        const stream =
            await navigator.mediaDevices
                .getUserMedia(
                    {
                        video: true,
                        audio: false
                    }
                );


        cameraStream =
            stream;


        cameraVideo.srcObject =
            cameraStream;


        setTimeout(
            async () => {

                cameraContainer.classList.remove(
                    "hidden"
                );


                showConnectedDialogue();


                await startFaceTracking();


            },
            SETTINGS.cameraAppearDelay
        );


    } catch (error) {

        console.error(
            "Camera permission error:",
            error
        );


        showCameraPermissionDenied();

    }

}


/* =========================================
   CAMERA CONNECTED
   ========================================= */

function showConnectedDialogue() {

    dialogueText.classList.remove(
        "hidden"
    );


    const connectedLines =
        DIALOGUE.cameraCall.connected.map(
            (line) => {

                return line.replaceAll(
                    "{name}",
                    playerName
                );

            }
        );


    playDialogue(
        connectedLines,
        startFriendlyCameraInteraction
    );

}


/* =========================================
   FRIENDLY CAMERA INTERACTION
   ========================================= */

function startFriendlyCameraInteraction() {

    playDialogue(
        DIALOGUE.cameraInteraction.wavePrompt,
        showWaveButton
    );

}


/* =========================================
   SHOW WAVE BUTTON
   ========================================= */

/* =========================================
   SHOW WAVE BUTTON
   ========================================= */

/* =========================================
   SHOW WAVE BUTTON
   ========================================= */

/* =========================================
   SHOW WAVE PHASE
   ========================================= */

function showWaveButton() {

    console.log(
        "WAVE PHASE ACTIVE"
    );


    /* =====================================
       SHOW INTERACTION CONTAINER
       ===================================== */

    cameraInteractionContainer.classList.remove(
        "hidden"
    );

    cameraInteractionContainer.style.display =
        "";


    /* =====================================
       WAVE BUTTON
       ===================================== */

    waveButton.classList.remove(
        "hidden"
    );

    waveButton.style.display =
        "none";


    /* =====================================
       SMILE BUTTON
       ===================================== */

    smileButton.classList.add(
        "hidden"
    );

    smileButton.style.display =
        "none";


    /* =====================================
       ENABLE AUTOMATIC WAVE DETECTION
       ===================================== */

    handWaveDetectionEnabled =
        true;

    handWaveTriggered =
        false;

    resetHandWaveTracking();


    console.log(
        "Automatic hand-wave detection is active."
    );


    /* =====================================
       MANUAL FALLBACK
       ===================================== */

    waveButton.onclick =
        handleWaveInteraction;

}

/* =========================================
   WAVE INTERACTION
   ========================================= */

function handleWaveInteraction() {

    /* =====================================
       STOP AUTOMATIC WAVE DETECTION
       ===================================== */

    handWaveDetectionEnabled =
        false;


    /* =====================================
       HIDE INTERACTION CONTAINER
       ===================================== */

    cameraInteractionContainer.classList.add(
        "hidden"
    );


    /* =====================================
       FORCE HIDE WAVE BUTTON
       ===================================== */

    waveButton.classList.add(
        "hidden"
    );

    waveButton.style.display =
        "none";


    /* =====================================
       FORCE HIDE SMILE BUTTON
       ===================================== */

    smileButton.classList.add(
        "hidden"
    );

    smileButton.style.display =
        "none";


    /* =====================================
       CONTINUE DIALOGUE
       ===================================== */

    playDialogue(
        DIALOGUE.cameraInteraction.waveResponse,
        askForSmile
    );

}

/* =========================================
   ASK FOR SMILE
   ========================================= */

function askForSmile() {

    /* =====================================
       STOP WAVE DETECTION
       ===================================== */

    handWaveDetectionEnabled =
        false;


    /* =====================================
       ENABLE SMILE DETECTION
       ===================================== */

    smileDetectionEnabled =
        true;

    smileResponseTriggered =
        false;

    smileStartedAt =
        0;

    currentSmileValue =
        0;


    /* =====================================
       KEEP BUTTONS HIDDEN WHILE
       SMILE PROMPT IS BEING SPOKEN
       ===================================== */

    cameraInteractionContainer.classList.add(
        "hidden"
    );


    waveButton.classList.add(
        "hidden"
    );

    waveButton.style.display =
        "none";


    smileButton.classList.add(
        "hidden"
    );

    smileButton.style.display =
        "none";


    /* =====================================
       SHOW SMILE PROMPT
       ===================================== */

    playDialogue(
        DIALOGUE.cameraInteraction.smilePrompt,
        beginAutomaticSmileDetection
    );

}

/* =========================================
   BEGIN AUTOMATIC SMILE DETECTION
   ========================================= */

function beginAutomaticSmileDetection() {

    cameraInteractionContainer.classList.add(
        "hidden"
    );


    console.log(
        "Automatic smile detection is active."
    );

}


/* =========================================
   REAL SMILE DETECTION
   ========================================= */

function processSmileDetection(
    result,
    timestamp
) {

    if (
        !smileDetectionEnabled ||
        smileResponseTriggered
    ) {

        return;

    }


    if (
        !result ||
        !result.faceBlendshapes ||
        !result.faceBlendshapes.length
    ) {

        currentSmileValue =
            0;

        smileStartedAt =
            0;

        return;

    }


    const categories =
        result.faceBlendshapes[0].categories;


    const leftSmile =
        getBlendshapeValue(
            categories,
            "mouthSmileLeft"
        );


    const rightSmile =
        getBlendshapeValue(
            categories,
            "mouthSmileRight"
        );


    currentSmileValue =
        Math.max(
            leftSmile,
            rightSmile
        );


    if (
        currentSmileValue >=
        SMILE_THRESHOLD
    ) {

        if (
            smileStartedAt ===
            0
        ) {

            smileStartedAt =
                timestamp;

        }


        if (
            timestamp -
            smileStartedAt >=
            SMILE_HOLD_TIME
        ) {

            triggerDetectedSmile();

        }

    } else {

        smileStartedAt =
            0;

    }

}

/* =========================================
   GET BLENDSHAPE VALUE
   ========================================= */

function getBlendshapeValue(
    categories,
    categoryName
) {

    const category =
        categories.find(
            (item) => {

                return (
                    item.categoryName ===
                    categoryName
                );

            }
        );


    if (!category) {

        return 0;

    }


    return category.score || 0;

}

/* =========================================
   TRIGGER DETECTED SMILE
   ========================================= */

function triggerDetectedSmile() {

    if (
        smileResponseTriggered
    ) {

        return;

    }


    smileResponseTriggered =
        true;

    smileDetectionEnabled =
        false;

    smileStartedAt =
        0;


    console.log(
        "SMILE DETECTED"
    );


    cameraInteractionContainer.classList.add(
        "hidden"
    );


    playDialogue(
        DIALOGUE.cameraInteraction.smileResponse,
        finishCameraStage
    );

}


/* =========================================
   FACE POSITION DETECTION
   ========================================= */

function calculateFacePosition(
    landmarks
) {

    if (
        !landmarks ||
        landmarks.length === 0
    ) {

        return null;

    }


    let minX = 1;

    let maxX = 0;

    let minY = 1;

    let maxY = 0;


    for (
        const landmark of landmarks
    ) {

        if (
            landmark.x < minX
        ) {

            minX =
                landmark.x;

        }


        if (
            landmark.x > maxX
        ) {

            maxX =
                landmark.x;

        }


        if (
            landmark.y < minY
        ) {

            minY =
                landmark.y;

        }


        if (
            landmark.y > maxY
        ) {

            maxY =
                landmark.y;

        }

    }


    const width =
        maxX -
        minX;


    const height =
        maxY -
        minY;


    const centerX =
        (minX + maxX) / 2;


    const centerY =
        (minY + maxY) / 2;


    facePosition = {

        x: centerX,

        y: centerY,

        width: width,

        height: height,

        centerX: centerX,

        centerY: centerY

    };


    return facePosition;

}


/* =========================================
   FACE POSITION DEBUG
   ========================================= */

function updateFacePositionDebug(
    position
) {

    if (
        !position
    ) {

        if (
            facePositionDebugElement
        ) {

            facePositionDebugElement.textContent =
                "FACE POSITION: --";

        }


        if (
            headMovementDebugElement
        ) {

            headMovementDebugElement.innerHTML =
                "HEAD MOVEMENT: --";

        }

        return;

    }


    /*
        Create the face-position panel
        only once.
    */

    if (
        !facePositionDebugElement
    ) {

        facePositionDebugElement =
            document.createElement(
                "div"
            );


        facePositionDebugElement.id =
            "face-position-debug";


        facePositionDebugElement.style.position =
            "fixed";

        facePositionDebugElement.style.left =
            "50%";

        facePositionDebugElement.style.bottom =
            "80px";

        facePositionDebugElement.style.zIndex =
            "40";

        facePositionDebugElement.style.transform =
            "translateX(-50%)";

        facePositionDebugElement.style.padding =
            "6px 10px";

        facePositionDebugElement.style.borderRadius =
            "10px";

        facePositionDebugElement.style.background =
            "rgba(0, 0, 0, 0.55)";

        facePositionDebugElement.style.color =
            "#ffffff";

        facePositionDebugElement.style.fontFamily =
            "monospace";

        facePositionDebugElement.style.fontSize =
            "10px";

        facePositionDebugElement.style.lineHeight =
            "1.5";

        facePositionDebugElement.style.whiteSpace =
            "nowrap";

        facePositionDebugElement.style.pointerEvents =
            "none";


        document.body.appendChild(
            facePositionDebugElement
        );

    }


    facePositionDebugElement.textContent =
        `FACE POSITION   ` +
        `X: ${position.centerX.toFixed(2)}   ` +
        `Y: ${position.centerY.toFixed(2)}   ` +
        `W: ${position.width.toFixed(2)}   ` +
        `H: ${position.height.toFixed(2)}`;


    updateHeadMovementDebug(
        headMovement
    );

}


/* =========================================
   HEAD MOVEMENT CALCULATION
   ========================================= */

function calculateHeadMovement(
    landmarks
) {

    if (
        !landmarks ||
        landmarks.length === 0
    ) {

        return null;

    }


    const nose =
        landmarks[1];

    const leftEyeOuter =
        landmarks[33];

    const rightEyeOuter =
        landmarks[263];

    const forehead =
        landmarks[10];

    const chin =
        landmarks[152];


    if (
        !nose ||
        !leftEyeOuter ||
        !rightEyeOuter ||
        !forehead ||
        !chin
    ) {

        return null;

    }


    /* =====================================
       YAW
       ===================================== */

    const eyeMidpointX =
        (
            leftEyeOuter.x +
            rightEyeOuter.x
        ) / 2;


    const eyeDistanceX =
        Math.abs(
            rightEyeOuter.x -
            leftEyeOuter.x
        );


    let yaw =
        0;


    if (
        eyeDistanceX > 0
    ) {

        yaw =
            (
                nose.x -
                eyeMidpointX
            ) /
            eyeDistanceX;

    }


    /* =====================================
       PITCH
       ===================================== */

    const faceHeight =
        Math.abs(
            chin.y -
            forehead.y
        );


    const verticalMidpoint =
        (
            forehead.y +
            chin.y
        ) / 2;


    let pitch =
        0;


    if (
        faceHeight > 0
    ) {

        pitch =
            (
                nose.y -
                verticalMidpoint
            ) /
            faceHeight;

    }


    /* =====================================
       ROLL
       ===================================== */

    const deltaX =
        rightEyeOuter.x -
        leftEyeOuter.x;


    const deltaY =
        rightEyeOuter.y -
        leftEyeOuter.y;


    let roll =
        0;


    if (
        deltaX !== 0
    ) {

        roll =
            Math.atan2(
                deltaY,
                deltaX
            ) *
            (
                180 /
                Math.PI
            );

    }


    /* =====================================
       DIRECTION
       ===================================== */

    let direction =
        "CENTER";


    /* =====================================
       HEAD TURN — YAW
       ===================================== */

    if (
        Math.abs(yaw) >
        HEAD_YAW_THRESHOLD
    ) {

        if (
            yaw > 0
        ) {

            direction =
                "TURN LEFT";

        } else {

            direction =
                "TURN RIGHT";

        }

    }


    /* =====================================
       LOOK UP / DOWN — PITCH
       ===================================== */

    if (
        Math.abs(pitch) >
        HEAD_PITCH_THRESHOLD
    ) {

        if (
            pitch > 0
        ) {

            direction =
                "LOOK DOWN";

        } else {

            direction =
                "LOOK UP";

        }

    }


    /* =====================================
       HEAD TILT — ROLL
       ===================================== */

    if (
        Math.abs(roll) >
        HEAD_ROLL_THRESHOLD
    ) {

        if (
            roll > 0
        ) {

            direction =
                "TILT RIGHT";

        } else {

            direction =
                "TILT LEFT";

        }

    }

    /* =====================================
       SAVE HEAD MOVEMENT
       ===================================== */

    headMovement = {

        yaw: yaw,

        pitch: pitch,

        roll: roll,

        direction: direction

    };


    return headMovement;

}


/* =========================================
   HEAD MOVEMENT DEBUG DISPLAY
   ========================================= */

function updateHeadMovementDebug(
    movement
) {

    if (
        !movement
    ) {

        return;

    }


    /*
        Create the head-movement panel
        only once.

        It is intentionally positioned
        ABOVE the face-position panel
        so the two never overlap.
    */

    if (
        !headMovementDebugElement
    ) {

        headMovementDebugElement =
            document.createElement(
                "div"
            );


        headMovementDebugElement.id =
            "head-movement-debug";


        headMovementDebugElement.style.position =
            "fixed";

        headMovementDebugElement.style.left =
            "50%";

        headMovementDebugElement.style.bottom =
            "34px";

        headMovementDebugElement.style.zIndex =
            "40";

        headMovementDebugElement.style.transform =
            "translateX(-50%)";

        headMovementDebugElement.style.padding =
            "6px 10px";

        headMovementDebugElement.style.borderRadius =
            "10px";

        headMovementDebugElement.style.background =
            "rgba(0, 0, 0, 0.55)";

        headMovementDebugElement.style.color =
            "#ffffff";

        headMovementDebugElement.style.fontFamily =
            "monospace";

        headMovementDebugElement.style.fontSize =
            "10px";

        headMovementDebugElement.style.lineHeight =
            "1.5";

        headMovementDebugElement.style.whiteSpace =
            "nowrap";

        headMovementDebugElement.style.pointerEvents =
            "none";


        document.body.appendChild(
            headMovementDebugElement
        );

    }


    headMovementDebugElement.innerHTML =
        `HEAD MOVEMENT   ` +
        `DIR: ${movement.direction}   ` +
        `YAW: ${movement.yaw.toFixed(2)}   ` +
        `PITCH: ${movement.pitch.toFixed(2)}   ` +
        `ROLL: ${movement.roll.toFixed(1)}°`;

}

/* =========================================
   FACIAL LANDMARK CANVAS
   ========================================= */

function createFaceLandmarkCanvas() {

    if (faceLandmarkCanvas) {
        return;
    }

    faceLandmarkCanvas =
        document.createElement("canvas");


    faceLandmarkCanvas.id =
        "face-landmark-canvas";


    /*
        Canvas sits directly above the
        existing camera video.
    */

    faceLandmarkCanvas.style.position =
        "absolute";

    faceLandmarkCanvas.style.left =
        "0";

    faceLandmarkCanvas.style.top =
        "0";

    faceLandmarkCanvas.style.width =
        "100%";

    faceLandmarkCanvas.style.height =
        "100%";

    faceLandmarkCanvas.style.pointerEvents =
        "none";

    faceLandmarkCanvas.style.zIndex =
        "2";


    cameraContainer.appendChild(
        faceLandmarkCanvas
    );


    faceLandmarkContext =
        faceLandmarkCanvas.getContext(
            "2d"
        );


    resizeFaceLandmarkCanvas();


    console.log(
        "LANDMARK CANVAS: INSIDE CAMERA"
    );

}

/* =========================================
   KEEP LANDMARK CANVAS IN SYNC WITH CAMERA
   ========================================= */

const faceLandmarkResizeObserver =
    new ResizeObserver(() => {

        resizeFaceLandmarkCanvas();

    });

faceLandmarkResizeObserver.observe(
    cameraContainer
);

/* =========================================
   RESIZE LANDMARK CANVAS
   ========================================= */

function resizeFaceLandmarkCanvas() {

    if (
        !faceLandmarkCanvas ||
        !faceLandmarkContext
    ) {
        return;
    }


    const width =
        cameraContainer.clientWidth;

    const height =
        cameraContainer.clientHeight;


    const pixelRatio =
        window.devicePixelRatio || 1;


    faceLandmarkCanvas.width =
        Math.round(
            width *
            pixelRatio
        );


    faceLandmarkCanvas.height =
        Math.round(
            height *
            pixelRatio
        );


    faceLandmarkContext.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
 );

}

function getCameraDisplayTransform() {

    const video =
        document.getElementById("camera-video");

    if (
        !video ||
        !video.videoWidth ||
        !video.videoHeight
    ) {
        return null;
    }

    const rect =
        video.getBoundingClientRect();

    const displayWidth =
        rect.width;

    const displayHeight =
        rect.height;

    const sourceWidth =
        video.videoWidth;

    const sourceHeight =
        video.videoHeight;

    if (
        !displayWidth ||
        !displayHeight
    ) {
        return null;
    }

    const sourceAspect =
        sourceWidth /
        sourceHeight;

    const displayAspect =
        displayWidth /
        displayHeight;

    let scale;

    if (
        sourceAspect >
        displayAspect
    ) {
        scale =
            displayHeight /
            sourceHeight;
    } else {
        scale =
            displayWidth /
            sourceWidth;
    }

    const displayedWidth =
        sourceWidth *
        scale;

    const displayedHeight =
        sourceHeight *
        scale;

    const cropX =
        (
            displayedWidth -
            displayWidth
        ) / 2;

    const cropY =
        (
            displayedHeight -
            displayHeight
        ) / 2;

    return {
        containerWidth: displayWidth,
        containerHeight: displayHeight,

        displayedWidth,
        displayedHeight,

        cropX,
        cropY,

        sourceWidth,
        sourceHeight
    };
}

function landmarkToScreen(
    landmark,
    transform
) {

    if (
        !landmark ||
        !transform
    ) {
        return null;
    }

    /*
        EXACT SAME COORDINATE PIPELINE
        AS THE WORKING WHITE-DOT MASK.
    */

    const sourceX =
        (1 - landmark.x) *
        transform.sourceWidth;

    const sourceY =
        landmark.y *
        transform.sourceHeight;

    const screenX =
        (
            sourceX *
            (
                transform.displayedWidth /
                transform.sourceWidth
            )
        ) -
        transform.cropX;

    const screenY =
        (
            sourceY *
            (
                transform.displayedHeight /
                transform.sourceHeight
            )
        ) -
        transform.cropY;

    return {
        x: screenX,
        y: screenY
    };
}

function drawFaceLandmarks(
    landmarks
) {

    if (
        !faceLandmarkCanvas ||
        !faceLandmarkContext ||
        !landmarks
    ) {
        return;
    }


    /* =====================================
       GET ACTUAL CANVAS DISPLAY SIZE
       ===================================== */

    const rect =
        faceLandmarkCanvas.getBoundingClientRect();


    const width =
        Math.round(rect.width);

    const height =
        Math.round(rect.height);


    if (
        width <= 0 ||
        height <= 0
    ) {
        return;
    }


    /* =====================================
       FORCE CANVAS INTERNAL SIZE TO MATCH
       ITS ACTUAL CSS SIZE
       ===================================== */

    const dpr =
        window.devicePixelRatio || 1;


    const requiredWidth =
        Math.round(
            width * dpr
        );

    const requiredHeight =
        Math.round(
            height * dpr
        );


    if (
        faceLandmarkCanvas.width !==
            requiredWidth ||
        faceLandmarkCanvas.height !==
            requiredHeight
    ) {

        faceLandmarkCanvas.width =
            requiredWidth;

        faceLandmarkCanvas.height =
            requiredHeight;
    }


    const ctx =
        faceLandmarkContext;


    /* =====================================
       RESET CONTEXT COMPLETELY
       ===================================== */

    ctx.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
    );


    ctx.clearRect(
        0,
        0,
        faceLandmarkCanvas.width,
        faceLandmarkCanvas.height
    );


    /*
        From this point onward all drawing
        coordinates are CSS/display pixels.
    */

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    ctx.globalAlpha =
        1;

    ctx.globalCompositeOperation =
        "source-over";


    /* =====================================
       GET CAMERA DISPLAY TRANSFORM
       ===================================== */

    const transform =
        getCameraDisplayTransform();


    if (!transform) {
        return;
    }


    /* =====================================
       DRAW ALL 478 LANDMARKS
       ===================================== */

    /* for (
        const landmark of landmarks
    ) {

        const point =
            landmarkToScreen(
                landmark,
                transform
            );


        if (!point) {
            continue;
        }


        if (
            point.x < -5 ||
            point.x > width + 5 ||
            point.y < -5 ||
            point.y > height + 5
        ) {
            continue;
        }


        ctx.beginPath();


        ctx.arc(
            point.x,
            point.y,
            2,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "rgba(255,255,255,0.95)";


        ctx.fill();
    }
 */

    /* =====================================
       IMPORTANT FACIAL LANDMARKS
       ===================================== */

/*     drawImportantLandmark(
        landmarks[1],
        transform,
        5
    );


    drawImportantLandmark(
        landmarks[33],
        transform,
        4
    );


    drawImportantLandmark(
        landmarks[263],
        transform,
        4
    );


    drawImportantLandmark(
        landmarks[61],
        transform,
        4
    );


    drawImportantLandmark(
        landmarks[291],
        transform,
        4
    );


    drawImportantLandmark(
        landmarks[152],
        transform,
        4
    ); */
}

function drawImportantLandmark(
    landmark,
    transform,
    radius
) {

    const point =
        landmarkToScreen(
            landmark,
            transform
        );

    if (!point) {
        return;
    }

    if (
        point.x < -10 ||
        point.x > transform.containerWidth + 10 ||
        point.y < -10 ||
        point.y > transform.containerHeight + 10
    ) {
        return;
    }

    faceLandmarkContext.beginPath();

    faceLandmarkContext.arc(
        point.x,
        point.y,
        radius,
        0,
        Math.PI * 2
    );

    faceLandmarkContext.fillStyle =
        "rgba(255,80,80,0.95)";

    faceLandmarkContext.fill();
}

/* =========================================
   FACE TRACKING
   ========================================= */

async function initializeFaceLandmarker() {

    if (faceTrackingReady) {

        return true;

    }


    setFaceTrackingStatus(
        "LOADING FACE TRACKER...",
        "loading"
    );


    try {

        console.log(
            "Loading MediaPipe Face Landmarker..."
        );


        const vision =
            await import(
                "../../vendor/mediapipe-tasks-vision-0.10.22/vision_bundle.mjs"
            );


        const {
            FaceLandmarker,
            HandLandmarker,
            FilesetResolver
        } = vision;


        console.log(
            "MediaPipe library loaded."
        );


        const fileset =
            await FilesetResolver.forVisionTasks(
                MEDIAPIPE_WASM_PATH
            );


        console.log(
            "MediaPipe WASM loaded."
        );


        faceLandmarker =
            await FaceLandmarker.createFromOptions(
                fileset,
                {

                    baseOptions: {

                        modelAssetPath:
                            FACE_LANDMARKER_MODEL_PATH

                    },

                    runningMode:
                        "VIDEO",

                    numFaces:
                        1,

                    minFaceDetectionConfidence:
                        0.5,

                    minFacePresenceConfidence:
                        0.5,

                    minTrackingConfidence:
                        0.5,

                    outputFaceBlendshapes:
                        true,

                    outputFacialTransformationMatrixes:
                        true

                }
            );


        faceTrackingReady =
            true;


        setFaceTrackingStatus(
            "FACE TRACKER READY",
            "ready"
        );


        console.log(
            "MediaPipe Face Landmarker ready."
        );

        /* =========================================
   INITIALIZE HAND LANDMARKER
   ========================================= */

handLandmarker =
    await HandLandmarker.createFromOptions(
        fileset,
        {
            baseOptions: {
                modelAssetPath:
                    HAND_LANDMARKER_MODEL_PATH
            },

            runningMode:
                "VIDEO",

            numHands:
                1,

            minHandDetectionConfidence:
                0.5,

            minHandPresenceConfidence:
                0.5,

            minTrackingConfidence:
                0.5
        }
    );

handTrackingReady =
    true;

console.log(
    "MediaPipe Hand Landmarker ready."
);


        return true;


    } catch (error) {

        console.error(
            "Face Landmarker initialization error:",
            error
        );


        setFaceTrackingStatus(
            "FACE TRACKER ERROR",
            "error"
        );


        return false;

    }

}


/* =========================================
   START FACE TRACKING
   ========================================= */

async function startFaceTracking() {

    console.log(
        "Starting face tracking..."
    );


    /* =========================================
       CREATE V4 LANDMARK CANVAS
       ========================================= */

    createFaceLandmarkCanvas();


    /* =========================================
       PREVENT DUPLICATE TRACKING
       ========================================= */

    if (
        faceTrackingRunning
    ) {

        console.log(
            "Face tracking is already running."
        );

        return;

    }


    /* =========================================
       WAIT FOR CAMERA
       ========================================= */

    if (
        cameraVideo.readyState <
        HTMLMediaElement.HAVE_CURRENT_DATA
    ) {

        console.log(
            "Waiting for camera video..."
        );


        await waitForVideoReady();

    }


    /* =========================================
       INITIALIZE MEDIAPIPE
       ========================================= */

    const ready =
        await initializeFaceLandmarker();
    if (!ready) {

        console.error(
            "Face Landmarker initialization failed."
        );

        return;

    }


    /* =========================================
       START TRACKING
       ========================================= */

    faceTrackingRunning =
        true;


    setFaceTrackingStatus(
        "NO FACE DETECTED",
        "no-face"
    );


    faceTrackingFrameID =
        requestAnimationFrame(
            processFaceFrame
        );


    console.log(
        "Face tracking started."
    );


    /* =========================================
       START FACE REPLICA
       ========================================= */

    if (
        typeof updateFaceReplica ===
        "function"
    ) {

        console.log(
            "STARTING FACE REPLICA"
        );


        updateFaceReplica();

    }


    /* =========================================
       START REAL FACE MASK
       ========================================= */

    if (
        typeof updateRealFaceMask ===
        "function"
    ) {

        console.log(
            "STARTING REAL FACE MASK"
        );

        /*
         * Start the mask render loop.
         *
         * The previous version only logged this
         * message and never actually started the
         * mask loop.
         */
        updateRealFaceMask();

    }

}

/* =========================================
   WAIT FOR VIDEO
   ========================================= */

function waitForVideoReady() {

    return new Promise(
        (resolve) => {

            if (
                cameraVideo.readyState >=
                HTMLMediaElement.HAVE_CURRENT_DATA
            ) {

                resolve();

                return;

            }


            cameraVideo.addEventListener(
                "loadeddata",
                () => {

                    resolve();

                },
                {
                    once: true
                }
            );

        }
    );

}


/* =========================================
   PROCESS CAMERA FRAME
   ========================================= */

function processFaceFrame(
    timestamp
) {

    if (
        !faceTrackingRunning ||
        !faceLandmarker
    ) {

        return;

    }


    if (
        cameraVideo.readyState <
        HTMLMediaElement.HAVE_CURRENT_DATA
    ) {

        faceTrackingFrameID =
            requestAnimationFrame(
                processFaceFrame
            );

        return;

    }


    try {

        const result =
            faceLandmarker.detectForVideo(
                cameraVideo,
                timestamp
            );

    /* =========================================
       HAND DETECTION
       ========================================= */

let handResult = null;

if (
    handLandmarker &&
    handTrackingReady
) {

    handResult =
        handLandmarker.detectForVideo(
            cameraVideo,
            timestamp
        );

    processHandWaveDetection(
        handResult,
        timestamp
    );
}        


        const faceFound =
            result &&
            result.faceLandmarks &&
            result.faceLandmarks.length > 0;


        if (faceFound) {

            setFaceTrackingStatus(
                "FACE DETECTED",
                "face-found"
            );


            lastFaceDetectionTime =
                timestamp;


            const landmarks =
                result.faceLandmarks[0];

            window.evilReplicaCurrentLandmarks = landmarks;

            window.evilReplicaLandmarkCount = landmarks.length;

            window.evilReplicaFaceDetected = true;

            window.evilReplicaLandmarkTimestamp = timestamp;

            drawFaceLandmarks(
                landmarks
            );


            /*
                STEP 3:
                Face position.
            */

            const position =
                calculateFacePosition(
                    landmarks
                );


            updateFacePositionDebug(
                position
            );


            /*
                STEP 4:
                Head movement.
            */

const movement =
    calculateHeadMovement(
        landmarks
    );


updateHeadMovementDebug(
    movement
);


/*
    REPLICA MOVEMENT

    The replica currently follows
    the player's head continuously.
*/

/* updateReplicaMovement({

   detected: true,

   position: position,

   head: movement,

   smile: currentSmileValue

}); */

            /*
                Smile detection.
            */

            processSmileDetection(
                result,
                timestamp
            );

        } else {

            window.evilReplicaCurrentLandmarks = null;
            window.evilReplicaLandmarkCount = 0;
            window.evilReplicaFaceDetected = false;

            setFaceTrackingStatus(
                "NO FACE DETECTED",
                "no-face"
            );


            updateFacePositionDebug(
                null
            );


            updateHeadMovementDebug(
                null
            );


            processSmileDetection(
                null,
                timestamp
            );

        }


    } catch (error) {

        console.error(
            "Face tracking frame error:",
            error
        );


        setFaceTrackingStatus(
            "FACE TRACKER ERROR",
            "error"
        );

    }


    faceTrackingFrameID =
        requestAnimationFrame(
            processFaceFrame
        );

}

/* =========================================
   HAND WAVE DETECTION
   ========================================= */

function processHandWaveDetection(
    result,
    timestamp
) {

    if (
        !handWaveDetectionEnabled ||
        handWaveTriggered
    ) {
        return;
    }


    /* =====================================
       NO HAND
       ===================================== */

    if (
        !result ||
        !result.landmarks ||
        result.landmarks.length === 0
    ) {
        return;
    }


    /* =====================================
       GET FIRST HAND
       ===================================== */

    const landmarks =
        result.landmarks[0];


    if (
        !landmarks ||
        !landmarks.length
    ) {
        return;
    }


    console.log(
        "HAND LANDMARKS RECEIVED:",
        result.landmarks.length
    );


    /* =====================================
       WRIST
       ===================================== */

    const wrist =
        landmarks[0];


    if (
        !wrist ||
        typeof wrist.x !== "number"
    ) {
        return;
    }


    const currentX =
        wrist.x;


    /* =====================================
       START TRACKING
       ===================================== */

    if (
        handWavePreviousX === null
    ) {

        handWavePreviousX =
            currentX;

        handWaveStartedAt =
            timestamp;

        handWaveMinX =
            currentX;

        handWaveMaxX =
            currentX;

        handWaveDirection =
            0;

        handWaveDirectionChanges =
            0;

        console.log(
            "WAVE TRACKING STARTED"
        );

        return;
    }


    /* =====================================
       CALCULATE MOVEMENT
       ===================================== */

    const deltaX =
        currentX -
        handWavePreviousX;


    console.log(
        "HAND:",
        "x =", currentX.toFixed(3),
        "previous =", handWavePreviousX.toFixed(3),
        "delta =", deltaX.toFixed(3)
    );


    /* =====================================
       UPDATE EXTREMES
       ===================================== */

    handWaveMinX =
        Math.min(
            handWaveMinX,
            currentX
        );

    handWaveMaxX =
        Math.max(
            handWaveMaxX,
            currentX
        );


    /* =====================================
       WAVE MOVEMENT THRESHOLD
       ===================================== */

    const MIN_WAVE_MOVEMENT =
        0.025;


    /* =====================================
       ONLY PROCESS REAL MOVEMENT
       ===================================== */

    if (
        Math.abs(deltaX) >=
        MIN_WAVE_MOVEMENT
    ) {

        const direction =
            deltaX > 0
                ? 1
                : -1;


        /* =================================
           FIRST REAL MOVEMENT
           ================================= */

        if (
            handWaveDirection === 0
        ) {

            handWaveDirection =
                direction;

            console.log(
                "WAVE START:",
                "direction =",
                direction
            );

        }


        /* =================================
           DIRECTION CHANGE
           ================================= */

        else if (
            direction !==
            handWaveDirection
        ) {

            handWaveDirectionChanges++;


            console.log(
                "WAVE DIRECTION CHANGE:",
                handWaveDirectionChanges,
                "direction =",
                direction,
                "deltaX =",
                deltaX.toFixed(3)
            );


            handWaveDirection =
                direction;


            /* =============================
               IMMEDIATE WAVE CONFIRMATION
               ============================= */

if (
    handWaveDirectionChanges >=
    2
) {

    const span =
        handWaveMaxX -
        handWaveMinX;


    if (
        span >=
        0.035
    ) {

        console.log(
            "👋 HAND WAVE CONFIRMED"
        );


        confirmHandWave(
            timestamp
        );


        return;
    }
}

        }

    }


    /* =====================================
       UPDATE PREVIOUS POSITION
       ===================================== */

    handWavePreviousX =
        currentX;


    /* =====================================
       WAVE SPAN
       ===================================== */

    const span =
        handWaveMaxX -
        handWaveMinX;


    /* =====================================
       WAVE DURATION
       ===================================== */

    const duration =
        timestamp -
        handWaveStartedAt;


    console.log(
        "WAVE STATE:",
        "span =",
        span.toFixed(3),
        "directionChanges =",
        handWaveDirectionChanges,
        "duration =",
        duration
    );


    /* =====================================
       TIMEOUT
       ===================================== */

    if (
        duration >
        HAND_WAVE_MAX_DURATION
    ) {

        console.log(
            "WAVE TIMEOUT — RESETTING"
        );


        resetHandWaveTracking();


        handWavePreviousX =
            currentX;

        handWaveStartedAt =
            timestamp;

        handWaveMinX =
            currentX;

        handWaveMaxX =
            currentX;
    }

}

/* =========================================
   CONFIRM HAND WAVE
   ========================================= */

function confirmHandWave(
    timestamp
) {

    if (
        timestamp -
            handWaveLastTime <
        HAND_WAVE_COOLDOWN
    ) {
        return;
    }


  handWaveTriggered =
    true;

handWaveLastTime =
    timestamp;

/* =====================================
   STOP WAVE DETECTION
   ===================================== */

handWaveDetectionEnabled =
    false;


resetHandWaveTracking();


/* =====================================
   TRIGGER EXISTING WAVE RESPONSE
   ===================================== */

handleWaveInteraction();

}

/* =========================================
   RESET HAND WAVE TRACKING
   ========================================= */

function resetHandWaveTracking() {

    handWaveDirection =
        0;

    handWaveDirectionChanges =
        0;

    handWaveStartedAt =
        0;

    handWavePreviousX =
        null;

    handWaveMinX =
        1;

    handWaveMaxX =
        0;
}

/* =========================================
   FACE TRACKING STATUS
   ========================================= */

function setFaceTrackingStatus(
    message,
    state
) {

    if (
        !faceTrackingStatus ||
        !faceStatusText
    ) {

        return;

    }


    faceTrackingStatus.classList.remove(
        "face-found",
        "no-face",
        "error"
    );


    faceStatusText.textContent =
        message;


    if (
        state ===
        "face-found"
    ) {

        faceTrackingStatus.classList.add(
            "face-found"
        );

    }


    if (
        state ===
        "no-face"
    ) {

        faceTrackingStatus.classList.add(
            "no-face"
        );

    }


    if (
        state ===
        "error"
    ) {

        faceTrackingStatus.classList.add(
            "error"
        );

    }


    faceTrackingStatus.classList.remove(
        "hidden"
    );

}


/* =========================================
   STOP FACE TRACKING
   ========================================= */

function stopFaceTracking() {

    faceTrackingRunning =
        false;


    smileDetectionEnabled =
        false;


    if (
        faceTrackingFrameID !==
        null
    ) {

        cancelAnimationFrame(
            faceTrackingFrameID
        );

        faceTrackingFrameID =
            null;

    }


    if (
        facePositionDebugElement
    ) {

        facePositionDebugElement.remove();

        facePositionDebugElement =
            null;

    }


    if (
        headMovementDebugElement
    ) {

        headMovementDebugElement.remove();

        headMovementDebugElement =
            null;

    }

    if (
    faceLandmarkCanvas
) {

    faceLandmarkCanvas.remove();

    faceLandmarkCanvas =
        null;

    faceLandmarkContext =
        null;

}


window.removeEventListener(
    "resize",
    resizeFaceLandmarkCanvas
);

}


/* =========================================
   CAMERA PERMISSION DENIED
   ========================================= */

function showCameraPermissionDenied() {

    stopFaceTracking();


    cameraContainer.classList.add(
        "hidden"
    );


    cameraInteractionContainer.classList.add(
        "hidden"
    );


    faceTrackingStatus.classList.add(
        "hidden"
    );


    dialogueText.classList.remove(
        "hidden"
    );


    playDialogue(
        DIALOGUE.cameraCall.permissionDenied,
        finishVersion
    );

}


/* =========================================
   DECLINE VIDEO CALL
   ========================================= */

declineCallButton.addEventListener(
    "click",
    handleDeclineCall
);


function handleDeclineCall() {

    stopFaceTracking();


    videoCallContainer.classList.add(
        "hidden"
    );


    cameraInteractionContainer.classList.add(
        "hidden"
    );


    faceTrackingStatus.classList.add(
        "hidden"
    );


    dialogueText.classList.remove(
        "hidden"
    );


    playDialogue(
        DIALOGUE.cameraCall.declined,
        finishVersion
    );

}


/* =========================================
   CAMERA STAGE COMPLETE
   ========================================= */

function finishCameraStage() {

    smileDetectionEnabled =
        false;


    console.log(
        "v0.4.0 friendly camera interaction completed."
    );

}


/* =========================================
   END OF PROTOTYPE
   ========================================= */

function finishVersion() {

    typeDialogue(
        "We'll meet here soon.",
        () => {

            console.log(
                "Current prototype complete."
            );

        }
    );

}

/* =========================================
   UPDATE REPLICA MOVEMENT
   ========================================= */

/* =========================================
   STEP 4A — REPLICA HEAD MOVEMENT
   ========================================= */

function updateReplicaMovement(faceData) {

    if (
        !faceData ||
        !faceData.detected ||
        !faceData.position ||
        !faceData.head
    ) {
        return;
    }


    const replica =
        document.getElementById("replica");

    if (!replica) {
        return;
    }


    /* =====================================
       FACE POSITION
       ===================================== */

    const faceX =
        faceData.position.centerX;

    const faceY =
        faceData.position.centerY;


    /* =====================================
       NORMALIZED FACE OFFSET
       ===================================== */

    const offsetX =
        faceX - 0.5;

    const offsetY =
        faceY - 0.5;


    /* =====================================
       REPLICA RESPONSE
       ===================================== */

    const moveX =
        offsetX * 180;

    const moveY =
        offsetY * 120;


    /* =====================================
       HEAD TILT
       ===================================== */

    const roll =
        faceData.head.roll || 0;


    const replicaRoll =
        roll * 0.5;


    /* =====================================
       APPLY MOVEMENT
       ===================================== */

    replica.style.transform =
        `
        translate(
            calc(-50% + ${moveX}px),
            calc(-50% + ${moveY}px)
        )
        rotate(${replicaRoll}deg)
        `;

}

function checkLandmarkConnection() {

    const landmarks =
        window.evilReplicaCurrentLandmarks;

    console.log(
        "Evil Replica Landmark Connection:",
        landmarks
            ? landmarks.length + " landmarks"
            : "NO LANDMARKS"
    );
}

setInterval(
    checkLandmarkConnection,
    1000
);

/* =========================================================
   EVIL REPLICA — STEP 2
   FACE REGION TRACKING TEST
   ========================================================= */

function updateFaceRegionTest() {

    const video =
        document.querySelector("video");

    if (
        !video ||
        !faceRegionCtx
    ) {
        requestAnimationFrame(
            updateFaceRegionTest
        );

        return;
    }


    /* =====================================
       VIDEO DIMENSIONS
       ===================================== */

    const videoWidth =
        video.videoWidth;

    const videoHeight =
        video.videoHeight;


    if (
        !videoWidth ||
        !videoHeight
    ) {
        requestAnimationFrame(
            updateFaceRegionTest
        );

        return;
    }


    /* =====================================
       MATCH CANVAS TO VIDEO
       ===================================== */

    if (
        faceRegionCanvas.width !==
            videoWidth ||
        faceRegionCanvas.height !==
            videoHeight
    ) {

        faceRegionCanvas.width =
            videoWidth;

        faceRegionCanvas.height =
            videoHeight;
    }


    /* =====================================
       CLEAR
       ===================================== */

    faceRegionCtx.clearRect(
        0,
        0,
        faceRegionCanvas.width,
        faceRegionCanvas.height
    );


    /* =====================================
       GET LANDMARKS
       ===================================== */

    const landmarks =
        window.evilReplicaCurrentLandmarks;


    if (
        !landmarks ||
        landmarks.length !== 478
    ) {
        requestAnimationFrame(
            updateFaceRegionTest
        );

        return;
    }


    /* =====================================
       WHITE DOT MASK
       ===================================== */

    for (
        let i = 0;
        i < landmarks.length;
        i++
    ) {

        const landmark =
            landmarks[i];


        if (
            typeof landmark.x !==
                "number" ||
            typeof landmark.y !==
                "number"
        ) {
            continue;
        }


        /*
         * Mirror X because the camera
         * display is mirrored.
         */

        const x =
            (1 - landmark.x) *
            videoWidth;


        const y =
            landmark.y *
            videoHeight;


        faceRegionCtx.beginPath();


        faceRegionCtx.arc(
            x,
            y,
            2,
            0,
            Math.PI * 2
        );


        faceRegionCtx.fillStyle =
            "rgba(255,255,255,0.95)";


        faceRegionCtx.fill();
    }


    /* =====================================
       FIND FACE BOUNDARY
       ===================================== */

    let minX = 1;
    let minY = 1;
    let maxX = 0;
    let maxY = 0;


    for (
        let i = 0;
        i < landmarks.length;
        i++
    ) {

        const landmark =
            landmarks[i];


        if (
            typeof landmark.x !==
                "number" ||
            typeof landmark.y !==
                "number"
        ) {
            continue;
        }


        minX =
            Math.min(
                minX,
                landmark.x
            );

        minY =
            Math.min(
                minY,
                landmark.y
            );

        maxX =
            Math.max(
                maxX,
                landmark.x
            );

        maxY =
            Math.max(
                maxY,
                landmark.y
            );
    }


    /* =====================================
       MIRRORED FACE REGION
       ===================================== */

    const left =
        (1 - maxX) *
        videoWidth;

    const right =
        (1 - minX) *
        videoWidth;

    const top =
        minY *
        videoHeight;

    const bottom =
        maxY *
        videoHeight;


    const faceWidth =
        right - left;

    const faceHeight =
        bottom - top;


    /* =====================================
       FACE MARGIN
       ===================================== */

    const horizontalMargin =
        faceWidth * 0.08;

    const verticalMargin =
        faceHeight * 0.08;


    const faceLeft =
        Math.max(
            0,
            left -
                horizontalMargin
        );

    const faceTop =
        Math.max(
            0,
            top -
                verticalMargin
        );

    const faceRight =
        Math.min(
            videoWidth,
            right +
                horizontalMargin
        );

    const faceBottom =
        Math.min(
            videoHeight,
            bottom +
                verticalMargin
        );


    const finalWidth =
        faceRight -
        faceLeft;

    const finalHeight =
        faceBottom -
        faceTop;


    /* =====================================
       RED FACE REGION
       ===================================== */

    faceRegionCtx.save();


    faceRegionCtx.beginPath();


    const centerX =
        faceLeft +
        finalWidth / 2;

    const centerY =
        faceTop +
        finalHeight / 2;


    faceRegionCtx.ellipse(
        centerX,
        centerY,
        finalWidth * 0.50,
        finalHeight * 0.50,
        0,
        0,
        Math.PI * 2
    );


    faceRegionCtx.strokeStyle =
        "#ff0000";

    faceRegionCtx.lineWidth =
        5;


    faceRegionCtx.stroke();


    faceRegionCtx.restore();


    /* =====================================
       CONTINUE
       ===================================== */

    requestAnimationFrame(
        updateFaceRegionTest
    );
}

/* =========================================================
   EVIL REPLICA — STEP 3
   ACTUAL FACIAL LANDMARK VISUALIZATION
   ========================================================= */

function updateFaceRegionTest() {

    const video =
        document.querySelector("video");

    if (
        !video ||
        !faceRegionCtx
    ) {
        requestAnimationFrame(
            updateFaceRegionTest
        );

        return;
    }


    /* =====================================
       VIDEO DIMENSIONS
       ===================================== */

    const videoWidth =
        video.videoWidth;

    const videoHeight =
        video.videoHeight;


    if (
        !videoWidth ||
        !videoHeight
    ) {
        requestAnimationFrame(
            updateFaceRegionTest
        );

        return;
    }


    /* =====================================
       MATCH CANVAS TO VIDEO
       ===================================== */

    if (
        faceRegionCanvas.width !==
            videoWidth ||
        faceRegionCanvas.height !==
            videoHeight
    ) {

        faceRegionCanvas.width =
            videoWidth;

        faceRegionCanvas.height =
            videoHeight;
    }


    /* =====================================
       CLEAR
       ===================================== */

    faceRegionCtx.clearRect(
        0,
        0,
        faceRegionCanvas.width,
        faceRegionCanvas.height
    );


    /* =====================================
       GET LANDMARKS
       ===================================== */

    const landmarks =
        window.evilReplicaCurrentLandmarks;


    if (
        !landmarks ||
        landmarks.length !== 478
    ) {
        requestAnimationFrame(
            updateFaceRegionTest
        );

        return;
    }


    /* =====================================
       WHITE DOT MASK
       ===================================== */

    for (
        let i = 0;
        i < landmarks.length;
        i++
    ) {

        const landmark =
            landmarks[i];


        if (
            typeof landmark.x !==
                "number" ||
            typeof landmark.y !==
                "number"
        ) {
            continue;
        }


        /*
         * Mirror X because the camera
         * display is mirrored.
         */

        const x =
            (1 - landmark.x) *
            videoWidth;


        const y =
            landmark.y *
            videoHeight;


        faceRegionCtx.beginPath();


        faceRegionCtx.arc(
            x,
            y,
            2,
            0,
            Math.PI * 2
        );


        faceRegionCtx.fillStyle =
            "rgba(255,255,255,0.95)";


        faceRegionCtx.fill();
    }


    /* =====================================
       FIND FACE BOUNDARY
       ===================================== */

    let minX = 1;
    let minY = 1;
    let maxX = 0;
    let maxY = 0;


    for (
        let i = 0;
        i < landmarks.length;
        i++
    ) {

        const landmark =
            landmarks[i];


        if (
            typeof landmark.x !==
                "number" ||
            typeof landmark.y !==
                "number"
        ) {
            continue;
        }


        minX =
            Math.min(
                minX,
                landmark.x
            );

        minY =
            Math.min(
                minY,
                landmark.y
            );

        maxX =
            Math.max(
                maxX,
                landmark.x
            );

        maxY =
            Math.max(
                maxY,
                landmark.y
            );
    }


    /* =====================================
       MIRRORED FACE REGION
       ===================================== */

    const left =
        (1 - maxX) *
        videoWidth;

    const right =
        (1 - minX) *
        videoWidth;

    const top =
        minY *
        videoHeight;

    const bottom =
        maxY *
        videoHeight;


    const faceWidth =
        right - left;

    const faceHeight =
        bottom - top;


    /* =====================================
       FACE MARGIN
       ===================================== */

    const horizontalMargin =
        faceWidth * 0.08;

    const verticalMargin =
        faceHeight * 0.08;


    const faceLeft =
        Math.max(
            0,
            left -
                horizontalMargin
        );

    const faceTop =
        Math.max(
            0,
            top -
                verticalMargin
        );

    const faceRight =
        Math.min(
            videoWidth,
            right +
                horizontalMargin
        );

    const faceBottom =
        Math.min(
            videoHeight,
            bottom +
                verticalMargin
        );


    const finalWidth =
        faceRight -
        faceLeft;

    const finalHeight =
        faceBottom -
        faceTop;


    /* =====================================
       RED FACE REGION
       ===================================== */

    faceRegionCtx.save();


    faceRegionCtx.beginPath();


    const centerX =
        faceLeft +
        finalWidth / 2;

    const centerY =
        faceTop +
        finalHeight / 2;


    faceRegionCtx.ellipse(
        centerX,
        centerY,
        finalWidth * 0.50,
        finalHeight * 0.50,
        0,
        0,
        Math.PI * 2
    );


    faceRegionCtx.strokeStyle =
        "#ff0000";

    faceRegionCtx.lineWidth =
        5;


    faceRegionCtx.stroke();


    faceRegionCtx.restore();


    /* =====================================
       CONTINUE
       ===================================== */

    requestAnimationFrame(
        updateFaceRegionTest
    );
}

/* =========================================================
   EVIL REPLICA — STEP 4B
   ACTUAL CAMERA FACE REPLICA
   ========================================================= */

function updateRealFaceMask() {

    const camera =
        document.getElementById("camera-container");

    if (!camera) {
        requestAnimationFrame(updateRealFaceMask);
        return;
    }


    /* =====================================
       CREATE MASK CANVAS
       ===================================== */

    let mask =
        document.getElementById("real-face-mask");

    if (!mask) {

        mask =
            document.createElement("canvas");

        mask.id =
            "real-face-mask";

        mask.style.position =
            "absolute";

        mask.style.left =
            "0";

        mask.style.top =
            "0";

        mask.style.width =
            "100%";

        mask.style.height =
            "100%";

        mask.style.pointerEvents =
            "none";

        mask.style.zIndex =
            "1";

        camera.appendChild(mask);
    }


    /* =====================================
       FACE DETECTION
       ===================================== */

    const faceDetected =
        window.evilReplicaFaceDetected === true;


    mask.style.display =
        faceDetected
            ? "block"
            : "none";


    if (!faceDetected) {

        window.realMaskX = null;
        window.realMaskY = null;
        window.realMaskWidth = null;
        window.realMaskHeight = null;

        const ctx =
            mask.getContext("2d");

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        ctx.clearRect(
            0,
            0,
            mask.width,
            mask.height
        );

        requestAnimationFrame(updateRealFaceMask);
        return;
    }


    /* =====================================
       LANDMARKS
       ===================================== */

    const landmarks =
        window.evilReplicaCurrentLandmarks;

    if (
        !landmarks ||
        landmarks.length !== 478
    ) {

        requestAnimationFrame(updateRealFaceMask);
        return;
    }


    /* =====================================
       CAMERA SIZE
       ===================================== */

    const rect =
        camera.getBoundingClientRect();

    const width =
        Math.round(rect.width);

    const height =
        Math.round(rect.height);

    if (
        width <= 0 ||
        height <= 0
    ) {

        requestAnimationFrame(updateRealFaceMask);
        return;
    }


    /* =====================================
       CANVAS SIZE
       ===================================== */

    const dpr =
        window.devicePixelRatio || 1;

    const canvasWidth =
        Math.round(width * dpr);

    const canvasHeight =
        Math.round(height * dpr);


    if (
        mask.width !== canvasWidth ||
        mask.height !== canvasHeight
    ) {

        mask.width =
            canvasWidth;

        mask.height =
            canvasHeight;
    }


    const ctx =
        mask.getContext("2d");


    /* =====================================
       CLEAR
       ===================================== */

    ctx.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
    );

    ctx.clearRect(
        0,
        0,
        mask.width,
        mask.height
    );


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation =
        "source-over";


    /* =====================================
       CAMERA TRANSFORM
       ===================================== */

    const transform =
        getCameraDisplayTransform();


    if (!transform) {

        requestAnimationFrame(updateRealFaceMask);
        return;
    }


    /* =====================================
       FACE LANDMARKS USED FOR SIZE
       
       We deliberately use the stable outer
       face points only.
       ===================================== */

    const FACE_POINTS = [

        10,
        338,
        297,
        332,
        284,
        251,
        389,
        356,
        454,
        323,
        361,
        288,
        397,
        365,
        379,
        378,
        400,
        377,
        152,
        148,
        176,
        149,
        150,
        136,
        172,
        58,
        132,
        93,
        234,
        127,
        162,
        21,
        54,
        103,
        67,
        109
    ];


    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;


    for (
        const index of FACE_POINTS
    ) {

        const landmark =
            landmarks[index];

        if (
            !landmark ||
            typeof landmark.x !== "number" ||
            typeof landmark.y !== "number"
        ) {
            continue;
        }


        const point =
            landmarkToScreen(
                landmark,
                transform
            );


        if (!point) {
            continue;
        }


        minX =
            Math.min(
                minX,
                point.x
            );

        minY =
            Math.min(
                minY,
                point.y
            );

        maxX =
            Math.max(
                maxX,
                point.x
            );

        maxY =
            Math.max(
                maxY,
                point.y
            );
    }


    if (
        !isFinite(minX) ||
        !isFinite(minY) ||
        !isFinite(maxX) ||
        !isFinite(maxY)
    ) {

        requestAnimationFrame(updateRealFaceMask);
        return;
    }


    const faceWidth =
        maxX - minX;

    const faceHeight =
        maxY - minY;


    if (
        faceWidth <= 0 ||
        faceHeight <= 0
    ) {

        requestAnimationFrame(updateRealFaceMask);
        return;
    }


    /* =====================================
       FACE CENTER
       ===================================== */

    const centerX =
        (minX + maxX) / 2;

    const centerY =
        (minY + maxY) / 2;


    /* =====================================
       LARGE MASK
       
       Oversize deliberately.
       This prevents the camera from appearing
       around the edges when the head rotates.
       ===================================== */

    const targetWidth =
        faceWidth * 1.75;

    const targetHeight =
        faceHeight * 1.85;


    /* =====================================
       SMOOTHING
       
       FAST.
       This is intentionally much faster than
       the old 0.35 smoothing.
       ===================================== */

    const POSITION_SMOOTHING =
        0.85;

    const SIZE_SMOOTHING =
        0.80;


    /* =====================================
       INITIAL POSITION
       ===================================== */

    if (
        typeof window.realMaskX !== "number"
    ) {

        window.realMaskX =
            centerX;

        window.realMaskY =
            centerY;

        window.realMaskWidth =
            targetWidth;

        window.realMaskHeight =
            targetHeight;
    }


    /* =====================================
       POSITION
       ===================================== */

    window.realMaskX +=
        (
            centerX -
            window.realMaskX
        ) *
        POSITION_SMOOTHING;


    window.realMaskY +=
        (
            centerY -
            window.realMaskY
        ) *
        POSITION_SMOOTHING;


    /* =====================================
       SIZE
       ===================================== */

    window.realMaskWidth +=
        (
            targetWidth -
            window.realMaskWidth
        ) *
        SIZE_SMOOTHING;


    window.realMaskHeight +=
        (
            targetHeight -
            window.realMaskHeight
        ) *
        SIZE_SMOOTHING;


    /* =====================================
       DRAW MASK
       
       IMPORTANT:
       No stroke.
       No contour.
       No quadratic curves.
       No landmark polygon.
       Just one clean filled shape.
       ===================================== */

/* =====================================
   DRAW REAL CAMERA FACE
   ===================================== */

const cameraVideo =
    document.getElementById("camera-video");


if (
    cameraVideo &&
    cameraVideo.readyState >= 2 &&
    cameraVideo.videoWidth > 0 &&
    cameraVideo.videoHeight > 0
) {

    /*
     * Create a clean elliptical clipping area
     * around the tracked face.
     */

    ctx.save();


/* =====================================
   DRAW REAL CAMERA FACE
   ===================================== */

const cameraVideo =
    document.getElementById(
        "camera-video"
    );


if (
    cameraVideo &&
    cameraVideo.readyState >= 2 &&
    cameraVideo.videoWidth > 0 &&
    cameraVideo.videoHeight > 0
) {

ctx.save();

ctx.beginPath();

ctx.ellipse(
    window.realMaskX,
    window.realMaskY,
    window.realMaskWidth / 2,
    window.realMaskHeight / 2,
    0,
    0,
    Math.PI * 2
);

ctx.clip();

ctx.translate(
    width,
    0
);

ctx.scale(
    -1,
    1
);

}


    /*
     * Everything outside the face ellipse
     * will not be drawn.
     */

    ctx.clip();


    /*
     * Draw the LIVE CAMERA IMAGE.
     *
     * camera-video already contains the
     * user's real face.
     */

/* =====================================
   DRAW CAMERA WITH SAME MIRROR
   ===================================== */

ctx.save();

/*
 * Mirror horizontally to match the
 * camera-video display.
 */
ctx.translate(width, 0);
ctx.scale(-1, 1);


ctx.restore();


    ctx.restore();
}

    /* =====================================
       NEXT FRAME
       ===================================== */

    requestAnimationFrame(
        updateRealFaceMask
    );
}
