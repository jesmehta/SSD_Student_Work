# CHANGELOG — Evil Replica

---

# v0.1.0 — Initial Conversation Prototype

**Date:** [Original Development Date]

**Status:** Completed / Working Prototype

---

## Added

- Initial conversation system.
- Opening dialogue.
- Typing dialogue effect.
- Player name input.
- Personalized character responses using the player's name.
- YES / NO dialogue interaction.
- Character convincing dialogue when the player refuses.
- Camera invitation at the end of the conversation.
- SPACE BAR shortcut to skip the current typing dialogue.
- CTRL + S development shortcut for testing later stages.

---

## Game Flow

OPENING CONVERSATION
        ↓
PLAYER NAME
        ↓
PERSONALIZED DIALOGUE
        ↓
YES / NO INTERACTION
        ↓
CHARACTER BUILDS TRUST
        ↓
CAMERA INVITATION

---

## Notes

v0.1.0 establishes the initial conversational foundation of Evil Replica.

The character is intentionally friendly at this stage.

No camera tracking, face tracking, replica or horror systems are present yet.

---

# v0.2.0 — Camera & Incoming FaceTime Call

**Date:** [Development Date]

**Status:** Completed / Working Prototype

---

## Added

- Camera permission flow.
- Incoming FaceTime-style call interface.
- Caller name display.
- Accept call interaction.
- Decline call interaction.
- Camera activation after accepting the call.
- Mirrored webcam display.
- Full-screen camera stage.
- Transition from conversation to camera interaction.

---

## Game Flow

CONVERSATION
        ↓
CAMERA INVITATION
        ↓
INCOMING FACETIME CALL
        ↓
PLAYER ACCEPTS
        ↓
WEBCAM

---

## Notes

Camera access is introduced only after the conversation.

The camera is not requested immediately when the game starts.

This establishes the transition from the dialogue-based experience into the webcam-based experience.

---

# v0.3.0 — Friendly Camera Interaction

**Date:** [Development Date]

**Status:** Completed / Working Prototype

---

## Added

- Friendly camera-stage dialogue.
- Personalized camera greeting.
- Wave interaction.
- Smile interaction.
- Character reactions to player actions.
- Camera-based interaction flow.

---

## Game Flow

INCOMING VIDEO CALL
        ↓
PLAYER ACCEPTS
        ↓
FRIENDLY CAMERA INTERACTION
        ↓
WAVE
        ↓
SMILE

---

## Notes

The player is introduced to physical interaction through the webcam.

The wave interaction initially uses a temporary interaction mechanism.

The long-term objective is to replace the temporary wave interaction with automatic hand-wave detection.

Smile interaction later becomes an automatically detected facial interaction.

---

# v0.4.0 — Face Tracking Foundation

**Date:** [Development Date]

**Status:** Completed / Working Prototype

---

## Added

- MediaPipe Face Landmarker.
- Local face-landmarker model.
- Real-time face detection.
- 478 facial landmarks.
- Face position detection.
- Head movement detection foundation.
- Yaw detection foundation.
- Pitch detection foundation.
- Roll detection foundation.
- Development landmark visualization.

---

## Face Tracking Data

The face-tracking system provides facial landmark information that can be used to determine:

- Face position.
- Horizontal movement.
- Vertical movement.
- Head rotation.
- Facial expressions.

---

## Development Visualization

Facial landmarks can be displayed during development to verify the accuracy of the tracking system.

The landmark visualization is a development feature and is not intended for the final game.

---

## Notes

v0.4.0 establishes the technical foundation for controlling the replica using the player's face and head movement.

---

# v0.4.1 — Face Calibration

**Date:** [Development Date]

**Status:** Completed / Working Prototype

---

## Added

- Camera coordinate conversion.
- Display crop correction.
- Mirrored camera correction.
- Landmark-to-screen conversion.
- Camera/display alignment.
- Face position calibration.

---

## Calibration Data

The system accounts for:

- Source video width.
- Source video height.
- Displayed video width.
- Displayed video height.
- Horizontal crop.
- Vertical crop.
- Mirrored camera orientation.

---

## Notes

Raw MediaPipe landmark coordinates cannot be directly used as screen coordinates because the camera feed may be cropped, scaled and mirrored.

v0.4.1 establishes the coordinate conversion required to correctly align the replica with the player's actual face.

---

## Game Flow

RAW FACE LANDMARK
        ↓
CAMERA TRANSFORMATION
        ↓
CROP CORRECTION
        ↓
MIRROR CORRECTION
        ↓
SCREEN POSITION

---

# v0.4.2 — Smile Detection

**Date:** [Development Date]

**Status:** Completed / Working Prototype

---

## Added

- Facial blendshape analysis.
- Left mouth smile detection.
- Right mouth smile detection.
- Combined smile calculation.
- Smile threshold.
- Smile hold-time.
- Automatic smile confirmation.
- Character response after confirmed smile.

---

## Smile Data

The system uses:

```javascript
{
    mouthSmileLeft,
    mouthSmileRight
}

The two values are combined to determine the player's smile intensity.

Smile Interaction

The interaction follows:

SMILE DETECTED
↓
THRESHOLD REACHED
↓
SMILE HELD
↓
SMILE CONFIRMED
↓
CHARACTER RESPONSE

Notes

The player can now interact with the character using an actual facial expression instead of a simulated button interaction.

v0.4.3 — Replica Face Prototype

Date: [Development Date]

Status: Completed / Working Prototype

Added
Face crop.
Replica canvas.
Replica element.
Replica positioning.
Replica sizing.
Camera-based replica image.
Replica alignment foundation.
Replica System

The player's detected face is cropped from the live camera and displayed separately as the initial Evil Replica.

The replica is positioned according to the detected face.

The current visual representation is a development prototype and is not the final appearance of the Evil Replica.

Face Crop

The system:

Detects the face.
Determines the facial boundaries.
Adds padding around the face.
Creates the face crop.
Draws the crop into the replica.
Positions the replica using calibrated coordinates.
Game Flow

CAMERA
↓
FACE DETECTION
↓
FACE LANDMARKS
↓
FACE CROP
↓
REPLICA
↓
REPLICA POSITION

v0.4.4 — Replica Stabilization

Date: [Development Date]

Status: Completed / Working Prototype

Added
Replica alignment correction.
Replica sizing stabilization.
Face crop stabilization.
Camera coordinate stabilization.
Real-face masking.
Replica transform correction.
Development artifact removal.
Landmark/debug indicator removal.
Replica positioning stabilization.
Replica Alignment

The replica is positioned relative to the camera container.

The camera container and replica coordinate systems are aligned so that the replica follows the correct face position.

Replica Masking

A mask is used to prevent unwanted portions of the real camera face from becoming visible around the replica.

Development Artifact Removal

The following unwanted development artifacts were removed or hidden:

Facial landmark dots.
Red landmark indicators.
White dots.
Unwanted debug indicators.
Notes

The replica became sufficiently stable and correctly aligned to begin implementing movement behaviour.

v0.5.0 — Replica Movement Behaviour

Date: 22 August 2026

Status: Completed / Working Prototype

Added
Replica movement system.
Head movement input.
Yaw-based movement.
Pitch-based movement.
Roll-based movement.
Opposite horizontal movement.
Opposite vertical movement.
Opposite head-tilt behaviour.
Development testing of opposite movement.
Replica Movement Data

The replica receives the player's current head movement data:

{
    yaw,
    pitch,
    roll,
    direction
}
Opposite Movement

The primary behaviour introduced in v0.5.0 is opposite movement.

PLAYER RIGHT → REPLICA LEFT
PLAYER LEFT → REPLICA RIGHT

PLAYER UP → REPLICA DOWN
PLAYER DOWN → REPLICA UP

Head tilt can also be reversed:

PLAYER TILT LEFT → REPLICA TILT RIGHT
PLAYER TILT RIGHT → REPLICA TILT LEFT

Notes

The replica movement system was tested independently before being connected to the complete game progression.

The purpose was to establish the technical foundation for the later replica behaviour sequence:

NORMAL
↓
SLOW
↓
OPPOSITE
↓
INDEPENDENT

v0.6.0 — Game Concept & Interaction Architecture

Date: 22 August 2026

Status: Completed / Working Prototype

Added
Complete game progression.
Automatic hand-wave detection architecture.
MediaPipe Hand Landmarker model.
Face-controlled rhythm-game concept.
Directional arrow gameplay concept.
Normal replica behaviour stage.
Slow replica behaviour stage.
Opposite replica behaviour stage.
Independent replica behaviour stage.
Complete horror sequence.
Black-eye horror state.
Downward head-tilt horror state.
Chaotic fast head movement concept.
Second stare sequence.
Creepy wide smile sequence.
Final black-screen transition.
Complete replica behaviour architecture.
Complete development priority.
Automatic Hand-Wave Detection

Hand waving is part of the friendly dialogue sequence.

The player should physically wave at the camera instead of pressing a simulated button.

The MediaPipe Hand Landmarker model has been added:

assets/models/hand_landmarker.task

The intended detection sequence is:

HAND DETECTED
↓
TRACK HAND POSITION
↓
MOVEMENT TO ONE SIDE
↓
MOVEMENT BACK
↓
MOVEMENT TO OTHER SIDE
↓
WAVE CONFIRMED
↓
CHARACTER RESPONSE

The system must distinguish between:

Holding a hand in front of the camera.
An actual waving movement.

The hand detection system remains independent from the face-replica system.

Face-Controlled Rhythm Game

The main gameplay concept is based on a music-tile / rhythm-game structure.

Instead of tapping tiles, directional arrows appear on the screen.

The player must move their face in the direction of the arrow at the correct moment to continue the song.

The available directions are:

LEFT.
RIGHT.
UP.
DOWN.

The basic gameplay loop is:

ARROW APPEARS
↓
PLAYER READS DIRECTION
↓
PLAYER MOVES FACE
↓
HEAD DIRECTION DETECTED
↓
TIMING CHECK
↓
CORRECT → SONG CONTINUES
INCORRECT → GAME RESPONSE

Replica Behaviour Progression

The replica behaviour will progressively change during the rhythm game.

The intended progression is:

NORMAL
↓
SLOW
↓
OPPOSITE
↓
INDEPENDENT

The changes should be introduced gradually.

The player should initially believe that the replica is simply following them.

The behaviour should progressively become abnormal.

Stage 1 — Normal Movement

Initially, the replica behaves like a normal reflection of the player.

PLAYER RIGHT → REPLICA RIGHT
PLAYER LEFT → REPLICA LEFT
PLAYER UP → REPLICA UP
PLAYER DOWN → REPLICA DOWN

This establishes the player's expectation that the replica follows their movements.

Stage 2 — Slow Movement

The replica begins responding more slowly.

The movement direction remains generally correct, but a delay is introduced.

The progression is:

NORMAL
↓
SLIGHT DELAY
↓
NOTICEABLE DELAY

The player should gradually realize that the replica is no longer perfectly synchronized.

Stage 3 — Opposite Movement

The replica begins moving in the opposite direction to the player's movement.

PLAYER RIGHT → REPLICA LEFT
PLAYER LEFT → REPLICA RIGHT

PLAYER UP → REPLICA DOWN
PLAYER DOWN → REPLICA UP

Head rotation and tilt can also be reversed.

This is the first major indication that something is wrong.

Stage 4 — Independent Movement

The replica eventually stops responding directly to the player's movement.

It begins moving according to its own behaviour.

At this point:

PLAYER MOVEMENT ≠ REPLICA MOVEMENT

The player is no longer controlling a copy of themselves.

The replica has become an independent entity.

This marks the transition from the gameplay mechanic into the horror sequence.

Final Horror Sequence

After the replica becomes independent, the final horror sequence begins.

The complete sequence is:

REPLICA STOPS
↓
FIRST STARE
↓
SLIGHT DOWNWARD HEAD TILT
↓
BLACK EYES
↓
CHAOTIC FAST HEAD MOVEMENT
↓
SUDDEN STOP
↓
SAME DOWNWARD HEAD TILT
↓
BLACK EYES
↓
SECOND STARE
↓
SLOW CREEPY WIDE SMILE
↓
BLACK SCREEN

First Stare

The replica suddenly stops moving.

It looks directly at the player.

The head has a slight downward tilt.

Black Eyes

The replica's eyes become completely black.

The replica continues staring directly at the player.

Chaotic Head Movement

The replica suddenly performs extremely fast, chaotic and unnatural head movements.

The movement should feel supernatural and impossible rather than like normal human movement.

The intended feeling is similar in intensity to a supernatural / Doctor Strange-style chaotic head movement.

Second Stare

The chaotic movement stops abruptly.

The replica returns to the same:

Slight downward head tilt.
Completely black eyes.
Direct stare at the player.

The second stare is held.

Creepy Wide Smile

The replica slowly begins to smile.

The smile gradually becomes unnaturally wide and creepy.

Black Screen

The screen transitions completely to black.

There is no face-emergence stage.

The final moment is:

CREEPY WIDE SMILE
↓
BLACK SCREEN

Replica System Architecture

The intended architecture is:

CAMERA
↓
FACE / HAND DETECTION
↓
PLAYER INPUT DATA
↓
GAME STATE
↓
REPLICA BEHAVIOUR STATE
↓
BEHAVIOUR MODIFIER
↓
FINAL REPLICA MOVEMENT

The face-tracking system determines the player's movement.

The game state determines how the replica responds.

The behaviour modifier converts the player's movement into the currently active replica behaviour.

The intended structure is:

FACE DATA
↓
BASE POSITION
↓
CURRENT BEHAVIOUR
↓
NORMAL / SLOW / OPPOSITE / INDEPENDENT
↓
FINAL REPLICA POSITION

Complete Game Progression

The complete intended game experience is:

OPENING CONVERSATION
↓
PLAYER NAME
↓
FRIENDLY DIALOGUE
↓
YES / NO INTERACTION
↓
CHARACTER BUILDS TRUST
↓
CAMERA INVITATION
↓
INCOMING VIDEO CALL
↓
PLAYER ACCEPTS
↓
FRIENDLY CAMERA INTERACTION
↓
AUTOMATIC HAND-WAVE
↓
AUTOMATIC SMILE
↓
FACE-CONTROLLED RHYTHM GAME
↓
NORMAL REPLICA
↓
SLOW REPLICA
↓
OPPOSITE REPLICA
↓
INDEPENDENT REPLICA
↓
HORROR SEQUENCE
↓
BLACK SCREEN

Important Development Rule

The current working face-tracking and replica-alignment system must not be unnecessarily replaced.

When implementing new behaviour:

Preserve face tracking.
Preserve camera calibration.
Preserve face crop.
Preserve replica size.
Preserve replica alignment.
Add new behaviour as a separate layer.
Test the behaviour independently.
Connect it to gameplay only after it works correctly.

The existing face-replica foundation is considered stable.

Current Status

Implemented:

Conversation system.
Player name interaction.
YES / NO dialogue.
Character convincing dialogue.
Incoming FaceTime-style call.
Camera permission flow.
Mirrored webcam.
Friendly camera interaction.
MediaPipe Face Landmarker.
478 facial landmarks.
Face position tracking.
Yaw detection.
Pitch detection.
Roll detection.
Smile detection.
Camera coordinate calibration.
Face crop.
Replica positioning.
Replica sizing.
Replica alignment.
Real-face masking.
Removal of visible landmark/debug dots.
Opposite horizontal movement testing.
Opposite vertical movement testing.
Opposite head-tilt testing.
Hand Landmarker model added.
Complete game progression defined.
Complete replica progression defined.
Final horror sequence defined.
Not Yet Implemented
Automatic hand-wave detection.
Final replacement of simulated wave interaction.
Rhythm-game arrow system.
Arrow spawning.
Arrow sequence system.
Music synchronization.
Timing windows.
Face-direction hit detection.
Success/failure system.
Score/combo system.
Normal replica gameplay state.
Slow replica behaviour.
Gameplay-triggered opposite movement.
Independent replica behaviour.
Black-eye effect.
Downward head-tilt horror state.
Chaotic rapid head movement.
Second stare.
Creepy wide smile.
Final black-screen transition.
Final character artwork.
Final horror audio design.
Development Priority

The next development stages are:

AUTOMATIC HAND-WAVE DETECTION
COMPLETE FRIENDLY INTERACTION
FACE-CONTROLLED RHYTHM GAME
NORMAL REPLICA
SLOW REPLICA
OPPOSITE REPLICA
INDEPENDENT REPLICA
HORROR SEQUENCE
FINAL BLACK SCREEN

The rhythm game should be developed before connecting the final replica behaviour effects to the gameplay.

This ensures that the replica behaviour becomes part of the actual game experience rather than remaining a separate technical demonstration.

v0.6.0 CHECKPOINT

The project has now moved from a face-tracking prototype toward the complete interactive horror-game architecture.

The current foundation is:

CONVERSATION
+
CAMERA
+
FACE TRACKING
+
SMILE DETECTION
+
FACE REPLICA
+
HEAD MOVEMENT
+
HAND LANDMARK MODEL
↓
AUTOMATIC WAVE DETECTION
↓
FACE-CONTROLLED RHYTHM GAME
↓
NORMAL
↓
SLOW
↓
OPPOSITE
↓
INDEPENDENT
↓
HORROR
↓
BLACK SCREEN

Version: v0.6.0

Date: 22 August 2026

Status: Completed / Working Prototype