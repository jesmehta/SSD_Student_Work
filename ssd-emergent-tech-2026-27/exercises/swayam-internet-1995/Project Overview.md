**Project Brief: 1995 Time-Travel Web Simulator**

### Core Concept & Objective

An interactive, browser-based historical simulator that allows users to experience the internet as it was in 1995. Built as a stylized **Windows 95 Desktop OS** in **Vanilla HTML/CSS/JS**, the page features a **Netscape Navigator** window acting as a "Time Machine Browser." As the user adjusts a date control, both the web directory and browser capabilities evolve in real time, mirroring the massive technical and cultural shifts of 1995 (inspired by historical analysis, including NationSquid's "What the Internet Was Like in 1995").

### Project Parameters & Architecture

- **Tech Stack:** Pure Vanilla HTML5, CSS3, JavaScript (ES6+), Web Audio API (zero heavy frameworks).
- **Control Mechanism:** **Control-Driven (Sandbox)**. A persistent Date Slider (Jan–Dec 1995) lets the user freely warp time to compare website updates and browser capabilities.
- **Realism Level:** **Pure Historical Realism**. 14.4k/28.8k modem speed throttling, progressive image rendering (top-to-bottom scanlines), authentic 640x480/800x600 viewport constraints, CRT monitor styling, and sound effects.
- **Primary Layout:** **Simulated Desktop OS**. Windows 95 UI shell with a working taskbar, Start Menu, draggable windows, desktop icons, and an embedded Netscape Navigator browser.

### Core Components & Modules

#### 1. System & Time Engine (`time-engine.js` & `os-engine.js`)

- **OS Shell:** Windows 95 window manager handling window focus, dragging, minimizing/maximizing, and taskbar updates.
- **Time State Machine:** A global state tracks `currentMonth` (1–12) and toggles feature flags as time advances:
  - *Jan–Apr 1995:* Static HTML, standard gray backgrounds, blue hyperlinked text, no complex layouts.
  - *May–Aug 1995:* Netscape 1.1/2.0 feature unlocks (`<marquee>`, `<blink>`, tiled background GIFs, table layouts, initial Netscape IPO era).
  - *Sep–Dec 1995:* JavaScript support debut, Java applets, browser wars heat up (Internet Explorer 1.0/2.0 release).

#### 2. Netscape Browser Shell (`browser.js` & `netscape.css`)

- Recreates Netscape Navigator's UI with an interactive address bar, working Back/Forward/Home/Stop buttons, dynamic bookmarks, and the animated lighthouse/logo loading indicator.
- Displays dynamic 404 pages or period-accurate site states based on the active month.

#### 3. 14.4k / 28.8k Connection & Renderer Engine (`modem.js`)

- **Audio Synthesizer:** Pure Web Audio API script generating procedural modem dial-up handshake screeching and disk drive seek sounds.
- **Progressive Image Load:** Custom CSS `clip-path` mask or HTML5 `<canvas>` rendering loop that loads images line-by-line top-to-bottom over a 5–10 second span to replicate slow connections.

### High-Detail Core Website Evolution Directory

- **`yahoo.com`****:**
  - *Jan–Apr:* Text directory titled *"Jerry and David's Guide to the World Wide Web"*.
  - *May–Aug:* Rebranded to **Yahoo!** with basic categorized link trees.
  - *Sep–Dec:* Adds early search input box with basic client-side JavaScript features.
- **`amazon.com`****:**
  - *Jan–Jun:* `404 Not Found` (domain unregistered/inactive).
  - *July:* Launches as an online bookstore with a plain text catalog.
  - *Sep–Dec:* Introduces featured titles and early order forms.
- **`auctionweb.com`** **(eBay):**
  - *Jan–Aug:* `404 Not Found`.
  - *September Launch:* Minimalist text page featuring the iconic broken laser pointer listing.
- **`geocities.com`** **& Personal Pages:**
  - *Jan–Apr:* Simple static homepages.
  - *May–Dec:* GeoCities neighborhoods featuring tiled GIF backgrounds, glowing `<blink>` elements, visitor hit counters, MIDI background music auto-playing via Web Audio API, and Java clock applets.

### Target File Structure

Plaintext

```
/1995-os-simulator
├── index.html          # CRT overlay, OS taskbar, Start Menu, and window shell
├── css/
│   ├── os-theme.css    # Win95 UI components & window styles
│   ├── netscape.css    # Netscape 1.0/2.0 browser UI styling
│   └── crt-effects.css # CRT scanline overlays, glass curvature, flicker
└── js/
    ├── os-engine.js    # Draggable windows, taskbar state, Start Menu logic
    ├── time-engine.js  # Month state machine & feature flag switcher
    ├── modem.js        # Web Audio API dial-up handshake synthesizer
    └── browser.js      # Address bar router, history stack, progressive image loader
```