# Conversion report

## Repository optimization

- Added an ignored `to_delete/` holding area so removed originals remain recoverable without being committed.
- Moved Internet 1995 historical version snapshots and unused Finding India ocean variants out of the publishable site.
- Converted 32 referenced PNG files to substantially smaller WebP files and retained their originals in `to_delete/`.
- Centralized the identical hand-landmarker model used by Aadit and Swayam.
- Centralized the identical artwork shared by all three Sleepwalker versions and removed the unused legacy lite hand model.
- Moved unreferenced Internet 1995 PNGs into `to_delete/` and precompiled the Anaya/Diti JSX so the 2.71 MB browser Babel compiler is no longer published.

## Project rules

- Original submissions remain unchanged.
- Each interactive version receives its own public page.
- Processing sketches are converted to p5.js.
- Joystick directions become Arrow keys.
- The primary joystick button becomes Space.
- Other hardware mappings require approval.
- Public paths use lowercase, URL-safe names and relative links for GitHub Pages.
- Media-only submissions are excluded unless an accompanying document contains recoverable source code.

## Completed

### Exhibition shell

- Created the GitHub Pages-ready directory structure.
- Added a responsive, expressive landing-page design.
- Added a provisional catalogue with category filtering.
- No student submission has been copied or modified yet.

### Teachable Machine — Gloria Mathew, Prachi and Damiyan

- Verified the published image model and its `open eyes` / `close eyes` labels.
- Added a responsive webcam image-classification exercise.
- Verified the published pose model and its `superman`, `rabbit`, `action kamin` and `Patrick` labels.
- Added a responsive webcam pose-classification exercise with keypoint overlay.
- Camera access starts only after an explicit button press and requests video without audio.
- Camera tracks stop when the user presses Stop or leaves the browser tab.
- Archived both custom models locally (`model.json`, `metadata.json` and `model.weights.bin`) so the exercises no longer depend on the published Teachable Machine model URLs remaining available.
- Archived compatible, version-pinned TensorFlow.js, PoseNet and Teachable Machine runtime libraries in the shared `vendor` directory.
- The two machine-learning exercises no longer require Teachable Machine or jsDelivr to remain online after deployment.
- Activated both exercise links in the exhibition catalogue.

### Aadit Vanjari — Hardware Software Bridge

- Converted Car Game from Processing/Java to browser-native p5.js.
- Removed Processing Serial and mapped discrete joystick left/right events to the Left/Right Arrow keys.
- Preserved lane snapping, traffic generation, collision behavior, level progression and Enter-to-restart.
- Converted Joystick Maze from Processing/Java to browser-native p5.js.
- Removed Processing Serial and mapped continuous joystick movement to all four Arrow keys.
- Preserved procedural maze generation, wall collision, level progression, particle explosion, Space-to-generate and Enter-to-restart.
- Both games use the locally archived p5.js 1.9.4 runtime.

### Aadit Vanjari — Throw & Pinch

- Packaged the original standalone HTML experiment as a GitHub Pages exercise.
- Added a route back to the exhibition without altering the creative interaction.
- Archived its 7.8 MB MediaPipe hand-landmarker model locally and updated the model path.
- Preserved the pinned remote Three.js and MediaPipe module imports.
- Preserved the explicit camera button and video-only camera request.

### Ananya Raut — Joystick Game studies

- Converted Caterpillar from Processing Serial to p5.js with Arrow-key movement, preserving its seeded meadow, flower collision and trailing segmented body.
- Converted VOID from Processing Serial to p5.js.
- Mapped VOID's analog joystick movement to Arrow keys and its joystick press to Space.
- Preserved VOID's acceleration, friction, energy collection, obstacles, collapsing boundary, scoring and difficulty progression.
- The two retained conversions use the locally archived p5.js runtime and contain no serial APIs. The two basic ball studies were removed from the exhibition and placed in the ignored `to_delete` holding area.

### Ananya Raut — GOD.EXE

- Recognised the extensionless submission as HTML and published it under a standard `index.html` route.
- Added a route back to the exhibition.
- Preserved the original self-contained canvas, audio and interaction code.

### Atharva Aware and Avaneesh Chavan — Arrow of Judgement

- Compared Atharva Aware's and Avaneesh Chavan's Bow Game files byte-for-byte; their SHA-256 hashes are identical.
- Used Atharva's copy as the conversion source because its original modification timestamp (22 August 2026) is newer than Avaneesh's (14 August 2026).
- Published one deduplicated exercise credited jointly to Atharva Aware and Avaneesh Chavan; neither original submission was deleted or modified.
- Converted the newer Processing sketch to p5.js using the locally archived runtime.
- Removed Processing Serial, mapping horizontal joystick aiming to Left/Right Arrow and retaining Space for charge-and-release shooting.
- Preserved the main menu, pause controls, scoring, body-part collisions, particles, charged arrows, spirit sequence and heaven/hell transition.

### Atharva Aware — Find the Cat

- Packaged the original self-contained HTML game under a GitHub Pages-safe route.
- Added navigation back to the exhibition without changing the interaction.

### Anaya Raul — India Atlas

- Compared both JSX submissions; they are byte-for-byte identical with matching SHA-256 hashes.
- Used `india-atlas(1).jsx` as the source because its original modification timestamp is nine minutes newer.
- Published one deduplicated India Atlas catalogue entry; both original files remain untouched.
- Converted the module-style JSX into a standalone GitHub Pages exercise while preserving the original React component and embedded geographic/cultural dataset.
- Added a standard HTML entry point, React mount, exhibition navigation and metadata.
- Archived version-pinned React 18.2.0, ReactDOM 18.2.0 and Babel Standalone 7.23.5 runtimes locally.

### Aadit Vanjari and Bhakti Sharma — Car Game and Joystick Maze

- Confirmed Bhakti Sharma's two Processing sketches are byte-for-byte identical to Aadit Vanjari's, including original timestamps and SHA-256 hashes.
- Kept one converted build of each exercise and updated both the catalogue and exercise pages with joint credit.
- All original submissions remain untouched.

### Bhakti Sharma — Make Your Own Wine

- Compared the React JSX and standalone HTML submissions.
- Published the standalone HTML, which is 16 minutes newer and implements the same core ingredient, fermentation, discovery, filtering, journal and local-save experience without requiring a React/Babel runtime.
- Consolidated the two provisional catalogue entries into one public exercise.
- Added navigation back to the exhibition and otherwise preserved the original interaction.

### Diti Pokar — Where Did My ___ Go?

- Packaged the interactive detective game under a GitHub Pages-safe route.
- Replaced remote cdnjs React, ReactDOM and Babel references with the locally archived pinned runtimes.
- Added exhibition navigation without changing the game interaction.

### Gloria Mathew — Objectively Matched

- Packaged the self-contained matchmaking webpage under a GitHub Pages-safe route.
- Added exhibition navigation.
- Fixed the unsafe chat-input rendering: visitor messages now use `textContent` rather than being interpreted as HTML.
- Preserved trusted, fixed-format profile responses and the original interaction.

### Gloria Mathew — Dorothy's Maze

- Converted the Processing/Serial sketch to browser-native p5.js using the locally archived runtime.
- Replaced joystick directions with continuous Arrow-key input and preserved Space/Enter screen progression.
- Preserved the submitted maze layout, moving ruby shoes, Yellow Brick Road goal, three lives, timed wolves, timed flying monkeys, damage cooldowns and win/game-over flow.
- The source references four missing images: `dorothy.png`, `ruby_shoes.png`, `wolf.png`, and `monkey.png`.
- Added clearly labeled temporary p5.js-drawn stand-ins with the user's approval; these are not represented as student artwork.
- Added the missing filenames and replacement instructions to `source-asset-requests.md` so the originals can be requested from the student.

### Madhav Kansara — Human Physics Playground

- Packaged the interactive Matter.js physics playground under a GitHub Pages-safe route.
- Archived Matter.js 0.20.0 locally and replaced the remote cdnjs dependency.
- Added exhibition navigation without changing the playground behavior.

### Madhav Kansara — Assaniation Game

- Recovered the complete Processing source from the submitted 18-page PDF and converted it to browser-native p5.js.
- Preserved 20 floors, room layouts, bosses, hostages, loot, XP unlocks, weapons, ammunition, crouching, enemy vision, projectiles, restart and victory flow.
- Preserved the submitted controls: WASD movement, Space action, C crouch, 1–4 weapons, R restart and N debug floor-skip.
- Uses the local p5.js runtime with no serial APIs or external assets.
- Preserved the spelling “Assaniation” from the submitted PDF filename and disclosed that choice on the page.

### Navneet Krishnan

- Inspected the machine-learning, Processing/Arduino and AI-website submission folders.
- All three folders are empty; there is no source, model link, document or media available to publish.

## Source recovered from documents

- Madhav Kansara's 18-page `Assaniation game.pdf` contains approximately 26,000 extractable characters of Processing game code covering 20 floors, weapons, enemies, bosses, hostages and loot.
- Shreeya's 9-page `game code.pdf` contains approximately 6,300 extractable characters of Processing code for `APEX DRIFT`.
- These are treated as recoverable interactive source rather than media-only submissions.

## Pending verification

### Swayam Kadam — three web artifacts

- Safely inspected and extracted the Finding India and Internet 1995 ZIP archives; no path traversal entries or executable binaries were found.
- Packaged Finding India with its complete ocean and ship artwork, replacing its p5.js CDN reference with the local runtime.
- Packaged Internet 1995 with its complete image, sound, CSS, HTML and JavaScript collection.
- Packaged Let’s Be Friends with its submitted face and hand landmark models plus a locally archived pinned MediaPipe Tasks Vision module and WebAssembly runtime.
- Added exhibition navigation to all three current versions.

### Swayam Kadam — Surviving SSD

- Used the supplied `assets.zip` to restore the complete image, audio and font set referenced by the newer audio-enabled Processing source.
- Converted joystick directions to Arrow keys and the joystick button to Space.
- Preserved the five-screen introduction, six visual player states, missile difficulty curve, 30-second chase, M.O/V.K/P.M encounters, K.T. system, sixty-second graduation target, win and defeat screens.
- Applied the source’s pink-background transparency rule while preparing character artwork.
- Converted large artwork to WebP and WAV audio to MP3; retained tiny character assets as optimized transparent PNGs because they were smaller than WebP.

### Shreeya — Apex Drift

- Recovered the complete Processing source from the submitted nine-page PDF and converted it to p5.js.
- Preserved inertial A/D and Arrow steering, gate/laser logic, integrity, scoring, Escape pause, and Space or mouse restart.
- No serial APIs, external assets or network dependencies are required.

### Sharvari Joshi, Damiyan and Sayli — standalone webpages

- Packaged Memory Space, Breakline — Rooftop Escape and Cat News Network under stable GitHub Pages routes.
- Added exhibition navigation while preserving each page’s submitted visual design and interaction.
- Reviewed executable sections; no malicious behavior, credential access or unexpected data transmission was found.
- Memory Space and Cat News Network use optional Google Fonts; their interactions remain functional if fonts fail to load.

### Sara Khan — Stitch & Survive

- Converted approximately 2,600 lines of Processing/Serial source to browser-native p5.js.
- Replaced joystick left/right/forward/continue/restart input with Arrow keys; no other hardware input existed in the submitted sketch.
- Preserved four escalating collection levels, textile objects, zombies, heart-rate health, moving-road visuals, transitions and the scripted final fight.
- No external assets or network dependencies are required.

### Radhika Mistry — Neon Maze and Focus Tracker

- Converted the Processing/Serial maze to p5.js, mapping joystick directions to Arrow keys and the joystick restart button to Space.
- Preserved level generation, moving power-up, poison trails, spikes, lives, scoring, food and moving portal behavior.
- Packaged the submitted character-selection webpage and added exhibition navigation.
- The webpage currently references four third-party character images; archival status is tracked separately because copyright and host availability should be confirmed before launch.

### Parikshitsingh Bisht — Chain of Events

- Packaged the standalone branching-story builder and added exhibition navigation.
- Reviewed its dynamic HTML generation: visitor-authored titles, descriptions and choices are escaped before rendering.
- The only remaining external requests are optional Google Fonts; the application itself has no remote data dependency.

### Pratyush Girap — Sleepwalker versions 1–3

- Retained all three materially different submitted iterations and their supplied cityscape and walking-frame artwork.
- Archived pinned MediaPipe Hands and Camera Utils packages, including hand landmark models and WebAssembly, so hand tracking no longer relies on jsDelivr.
- Camera access still requires visitor permission and HTTPS, which GitHub Pages supplies.
- Corrected version 3’s copied browser title from “v2 prototype” to “v3 prototype”; gameplay was not changed.

- Visually inspect PDF submissions for recoverable source code.
- Confirm final titles and descriptions during each conversion batch.
- Replace catalogue placeholders with live exercise links as conversions are approved.
