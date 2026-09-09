const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;

/* ============================================================
   DATA
   ============================================================ */

const DETECTIVES = [{
  id: "dave",
  emoji: "🕵️",
  name: "Detective Dave",
  species: "Human",
  skill: "COMMON SENSE",
  skillDesc: "Can identify obvious hiding places.",
  personality: "Tired but professional.",
  successRate: 61,
  quoteLines: ["“I've solved 61% of my cases.”", "“The rest are still open. Like my eyes. Barely.”"]
}, {
  id: "whiskers",
  emoji: "🐱",
  name: "Inspector Whiskers",
  species: "Cat",
  skill: "UNDER THE FURNITURE",
  skillDesc: "Can discover hidden objects under beds, sofas and tables.",
  personality: "Judgemental.",
  successRate: 74,
  quoteLines: ["“I've solved 74% of my cases.”", "“The other 26% hid better than expected.”"]
}, {
  id: "trash",
  emoji: "🦝",
  name: "Agent Trash",
  species: "Raccoon",
  skill: "MESS DETECTION",
  skillDesc: "Can find clues inside bags, drawers and trash.",
  personality: "Chaotic.",
  successRate: 32,
  quoteLines: ["“I have solved 32% of my cases.”", "“The other 68% were technically not my fault.”"]
}, {
  id: "bones",
  emoji: "🐕",
  name: "Sherlock Bones",
  species: "Dog",
  skill: "SUPER SMELL",
  skillDesc: "Can detect hidden clues.",
  personality: "Excited and easily distracted.",
  successRate: 58,
  quoteLines: ["“I've solved 58% of my cases!”", "“I forgot the other 42% almost immediately.”"]
}, {
  id: "hoot",
  emoji: "🦉",
  name: "Professor Hoot",
  species: "Owl",
  skill: "ANALYSIS",
  skillDesc: "Can identify suspicious clues.",
  personality: "Overthinks everything.",
  successRate: 83,
  quoteLines: ["“My success rate is 83%.”", "“I calculated it. Several times. Just to be sure.”"]
}, {
  id: "ribbit",
  emoji: "🐸",
  name: "Detective Ribbit",
  species: "Frog",
  skill: "JUMP TO CONCLUSIONS",
  skillDesc: "Can randomly reveal strange theories.",
  personality: "Extremely confident.",
  successRate: 100,
  quoteLines: ["“I've solved 100% of my cases.”", "“...according to me.”"]
}, {
  id: "404",
  emoji: "🤖",
  name: "Unit 404",
  species: "Robot",
  skill: "PROBABILITY",
  skillDesc: "Can calculate where an object is most likely located.",
  personality: "Emotionless.",
  successRate: 91.2,
  quoteLines: ["“Success rate: 91.2%.”", "“Confidence in that number: low.”"]
}];
const OBJECTS = [{
  emoji: "🔑",
  label: "Keys",
  key: "keys"
}, {
  emoji: "📱",
  label: "Phone",
  key: "phone"
}, {
  emoji: "🎧",
  label: "Earphones",
  key: "earphones"
}, {
  emoji: "🧦",
  label: "Sock",
  key: "sock"
}, {
  emoji: "👓",
  label: "Glasses",
  key: "glasses"
}, {
  emoji: "💳",
  label: "Wallet",
  key: "wallet"
}, {
  emoji: "🖊️",
  label: "Pen",
  key: "pen"
}, {
  emoji: "🔌",
  label: "Charger",
  key: "charger"
}, {
  emoji: "🎒",
  label: "Bag",
  key: "bagitem"
}, {
  emoji: "📺",
  label: "Remote",
  key: "remote"
}, {
  emoji: "☂️",
  label: "Umbrella",
  key: "umbrella"
}, {
  emoji: "🧴",
  label: "Water Bottle",
  key: "waterbottle"
}, {
  emoji: "📚",
  label: "Assignment",
  key: "assignment"
}, {
  emoji: "🧠",
  label: "Brain Cells",
  key: "braincells"
}, {
  emoji: "🫠",
  label: "Motivation",
  key: "motivation"
}, {
  emoji: "💡",
  label: "Creativity",
  key: "creativity"
}, {
  emoji: "😴",
  label: "Sleep",
  key: "sleep"
}, {
  emoji: "💸",
  label: "Money",
  key: "money"
}, {
  emoji: "❤️",
  label: "Dignity",
  key: "dignity"
}, {
  emoji: "👻",
  label: "Social Battery",
  key: "socialbattery"
}, {
  emoji: "🧠",
  label: "Last Brain Cell",
  key: "lastbraincell"
}, {
  emoji: "🫥",
  label: "Attention Span",
  key: "attentionspan"
}];
const LOCATIONS = ["Bedroom", "Living Room", "Kitchen", "Office", "Garage", "Backyard"];
const DIFFICULTIES = ["ROUTINE", "SUSPICIOUS", "BIZARRE", "CONSPIRACY-LEVEL"];
const SUSPECT_TEMPLATE = () => [{
  key: "bed",
  emoji: "🛏️",
  name: "The Bed",
  motive: "Comfort-related. Unclear.",
  alibi: "“I was just lying here.”",
  priorCrimes: "Held 14 lost items hostage since March.",
  suspicion: 3
}, {
  key: "chair",
  emoji: "🪑",
  name: "The Chair",
  motive: "Unknown.",
  alibi: "None.",
  priorCrimes: "Covered in clothes for 3 months.",
  suspicion: 2
}, {
  key: "bag",
  emoji: "🎒",
  name: "The Bag",
  motive: "Hoarding tendencies.",
  alibi: "“Everything in me is organized.” (lie)",
  priorCrimes: "Swallowed 3 pens, 1 charger, and some hope.",
  suspicion: 4
}, {
  key: "jacket",
  emoji: "🧥",
  name: "The Jacket",
  motive: "Pockets never checked.",
  alibi: "“Nobody ever searches me properly.”",
  priorCrimes: "Pending investigation.",
  suspicion: 1
}, {
  key: "you",
  emoji: "🫵",
  name: "You",
  motive: "Chronic carelessness.",
  alibi: "“I would never.”",
  priorCrimes: "Extensive.",
  suspicion: 5
}];
const ROOM_OBJECTS = [{
  key: "bed",
  emoji: "🛏️",
  label: "Bed",
  reactions: ["A bed.", "Still a bed.", "You keep checking the bed."],
  special: "bed-decision"
}, {
  key: "desk",
  emoji: "🗄️",
  label: "Desk",
  reactions: ["A cluttered desk.", "Papers everywhere.", "The desk offers no comment."]
}, {
  key: "chair",
  emoji: "🪑",
  label: "Chair",
  reactions: ["A chair.", "Still a chair.", "You really like this chair."]
}, {
  key: "bag",
  emoji: "🎒",
  label: "Bag",
  reactions: ["Just an empty bag now."],
  special: "bag-choice"
}, {
  key: "drawer",
  emoji: "🗃️",
  label: "Drawer",
  reactions: ["A stuck drawer.", "It creaks open.", "Nothing new in here."],
  special: "drawer-search"
}, {
  key: "plant",
  emoji: "🪴",
  label: "Plant",
  reactions: ["The plant looks suspicious.", "The plant refuses to cooperate.", "The plant says nothing.", "The plant is judging you.", "THE PLANT HAS HAD ENOUGH."],
  special: "plant-egg"
}, {
  key: "lamp",
  emoji: "💡",
  label: "Lamp",
  reactions: ["A lamp. It is on.", "A lamp. Still on.", "The lamp has seen things."]
}, {
  key: "window",
  emoji: "🪟",
  label: "Window",
  reactions: ["A window. Nothing outside.", "Still nothing outside.", "Wait, was that a pigeon?"]
}, {
  key: "trashbin",
  emoji: "🗑️",
  label: "Trash Bin",
  reactions: ["You dig through the trash.", "Regret sets in.", "Absolutely not."],
  special: "trash-search"
}, {
  key: "jacket",
  emoji: "🧥",
  label: "Jacket",
  reactions: ["Nothing interesting."],
  special: "jacket-locked"
}, {
  key: "books",
  emoji: "📚",
  label: "Books",
  reactions: ["A stack of books.", "Still a stack of books.", "One of these is upside down. Unrelated."]
}, {
  key: "box",
  emoji: "📦",
  label: "Mystery Box",
  reactions: ["Just cardboard now."],
  special: "mystery-box"
}];
const RANDOM_EVENTS = [{
  lines: ["🐦 A pigeon flies across the screen.", "Detective: “Did you see that?”"],
  clue: null
}, {
  lines: ["🚨 NEW CLUE", "You found a receipt.", "Detective: “It's for pizza.”", "“We don't know why this matters.”"],
  clue: {
    title: "A pizza receipt",
    desc: "Utterly irrelevant. Deeply concerning."
  }
}, {
  lines: ["💡 The lights flicker.", "Detective: “That's probably fine.”"],
  clue: null
}, {
  lines: ["🧦 A random sock appears.", "Detective: “Don't touch it.”"],
  clue: null
}];
const BAG_CLUES = {
  phone: "A tangled charging cable, no phone attached.",
  sock: "One lonely, unmatched sock.",
  keys: "A spare key that opens absolutely nothing.",
  default: "A tangled cable and some suspicious crumbs."
};
const SUSPECT_STATEMENTS = {
  bed: "Statement: “I don't recall seeing anything. I was very cozy.”",
  chair: "Statement: “No comment.”",
  bag: "Statement: “I plead the fifth zipper.”",
  jacket: "Statement: “Check my left pocket.”",
  you: "Statement: “Why are you investigating yourself?”"
};
const SORT_USELESS = ["🥄 Spoon", "🧦 Random sock", "🧾 Receipt from 2022"];
const sortUsefulFor = objLabel => [`🔑 Empty pocket`, `🧾 Door receipt`, `🎒 Bag`];
const ENDINGS = {
  perfect: {
    title: "CASE SOLVED",
    stars: "⭐⭐⭐⭐⭐",
    body: ["You found it.", "Textbook detective work."],
    line: "Excellent work."
  },
  funny: {
    title: "CASE SOLVED (SORT OF)",
    stars: "⭐⭐⭐",
    body: ["We spent all this time investigating.", "It was in your pocket."],
    line: "I need a vacation."
  },
  wrong: {
    title: "WRONG SUSPECT",
    stars: "⭐",
    body: [],
    line: ""
  },
  chaotic: {
    title: "CASE CLOSED — CONFESSION",
    stars: "⭐⭐",
    body: ["“Interesting.”", "You have confessed."],
    line: "I did not see that coming."
  },
  secret: {
    title: "SECRET CASE UNLOCKED",
    stars: "⭐⭐⭐⭐⭐",
    body: ["“Wait.”", "This case is bigger than we thought."],
    line: "🔓 Secret case unlocked."
  }
};
const RANKS = ["Rookie Detective", "Decent Detective", "Suspicious Detective", "Master Detective", "Absolute Menace", "🕵️ Chaotic Detective"];

/* ============================================================
   HELPERS
   ============================================================ */

const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const blockBar = pct => "█".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10));
const uid = () => Math.random().toString(36).slice(2, 9);
function pickCulprit() {
  const roll = Math.random();
  if (roll < 0.2) return "bed";
  if (roll < 0.35) return "chair";
  if (roll < 0.55) return "bag";
  if (roll < 0.8) return "jacket";
  return "you";
}
function useBeep() {
  const ctxRef = useRef(null);
  return useCallback((type, on) => {
    if (!on) return;
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = ctxRef.current;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      let freq = 440,
        dur = 0.1;
      if (type === "click") {
        freq = 320;
        dur = 0.05;
      }
      if (type === "clue") {
        freq = 700;
        dur = 0.15;
      }
      if (type === "wrong") {
        freq = 140;
        dur = 0.25;
      }
      if (type === "win") {
        freq = 880;
        dur = 0.2;
      }
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.06, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.start(now);
      o.stop(now + dur);
    } catch (e) {/* audio unsupported, ignore */}
  }, []);
}

/* ============================================================
   ROOT APP
   ============================================================ */

function App() {
  const [screen, setScreen] = useState("start");
  const [detective, setDetective] = useState(null);
  const [inspecting, setInspecting] = useState(null);
  const [object, setObject] = useState(null);
  const [customText, setCustomText] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [caseNumber, setCaseNumber] = useState(8294);
  const [location, setLocation] = useState("Bedroom");
  const [difficulty, setDifficulty] = useState("SUSPICIOUS");
  const [suspects, setSuspects] = useState(SUSPECT_TEMPLATE());
  const [culprit, setCulprit] = useState("jacket");
  const [clues, setClues] = useState([]);
  const [investigation, setInvestigation] = useState(10);
  const [confidence, setConfidence] = useState(50);
  const [mood, setMood] = useState("idle");
  const [reaction, setReaction] = useState("Let's take a look around.");
  const [clickCounts, setClickCounts] = useState({});
  const [fabricFound, setFabricFound] = useState(false);
  const [hiddenClueFound, setHiddenClueFound] = useState(false);
  const [interrogated, setInterrogated] = useState({});
  const [wrongStreak, setWrongStreak] = useState(0);
  const [wrongMsgShown, setWrongMsgShown] = useState(false);
  const [detClicks, setDetClicks] = useState(0);
  const [detStopMsg, setDetStopMsg] = useState(false);
  const [asleep, setAsleep] = useState(false);
  const [bedPanel, setBedPanel] = useState(false);
  const [bagPanel, setBagPanel] = useState(false);
  const [suspectModal, setSuspectModal] = useState(null);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [clueModal, setClueModal] = useState(null);
  const [miniGame, setMiniGame] = useState(null);
  const [event, setEvent] = useState(null);
  const [evidenceBagOpen, setEvidenceBagOpen] = useState(false);
  const [accused, setAccused] = useState(null);
  const [revealStage, setRevealStage] = useState(0);
  const [ending, setEnding] = useState("wrong");
  const [soundOn, setSoundOn] = useState(true);
  const lastActionRef = useRef(Date.now());
  const idleTimerRef = useRef(null);
  const eventTimerRef = useRef(null);
  const moodTimerRef = useRef(null);
  const revealTimersRef = useRef([]);
  const beep = useBeep();
  useEffect(() => {
    idleTimerRef.current = setInterval(() => {
      if (screen === "room" && Date.now() - lastActionRef.current > 20000) setAsleep(true);
    }, 3000);
    return () => clearInterval(idleTimerRef.current);
  }, [screen]);
  useEffect(() => () => {
    clearTimeout(eventTimerRef.current);
    clearTimeout(moodTimerRef.current);
    revealTimersRef.current.forEach(clearTimeout);
  }, []);
  function poke() {
    lastActionRef.current = Date.now();
    if (asleep) setAsleep(false);
  }
  function flashMood(m) {
    setMood(m);
    clearTimeout(moodTimerRef.current);
    moodTimerRef.current = setTimeout(() => setMood("idle"), 800);
  }
  function addInvestigation(n) {
    setInvestigation(v => clamp(v + n, 0, 100));
  }
  function addConfidence(n) {
    setConfidence(v => clamp(v + n, 0, 100));
  }
  function addClue(title, desc) {
    setClues(c => [...c, {
      id: uid(),
      title,
      desc
    }]);
    beep("clue", soundOn);
  }
  function maybeEvent() {
    if (Math.random() < 0.28) {
      const ev = rand(RANDOM_EVENTS);
      setEvent(ev);
      if (ev.clue) addClue(ev.clue.title, ev.clue.desc);
      clearTimeout(eventTimerRef.current);
      eventTimerRef.current = setTimeout(() => setEvent(null), 4200);
    }
  }

  /* ---------------- navigation / setup ---------------- */

  function acceptCase() {
    setScreen("detective");
  }
  function selectDetective(d) {
    setDetective(d);
    setInspecting(d.id);
  }
  function randomDetective() {
    const d = rand(DETECTIVES);
    setDetective(d);
    setInspecting(d.id);
  }
  function confirmDetective() {
    setScreen("object");
  }
  function pickObject(obj) {
    setObject(obj);
    setShowCustom(obj.key === "custom");
  }
  function generateCase(obj) {
    setObject(obj);
    setCaseNumber(Math.floor(1000 + Math.random() * 9000));
    setLocation(rand(LOCATIONS));
    setDifficulty(rand(DIFFICULTIES));
    setSuspects(SUSPECT_TEMPLATE());
    setCulprit(pickCulprit());
    setClues([]);
    setInvestigation(10);
    setConfidence(50);
    setMood("idle");
    setReaction(`New case accepted. ${detective ? detective.name : "The detective"} is ready.`);
    setClickCounts({});
    setFabricFound(false);
    setHiddenClueFound(false);
    setInterrogated({});
    setWrongStreak(0);
    setWrongMsgShown(false);
    setDetClicks(0);
    setDetStopMsg(false);
    setAsleep(false);
    setBedPanel(false);
    setBagPanel(false);
    setSuspectModal(null);
    setDialogueOpen(false);
    setClueModal(null);
    setMiniGame(null);
    setEvent(null);
    setAccused(null);
    setRevealStage(0);
    setScreen("casegen");
  }
  function confirmObject() {
    let finalObj = object;
    if (object.key === "custom") finalObj = {
      emoji: "❓",
      label: customText.trim() || "Mystery Item",
      key: "custom"
    };
    generateCase(finalObj);
  }
  function enterInvestigation() {
    setScreen("room");
  }

  /* ---------------- room interactions ---------------- */

  function bump(key) {
    setClickCounts(c => ({
      ...c,
      [key]: (c[key] || 0) + 1
    }));
    return clickCounts[key] || 0;
  }
  function clickDetective() {
    poke();
    const n = detClicks + 1;
    setDetClicks(n);
    if (n === 10 && !detStopMsg) {
      setReaction("STOP CLICKING ME.");
      setDetStopMsg(true);
      flashMood("shake");
      beep("click", soundOn);
    } else {
      flashMood("idle");
    }
  }
  function objectName() {
    return object ? object.label : "thing";
  }
  function handleRoomObject(obj) {
    poke();
    beep("click", soundOn);
    const count = bump(obj.key);
    maybeEvent();
    switch (obj.special) {
      case "bed-decision":
        {
          if (count === 0) setBedPanel(true);else {
            setReaction(obj.reactions[Math.min(count, obj.reactions.length - 1)]);
            flashMood("idle");
          }
          break;
        }
      case "bag-choice":
        {
          if (count === 0) setBagPanel(true);else {
            setReaction(obj.reactions[0]);
            flashMood("idle");
          }
          break;
        }
      case "drawer-search":
        {
          const guaranteed = detective && detective.id === "trash";
          if (guaranteed && count === 0) {
            addClue("A crumpled note", "Agent Trash rips the drawer open effortlessly. Something falls out.");
            setReaction("Agent Trash finds something immediately. Chaos has its uses.");
            addInvestigation(10);
            addConfidence(5);
            flashMood("celebrate");
          } else if (Math.random() < 0.3) {
            addClue("A drawer oddity", "Something that definitely shouldn't be in a drawer.");
            setReaction("Huh. Didn't expect that.");
            addInvestigation(8);
            flashMood("celebrate");
          } else {
            setReaction(obj.reactions[Math.min(count, obj.reactions.length - 1)]);
            flashMood("idle");
          }
          break;
        }
      case "plant-egg":
        {
          const idx = Math.min(count, obj.reactions.length - 1);
          setReaction(obj.reactions[idx]);
          if (count >= 4 && !hiddenClueFound) {
            setHiddenClueFound(true);
            addClue("A hidden note behind the plant", "This case is bigger than we thought.");
            addInvestigation(15);
            flashMood("confused");
          } else {
            flashMood(count % 2 === 0 ? "confused" : "idle");
          }
          break;
        }
      case "trash-search":
        {
          if (count === 0) {
            addClue("A suspicious receipt", "Faded. Possibly important. Possibly not.");
            setReaction("You find a receipt. Progress, of a kind.");
            addInvestigation(8);
            flashMood("celebrate");
          } else {
            setReaction(obj.reactions[Math.min(count, obj.reactions.length - 1)]);
            flashMood("confused");
          }
          break;
        }
      case "jacket-locked":
        {
          if (fabricFound) {
            const already = clues.some(c => c.title === "A jacket pocket, finally checked");
            if (!already) {
              addClue("A jacket pocket, finally checked", "This looks like something from your jacket.");
              addInvestigation(15);
              addConfidence(10);
              setSuspects(s => s.map(sp => sp.key === "jacket" ? {
                ...sp,
                suspicion: 5
              } : sp));
            }
            setReaction("This looks like something from your jacket.");
            flashMood("celebrate");
          } else {
            setReaction("Nothing interesting. Yet.");
            flashMood("idle");
          }
          break;
        }
      case "mystery-box":
        {
          if (count === 0) {
            setFabricFound(true);
            addClue("A piece of blue fabric", "This looks familiar. Worth checking the jacket.");
            setReaction("A piece of blue fabric. The jacket suddenly looks relevant.");
            addInvestigation(10);
            flashMood("celebrate");
          } else {
            setReaction("Just cardboard now.");
            flashMood("idle");
          }
          break;
        }
      default:
        {
          setReaction(obj.reactions[Math.min(count, obj.reactions.length - 1)]);
          flashMood("idle");
        }
    }
  }
  function bedChoice(choice) {
    poke();
    if (choice === "take") {
      addClue("An unidentified item from under the bed", "Could be evidence. Could be a very old snack.");
      addInvestigation(10);
      addConfidence(5);
      setReaction("You take it. Whatever it was.");
      flashMood("celebrate");
    } else if (choice === "leave") {
      addInvestigation(2);
      setReaction("Probably wise. Nothing happens.");
      flashMood("idle");
    } else {
      const line = detective ? `${detective.name} shrugs. "Not my department."` : "No response.";
      addInvestigation(5);
      setReaction(line);
      flashMood("confused");
    }
    setBedPanel(false);
  }
  function bagChoice(choice) {
    poke();
    if (choice === "open") {
      const text = BAG_CLUES[object.key] || BAG_CLUES.default;
      addClue("A bag clue", text);
      addInvestigation(15);
      addConfidence(10);
      setReaction(text);
      flashMood("celebrate");
    } else {
      addInvestigation(2);
      setReaction("Probably wise. Or extremely unwise.");
      flashMood("idle");
    }
    setBagPanel(false);
  }

  /* ---------------- suspects / interrogation ---------------- */

  function openSuspect(s) {
    poke();
    setSuspectModal(s);
    setDialogueOpen(false);
  }
  function startDialogue() {
    setDialogueOpen(true);
  }
  function chooseDialogue(letter) {
    poke();
    const s = suspectModal;
    let line = "";
    if (letter === "A") {
      line = `${s.name} remains silent.`;
      addConfidence(2);
      setWrongStreak(0);
    } else if (letter === "B") {
      line = `${s.name} is offended.`;
      addConfidence(-5);
      setWrongStreak(w => w + 1);
    } else {
      line = `${s.name} trusts you.`;
      addConfidence(5);
      setWrongStreak(0);
    }
    const first = !interrogated[s.key];
    if (first) {
      setInterrogated(i => ({
        ...i,
        [s.key]: true
      }));
      addClue(`${s.name}'s statement`, SUSPECT_STATEMENTS[s.key] || "No comment.");
      addInvestigation(6);
    }
    setReaction(line);
    flashMood(letter === "B" ? "confused" : "idle");
    if (wrongStreak + (letter === "B" ? 1 : 0) >= 3 && !wrongMsgShown) {
      setWrongMsgShown(true);
      setTimeout(() => setReaction("You may actually be the problem."), 900);
    }
    setDialogueOpen(false);
  }

  /* ---------------- mini games ---------------- */

  function openMiniGame(type) {
    poke();
    setMiniGame({
      type,
      state: "playing"
    });
  }
  function closeMiniGame() {
    setMiniGame(null);
  }
  function miniGameResult(success, msg) {
    if (success) {
      addInvestigation(10);
      addConfidence(10);
      beep("win", soundOn);
      flashMood("celebrate");
    } else {
      addConfidence(-5);
      beep("wrong", soundOn);
      flashMood("confused");
    }
    setReaction(msg);
    setMiniGame(mg => ({
      ...mg,
      state: "done",
      resultMsg: msg
    }));
  }

  /* ---------------- accusation / reveal ---------------- */

  function goToAccusation() {
    poke();
    setScreen("accusation");
  }
  function confirmAccusation() {
    if (!accused) return;
    setScreen("reveal");
    setRevealStage(0);
    const seq = [1200, 1000, 900, 900, 900];
    let t = 0;
    const stages = ["sure", "3", "2", "1", "go"];
    stages.forEach((label, i) => {
      t += seq[i];
      const timer = setTimeout(() => {
        setRevealStage(i + 1);
        if (label === "go") finalizeEnding();
      }, t);
      revealTimersRef.current.push(timer);
    });
  }
  function finalizeEnding() {
    let e = "wrong";
    if (accused === "you") e = "chaotic";else if (hiddenClueFound && accused === culprit) e = "secret";else if (accused === culprit) e = Math.random() < 0.5 ? "perfect" : "funny";else e = "wrong";
    setEnding(e);
    setTimeout(() => setScreen("result"), 200);
  }

  /* ---------------- replay ---------------- */

  function playAgain() {
    const obj = rand(OBJECTS);
    generateCase(obj);
  }
  function changeDetective() {
    setScreen("detective");
  }

  /* ============================================================
     RENDER
     ============================================================ */

  return /*#__PURE__*/React.createElement("div", {
    className: "wdmg-app"
  }, /*#__PURE__*/React.createElement(Style, null), screen === "start" && /*#__PURE__*/React.createElement(StartScreen, {
    onAccept: acceptCase
  }), screen === "detective" && /*#__PURE__*/React.createElement(DetectiveSelect, {
    detective: detective,
    inspecting: inspecting,
    onSelect: selectDetective,
    onInspect: setInspecting,
    onRandom: randomDetective,
    onConfirm: confirmDetective
  }), screen === "object" && /*#__PURE__*/React.createElement(ObjectSelect, {
    object: object,
    showCustom: showCustom,
    customText: customText,
    setCustomText: setCustomText,
    onPick: pickObject,
    onConfirm: confirmObject
  }), screen === "casegen" && /*#__PURE__*/React.createElement(CaseGen, {
    caseNumber: caseNumber,
    object: object,
    location: location,
    difficulty: difficulty,
    detective: detective,
    suspects: suspects,
    onEnter: enterInvestigation
  }), screen === "room" && /*#__PURE__*/React.createElement(GameRoom, {
    detective: detective,
    object: object,
    caseNumber: caseNumber,
    location: location,
    investigation: investigation,
    confidence: confidence,
    mood: asleep ? "asleep" : mood,
    reaction: reaction,
    clues: clues,
    clickCounts: clickCounts,
    fabricFound: fabricFound,
    suspects: suspects,
    soundOn: soundOn,
    setSoundOn: setSoundOn,
    bedPanel: bedPanel,
    bagPanel: bagPanel,
    event: event,
    evidenceBagOpen: evidenceBagOpen,
    setEvidenceBagOpen: setEvidenceBagOpen,
    suspectModal: suspectModal,
    dialogueOpen: dialogueOpen,
    clueModal: clueModal,
    miniGame: miniGame,
    onClickDetective: clickDetective,
    onRoomObject: handleRoomObject,
    onBedChoice: bedChoice,
    onBagChoice: bagChoice,
    onOpenSuspect: openSuspect,
    onCloseSuspect: () => setSuspectModal(null),
    onStartDialogue: startDialogue,
    onChooseDialogue: chooseDialogue,
    onOpenClue: setClueModal,
    onCloseClue: () => setClueModal(null),
    onOpenMiniGame: openMiniGame,
    onCloseMiniGame: closeMiniGame,
    onMiniGameResult: miniGameResult,
    onProceed: goToAccusation
  }), screen === "accusation" && /*#__PURE__*/React.createElement(FinalAccusation, {
    suspects: suspects,
    accused: accused,
    setAccused: setAccused,
    onConfirm: confirmAccusation
  }), screen === "reveal" && /*#__PURE__*/React.createElement(Reveal, {
    stage: revealStage,
    detective: detective
  }), screen === "result" && /*#__PURE__*/React.createElement(CaseResult, {
    detective: detective,
    object: object,
    caseNumber: caseNumber,
    clues: clues,
    confidence: confidence,
    accused: accused,
    suspects: suspects,
    ending: ending,
    clickCounts: clickCounts,
    onPlayAgain: playAgain,
    onChangeDetective: changeDetective
  }));
}

/* ============================================================
   SCREEN: START
   ============================================================ */

function StartScreen({
  onAccept
}) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1700);
    const t3 = setTimeout(() => setStep(3), 2900);
    const t4 = setTimeout(() => setStep(4), 3700);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "screen start-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: `spotlight ${step >= 1 ? "on" : ""}`
  }), /*#__PURE__*/React.createElement("div", {
    className: `silhouette ${step >= 1 ? "walk-in" : ""}`
  }, "\uD83D\uDD75\uFE0F"), /*#__PURE__*/React.createElement("div", {
    className: "start-text"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "case-file-title"
  }, "CASE FILE: 0001"), step >= 2 && /*#__PURE__*/React.createElement("p", {
    className: "fade-line"
  }, "\u201CWe've received a new case.\u201D"), step >= 3 && /*#__PURE__*/React.createElement("p", {
    className: "fade-line"
  }, "\u201CSomeone has lost something.\u201D"), step >= 4 && /*#__PURE__*/React.createElement("p", {
    className: "fade-line dramatic"
  }, "\u201CAgain.\u201D")), step >= 4 && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary big-btn",
    onClick: onAccept
  }, "\uD83D\uDD0E ACCEPT CASE"), /*#__PURE__*/React.createElement("p", {
    className: "tagline"
  }, "\u201CYou lost it. We investigate it. Probably badly.\u201D"));
}

/* ============================================================
   SCREEN: DETECTIVE SELECT
   ============================================================ */

function DetectiveSelect({
  detective,
  inspecting,
  onSelect,
  onInspect,
  onRandom,
  onConfirm
}) {
  const active = DETECTIVES.find(d => d.id === inspecting) || null;
  return /*#__PURE__*/React.createElement("div", {
    className: "screen"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "CHOOSE YOUR DETECTIVE"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, "Inspect each candidate. Then commit to your questionable choice."), /*#__PURE__*/React.createElement("div", {
    className: "detective-grid"
  }, DETECTIVES.map(d => /*#__PURE__*/React.createElement("button", {
    key: d.id,
    className: `card detective-card ${detective && detective.id === d.id ? "selected" : ""} ${inspecting === d.id ? "inspected" : ""}`,
    onClick: () => onInspect(d.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: `card-emoji ${inspecting === d.id ? "wiggle" : ""}`
  }, d.emoji), /*#__PURE__*/React.createElement("div", {
    className: "card-name"
  }, d.name), /*#__PURE__*/React.createElement("div", {
    className: "card-species evidence-tag"
  }, d.species)))), active && /*#__PURE__*/React.createElement("div", {
    className: "inspect-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inspect-emoji"
  }, active.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "inspect-name"
  }, active.name), /*#__PURE__*/React.createElement("p", {
    className: "inspect-skill"
  }, "SKILL: ", active.skill), /*#__PURE__*/React.createElement("p", {
    className: "inspect-desc"
  }, active.skillDesc), /*#__PURE__*/React.createElement("p", {
    className: "inspect-personality"
  }, active.personality), active.quoteLines.map((l, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    className: "inspect-quote",
    style: {
      animationDelay: `${i * 0.3}s`
    }
  }, l)), /*#__PURE__*/React.createElement("div", {
    className: "row-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => onSelect(active)
  }, "SELECT DETECTIVE")))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onRandom
  }, "\uD83C\uDFB2 RANDOM DETECTIVE"), detective && /*#__PURE__*/React.createElement("div", {
    className: "selection-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "selection-banner-text"
  }, "SELECTED: ", /*#__PURE__*/React.createElement("strong", null, detective.emoji, " ", detective.name)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onConfirm
  }, "CONTINUE \u2192")));
}

/* ============================================================
   SCREEN: OBJECT SELECT
   ============================================================ */

function ObjectSelect({
  object,
  showCustom,
  customText,
  setCustomText,
  onPick,
  onConfirm
}) {
  const customObj = {
    emoji: "✏️",
    label: "Custom Object",
    key: "custom"
  };
  const isCustom = object && object.key === "custom";
  const canConfirm = object && (object.key !== "custom" || customText.trim().length > 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "screen"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "WHAT DID YOU LOSE?"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, "Choose your case. Choose your suffering."), /*#__PURE__*/React.createElement("div", {
    className: "object-grid"
  }, OBJECTS.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.key,
    className: `card object-card ${object && object.key === o.key ? "selected" : ""}`,
    onClick: () => onPick(o)
  }, /*#__PURE__*/React.createElement("span", {
    className: "object-emoji"
  }, o.emoji), /*#__PURE__*/React.createElement("span", {
    className: "object-label"
  }, o.label))), /*#__PURE__*/React.createElement("button", {
    className: `card object-card ${isCustom ? "selected" : ""}`,
    onClick: () => onPick(customObj)
  }, /*#__PURE__*/React.createElement("span", {
    className: "object-emoji"
  }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("span", {
    className: "object-label"
  }, "Custom Object"))), showCustom && /*#__PURE__*/React.createElement("input", {
    className: "custom-input",
    type: "text",
    placeholder: "Type what you lost...",
    value: customText,
    maxLength: 40,
    onChange: e => setCustomText(e.target.value)
  }), canConfirm && /*#__PURE__*/React.createElement("div", {
    className: "selection-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "selection-banner-text"
  }, "CASE SUBJECT: ", /*#__PURE__*/React.createElement("strong", null, object.key === "custom" ? customText.trim() || "???" : object.label)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onConfirm
  }, "GENERATE CASE \uD83D\uDD0E")));
}

/* ============================================================
   SCREEN: CASE GEN
   ============================================================ */

function CaseGen({
  caseNumber,
  object,
  location,
  difficulty,
  detective,
  suspects,
  onEnter
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "screen casegen-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-file-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stamp report-stamp"
  }, difficulty), /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "CASE #", caseNumber), /*#__PURE__*/React.createElement("p", {
    className: "case-gen-line"
  }, /*#__PURE__*/React.createElement("strong", null, "MISSING OBJECT:"), " ", object.emoji, " ", object.label.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    className: "case-gen-line"
  }, /*#__PURE__*/React.createElement("strong", null, "LOCATION:"), " ", location.toUpperCase()), /*#__PURE__*/React.createElement("p", {
    className: "case-gen-line"
  }, /*#__PURE__*/React.createElement("strong", null, "DIFFICULTY:"), " ", difficulty), /*#__PURE__*/React.createElement("p", {
    className: "case-gen-line"
  }, /*#__PURE__*/React.createElement("strong", null, "DETECTIVE:"), " ", detective.emoji, " ", detective.name), /*#__PURE__*/React.createElement("h3", {
    className: "mini-heading"
  }, "KNOWN SUSPECTS"), /*#__PURE__*/React.createElement("div", {
    className: "suspect-chip-row"
  }, suspects.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.key,
    className: "suspect-chip"
  }, s.emoji, " ", s.name)))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary big-btn",
    onClick: onEnter
  }, "ENTER INVESTIGATION"));
}

/* ============================================================
   SCREEN: GAME ROOM
   ============================================================ */

function GameRoom(props) {
  const {
    detective,
    object,
    caseNumber,
    location,
    investigation,
    confidence,
    mood,
    reaction,
    clues,
    clickCounts,
    fabricFound,
    suspects,
    soundOn,
    setSoundOn,
    bedPanel,
    bagPanel,
    event,
    evidenceBagOpen,
    setEvidenceBagOpen,
    suspectModal,
    dialogueOpen,
    clueModal,
    miniGame,
    onClickDetective,
    onRoomObject,
    onBedChoice,
    onBagChoice,
    onOpenSuspect,
    onCloseSuspect,
    onStartDialogue,
    onChooseDialogue,
    onOpenClue,
    onCloseClue,
    onOpenMiniGame,
    onCloseMiniGame,
    onMiniGameResult,
    onProceed
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: "screen room-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-header-item"
  }, "CASE #", caseNumber), /*#__PURE__*/React.createElement("div", {
    className: "case-header-item"
  }, object.emoji, " ", object.label), /*#__PURE__*/React.createElement("div", {
    className: "case-header-item"
  }, location), /*#__PURE__*/React.createElement("div", {
    className: "case-header-item"
  }, detective.emoji, " ", detective.name), /*#__PURE__*/React.createElement("button", {
    className: "sound-toggle",
    onClick: () => setSoundOn(!soundOn)
  }, soundOn ? "🔊" : "🔇")), /*#__PURE__*/React.createElement("div", {
    className: "meters"
  }, /*#__PURE__*/React.createElement(Meter, {
    label: "\uD83D\uDD0E INVESTIGATION",
    pct: investigation,
    color: "var(--red)"
  }), /*#__PURE__*/React.createElement(Meter, {
    label: "\uD83E\uDDE0 DETECTIVE CONFIDENCE",
    pct: confidence,
    color: "var(--yellow)"
  })), event && /*#__PURE__*/React.createElement("div", {
    className: "event-banner"
  }, event.lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "event-line",
    style: {
      animationDelay: `${i * 0.25}s`
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "room-grid-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel detective-panel"
  }, /*#__PURE__*/React.createElement("button", {
    className: `detective-figure large mood-${mood}`,
    onClick: onClickDetective
  }, mood === "asleep" ? "😴" : detective.emoji), /*#__PURE__*/React.createElement("div", {
    className: "detective-name"
  }, detective.name), /*#__PURE__*/React.createElement("div", {
    className: "ability-line"
  }, "Skill: ", detective.skill), reaction && /*#__PURE__*/React.createElement("div", {
    className: "speech-bubble"
  }, reaction)), /*#__PURE__*/React.createElement("div", {
    className: "panel room-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mini-heading"
  }, "EXPLORE THE ", location.toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "room-objects-grid"
  }, ROOM_OBJECTS.map(o => {
    const locked = o.special === "jacket-locked" && !fabricFound;
    return /*#__PURE__*/React.createElement("button", {
      key: o.key,
      className: `room-obj-tile ${locked ? "locked" : ""}`,
      onClick: () => onRoomObject(o),
      title: o.label
    }, /*#__PURE__*/React.createElement("span", {
      className: "room-obj-emoji"
    }, o.emoji), /*#__PURE__*/React.createElement("span", {
      className: "room-obj-label"
    }, o.label));
  })), bedPanel && /*#__PURE__*/React.createElement(DecisionPanel, {
    title: "You discover something under the bed.",
    options: [{
      label: "TAKE IT",
      action: () => onBedChoice("take")
    }, {
      label: "LEAVE IT",
      action: () => onBedChoice("leave")
    }, {
      label: "ASK THE DETECTIVE",
      action: () => onBedChoice("ask")
    }]
  }), bagPanel && /*#__PURE__*/React.createElement(DecisionPanel, {
    title: "Something is inside the bag.",
    options: [{
      label: "OPEN BAG",
      action: () => onBagChoice("open")
    }, {
      label: "IGNORE BAG",
      action: () => onBagChoice("ignore")
    }]
  }), /*#__PURE__*/React.createElement("h3", {
    className: "mini-heading"
  }, "MINI-GAMES"), /*#__PURE__*/React.createElement("div", {
    className: "row-buttons wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost small",
    onClick: () => onOpenMiniGame("find")
  }, "\uD83D\uDD0D FIND THE OBJECT"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost small",
    onClick: () => onOpenMiniGame("sort")
  }, "\uD83D\uDDC2\uFE0F SORT THE CLUES"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost small",
    onClick: () => onOpenMiniGame("follow")
  }, "\uD83C\uDFC3 FOLLOW THE DETECTIVE"))), /*#__PURE__*/React.createElement("div", {
    className: "panel suspects-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mini-heading"
  }, "SUSPECTS"), /*#__PURE__*/React.createElement("div", {
    className: "suspects-list"
  }, suspects.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    className: "suspect-row",
    onClick: () => onOpenSuspect(s)
  }, /*#__PURE__*/React.createElement("span", null, s.emoji, " ", s.name), /*#__PURE__*/React.createElement("span", {
    className: "stars"
  }, "⭐".repeat(s.suspicion))))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary proceed-btn",
    onClick: onProceed
  }, "PROCEED TO FINAL ACCUSATION \u2192"))), /*#__PURE__*/React.createElement("button", {
    className: "evidence-toggle",
    onClick: () => setEvidenceBagOpen(!evidenceBagOpen)
  }, "\uD83E\uDDF0 EVIDENCE BAG (", clues.length, ")"), evidenceBagOpen && /*#__PURE__*/React.createElement("div", {
    className: "evidence-drawer"
  }, clues.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "empty-note"
  }, "No evidence yet. Go poke something."), clues.map((c, i) => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    className: "clue-chip",
    onClick: () => onOpenClue(c)
  }, "\uD83D\uDD0E CLUE #", String(i + 1).padStart(2, "0"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, c.title)))), clueModal && /*#__PURE__*/React.createElement(Modal, {
    onClose: onCloseClue
  }, /*#__PURE__*/React.createElement("h3", null, clueModal.title), /*#__PURE__*/React.createElement("p", null, clueModal.desc)), suspectModal && /*#__PURE__*/React.createElement(Modal, {
    onClose: onCloseSuspect
  }, /*#__PURE__*/React.createElement("h2", null, suspectModal.emoji, " ", suspectModal.name), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "MOTIVE:"), " ", suspectModal.motive), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "ALIBI:"), " ", suspectModal.alibi), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "PRIOR CRIMES:"), " ", suspectModal.priorCrimes), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "SUSPICION:"), " ", "⭐".repeat(suspectModal.suspicion)), !dialogueOpen && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onStartDialogue
  }, "INTERROGATE"), dialogueOpen && /*#__PURE__*/React.createElement("div", {
    className: "dialogue-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "dialogue-prompt"
  }, "Detective: \u201C", suspectModal.name, ", where were you last night?\u201D"), /*#__PURE__*/React.createElement("div", {
    className: "row-buttons wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost small",
    onClick: () => onChooseDialogue("A")
  }, "A. \u201CTell me the truth.\u201D"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost small",
    onClick: () => onChooseDialogue("B")
  }, "B. \u201CI know you did it.\u201D"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost small",
    onClick: () => onChooseDialogue("C")
  }, "C. \u201CNice ", suspectModal.name.replace("The ", "").toLowerCase(), ".\u201D")))), miniGame && /*#__PURE__*/React.createElement(Modal, {
    onClose: onCloseMiniGame
  }, miniGame.type === "find" && /*#__PURE__*/React.createElement(FindGame, {
    onResult: onMiniGameResult,
    state: miniGame.state,
    resultMsg: miniGame.resultMsg,
    onClose: onCloseMiniGame
  }), miniGame.type === "sort" && /*#__PURE__*/React.createElement(SortGame, {
    object: object,
    onResult: onMiniGameResult,
    state: miniGame.state,
    resultMsg: miniGame.resultMsg,
    onClose: onCloseMiniGame
  }), miniGame.type === "follow" && /*#__PURE__*/React.createElement(FollowGame, {
    detective: detective,
    onResult: onMiniGameResult,
    state: miniGame.state,
    resultMsg: miniGame.resultMsg,
    onClose: onCloseMiniGame
  })));
}
function Meter({
  label,
  pct,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "meter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meter-label"
  }, label, " \u2014 ", pct, "%"), /*#__PURE__*/React.createElement("div", {
    className: "meter-bar-outer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "meter-bar-inner",
    style: {
      width: `${pct}%`,
      background: color
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "meter-blocks"
  }, blockBar(pct)));
}
function DecisionPanel({
  title,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "decision-panel"
  }, /*#__PURE__*/React.createElement("p", {
    className: "decision-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "row-buttons wrap"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.label,
    className: "btn answer-btn",
    onClick: o.action
  }, o.label))));
}
function Modal({
  children,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-card",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, "\u2715"), children));
}

/* ---------------- mini-games ---------------- */

function FindGame({
  onResult,
  state,
  resultMsg,
  onClose
}) {
  const POOL = ["🍩", "🦴", "🧦", "🔦", "🥄", "🎯", "🧵", "🪙"];
  const [target] = useState(() => rand(POOL));
  const [cells] = useState(() => {
    const arr = Array.from({
      length: 12
    }, () => rand(POOL.filter(p => p !== target)));
    const idx = Math.floor(Math.random() * 12);
    arr[idx] = target;
    return {
      arr,
      idx
    };
  });
  const [timeLeft, setTimeLeft] = useState(15);
  const doneRef = useRef(false);
  useEffect(() => {
    if (state !== "playing") return;
    const t = setInterval(() => {
      setTimeLeft(tl => {
        if (tl <= 1) {
          clearInterval(t);
          if (!doneRef.current) {
            doneRef.current = true;
            onResult(false, "You were literally looking at it.");
          }
          return 0;
        }
        return tl - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [state]);
  function click(i) {
    if (state !== "playing" || doneRef.current) return;
    if (i === cells.idx) {
      doneRef.current = true;
      onResult(true, "GOOD EYES.");
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "minigame"
  }, /*#__PURE__*/React.createElement("h3", null, "\uD83D\uDD0D Find the ", target), state === "playing" && /*#__PURE__*/React.createElement("p", {
    className: "timer"
  }, "\u23F1 ", timeLeft, "s"), /*#__PURE__*/React.createElement("div", {
    className: "find-grid"
  }, cells.arr.map((e, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "find-cell",
    onClick: () => click(i)
  }, e))), state === "done" && /*#__PURE__*/React.createElement("div", {
    className: "minigame-result"
  }, /*#__PURE__*/React.createElement("p", null, resultMsg), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onClose
  }, "CLOSE")));
}
function SortGame({
  object,
  onResult,
  state,
  resultMsg,
  onClose
}) {
  const useful = sortUsefulFor(object.label);
  const [cards] = useState(() => {
    const all = [...useful, ...SORT_USELESS];
    return all.sort(() => Math.random() - 0.5);
  });
  const [selected, setSelected] = useState([]);
  function toggle(c) {
    setSelected(s => s.includes(c) ? s.filter(x => x !== c) : [...s, c]);
  }
  function submit() {
    const correct = useful.every(u => selected.includes(u)) && selected.length === useful.length;
    onResult(correct, correct ? "Evidence accepted." : "Why did you submit a spoon?");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "minigame"
  }, /*#__PURE__*/React.createElement("h3", null, "\uD83D\uDDC2\uFE0F Sort the Clues"), /*#__PURE__*/React.createElement("p", {
    className: "minigame-sub"
  }, "Select the useful evidence, then submit."), /*#__PURE__*/React.createElement("div", {
    className: "sort-grid"
  }, cards.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: `sort-card ${selected.includes(c) ? "selected" : ""}`,
    onClick: () => state === "playing" && toggle(c)
  }, c))), state === "playing" && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: submit
  }, "SUBMIT"), state === "done" && /*#__PURE__*/React.createElement("div", {
    className: "minigame-result"
  }, /*#__PURE__*/React.createElement("p", null, resultMsg), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onClose
  }, "CLOSE")));
}
function FollowGame({
  detective,
  onResult,
  state,
  resultMsg,
  onClose
}) {
  const [pos, setPos] = useState({
    top: 40,
    left: 40
  });
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const totalRounds = 6;
  useEffect(() => {
    if (state !== "playing") return;
    const t = setInterval(() => {
      setRound(r => {
        if (r >= totalRounds) {
          clearInterval(t);
          return r;
        }
        setPos({
          top: 10 + Math.random() * 70,
          left: 10 + Math.random() * 75
        });
        return r + 1;
      });
    }, 900);
    return () => clearInterval(t);
  }, [state]);
  useEffect(() => {
    if (round >= totalRounds && state === "playing") {
      const success = hits >= 4;
      onResult(success, success ? "Nice tracking." : "You lost me. We're supposed to be looking for YOUR thing.");
    }
  }, [round]);
  function clickDetective() {
    if (state !== "playing") return;
    setHits(h => h + 1);
    setPos({
      top: 10 + Math.random() * 70,
      left: 10 + Math.random() * 75
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "minigame"
  }, /*#__PURE__*/React.createElement("h3", null, "\uD83C\uDFC3 Follow the Detective"), /*#__PURE__*/React.createElement("p", {
    className: "minigame-sub"
  }, "Round ", Math.min(round + 1, totalRounds), "/", totalRounds, " \u2014 Hits: ", hits), /*#__PURE__*/React.createElement("div", {
    className: "follow-box"
  }, state === "playing" && /*#__PURE__*/React.createElement("button", {
    className: "follow-target",
    style: {
      top: `${pos.top}%`,
      left: `${pos.left}%`
    },
    onClick: clickDetective
  }, detective.emoji)), state === "done" && /*#__PURE__*/React.createElement("div", {
    className: "minigame-result"
  }, /*#__PURE__*/React.createElement("p", null, resultMsg), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onClose
  }, "CLOSE")));
}

/* ============================================================
   SCREEN: FINAL ACCUSATION
   ============================================================ */

function FinalAccusation({
  suspects,
  accused,
  setAccused,
  onConfirm
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "screen"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "WHO DO YOU THINK TOOK IT?"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, "Choose carefully. Or don't. It's funnier if you don't."), /*#__PURE__*/React.createElement("div", {
    className: "accusation-grid"
  }, suspects.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    className: `card object-card ${accused === s.key ? "selected" : ""}`,
    onClick: () => setAccused(s.key)
  }, /*#__PURE__*/React.createElement("span", {
    className: "object-emoji"
  }, s.emoji), /*#__PURE__*/React.createElement("span", {
    className: "object-label"
  }, s.name)))), accused && /*#__PURE__*/React.createElement("div", {
    className: "selection-banner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary big-btn",
    onClick: onConfirm
  }, "CONFIRM ACCUSATION")));
}

/* ============================================================
   SCREEN: REVEAL
   ============================================================ */

function Reveal({
  stage,
  detective
}) {
  const labels = ["", "Are you sure?", "3", "2", "1", ""];
  return /*#__PURE__*/React.createElement("div", {
    className: "screen reveal-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal-detective"
  }, detective.emoji), /*#__PURE__*/React.createElement("div", {
    className: "reveal-text"
  }, labels[stage]));
}

/* ============================================================
   SCREEN: RESULT
   ============================================================ */

function computeRank({
  evidence,
  confidence,
  correct,
  accusedSelf
}) {
  if (correct && confidence >= 70 && evidence >= 5) return RANKS[3];
  if (correct) return RANKS[1];
  if (accusedSelf) return RANKS[4];
  if (evidence <= 1) return RANKS[0];
  if (confidence < 40) return RANKS[2];
  return RANKS[5];
}
function CaseResult({
  detective,
  object,
  caseNumber,
  clues,
  confidence,
  accused,
  suspects,
  ending,
  clickCounts,
  onPlayAgain,
  onChangeDetective
}) {
  const info = ENDINGS[ending];
  const accusedSuspect = suspects.find(s => s.key === accused);
  const explored = Object.keys(clickCounts).length;
  const evidenceScore = Math.min(10, clues.length);
  const logicScore = Math.round(confidence / 10);
  const explorationScore = Math.min(10, Math.round(explored / ROOM_OBJECTS.length * 10));
  const accusationScore = ending === "perfect" || ending === "funny" || ending === "secret" ? 10 : ending === "chaotic" ? 4 : 2;
  const rank = computeRank({
    evidence: clues.length,
    confidence,
    correct: accusationScore === 10,
    accusedSelf: accused === "you"
  });
  let bodyLines = info.body;
  if (ending === "wrong") {
    bodyLines = [`CASE FAILED.`, `You accused ${accusedSuspect ? accusedSuspect.name.toLowerCase() : "the wrong suspect"}.`, `${accusedSuspect ? accusedSuspect.name : "They"}. Really.`];
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "screen report-screen"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "section-title"
  }, "CASE REPORT"), /*#__PURE__*/React.createElement("div", {
    className: "report-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stamp report-stamp"
  }, info.title), /*#__PURE__*/React.createElement("p", {
    className: "report-line"
  }, "CASE #", caseNumber), /*#__PURE__*/React.createElement("p", {
    className: "report-line"
  }, "OBJECT: ", object.emoji, " ", object.label), /*#__PURE__*/React.createElement("p", {
    className: "report-line"
  }, "DETECTIVE: ", detective.emoji, " ", detective.name), /*#__PURE__*/React.createElement("p", {
    className: "report-line"
  }, "EVIDENCE COLLECTED: ", clues.length), /*#__PURE__*/React.createElement("h2", {
    className: "case-status"
  }, info.title), /*#__PURE__*/React.createElement("p", {
    className: "stars-line"
  }, info.stars), bodyLines.map((l, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    className: "report-body-line"
  }, l)), info.line && /*#__PURE__*/React.createElement("p", {
    className: "detective-line"
  }, detective.emoji, " ", detective.name, ": \u201C", info.line, "\u201D"), /*#__PURE__*/React.createElement("h3", {
    className: "mini-heading"
  }, "DETECTIVE SCORE"), /*#__PURE__*/React.createElement("div", {
    className: "score-grid"
  }, /*#__PURE__*/React.createElement("div", null, "Evidence: ", evidenceScore, "/10"), /*#__PURE__*/React.createElement("div", null, "Logic: ", logicScore, "/10"), /*#__PURE__*/React.createElement("div", null, "Exploration: ", explorationScore, "/10"), /*#__PURE__*/React.createElement("div", null, "Accusation: ", accusationScore, "/10"), /*#__PURE__*/React.createElement("div", null, "Chaos: 100/10")), /*#__PURE__*/React.createElement("h3", {
    className: "final-rank"
  }, rank)), /*#__PURE__*/React.createElement("div", {
    className: "result-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onPlayAgain
  }, "\uD83D\uDD0E PLAY AGAIN"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onChangeDetective
  }, "\uD83D\uDD75\uFE0F CHANGE DETECTIVE")));
}

/* ============================================================
   STYLE
   ============================================================ */

function Style() {
  return /*#__PURE__*/React.createElement("style", null, `
      .wdmg-app {
        --bg: #14100d; --bg-2: #1c1610; --paper: #f3ead7; --paper-2: #ece0c8;
        --ink: #241c14; --red: #b3261e; --red-2: #8c1c16; --yellow: #f0c419;
        --muted: #7a6f5e;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        color: var(--paper); background: var(--bg); min-height: 100vh; width: 100%;
        box-sizing: border-box; position: relative; overflow-x: hidden;
      }
      .wdmg-app * { box-sizing: border-box; }
      .wdmg-app button { font-family: inherit; cursor: pointer; }
      .screen { max-width: 1150px; margin: 0 auto; padding: 2.2rem 1.4rem 4rem; animation: screenIn .4s ease both; }
      @keyframes screenIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      .mega-title,.section-title,.case-status,.report-stamp,.stamp,.case-file-title { font-family: Impact,"Arial Black",sans-serif; letter-spacing:.5px; }
      .case-header,.report-line,.meter-label,.meter-blocks,.evidence-tag,.case-gen-line { font-family:"Courier New",monospace; }

      .btn { border:none; border-radius:6px; padding:.8rem 1.4rem; font-weight:700; font-size:.9rem; min-height:44px; transition:transform .15s,box-shadow .15s; }
      .btn-primary { background:var(--red); color:#fff; box-shadow:0 4px 0 var(--red-2); }
      .btn-primary:hover { transform:translateY(-2px); }
      .btn-primary:active { transform:translateY(1px); box-shadow:0 2px 0 var(--red-2); }
      .btn-ghost { background:transparent; border:2px solid var(--paper-2); color:var(--paper); margin:.3rem; }
      .btn-ghost:hover { background:rgba(255,255,255,.06); transform:translateY(-2px); }
      .btn-ghost.small { padding:.5rem .8rem; font-size:.8rem; }
      .big-btn { font-size:1.05rem; padding:1rem 2rem; border-radius:10px; }
      .row-buttons { display:flex; gap:.5rem; }
      .row-buttons.wrap { flex-wrap:wrap; }

      .section-title { font-size:clamp(1.6rem,4vw,2.4rem); text-align:center; text-transform:uppercase; margin-bottom:.4rem; }
      .section-sub { text-align:center; color:var(--paper-2); margin-bottom:1.8rem; }
      .mini-heading { font-family:"Courier New",monospace; color:var(--yellow); letter-spacing:2px; font-size:.8rem; margin:1.4rem 0 .6rem; border-bottom:1px dashed rgba(240,196,25,.4); padding-bottom:.25rem; }

      /* ---- start screen ---- */
      .start-screen { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; position:relative; }
      .spotlight { width:340px; height:340px; border-radius:50%; background:radial-gradient(circle, rgba(240,196,25,.14), transparent 70%); opacity:0; transition:opacity 1.2s ease; position:absolute; top:8%; }
      .spotlight.on { opacity:1; }
      .silhouette { font-size:4rem; opacity:0; transform:translateY(20px); transition:all .8s ease; filter:brightness(.3); }
      .silhouette.walk-in { opacity:1; transform:translateY(0); }
      .start-text { margin-top:1.2rem; min-height:130px; }
      .case-file-title { font-size:2.2rem; letter-spacing:2px; }
      .fade-line { animation:fadeIn .6s ease both; font-size:1.1rem; color:var(--paper-2); margin:.3rem 0; }
      .fade-line.dramatic { color:var(--red); font-weight:800; font-size:1.3rem; }
      @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      .tagline { margin-top:1.6rem; font-style:italic; color:var(--muted); }

      /* ---- cards ---- */
      .card { background:var(--paper); color:var(--ink); border-radius:4px; border:none; text-align:left; padding:1rem; box-shadow:0 3px 0 rgba(0,0,0,.35),0 6px 14px rgba(0,0,0,.25); transition:transform .18s,box-shadow .18s; }
      .card:hover { transform:translateY(-5px); }
      .card.selected { outline:3px solid var(--red); background:#fbf3e3; }
      .detective-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:1rem; }
      .detective-card { display:flex; flex-direction:column; align-items:center; text-align:center; gap:.3rem; min-height:130px; }
      .detective-card.inspected { outline:2px solid var(--yellow); }
      .card-emoji { font-size:2.4rem; }
      .card-emoji.wiggle { animation:wiggle .6s ease; }
      @keyframes wiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
      .card-name { font-weight:800; font-size:.95rem; }
      .card-species.evidence-tag { background:var(--yellow); color:var(--ink); padding:.1rem .5rem; border-radius:3px; font-size:.68rem; }

      .inspect-panel { display:flex; gap:1.2rem; align-items:flex-start; background:var(--bg-2); border:1px solid rgba(255,255,255,.08); border-radius:8px; padding:1.2rem; margin:1.5rem 0; animation:fadeIn .3s ease; }
      .inspect-emoji { font-size:4rem; }
      .inspect-name { margin:0 0 .3rem; }
      .inspect-skill { color:var(--yellow); font-family:"Courier New",monospace; font-size:.85rem; margin:.2rem 0; }
      .inspect-desc,.inspect-personality { font-size:.85rem; color:var(--paper-2); margin:.15rem 0; }
      .inspect-quote { font-style:italic; color:var(--paper-2); animation:fadeIn .4s ease both; }

      .object-grid,.accusation-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:.7rem; }
      .object-card { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.35rem; padding:1rem .5rem; min-height:85px; }
      .object-emoji { font-size:1.7rem; }
      .object-label { font-size:.8rem; font-weight:700; text-align:center; }
      .custom-input { margin-top:.8rem; width:100%; max-width:340px; padding:.6rem .8rem; border-radius:6px; border:2px dashed var(--yellow); background:var(--paper); color:var(--ink); font-size:1rem; }

      .selection-banner { margin-top:1.8rem; display:flex; flex-wrap:wrap; align-items:center; gap:1rem; justify-content:center; background:rgba(240,196,25,.08); border:1px dashed rgba(240,196,25,.4); padding:1rem; border-radius:8px; animation:fadeIn .3s ease; }
      .selection-banner-text { font-family:"Courier New",monospace; }

      /* ---- casegen ---- */
      .casegen-screen { display:flex; flex-direction:column; align-items:center; gap:1.6rem; }
      .case-file-card { background:var(--paper); color:var(--ink); border-radius:8px; padding:1.6rem; max-width:520px; width:100%; position:relative; box-shadow:0 5px 0 rgba(0,0,0,.3); }
      .case-file-card .section-title { text-align:left; }
      .case-gen-line { font-size:.9rem; margin:.3rem 0; }
      .suspect-chip-row { display:flex; flex-wrap:wrap; gap:.4rem; }
      .suspect-chip { background:var(--paper-2); border:1px solid rgba(0,0,0,.15); border-radius:4px; padding:.25rem .6rem; font-size:.8rem; }

      /* ---- room ---- */
      .room-screen { padding-top:1.2rem; }
      .case-header { display:flex; flex-wrap:wrap; gap:.6rem 1.3rem; align-items:center; justify-content:center; background:var(--bg-2); border:1px solid rgba(255,255,255,.08); padding:.7rem 1rem; border-radius:6px; margin-bottom:1rem; font-size:.8rem; color:var(--yellow); position:relative; }
      .sound-toggle { background:transparent; border:none; font-size:1.1rem; margin-left:auto; }
      .meters { display:flex; flex-direction:column; gap:.6rem; margin-bottom:1.2rem; }
      .meter-label { font-size:.75rem; color:var(--paper-2); margin-bottom:.25rem; }
      .meter-bar-outer { width:100%; height:12px; background:rgba(255,255,255,.08); border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,.12); }
      .meter-bar-inner { height:100%; transition:width .5s ease; }
      .meter-blocks { font-size:.7rem; color:var(--muted); margin-top:.2rem; }

      .event-banner { background:var(--red); color:#fff; padding:.7rem 1rem; border-radius:6px; margin-bottom:1rem; font-family:"Courier New",monospace; animation:fadeIn .3s ease; }
      .event-line { animation:fadeIn .4s ease both; font-size:.8rem; }

      .room-grid-layout { display:grid; grid-template-columns:1fr 1.6fr 1fr; gap:1rem; align-items:start; }
      .panel { background:var(--paper); color:var(--ink); border-radius:8px; padding:1.1rem; box-shadow:0 4px 0 rgba(0,0,0,.3); }
      .detective-panel { text-align:center; }
      .detective-figure { font-size:3.2rem; background:none; border:none; display:inline-block; }
      .detective-figure.large { font-size:4rem; }
      .mood-idle { animation:bounceIdle 2.4s ease-in-out infinite; }
      @keyframes bounceIdle { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      .mood-shake { animation:shake .6s ease-in-out; }
      @keyframes shake { 0%,100%{transform:translateX(0) rotate(0)} 20%{transform:translateX(-8px) rotate(-5deg)} 40%{transform:translateX(8px) rotate(5deg)} 60%{transform:translateX(-6px) rotate(-3deg)} 80%{transform:translateX(6px) rotate(3deg)} }
      .mood-celebrate { animation:celebrate .8s ease-in-out; }
      @keyframes celebrate { 0%{transform:scale(1) rotate(0)} 30%{transform:scale(1.2) rotate(-10deg)} 60%{transform:scale(1.2) rotate(10deg)} 100%{transform:scale(1) rotate(0)} }
      .mood-confused { animation:confused .9s ease-in-out; }
      @keyframes confused { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-7deg)} 75%{transform:rotate(7deg)} }
      .mood-asleep { opacity:.6; }
      .detective-name { font-weight:800; margin-top:.5rem; }
      .ability-line { font-size:.72rem; color:#6b5f4c; margin-top:.15rem; }
      .speech-bubble { margin-top:.7rem; background:#fff; border:2px solid var(--ink); border-radius:10px; padding:.6rem .7rem; font-size:.82rem; animation:fadeIn .3s ease; }

      .room-objects-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(90px,1fr)); gap:.5rem; margin-bottom:1rem; }
      .room-obj-tile { background:var(--paper-2); border:1px solid rgba(0,0,0,.12); border-radius:6px; padding:.6rem .3rem; display:flex; flex-direction:column; align-items:center; gap:.25rem; transition:transform .15s; }
      .room-obj-tile:hover { transform:translateY(-3px) scale(1.03); }
      .room-obj-tile.locked { opacity:.55; }
      .room-obj-emoji { font-size:1.5rem; }
      .room-obj-label { font-size:.65rem; font-weight:700; text-align:center; }

      .decision-panel { background:#fff; border-left:4px solid var(--red); border-radius:6px; padding:.8rem; margin:.8rem 0; animation:fadeIn .3s ease; }
      .decision-title { font-weight:700; margin:0 0 .5rem; font-size:.85rem; }
      .answer-btn { background:var(--ink); color:var(--paper); border-radius:6px; padding:.6rem .8rem; font-size:.8rem; }
      .answer-btn:hover { background:#382b1c; transform:translateY(-2px); }

      .suspects-list { display:flex; flex-direction:column; gap:.4rem; margin-bottom:1rem; }
      .suspect-row { background:var(--paper-2); border:1px solid rgba(0,0,0,.12); border-radius:6px; padding:.55rem .7rem; display:flex; justify-content:space-between; align-items:center; font-size:.8rem; text-align:left; }
      .suspect-row:hover { transform:translateX(3px); }
      .stars { font-size:.7rem; }
      .proceed-btn { width:100%; margin-top:.4rem; }

      .evidence-toggle { position:fixed; bottom:16px; right:16px; background:var(--red); color:#fff; border:none; border-radius:30px; padding:.7rem 1.1rem; font-weight:700; box-shadow:0 4px 12px rgba(0,0,0,.4); z-index:50; }
      .evidence-drawer { position:fixed; bottom:70px; right:16px; left:16px; max-width:420px; margin-left:auto; background:var(--paper); color:var(--ink); border-radius:10px; padding:1rem; max-height:50vh; overflow-y:auto; box-shadow:0 8px 24px rgba(0,0,0,.4); z-index:50; display:flex; flex-direction:column; gap:.5rem; }
      .clue-chip { background:var(--paper-2); border:1px solid rgba(0,0,0,.15); border-radius:6px; padding:.5rem .6rem; text-align:left; font-size:.8rem; }
      .empty-note { font-size:.85rem; color:var(--muted); }

      .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.6); display:flex; align-items:center; justify-content:center; z-index:100; padding:1rem; animation:fadeIn .2s ease; }
      .modal-card { background:var(--paper); color:var(--ink); border-radius:10px; padding:1.6rem; max-width:480px; width:100%; position:relative; max-height:85vh; overflow-y:auto; }
      .modal-close { position:absolute; top:10px; right:12px; background:none; border:none; font-size:1.1rem; }
      .dialogue-box { margin-top:1rem; }
      .dialogue-prompt { font-style:italic; margin-bottom:.6rem; }

      .minigame { text-align:center; }
      .timer { font-family:"Courier New",monospace; font-weight:700; color:var(--red-2); }
      .find-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:.5rem; margin:1rem 0; }
      .find-cell { background:var(--paper-2); border:1px solid rgba(0,0,0,.15); border-radius:6px; font-size:1.6rem; padding:.8rem 0; }
      .sort-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:.5rem; margin:1rem 0; }
      .sort-card { background:var(--paper-2); border:1px solid rgba(0,0,0,.15); border-radius:6px; padding:.6rem; font-size:.8rem; }
      .sort-card.selected { background:var(--red); color:#fff; }
      .follow-box { position:relative; height:220px; background:var(--paper-2); border-radius:8px; margin:1rem 0; overflow:hidden; }
      .follow-target { position:absolute; background:none; border:none; font-size:2rem; transition:top .2s,left .2s; }
      .minigame-result { margin-top:1rem; }
      .minigame-sub { font-size:.8rem; color:#6b5f4c; }

      /* ---- accusation / reveal ---- */
      .reveal-screen { min-height:70vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
      .reveal-detective { font-size:3.5rem; margin-bottom:1rem; animation:bounceIdle 1.6s ease-in-out infinite; }
      .reveal-text { font-size:2.4rem; font-weight:800; color:var(--yellow); font-family:Impact,sans-serif; }

      /* ---- report ---- */
      .report-screen { text-align:center; }
      .report-card { background:var(--paper); color:var(--ink); border-radius:8px; padding:1.8rem 1.4rem; max-width:560px; margin:0 auto; box-shadow:0 6px 0 rgba(0,0,0,.3); position:relative; text-align:left; animation:reportReveal .5s ease both; }
      @keyframes reportReveal { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      .report-stamp { position:absolute; top:-14px; right:-8px; background:var(--red); color:#fff; padding:.4rem .8rem; transform:rotate(7deg); border-radius:4px; font-size:.85rem; box-shadow:0 3px 8px rgba(0,0,0,.35); }
      .report-line { font-size:.82rem; margin:.15rem 0; }
      .case-status { margin-top:1rem; font-size:1.6rem; color:var(--red-2); text-transform:uppercase; }
      .stars-line { font-size:1.1rem; }
      .report-body-line { margin:.15rem 0; font-weight:600; }
      .detective-line { font-size:.82rem; color:#4a3f30; margin-top:.5rem; }
      .score-grid { display:grid; grid-template-columns:1fr 1fr; gap:.3rem; font-size:.8rem; font-family:"Courier New",monospace; }
      .final-rank { margin-top:1rem; color:var(--red-2); text-align:center; }
      .result-buttons { margin-top:1.6rem; display:flex; flex-wrap:wrap; justify-content:center; gap:.6rem; }

      @media (max-width:900px) { .room-grid-layout { grid-template-columns:1fr; } }
      @media (max-width:520px) {
        .case-header { flex-direction:column; text-align:center; }
        .sound-toggle { margin-left:0; }
        .btn { width:100%; }
        .result-buttons .btn { width:100%; }
        .evidence-drawer { left:8px; right:8px; max-width:none; }
      }
      @media (prefers-reduced-motion: reduce) { .wdmg-app * { animation:none!important; transition:none!important; } }
    `);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(App, null));