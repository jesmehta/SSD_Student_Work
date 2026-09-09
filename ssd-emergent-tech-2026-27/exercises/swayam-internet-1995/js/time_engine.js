/* =========================================================
   TIME ENGINE
   Phase 1 placeholder
   ========================================================= */

const TimeEngine = {

    currentMonth: 1,
    currentYear: 1995,

    init() {
        console.log("Time Engine initialized: January 1995");
    }

};

document.addEventListener("DOMContentLoaded", () => {
    TimeEngine.init();
});