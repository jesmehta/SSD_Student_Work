```text
VERSION HISTORY

v0.1.0 — Initial Conversation Prototype

Major Development:
- Opening conversation.
- Typing dialogue effect.
- Player name input.
- Character responses using the player's name.
- Friendship conversation.
- YES / NO interaction.
- Character attempts to convince the player when appropriate.
- Camera invitation at the end of the conversation.
- Space bar dialogue skipping.
- Ctrl + S development shortcut.

Status:
- Initial dialogue system established.
- No camera, face tracking, replica, or horror system yet.


v0.2.0 — Camera & Incoming FaceTime Call

Major Development:
- Browser camera permission.
- Incoming FaceTime-style call popup.
- Centered stretched pill-shaped call interface.
- Generic caller name displayed as `Unknown`.
- `Incoming FaceTime` label.
- Accept call button.
- Decline call button.
- Camera activation after accepting the call.
- Full-screen mirrored webcam.
- White dialogue over the camera feed.

Interaction Improvements:
- Camera is not requested when the webpage first loads.
- Camera is introduced only after the character has built trust.
- User can choose whether to proceed to camera interaction.
- Refusal can lead to additional convincing dialogue.
- Incoming call feels like a natural continuation of the conversation.

Development Features:
- Space bar skips the currently typing dialogue line.
- Ctrl + S can skip directly to the incoming call during development.
- Previous dialogue sessions are cancelled when the conversation is skipped.


v0.3.0 — Friendly Camera Interaction

Major Development:
- Friendly camera introduction.
- Camera-stage dialogue.
- Personalized camera greeting.
- Friendly interaction prompts.
- Wave interaction.
- Smile interaction.
- Character reactions to player actions.
- Camera interaction buttons.
- Smooth transition between dialogue and interaction buttons.
- Friendly emotional progression after the camera is accepted.

Camera Dialogue:
- `Oh...`
- `There you are.`
- `Hi, [name]!`
- `It's nice to finally see you.`
- `Can you wave?`
- `Haha!`
- `You actually did it!`
- `Can you smile for me?`
- `That's a nice smile.`
- `I like seeing you like this.`

Interaction Development:
- Wave interaction originally used a simulated button.
- Smile interaction originally used a simulated button.
- Smile interaction was subsequently replaced with real-time facial-expression detection.

Design Decision:
- No horror effects are introduced during the friendly stage.


v0.4.0 — Face Tracking Foundation

Major Development:
- MediaPipe Face Landmarker integration.
- Local `face_landmarker.task` model.
- Browser-based face detection.
- Real-time camera analysis.
- Face presence detection.
- Face tracking status indicator.
- `FACE DETECTED` state.
- `NO FACE DETECTED` state.
- Loading and error states.
- Console debugging.

Local Model:
assets/models/face_landmarker.task


v0.4.1 — Face Calibration

Major Development:
- Mirrored-camera calibration.
- Landmark-to-screen conversion.
- Camera crop correction.
- Display scaling correction.
- Horizontal crop calculation.
- Vertical crop calculation.
- Facial landmark canvas positioning.
- Alignment of face landmarks with the real camera image.

Important Calibration:
- Mirrored X-coordinate calculation.
- Current working horizontal and vertical calibration offsets were established.

Status:
- Camera and landmark coordinate system stabilized.


v0.4.2 — Smile Detection

Major Development:
- Facial blendshape analysis.
- `mouthSmileLeft`.
- `mouthSmileRight`.
- Combined smile-value calculation.
- Smile threshold detection.
- Smile hold-time detection.
- Automatic smile response.
- Replacement of the simulated smile interaction.

Status:
- Real-time smile detection operational.


v0.4.3 — Replica Face Prototype

Major Development:
- Live face crop used as the replica.
- Replica face positioning.
- Replica face sizing.
- Replica face alignment.
- Face crop taken directly from the live camera.
- Replica positioned according to the player's detected face.

Purpose:
- Establish the technical foundation for the future supernatural replica.


v0.4.4 — Replica Stabilization

Major Development:
- Replica/camera alignment fixes.
- Replica sizing stabilization.
- Replica positioning stabilization.
- Real-face masking.
- Removal of visible development landmark dots.
- Removal of red facial landmark indicators.
- Removal of unwanted visible debugging elements.
- Stabilization of the face crop.
- Stabilization of the replica rectangle.
- Stabilization of the camera/face coordinate relationship.

Important Development Rule:
- The working replica crop, alignment, dimensions, and camera calibration should not be casually replaced.
- Future behaviour should be layered onto the existing working system.


v0.5.0 — Replica Behaviour Experiments

Major Development:
- Technical testing of opposite horizontal movement.
- Technical testing of opposite vertical movement.
- Technical testing of opposite head tilt.

Tested Behaviour:

PLAYER LEFT   → REPLICA RIGHT
PLAYER RIGHT  → REPLICA LEFT

PLAYER UP     → REPLICA DOWN
PLAYER DOWN   → REPLICA UP

PLAYER TILT LEFT  → REPLICA TILT RIGHT
PLAYER TILT RIGHT → REPLICA TILT LEFT

Status:
- Opposite movement technically demonstrated.
- Behaviour not yet connected to the final gameplay progression.


v0.5.1 — Interaction Concept Expansion

Major Development:
- Defined the complete replica behaviour progression.
- Established that replica behaviour should evolve during gameplay.
- Established four major replica behaviour states.

Progression:

NORMAL
   ↓
SLOW
   ↓
OPPOSITE
   ↓
INDEPENDENT

Normal Movement:
- Replica initially follows the player's movements naturally.

Slow Movement:
- Replica begins following with increasing delay.

Opposite Movement:
- Replica begins moving in the opposite direction to the player.

Independent Movement:
- Replica stops being controlled directly by the player.
- Replica begins moving independently.

Design Principle:
- The player should initially believe the replica is a normal reflection.
- The player should gradually realize that the replica is no longer behaving normally.


v0.6.0 — Game Concept & Interaction Architecture

Major Development:
- Complete game concept defined.
- Complete game progression defined.
- Complete replica behaviour progression defined.
- Face-controlled rhythm game concept defined.
- Final horror sequence defined.
- Automatic hand-wave detection prepared.
- MediaPipe Hand Landmarker model added.
- Existing face-tracking and replica system retained as the foundation.

Game Progression:

OPENING CONVERSATION
        ↓
PLAYER NAME / FRIENDLY DIALOGUE
        ↓
YES / NO INTERACTION
        ↓
CHARACTER BUILDS TRUST
        ↓
CAMERA INVITATION
        ↓
INCOMING VIDEO CALL
        ↓
PLAYER ACCEPTS CAMERA
        ↓
FRIENDLY CAMERA INTERACTION
        ↓
AUTOMATIC HAND-WAVE INTERACTION
        ↓
AUTOMATIC SMILE INTERACTION
        ↓
PLAYER BECOMES COMFORTABLE
        ↓
FACE-CONTROLLED RHYTHM GAME
        ↓
REPLICA INITIALLY BEHAVES NORMALLY
        ↓
REPLICA BECOMES SLOWER
        ↓
REPLICA MOVES OPPOSITELY
        ↓
REPLICA BECOMES INCREASINGLY INCORRECT
        ↓
REPLICA BECOMES INDEPENDENT
        ↓
REPLICA STOPS
        ↓
REPLICA STARES AT PLAYER
        ↓
SLIGHT DOWNWARD HEAD TILT
        ↓
BLACK EYES
        ↓
CHAOTIC / EXTREMELY FAST HEAD MOVEMENT
        ↓
SUDDEN STOP
        ↓
SAME DOWNWARD TILT + BLACK EYES
        ↓
SECOND STARE
        ↓
SLOW CREEPY WIDE SMILE
        ↓
BLACK SCREEN


v0.6.0 — Friendly Interaction Architecture

The early part of the experience is designed to establish trust.

Sequence:

1. Character begins conversation.
2. Player enters their name.
3. Character uses the player's name.
4. Friendly conversation continues.
5. YES / NO choices appear.
6. Character attempts to convince the player when appropriate.
7. Character introduces the idea of seeing the player.
8. Incoming FaceTime-style call appears.
9. Player accepts the call.
10. Camera activates.
11. Character sees the player.
12. Character greets the player.
13. Character asks the player to wave.
14. Player physically waves.
15. Automatic hand-wave detection recognizes the movement.
16. Character reacts positively.
17. Character asks the player to smile.
18. Smile detection recognizes the player's real smile.
19. Character reacts positively.
20. Player becomes comfortable with the interaction.


v0.6.0 — Face-Controlled Rhythm Game

The rhythm game is inspired by music-tile games.

Instead of tapping tiles, directional arrows appear on screen.

Example:

←   ↑   →   ↓   →

The player must move their face in the indicated direction at the correct moment.

Core Interaction:

ARROW APPEARS
     ↓
PLAYER READS DIRECTION
     ↓
PLAYER MOVES FACE
     ↓
FACE DIRECTION DETECTED
     ↓
TIMING CHECK
     ↓
CORRECT → SONG CONTINUES
INCORRECT → GAME RESPONSE

Required directions:

- LEFT
- RIGHT
- UP
- DOWN

The existing head-tracking system provides the foundation for this mechanic.

The rhythm game should be completed before connecting the final replica behaviour progression to actual gameplay.


v0.6.0 — Replica Gameplay Progression

Stage 1 — Normal Movement

PLAYER RIGHT → REPLICA RIGHT
PLAYER LEFT  → REPLICA LEFT
PLAYER UP    → REPLICA UP
PLAYER DOWN  → REPLICA DOWN

Purpose:
- Establish the expectation that the replica follows the player.


Stage 2 — Slow Movement

The replica continues moving in the same general direction but gradually introduces delay.

Progression:

NORMAL
  ↓
SLIGHT LAG
  ↓
NOTICEABLE LAG

Purpose:
- Make the player notice that synchronization is becoming abnormal.


Stage 3 — Opposite Movement

PLAYER RIGHT → REPLICA LEFT
PLAYER LEFT  → REPLICA RIGHT

PLAYER UP    → REPLICA DOWN
PLAYER DOWN  → REPLICA UP

Head tilt can also be reversed.

Purpose:
- Create the first major realization that something is wrong.


Stage 4 — Independent Movement

The replica eventually stops being directly controlled by the player's face.

The replica begins moving according to its own behaviour.

Purpose:
- Establish that the replica is no longer simply a copy of the player.
- The replica has become an independent character.


v0.6.0 — Final Horror Sequence

1. Replica suddenly stops.
2. Replica stares directly at the player.
3. Head has a slight downward tilt.
4. Eyes become completely black.
5. Stare is held.
6. Replica suddenly performs extremely fast, chaotic and unnatural head movement.
7. Movement stops abruptly.
8. Replica returns to the same downward head tilt.
9. Eyes remain completely black.
10. Replica stares at the player again.
11. Replica slowly begins to smile.
12. Smile gradually becomes unnaturally wide and creepy.
13. Screen immediately transitions to black.

Final transition:

CREEPY WIDE SMILE
        ↓
BLACK SCREEN

There is NO face-emergence stage.


v0.6.0 — Automatic Hand-Wave Detection

Purpose:
- Replace the temporary simulated wave button with real physical hand-wave detection.

Model Added:

assets/models/hand_landmarker.task

Current Status:
- Hand Landmarker model added.
- Automatic wave detection not yet implemented.

Planned Detection:

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
TRIGGER DIALOGUE RESPONSE

The system must distinguish an actual waving motion from simply holding a hand in front of the camera.

The hand detection system should remain independent from the face-replica system.


CURRENT DEVELOPMENT PRIORITY AFTER v0.6.0

1. Automatic Hand-Wave Detection.
2. Replace simulated wave interaction.
3. Complete friendly camera interaction.
4. Build face-controlled rhythm game.
5. Implement arrow spawning and sequences.
6. Implement timing windows.
7. Implement face-direction hit detection.
8. Implement success/failure logic.
9. Implement song progression.
10. Implement score/combo system.
11. Connect normal replica behaviour to gameplay.
12. Implement slow replica behaviour.
13. Implement opposite replica behaviour.
14. Implement independent replica behaviour.
15. Implement black-eye effect.
16. Implement downward head-tilt horror state.
17. Implement chaotic rapid head movement.
18. Implement second stare.
19. Implement creepy wide smile.
20. Implement final black-screen transition.
21. Add final character artwork.
22. Add final horror audio design.


IMPORTANT PROJECT DEVELOPMENT RULE

Do not sacrifice a working system to implement a new effect.

When adding a new behaviour:

1. Preserve the current face tracking.
2. Preserve camera coordinate calibration.
3. Preserve replica face crop and size.
4. Add the new behaviour as a separate layer.
5. Test it independently.
6. Only then connect it to the game sequence.

The current working face crop, alignment, sizing and coordinate system must remain the foundation for future development.


VERSION STATUS LEGEND

Implemented:
Functionality currently working in the project.

Tested:
Functionality technically demonstrated during development but not necessarily connected to the final gameplay.

Planned:
Functionality defined as part of the approved game design but not yet implemented.

Next:
The immediate development priority.


CURRENT PROJECT CHECKPOINT

VERSION: v0.6.0

Current stable foundation:

CONVERSATION
     +
CAMERA
     +
FACE TRACKING
     +
FACIAL INTERACTION
     +
FACE REPLICA
     +
HAND-DETECTION MODEL
     ↓
NEXT:
AUTOMATIC WAVE INTERACTION
     ↓
RHYTHM GAME
     ↓
REPLICA BEHAVIOUR PROGRESSION
     ↓
HORROR ENDING
```