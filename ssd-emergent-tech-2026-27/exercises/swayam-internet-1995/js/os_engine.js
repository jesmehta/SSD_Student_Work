/* =========================================================
   1995 TIME-TRAVEL WEB SIMULATOR
   Windows 95 OS Engine
   ========================================================= */

const OSEngine = {

        initAmazonMessageHandler() {

        window.addEventListener("message", (event) => {

            if (
                !event.data ||
                event.data.type !== "amazon-navigation"
            ) {
                return;
            }

            const url = event.data.url;

            if (!url) {
                return;
            }

            console.log(
                "Amazon navigation received:",
                url
            );

            this.navigateNetscape(url);

        });

    },

    zIndex: 100,

windows: {},

netscapeHistory: [],

netscapeHistoryIndex: -1,

    init() {

        this.cacheElements();

        this.setupStartMenu();

        this.setupRunDialog();

        this.setupWindows();

        this.setupPaint();

        this.setupNetscape();

        this.setupDesktopIcons();

        this.updateClock();

        setInterval(() => {
            this.updateClock();
        }, 1000);

this.registerTaskbarWindow("welcomeWindow");
this.registerTaskbarWindow("netscapeWindow");

this.focusWindow("welcomeWindow");

    },


    cacheElements() {

        this.startButton =
            document.getElementById("startButton");

        this.startMenu =
            document.getElementById("startMenu");

        this.taskbarWindows =
            document.getElementById("taskbarWindows");

        this.systemClock =
            document.getElementById("systemClock");

        this.welcomeOkButton =
            document.getElementById("welcomeOkButton");

        this.initAmazonMessageHandler();

    },


    /* =====================================================
       START MENU
       ===================================================== */

    setupStartMenu() {

        this.startButton.addEventListener("click", (event) => {

            event.stopPropagation();

            const isHidden =
                this.startMenu.classList.contains("hidden");

            if (isHidden) {

                this.startMenu.classList.remove("hidden");

                this.startButton.classList.add("active");

            } else {

                this.closeStartMenu();

            }

        });


        document.addEventListener("click", (event) => {

            if (
                !this.startMenu.contains(event.target) &&
                event.target !== this.startButton
            ) {
                this.closeStartMenu();
            }

        });

    },


    closeStartMenu() {

        this.startMenu.classList.add("hidden");

        this.startButton.classList.remove("active");

    },

    /* =====================================================
   RUN DIALOG
   ===================================================== */

setupRunDialog() {

    const runMenuItem =
        document.querySelector('[data-run="true"]');

    const runDialog =
        document.getElementById("runDialog");

    const runInput =
        document.getElementById("runCommand");

    const runCancelButton =
        document.getElementById("runCancelButton");

    const runCloseButton =
        document.getElementById("runCloseButton");

    const runOkButton =
        document.getElementById("runOkButton");


    if (
        !runMenuItem ||
        !runDialog ||
        !runInput
    ) {
        return;
    }


    /* =====================================================
       OPEN RUN
       ===================================================== */

    runMenuItem.addEventListener("click", (event) => {

        event.stopPropagation();

        this.closeStartMenu();

        runDialog.style.display = "block";

        runInput.value = "";

        runInput.focus();

    });


    /* =====================================================
       CANCEL
       ===================================================== */

    if (runCancelButton) {

        runCancelButton.addEventListener("click", () => {

            runDialog.style.display = "none";

        });

    }


    /* =====================================================
       CLOSE
       ===================================================== */

    if (runCloseButton) {

        runCloseButton.addEventListener("click", () => {

            runDialog.style.display = "none";

        });

    }


    /* =====================================================
       OK
       ===================================================== */

    if (runOkButton) {

        runOkButton.addEventListener("click", () => {

            const command =
                runInput.value.trim().toLowerCase();


            if (!command) {
                return;
            }


            /* =================================================
               NOTEPAD
               ================================================= */

            if (command === "notepad") {

                runDialog.style.display = "none";

                const notepadWindow =
                    document.getElementById("notepadWindow");

                if (notepadWindow) {

                    notepadWindow.style.display = "block";

                    this.focusWindow("notepadWindow");

                }

                return;

            }


            /* =================================================
               PAINT
               ================================================= */

            if (command === "paint") {

                runDialog.style.display = "none";

                const paintWindow =
                    document.getElementById("paintWindow");

                if (paintWindow) {

                    paintWindow.style.display = "block";

                    this.focusWindow("paintWindow");

                }

                return;

            }

        });

    }

},

/* =====================================================
   PAINT ENGINE
   ===================================================== */

setupPaint() {

    const canvas =
        document.getElementById("paintCanvas");

    if (!canvas) {
        return;
    }

    const ctx =
        canvas.getContext("2d");

    let drawing = false;

    let currentColor = "#000000";

    let currentTool = "pencil";


    /* =================================================
       INITIAL CANVAS
       ================================================= */

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* =================================================
       CANVAS POSITION
       ================================================= */

    function getPosition(event) {

        const rect =
            canvas.getBoundingClientRect();

        return {

            x:
                event.clientX - rect.left,

            y:
                event.clientY - rect.top

        };

    }


    /* =================================================
       START DRAWING
       ================================================= */

    canvas.addEventListener("mousedown", (event) => {

        drawing = true;

        const position =
            getPosition(event);

        ctx.beginPath();

        ctx.moveTo(
            position.x,
            position.y
        );

    });


    /* =================================================
       DRAW
       ================================================= */

    canvas.addEventListener("mousemove", (event) => {

        if (!drawing) {
            return;
        }

        const position =
            getPosition(event);


        if (currentTool === "eraser") {

    ctx.strokeStyle = "#ffffff";

    ctx.lineWidth = 12;

} else if (currentTool === "brush") {

    ctx.strokeStyle =
        currentColor;

    ctx.lineWidth = 5;

} else {

    ctx.strokeStyle =
        currentColor;

    ctx.lineWidth = 1;

}

        ctx.lineCap = "square";


        ctx.lineTo(
            position.x,
            position.y
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
            position.x,
            position.y
        );

    });


    /* =================================================
       STOP DRAWING
       ================================================= */

    canvas.addEventListener("mouseup", () => {

        drawing = false;

        ctx.beginPath();

    });


    canvas.addEventListener("mouseleave", () => {

        drawing = false;

        ctx.beginPath();

    });


    /* =================================================
       COLOUR PALETTE
       ================================================= */

    const colors =
        document.querySelectorAll(".paint-color");


    colors.forEach((colorButton) => {

        colorButton.addEventListener("click", () => {

            const selectedColor =
                colorButton.dataset.color;

            if (selectedColor) {

                currentColor =
                    selectedColor;

                currentTool =
                    "pencil";

            }

        });

    });


    /* =================================================
       PAINT TOOLS
       ================================================= */

    const tools =
        document.querySelectorAll(".paint-tool");


    tools.forEach((toolButton, index) => {

        toolButton.addEventListener("click", () => {

            /*
             * Third button = Eraser
             */

            if (index === 2) {

    /* Eraser */
    currentTool =
        "eraser";

} else if (index === 7) {

    /* Brush */
    currentTool =
        "brush";

} else {

    /* Pencil and other tools */
    currentTool =
        "pencil";

}

        });

    });

},

/* =====================================================
   NETSCAPE NAVIGATOR
   ===================================================== */

setupNetscape() {

    const location =
        document.getElementById("netscapeLocation");

    if (!location) {
        return;
    }


    /* =================================================
       FIND TOOLBAR BUTTONS
       ================================================= */

    const toolbarButtons =
    document.querySelectorAll(
        "#netscapeWindow .netscape-button-11"
    );


    let backButton = null;
    let forwardButton = null;
    let homeButton = null;
    let reloadButton = null;
    let imagesButton = null;
    let openButton = null;
    let printButton = null;
    let findButton = null;
    let stopButton = null;


    toolbarButtons.forEach(button => {

        const text =
            button.textContent
                .trim()
                .toLowerCase();

        if (text === "back") {
            backButton = button;
        }

        else if (text === "forward") {
            forwardButton = button;
        }

        else if (text === "home") {
            homeButton = button;
        }

        else if (text === "reload") {
            reloadButton = button;
        }

        else if (text === "images") {
            imagesButton = button;
        }

        else if (text === "open") {
            openButton = button;
        }

        else if (text === "print") {
            printButton = button;
        }

        else if (text === "find") {
            findButton = button;
        }

        else if (text === "stop") {
            stopButton = button;
        }

    });


    /* =================================================
       HOME
       ================================================= */

    if (homeButton) {

        homeButton.addEventListener("click", () => {

            location.value =
                "http://www.netscape.com/";

            this.navigateNetscape(
                "http://www.netscape.com/"
            );

        });

    }


    /* =================================================
       RELOAD
       ================================================= */

    if (reloadButton) {

        reloadButton.addEventListener("click", () => {

            this.navigateNetscape(
                location.value,
                false
            );

        });

    }


    /* =================================================
       BACK
       ================================================= */

    if (backButton) {

        backButton.addEventListener("click", () => {

            if (
                this.netscapeHistoryIndex <= 0
            ) {
                return;
            }

            this.netscapeHistoryIndex--;

            const previousPage =
                this.netscapeHistory[
                    this.netscapeHistoryIndex
                ];

            this.navigateNetscape(
                previousPage,
                false
            );

        });

    }


    /* =================================================
       FORWARD
       ================================================= */

    if (forwardButton) {

        forwardButton.addEventListener("click", () => {

            if (
                this.netscapeHistoryIndex >=
                this.netscapeHistory.length - 1
            ) {
                return;
            }

            this.netscapeHistoryIndex++;

            const nextPage =
                this.netscapeHistory[
                    this.netscapeHistoryIndex
                ];

            this.navigateNetscape(
                nextPage,
                false
            );

        });

    }

    /* =================================================
   NETSCAPE DIRECTORY BAR
   ================================================= */

const directoryButtons =
    document.querySelectorAll(
        "#netscapeWindow .netscape-directory-button"
    );

directoryButtons.forEach(button => {

    const text =
        button.textContent
            .trim()
            .toLowerCase();

    button.addEventListener("click", () => {

        if (text === "what's new!") {

            this.navigateNetscape(
                "http://home.netscape.com/whats-new/"
            );

        }

        else if (text === "what's cool!") {

            this.navigateNetscape(
                "http://home.netscape.com/whats-cool/"
            );

        }

        else if (text === "upgrades") {

            this.navigateNetscape(
                "http://home.netscape.com/upgrades/"
            );

        }

        else if (text === "net search") {

            this.navigateNetscape(
                "http://www.yahoo.com/"
            );

        }

        else if (text === "net directory") {

            this.navigateNetscape(
                "http://home.netscape.com/directory/"
            );

        }

        else if (text === "newsgroups") {

            this.navigateNetscape(
                "http://home.netscape.com/newsgroups/"
            );

        }

    });

});

        // Load Netscape homepage when browser starts

    this.navigateNetscape(
        "http://home.netscape.com/"
    );


    /* =================================================
       OPEN
       ================================================= */

    if (openButton) {

        openButton.addEventListener("click", () => {

            location.focus();
            location.select();

        });

    }


    /* =================================================
       PRINT
       ================================================= */

    if (printButton) {

        printButton.addEventListener("click", () => {

            window.print();

        });

    }


    /* =================================================
       FIND
       ================================================= */

    if (findButton) {

        findButton.addEventListener("click", () => {

            const searchText =
                prompt(
                    "Find in page:",
                    ""
                );

            if (!searchText) {
                return;
            }

            const found =
                window.find(searchText);

            if (!found) {

                alert(
                    '"' +
                    searchText +
                    '" not found.'
                );

            }

        });

    }


    /* =================================================
       IMAGES
       ================================================= */

    if (imagesButton) {

        imagesButton.addEventListener("click", () => {

            const page =
                document.getElementById(
                    "netscapePage"
                );

            if (!page) {
                return;
            }

            const images =
                page.querySelectorAll("img");

            images.forEach(img => {

                img.style.display =
                    img.style.display === "none"
                        ? ""
                        : "none";

            });

        });

    }


    /* =================================================
       STOP
       ================================================= */

    if (stopButton) {

        stopButton.addEventListener("click", () => {

            window.stop();

            this.netscapeLoading =
                false;

        });

    }


    /* =================================================
       ENTER KEY
       ================================================= */

    location.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                this.navigateNetscape(
                    location.value
                );

            }

        }
    );

},

/* =====================================================
   NETSCAPE NAVIGATION + HISTORY
   1995 SIMULATED INTERNET
   ===================================================== */

navigateNetscape(address, addToHistory = true) {

    const location =
        document.getElementById("netscapeLocation");

    if (!location) {
        return;
    }

    let url = String(address || "")
        .trim()
        .toLowerCase();

    if (!url) {
        return;
    }


    /* =================================================
       ADD HTTP IF PROTOCOL IS OMITTED
       ================================================= */

    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {
        url = "http://" + url;
    }

    /* Normalize URL for route matching */
let cleanUrl = url.replace(/\/+$/, "");

if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "http://" + cleanUrl;
}

    /* Show normalized address */
    location.value = url;


    /* =================================================
       HISTORY
       ================================================= */

    if (addToHistory) {

        if (
            this.netscapeHistoryIndex <
            this.netscapeHistory.length - 1
        ) {
            this.netscapeHistory =
                this.netscapeHistory.slice(
                    0,
                    this.netscapeHistoryIndex + 1
                );
        }


        this.netscapeHistory.push(url);

        this.netscapeHistoryIndex =
            this.netscapeHistory.length - 1;
    }


    /* =================================================
       NETSCAPE
       ================================================= */

if (
    cleanUrl === "http://home.netscape.com" ||
    cleanUrl === "http://www.netscape.com"
) {
    this.loadNetscapeHome();
    return;
}

/* =================================================
   AMAZON.COM — 1995
   ================================================= */

if (
    cleanUrl === "http://www.amazon.com"
) {
    this.loadAmazon1995();
    return;
}

/* =================================================
   APPLE COMPUTER — 1995
   ================================================= */

if (
    cleanUrl === "http://www.apple.com"
) {
    this.loadApple1995();
    return;
}

/* =================================================
   AMAZON.COM — INTERNAL PAGES
   ================================================= */

if (
    cleanUrl === "http://www.amazon.com/spotlight"
) {

    this.loadNetscapeFakePage(
        "Amazon.com — Spotlight",
        cleanUrl,
        `
            <h2>Spotlight!</h2>

            <p>
                These are books we love, offered at
                Amazon.com low prices.
            </p>

            <p>
                The spotlight moves EVERY day so
                please come often.
            </p>
        `
    );

    return;
}


if (
    cleanUrl === "http://www.amazon.com/browse"
) {

    this.loadNetscapeFakePage(
        "Amazon.com — One Million Titles",
        cleanUrl,
        `
            <h2>One Million Titles</h2>

            <p>
                Search Amazon.com's million title
                catalog by author, subject, title,
                keyword, and more...
            </p>

            <p>
                Browse the shelves and discover
                books from many different categories.
            </p>
        `
    );

    return;
}


if (
    cleanUrl === "http://www.amazon.com/reviews"
) {

    this.loadNetscapeFakePage(
        "Amazon.com — Customer Reviews",
        cleanUrl,
        `
            <h2>Customer Reviews</h2>

            <p>
                Read what our customers are saying
                about books available from Amazon.com.
            </p>
        `
    );

    return;
}


if (
    cleanUrl === "http://www.amazon.com/bestsellers"
) {

    this.loadNetscapeFakePage(
        "Amazon.com — Bestsellers",
        cleanUrl,
        `
            <h2>Bestsellers</h2>

            <p>
                Explore Amazon.com's bestselling books.
            </p>

            <p>
                Many bestselling titles are available
                at Amazon.com discounts.
            </p>
        `
    );

    return;
}

/* =================================================
   NETSCAPE — FAKE INTERNAL PAGES
   ================================================= */

/* =================================================
   WHAT'S NEW
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/whats-new"
) {

    this.loadNetscapeFakePage(
        "What's New",
        cleanUrl,
        `
            <h2>What's New at Netscape</h2>

            <p>
                Welcome to the latest news and announcements
                from Netscape Communications Corporation.
            </p>

            <p>
                Check here for information about new releases,
                enhancements and Internet resources.
            </p>

            <h2>Latest Information</h2>

            <ul>
                <li>Netscape Navigator updates</li>
                <li>New Internet services</li>
                <li>New Web resources</li>
                <li>Netscape product announcements</li>
            </ul>
        `
    );

    return;
}


/* =================================================
   WHAT'S COOL
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/whats-cool"
) {

    this.loadNetscapeFakePage(
        "What's Cool!",
        cleanUrl,
        `
            <h2>What's Cool on the Internet</h2>

            <p>
                Discover interesting places and new resources
                available on the World Wide Web.
            </p>

            <p>
                Netscape's editors have selected a collection
                of interesting Web sites for Internet users.
            </p>

            <h2>Featured Sites</h2>

            <ul>
                <li>Interesting Web sites</li>
                <li>Online entertainment</li>
                <li>Educational resources</li>
                <li>Internet communities</li>
                <li>New Web pages</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   UPGRADES
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/upgrades"
) {

    this.loadNetscapeFakePage(
        "Netscape Upgrades",
        cleanUrl,
        `
            <h2>Netscape Navigator Upgrades</h2>

            <p>
                Information about Netscape Navigator upgrades
                and new versions of Netscape software.
            </p>

            <h2>Available Information</h2>

            <ul>
                <li>Netscape Navigator upgrades</li>
                <li>New browser features</li>
                <li>Product updates</li>
                <li>Installation information</li>
                <li>Release information</li>
            </ul>

            <p>
                Please check the Netscape product information
                for details about available software.
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   NET DIRECTORY
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/directory"
) {

    this.loadNetscapeFakePage(
        "Net Directory",
        cleanUrl,
        `
            <h2>Netscape Internet Directory</h2>

            <p>
                Browse the World Wide Web by category.
            </p>

            <h2>Internet Categories</h2>

            <ul>
                <li>Arts &amp; Entertainment</li>
                <li>Business</li>
                <li>Computers &amp; Internet</li>
                <li>Education</li>
                <li>Government</li>
                <li>News &amp; Media</li>
                <li>Science</li>
                <li>Sports</li>
                <li>Travel</li>
                <li>World Wide Web Resources</li>
            </ul>

            <p>
                Select a category to explore Internet resources.
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   NEWSGROUPS
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/newsgroups"
) {

    this.loadNetscapeFakePage(
        "Netscape Newsgroups",
        cleanUrl,
        `
            <h2>Internet Newsgroups</h2>

            <p>
                Explore Internet discussion groups and
                communities through Usenet newsgroups.
            </p>

            <h2>Popular Newsgroup Areas</h2>

            <ul>
                <li>comp.* — Computers</li>
                <li>news.* — Usenet News</li>
                <li>sci.* — Science</li>
                <li>rec.* — Recreation</li>
                <li>soc.* — Society</li>
                <li>talk.* — Discussion</li>
            </ul>

            <p>
                Newsgroups provide a place for Internet users
                to exchange messages and discuss topics of interest.
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}

/* =================================================
   NETSCAPE DOWNLOAD
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/download"
) {

    this.loadNetscapeFakePage(
        "Netscape Navigator Download",
        cleanUrl,
        `
            <h2>Download Netscape Navigator</h2>

            <p>
                Download the latest version of Netscape Navigator
                available for Windows 95 and other supported platforms.
            </p>

            <h2>Navigator Software</h2>

            <ul>
                <li>Netscape Navigator for Windows 95</li>
                <li>Netscape Navigator for Windows 3.1</li>
                <li>Netscape Navigator for Macintosh</li>
                <li>Netscape Navigator for UNIX</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   NETSCAPE SERVERS
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/servers"
) {

    this.loadNetscapeFakePage(
        "Netscape Servers",
        cleanUrl,
        `
            <h2>Netscape Server Products</h2>

            <p>
                Netscape provides powerful server software for
                businesses and organizations building Internet
                and World Wide Web services.
            </p>

            <h2>Server Products</h2>

            <ul>
                <li>Netscape Commerce Server</li>
                <li>Netscape Communications Server</li>
                <li>World Wide Web server software</li>
                <li>Internet publishing tools</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   EDUCATION & NONPROFIT
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/education"
) {

    this.loadNetscapeFakePage(
        "Education & Nonprofit",
        cleanUrl,
        `
            <h2>Netscape for Education & Nonprofit Institutions</h2>

            <p>
                Netscape provides Internet software and services
                for educational institutions and charitable
                nonprofit organizations.
            </p>

            <h2>Internet Resources</h2>

            <ul>
                <li>Educational Web sites</li>
                <li>Academic Internet resources</li>
                <li>Nonprofit organizations</li>
                <li>Internet publishing</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   NETSCAPE SOFTWARE
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/store/software"
) {

    this.loadNetscapeFakePage(
        "Netscape Software",
        cleanUrl,
        `
            <h2>Netscape Software</h2>

            <p>
                Explore Netscape software products and Internet
                applications.
            </p>

            <h2>Software</h2>

            <ul>
                <li>Netscape Navigator</li>
                <li>Netscape Navigator Personal Edition</li>
                <li>Netscape server software</li>
                <li>Internet utilities</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   NETSCAPE HELP / SUPPORT
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/help"
) {

    this.loadNetscapeFakePage(
        "Netscape Support",
        cleanUrl,
        `
            <h2>Netscape Navigator Support</h2>

            <p>
                Find help and information for using Netscape
                Navigator and other Netscape products.
            </p>

            <h2>Support Information</h2>

            <ul>
                <li>Navigator installation</li>
                <li>Using the World Wide Web</li>
                <li>Frequently asked questions</li>
                <li>Troubleshooting</li>
                <li>Product documentation</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   NETSCAPE PUBLICATIONS
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/publications"
) {

    this.loadNetscapeFakePage(
        "Netscape Publications",
        cleanUrl,
        `
            <h2>Netscape Publications</h2>

            <p>
                Information, articles and publications about
                Netscape products and the Internet.
            </p>

            <h2>Publications</h2>

            <ul>
                <li>Netscape product information</li>
                <li>Internet guides</li>
                <li>Technical publications</li>
                <li>World Wide Web resources</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   NETSCAPE USER GROUPS
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/community/groups"
) {

    this.loadNetscapeFakePage(
        "Netscape User Groups",
        cleanUrl,
        `
            <h2>Netscape User Groups</h2>

            <p>
                Connect with other Netscape users and Internet
                enthusiasts around the world.
            </p>

            <h2>Community Resources</h2>

            <ul>
                <li>Netscape user groups</li>
                <li>Local Internet communities</li>
                <li>User discussions</li>
                <li>Netscape events</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   INTERNET WHITE PAGES
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/community/white-pages"
) {

    this.loadNetscapeFakePage(
        "Internet White Pages",
        cleanUrl,
        `
            <h2>Internet White Pages</h2>

            <p>
                Search for Internet users and organizations
                through available online directories.
            </p>

            <h2>Directory Services</h2>

            <ul>
                <li>Internet user directories</li>
                <li>Organization listings</li>
                <li>Online contact information</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   NETSCAPE PRODUCTS
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/company"
) {

    this.loadNetscapeFakePage(
        "Netscape Products",
        cleanUrl,
        `
            <h2>Netscape Products</h2>

            <p>
                Learn about Netscape Communications products
                and Internet software.
            </p>

            <h2>Products</h2>

            <ul>
                <li>Netscape Navigator</li>
                <li>Netscape Server Products</li>
                <li>Internet publishing software</li>
                <li>Network software</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   INTERNET HEADLINES
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/news"
) {

    this.loadNetscapeFakePage(
        "Internet Headlines",
        cleanUrl,
        `
            <h2>Internet Headlines</h2>

            <p>
                News and information from around the Internet.
            </p>

            <h2>Today's Headlines</h2>

            <ul>
                <li>Internet industry news</li>
                <li>New World Wide Web resources</li>
                <li>Technology announcements</li>
                <li>Netscape product news</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}


/* =================================================
   ABOUT THE NET
   ================================================= */

if (
    cleanUrl ===
    "http://home.netscape.com/about-the-net"
) {

    this.loadNetscapeFakePage(
        "About the Internet",
        cleanUrl,
        `
            <h2>About the Internet</h2>

            <p>
                Learn about the Internet, the World Wide Web,
                and the growing community of people and
                organizations connecting online.
            </p>

            <h2>Internet Resources</h2>

            <ul>
                <li>What is the Internet?</li>
                <li>What is the World Wide Web?</li>
                <li>Finding information online</li>
                <li>Internet communities</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Return to Netscape Home Page
                </a>
            </p>
        `
    );

    return;
}

    /* =================================================
       YAHOO
       ================================================= */

    if (
        cleanUrl ===
        "http://www.yahoo.com"
    ) {
        this.loadYahoo1995();
        return;
    }


    /* =================================================
       NASA
       ================================================= */

    if (
        cleanUrl ===
        "http://www.nasa.gov"
    ) {
        this.loadNASA1995();
        return;
    }


    if (
        cleanUrl ===
        "http://www.nasa.gov/news"
    ) {
        this.loadNASANews1995();
        return;
    }


    if (
        cleanUrl ===
        "http://www.nasa.gov/shuttle"
    ) {
        this.loadNASAShuttle1995();
        return;
    }


    if (
        cleanUrl ===
        "http://www.nasa.gov/mars"
    ) {
        this.loadNASAMars1995();
        return;
    }


    if (
        cleanUrl ===
        "http://www.nasa.gov/astronomy"
    ) {
        this.loadNASAAstronomy1995();
        return;
    }


    /* =================================================
       MICROSOFT
       ================================================= */

    if (
        cleanUrl ===
        "http://www.microsoft.com"
    ) {
        this.loadMicrosoft1995();
        return;
    }


    if (
        cleanUrl ===
        "http://www.microsoft.com/windows"
    ) {
        this.loadMicrosoftWindows1995();
        return;
    }


    if (
        cleanUrl ===
        "http://www.microsoft.com/developer"
    ) {
        this.loadMicrosoftDeveloper1995();
        return;
    }


    if (
        cleanUrl ===
        "http://www.microsoft.com/products"
    ) {
        this.loadMicrosoftProducts1995();
        return;
    }


    /* =================================================
       UNKNOWN SIMULATED WEBSITE
       ================================================= */

    this.loadNetscapeError(url);
},

/* =====================================================
   NETSCAPE HOME PAGE — 1995
   ===================================================== */

loadNetscapeHome() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner netscape-home-1995">

            <!-- =========================================
     NETSCAPE WELCOME PAGE IMAGE
     ========================================= -->

<img
    src="assets/images/windows 95 kit/Web/Netscape/Welcome page/welcome.webp"
    alt="Welcome to Netscape"
    class="netscape-welcome-page-image"
>

            <!-- =========================================
                 NEWS / PROMOTIONAL TEXT
                 ========================================= -->

            <div class="netscape-news">

                <h2>Secure Courier</h2>

                <p>
                    Netscape announces
                    <a href="#"
                       data-netscape-url="http://home.netscape.com/">
                        the first open, cross-platform
                        "digital envelope" protocol
                    </a>
                    to be supported by Intuit, MasterCard,
                    and others.
                </p>


                <h2>Windows 95 Navigator Beta</h2>

                <p>
                    <a href="#"
                       data-netscape-url="http://home.netscape.com/download">
                        Download
                    </a>
                    the latest beta release of Netscape Navigator,
                    specially tuned to take advantage of
                    <a href="#"
                       data-netscape-url="http://www.microsoft.com/windows/">
                        Win 95 interface enhancements
                        and features.
                    </a>
                </p>


                <h2>ServerMania</h2>

                <p>
                    Test drive a
                    <a href="#"
                       data-netscape-url="http://home.netscape.com/servers">
                        fully loaded Netscape Commerce or
                        Communications Server
                    </a>
                    for 60 days and win the race for business
                    server solutions.
                    Now free for
                    <a href="#"
   data-netscape-url="http://home.netscape.com/education">
    educational and charitable nonprofit
</a>
                </p>

            </div>


            <hr>


            <!-- =========================================
     NETSCAPE NAVIGATOR ADVERTISEMENT
     ========================================= -->

<div class="netscape-ad-placeholder">

    <img
        src="assets/images/windows 95 kit/Web/Netscape/Welcome page/netscape navigator.webp"
        alt="Introducing Netscape Navigator Personal Edition"
        class="netscape-navigator-banner"
    >

</div>

            <hr>


            <!-- =========================================
                 SECOND WELCOME HEADING
                 ========================================= -->

            <h1 class="netscape-home-heading">
                WELCOME TO NETSCAPE!
            </h1>


            <!-- =========================================
                 LINK COLUMNS
                 ========================================= -->

            <div class="netscape-link-columns">


                <!-- EXPLORING THE NET -->

                <div class="netscape-link-column">

                    <h2>Exploring the Net</h2>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/whats-new/">
                        What's New
                    </a>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/whats-cool/">
                        What's Cool
                    </a>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/directory/">
                        Net Directory
                    </a>

                    <a href="#"
                       data-netscape-url="http://www.yahoo.com/">
                        Net Search
                    </a>

                </div>


                <!-- NETSCAPE STORE -->

                <div class="netscape-link-column">

                    <h2>Netscape Store</h2>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/store/software">
                        Software
                    </a>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/help">
                        Support
                    </a>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/publications">
                        Publications
                    </a>

                </div>


                <!-- COMMUNITY -->

                <div class="netscape-link-column">

                    <h2>Community</h2>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/community/groups">
                        Netscape User Groups
                    </a>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/community/white-pages">
                        Internet White Pages
                    </a>

                </div>


                <!-- COMPANY -->

                <div class="netscape-link-column">

                    <h2>Company &amp; Products</h2>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/company">
                        Netscape Products
                    </a>

                </div>


                <!-- ASSISTANCE -->

                <div class="netscape-link-column">

                    <h2>Assistance</h2>

                    <a href="#"
   data-netscape-url="http://home.netscape.com/about-the-net">
    About the Net
</a>

                </div>


                <!-- NEWS -->

                <div class="netscape-link-column">

                    <h2>News &amp; Reference</h2>

                    <a href="#"
                       data-netscape-url="http://home.netscape.com/news">
                        Internet Headlines
                    </a>

                </div>

            </div>


            <hr>


            <center>
                <small>
                    Netscape Communications Corporation
                </small>
            </center>

        </div>

    `;


    /* ================================================
       ACTIVATE ALL NETSCAPE INTERNAL LINKS
       ================================================ */

    this.setupNetscapePageLinks();

},

/* =====================================================
   AMAZON.COM — 1995
   ===================================================== */

loadAmazon1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `
        <iframe
            class="netscape-website-frame"
            src="html/amazon.html"
            title="Amazon.com 1995"
            scrolling="no"
        ></iframe>
    `;

    const frame =
        page.querySelector(".netscape-website-frame");

    if (!frame) {
        return;
    }


    const resizeAmazonFrame = () => {

        try {

            const doc =
                frame.contentDocument;

            if (!doc) {
                return;
            }

            const body =
                doc.body;

            const html =
                doc.documentElement;

            if (!body || !html) {
                return;
            }


            /*
             * Get the complete height of the Amazon document.
             */

            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                body.clientHeight,
                html.scrollHeight,
                html.offsetHeight,
                html.clientHeight
            );


            /*
             * Add a small amount of extra space so the
             * very bottom of the page is never hidden.
             */

            frame.style.height =
                (height + 10) + "px";

        } catch (error) {

            console.warn(
                "Could not resize Amazon frame:",
                error
            );

        }

    };


    frame.addEventListener(
        "load",
        () => {

            /*
             * Wait until the Amazon document has completely
             * rendered before measuring it.
             */

            requestAnimationFrame(() => {

                resizeAmazonFrame();

                /*
                 * Run once more after layout has settled.
                 */

                setTimeout(
                    resizeAmazonFrame,
                    100
                );

            });

        }
    );

},

/* =====================================================
   APPLE COMPUTER — 1995
   ===================================================== */

loadApple1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `
        <iframe
            class="netscape-website-frame"
            src="html/apple.html"
            title="Apple Computer 1995"
            scrolling="no"
        ></iframe>
    `;

    const frame =
        page.querySelector(".netscape-website-frame");

    if (!frame) {
        return;
    }

    const resizeAppleFrame = () => {

        try {

            const doc =
                frame.contentDocument;

            if (!doc) {
                return;
            }

            const body =
                doc.body;

            const html =
                doc.documentElement;

            if (!body || !html) {
                return;
            }

            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                body.clientHeight,
                html.scrollHeight,
                html.offsetHeight,
                html.clientHeight
            );

            frame.style.height =
                (height + 10) + "px";

        } catch (error) {

            console.warn(
                "Could not resize Apple frame:",
                error
            );

        }

    };

    frame.addEventListener(
        "load",
        () => {

            requestAnimationFrame(() => {

                resizeAppleFrame();

                setTimeout(
                    resizeAppleFrame,
                    100
                );

            });

        }
    );

},

/* =====================================================
   NETSCAPE — GENERIC FAKE PAGE
   ===================================================== */

loadNetscapeFakePage(title, address, content) {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>${title}</h1>

            <hr>

            ${content}

            <hr>

            <center>
                <small>
                    <i>
                        Historical reconstruction — This page is
                        simulated for the Time-Travel Web Simulator.
                        No reliable original reference was available
                        for this specific page.
                    </i>
                </small>
            </center>

        </div>

    `;

    this.setupNetscapePageLinks();
},

/* =====================================================
   YAHOO 1995
   ===================================================== */

/* =====================================================
   YAHOO 1995
   ===================================================== */

loadYahoo1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>Yahoo!</h1>

            <p>
                <b>
                    Yet Another Hierarchical Officious Oracle
                </b>
            </p>

            <hr>

            <h2>Yahoo! Directory</h2>

            <ul>

                <li>
                    <a href="#"
                       data-netscape-url="http://www.nasa.gov/">
                        Science
                    </a>
                </li>

                <li>
                    <a href="#"
                       data-netscape-url="http://www.microsoft.com/">
                        Computers and Internet
                    </a>
                </li>

                <li>
                    <a href="#"
                       data-netscape-url="http://home.netscape.com/">
                        Internet Resources
                    </a>
                </li>

                <li>
                    <a href="#"
                       data-netscape-url="http://www.yahoo.com/">
                        Yahoo! Home
                    </a>
                </li>

            </ul>

            <hr>

            <h2>Yahoo! Search</h2>

            <p>
                Search the World Wide Web:
            </p>

            <input
                type="text"
                id="yahooSearchInput"
                style="width: 180px;"
            >

            <button
                id="yahooSearchButton"
            >
                Search
            </button>

            <hr>

            <small>
                Copyright © 1995 Yahoo!
            </small>

        </div>

    `;


    /* =================================================
       LINKS
       ================================================= */

    page
        .querySelectorAll("[data-netscape-url]")
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                event.preventDefault();

                this.navigateNetscape(
                    link.dataset.netscapeUrl
                );

            });

        });


    /* =================================================
       YAHOO SEARCH
       ================================================= */

    const searchInput =
        document.getElementById("yahooSearchInput");

    const searchButton =
        document.getElementById("yahooSearchButton");


    if (searchButton && searchInput) {

        searchButton.addEventListener(
            "click",
            () => {

                const query =
                    searchInput.value.trim();

                if (!query) {
                    return;
                }

                this.loadYahooSearchResults(
                    query
                );

            }
        );


        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchButton.click();

                }

            }
        );

    }

},

/* =====================================================
   YAHOO SEARCH RESULTS
   ===================================================== */

loadYahooSearchResults(query) {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }


    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>Yahoo! Search</h1>

            <hr>

            <p>
                Search results for:
                <b>${query}</b>
            </p>

            <hr>

            <p>
                <a href="#"
                   data-netscape-url="http://www.nasa.gov/">
                    NASA - National Aeronautics and Space Administration
                </a>
            </p>

            <p>
                Information about space, science and exploration.
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.microsoft.com/">
                    Microsoft Corporation
                </a>
            </p>

            <p>
                Information about Microsoft products and technologies.
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://home.netscape.com/">
                    Netscape Navigator
                </a>
            </p>

            <p>
                The World Wide Web browser from Netscape.
            </p>

            <hr>

            <small>
                Yahoo! Search — 1995
            </small>

        </div>

    `;


    /* =================================================
       RESULT LINKS
       ================================================= */

    page
        .querySelectorAll("[data-netscape-url]")
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                event.preventDefault();

                this.navigateNetscape(
                    link.dataset.netscapeUrl
                );

            });

        });

},

/* =====================================================
   NASA 1995 HOME
   ===================================================== */

loadNASA1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>NASA</h1>

            <hr>

            <h2>
                National Aeronautics and Space Administration
            </h2>

            <p>
                Welcome to NASA on the World Wide Web.
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.nasa.gov/news/">
                    NASA News
                </a>
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.nasa.gov/shuttle/">
                    Space Shuttle
                </a>
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.nasa.gov/mars/">
                    Mars
                </a>
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.nasa.gov/astronomy/">
                    Astronomy
                </a>
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.yahoo.com/">
                    Search the Web with Yahoo!
                </a>
            </p>

            <hr>

            <p>
                <small>
                    This page is best viewed with a graphical
                    World Wide Web browser.
                </small>
            </p>

        </div>

    `;


    this.setupNetscapePageLinks();

},

/* =====================================================
   NASA NEWS
   ===================================================== */

loadNASANews1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>NASA News</h1>

            <hr>

            <h2>
                NASA News and Information
            </h2>

            <p>
                Latest news and announcements from NASA.
            </p>

            <ul>

                <li>
                    Space Shuttle missions
                </li>

                <li>
                    Planetary exploration
                </li>

                <li>
                    Space science
                </li>

                <li>
                    Human spaceflight
                </li>

            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://www.nasa.gov/">
                    Back to NASA Home
                </a>
            </p>

            <hr>

            <small>
                NASA World Wide Web
            </small>

        </div>

    `;

    this.setupNetscapePageLinks();

},

/* =====================================================
   NASA SPACE SHUTTLE
   ===================================================== */

loadNASAShuttle1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>Space Shuttle</h1>

            <hr>

            <h2>
                NASA Space Shuttle Program
            </h2>

            <p>
                Information about the Space Shuttle
                program and missions.
            </p>

            <p>
                <b>Current missions and flight information</b>
            </p>

            <p>
                Shuttle missions provide access to
                low Earth orbit for scientific research
                and satellite operations.
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.nasa.gov/">
                    NASA Home
                </a>
            </p>

            <hr>

            <small>
                NASA World Wide Web
            </small>

        </div>

    `;

    this.setupNetscapePageLinks();

},


/* =====================================================
   NASA MARS
   ===================================================== */

loadNASAMars1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>Mars</h1>

            <hr>

            <h2>
                Exploring the Red Planet
            </h2>

            <p>
                NASA missions continue to study Mars
                and its geology, atmosphere and history.
            </p>

            <p>
                <a href="#">
                    Mars Pathfinder Information
                </a>
            </p>

            <p>
                <a href="#">
                    Mars Images
                </a>
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.nasa.gov/">
                    NASA Home
                </a>
            </p>

            <hr>

            <small>
                NASA World Wide Web
            </small>

        </div>

    `;

    this.setupNetscapePageLinks();

},


/* =====================================================
   NASA ASTRONOMY
   ===================================================== */

loadNASAAstronomy1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>Astronomy</h1>

            <hr>

            <h2>
                NASA Astronomy Resources
            </h2>

            <p>
                Explore information about stars,
                planets, galaxies and the universe.
            </p>

            <ul>

                <li>Solar System</li>
                <li>Stars</li>
                <li>Galaxies</li>
                <li>Space Telescopes</li>

            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://www.nasa.gov/">
                    NASA Home
                </a>
            </p>

            <hr>

            <small>
                NASA World Wide Web
            </small>

        </div>

    `;

    this.setupNetscapePageLinks();

},

/* =====================================================
   NETSCAPE PAGE LINKS
   ===================================================== */

setupNetscapePageLinks() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }


    page
        .querySelectorAll("[data-netscape-url]")
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    this.navigateNetscape(
                        link.dataset.netscapeUrl
                    );

                }
            );

        });

},

/* =====================================================
   MICROSOFT 1995
   ===================================================== */

/* =====================================================
   MICROSOFT 1995 HOME
   ===================================================== */

loadMicrosoft1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>Microsoft</h1>

            <hr>

            <h2>
                Welcome to Microsoft
            </h2>

            <p>
                Information about Microsoft products
                and technologies.
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.microsoft.com/windows/">
                    Windows
                </a>
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.microsoft.com/developer/">
                    Developer Resources
                </a>
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.microsoft.com/products/">
                    Product Information
                </a>
            </p>

            <p>
                <a href="#"
                   data-netscape-url="http://www.yahoo.com/">
                    Search the Web with Yahoo!
                </a>
            </p>

            <hr>

            <small>
                Microsoft Corporation
            </small>

        </div>

    `;

    this.setupNetscapePageLinks();

},

/* =====================================================
   MICROSOFT WINDOWS 1995
   ===================================================== */

loadMicrosoftWindows1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>Microsoft Windows</h1>

            <hr>

            <h2>
                Windows Information
            </h2>

            <p>
                Welcome to the Microsoft Windows
                information pages.
            </p>

            <p>
                <b>Windows 95</b>
            </p>

            <p>
                Windows 95 provides an improved
                graphical user interface and support
                for new PC technologies.
            </p>

            <ul>
                <li>Desktop</li>
                <li>Networking</li>
                <li>Multimedia</li>
                <li>Internet Support</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://www.microsoft.com/">
                    Microsoft Home
                </a>
            </p>

            <hr>

            <small>
                Microsoft Corporation
            </small>

        </div>

    `;

    this.setupNetscapePageLinks();

},

/* =====================================================
   MICROSOFT DEVELOPER
   ===================================================== */

loadMicrosoftDeveloper1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>Microsoft Developer Network</h1>

            <hr>

            <h2>
                Developer Resources
            </h2>

            <p>
                Technical information and resources
                for software developers.
            </p>

            <ul>
                <li>Windows Programming</li>
                <li>Win32 API</li>
                <li>Visual C++</li>
                <li>Technical Documentation</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://www.microsoft.com/">
                    Microsoft Home
                </a>
            </p>

            <hr>

            <small>
                Microsoft Developer Network
            </small>

        </div>

    `;

    this.setupNetscapePageLinks();

},

/* =====================================================
   MICROSOFT PRODUCTS
   ===================================================== */

loadMicrosoftProducts1995() {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>Microsoft Products</h1>

            <hr>

            <h2>
                Product Information
            </h2>

            <p>
                Information about Microsoft software.
            </p>

            <ul>
                <li>Windows 95</li>
                <li>Microsoft Office</li>
                <li>Visual Basic</li>
                <li>Visual C++</li>
                <li>Internet Explorer</li>
            </ul>

            <p>
                <a href="#"
                   data-netscape-url="http://www.microsoft.com/">
                    Microsoft Home
                </a>
            </p>

            <hr>

            <small>
                Microsoft Corporation
            </small>

        </div>

    `;

    this.setupNetscapePageLinks();

},




/* =====================================================
   UNKNOWN SITE
   ===================================================== */

loadNetscapeError(address) {

    const page =
        document.getElementById("netscapePage");

    if (!page) {
        return;
    }

    page.innerHTML = `

        <div class="netscape-page-inner">

            <h1>
                Unable to Locate Server
            </h1>

            <hr>

            <p>
                Netscape is unable to locate the server:
            </p>

            <p>
                <b>${address}</b>
            </p>

            <p>
                Please check the URL and try again.
            </p>

            <hr>

            <small>
                Netscape Navigator
            </small>

        </div>

    `;

},

    /* =====================================================
       WINDOWS
       ===================================================== */

    setupWindows() {

        const windows =
            document.querySelectorAll(".win95-window");

        windows.forEach((windowElement) => {

            const id = windowElement.id;

            this.windows[id] = {
    element: windowElement,
    minimized: windowElement.style.display === "none"
};


            const titlebar =
                windowElement.querySelector(".window-titlebar");

            const minimizeButton =
                windowElement.querySelector(".minimize-button");

            const maximizeButton =
                windowElement.querySelector(".maximize-button");

            const closeButton =
                windowElement.querySelector(".close-button");


            if (titlebar) {

                this.makeDraggable(
                    windowElement,
                    titlebar
                );

            }


            windowElement.addEventListener("mousedown", () => {

                this.focusWindow(id);

            });


            if (minimizeButton) {

                minimizeButton.addEventListener("click", (event) => {

                    event.stopPropagation();

                    this.minimizeWindow(id);

                });

            }


            if (maximizeButton) {

                maximizeButton.addEventListener("click", (event) => {

                    event.stopPropagation();

                    this.toggleMaximize(id);

                });

            }


            if (closeButton) {

                closeButton.addEventListener("click", (event) => {

                    event.stopPropagation();

                    this.closeWindow(id);

                });

            }

        });


        if (this.welcomeOkButton) {

            this.welcomeOkButton.addEventListener("click", () => {

                this.minimizeWindow("welcomeWindow");

            });

        }

    },


    /* =====================================================
       WINDOW FOCUS
       ===================================================== */

    focusWindow(id) {

        const windowData = this.windows[id];

        if (!windowData) return;


        this.zIndex++;

        windowData.element.style.zIndex =
            this.zIndex;


        document
            .querySelectorAll(".window-titlebar")
            .forEach((titlebar) => {

                titlebar.classList.add("inactive");

            });


        const activeTitlebar =
            windowData.element.querySelector(
                ".window-titlebar"
            );

        if (activeTitlebar) {

            activeTitlebar.classList.remove("inactive");

        }


        document
            .querySelectorAll(".taskbar-window")
            .forEach((button) => {

                button.classList.remove("active");

            });


        const taskbarButton =
            document.querySelector(
                `[data-window-id="${id}"]`
            );

        if (taskbarButton) {

            taskbarButton.classList.add("active");

        }

    },


    /* =====================================================
       MINIMIZE
       ===================================================== */

    minimizeWindow(id) {

        const windowData = this.windows[id];

        if (!windowData) return;


        windowData.element.style.display = "none";

        windowData.minimized = true;


        const taskbarButton =
            document.querySelector(
                `[data-window-id="${id}"]`
            );

        if (taskbarButton) {

            taskbarButton.classList.remove("active");

        }

    },


    /* =====================================================
       CLOSE
       ===================================================== */

    closeWindow(id) {

        const windowData = this.windows[id];

        if (!windowData) return;


        windowData.element.style.display = "none";

        windowData.closed = true;


        const taskbarButton =
            document.querySelector(
                `[data-window-id="${id}"]`
            );

        if (taskbarButton) {

            taskbarButton.remove();

        }

    },


    /* =====================================================
       MAXIMIZE
       ===================================================== */

setupDesktopIcons() {

    const icons =
        document.querySelectorAll(".desktop-icon");

    icons.forEach((icon) => {

        icon.addEventListener("click", (event) => {

            event.stopPropagation();

            icons.forEach((otherIcon) => {
                otherIcon.classList.remove("selected");
            });

            icon.classList.add("selected");
        });

    });


    document
        .getElementById("desktop")
        .addEventListener("click", () => {

            icons.forEach((icon) => {
                icon.classList.remove("selected");
            });

        });


    const netscapeIcon =
        document.getElementById("netscapeIcon");

    if (netscapeIcon) {

        netscapeIcon.addEventListener(
            "dblclick",
            () => {

                console.log(
                    "Netscape Navigator will launch here."
                );

            }
        );

    }


    if (timeMachineIcon) {

    timeMachineIcon.addEventListener(
        "dblclick",
        () => {

            const welcomeWindow =
                document.getElementById("welcomeWindow");

            if (welcomeWindow) {

                welcomeWindow.style.display = "block";

                this.focusWindow("welcomeWindow");

            }

        }
    );

}
},

    /* =====================================================
       TASKBAR
       ===================================================== */

    registerTaskbarWindow(id) {

        const windowData =
            this.windows[id];

        if (!windowData) return;


        if (
            document.querySelector(
                `[data-window-id="${id}"]`
            )
        ) {
            return;
        }


        const titlebar =
            windowData.element.querySelector(
                ".window-titlebar span"
            );


        const button =
            document.createElement("button");


        button.className =
            "taskbar-window";


        button.dataset.windowId =
            id;


        button.textContent =
            titlebar
                ? titlebar.textContent
                : id;


        button.addEventListener("click", () => {

            const currentWindow =
                this.windows[id];


            if (
                currentWindow.element.style.display ===
                "none"
            ) {

                currentWindow.element.style.display =
                    "block";

                currentWindow.minimized = false;

                this.focusWindow(id);

            } else {

                if (
                    currentWindow.minimized ||
                    currentWindow.element.style.zIndex !==
                    String(this.zIndex)
                ) {

                    currentWindow.element.style.display =
                        "block";

                    currentWindow.minimized = false;

                    this.focusWindow(id);

                } else {

                    this.minimizeWindow(id);

                }

            }

        });


        this.taskbarWindows.appendChild(button);

    },


    /* =====================================================
       DRAGGING
       ===================================================== */

    makeDraggable(windowElement, titlebar) {

        let dragging = false;

        let offsetX = 0;
        let offsetY = 0;


        titlebar.addEventListener("mousedown", (event) => {

            if (
                event.target.closest(".window-controls")
            ) {
                return;
            }


            dragging = true;


            const rect =
                windowElement.getBoundingClientRect();


            offsetX =
                event.clientX - rect.left;

            offsetY =
                event.clientY - rect.top;


            this.focusWindow(
                windowElement.id
            );


            event.preventDefault();

        });


        document.addEventListener("mousemove", (event) => {

            if (!dragging) return;


            const desktop =
                document.getElementById("desktop");


            const desktopRect =
                desktop.getBoundingClientRect();


            let newLeft =
                event.clientX -
                desktopRect.left -
                offsetX;


            let newTop =
                event.clientY -
                desktopRect.top -
                offsetY;


            newLeft =
                Math.max(
                    0,
                    Math.min(
                        newLeft,
                        desktop.clientWidth -
                        windowElement.offsetWidth
                    )
                );


            newTop =
                Math.max(
                    0,
                    Math.min(
                        newTop,
                        desktop.clientHeight -
                        30 -
                        windowElement.offsetHeight
                    )
                );


            windowElement.style.left =
                `${newLeft}px`;

            windowElement.style.top =
                `${newTop}px`;

        });


        document.addEventListener("mouseup", () => {

            dragging = false;

        });

    },


    /* =====================================================
       DESKTOP ICONS
       ===================================================== */

    setupDesktopIcons() {

    /* =====================================================
       TIME MACHINE DESKTOP ICON
       ===================================================== */

    const timeMachineIcon =
        document.getElementById("timeMachineIcon");


    if (timeMachineIcon) {

        timeMachineIcon.addEventListener(
            "dblclick",
            (event) => {

                event.preventDefault();

                const welcomeWindow =
                    document.getElementById("welcomeWindow");


                if (welcomeWindow) {

                    welcomeWindow.style.display = "block";

                    this.focusWindow("welcomeWindow");

                }

            }
        );

    }

/* =====================================================
   NETSCAPE NAVIGATOR DESKTOP ICON
   ===================================================== */

const netscapeIcon =
    document.getElementById("netscapeIcon");

if (netscapeIcon) {

    netscapeIcon.addEventListener(
        "dblclick",
        (event) => {

            event.preventDefault();
            event.stopPropagation();

            const netscapeWindow =
                document.getElementById("netscapeWindow");

            if (!netscapeWindow) {
                return;
            }

            const windowData =
                this.windows["netscapeWindow"];

            /* ---------------------------------------------
               RESTORE NETSCAPE WINDOW
               --------------------------------------------- */

            netscapeWindow.style.display = "block";

            if (windowData) {
                windowData.minimized = false;
                windowData.closed = false;
            }

            /* ---------------------------------------------
               BRING NETSCAPE TO FRONT
               --------------------------------------------- */

            this.focusWindow(
                "netscapeWindow"
            );
        }
    );
}

},


    /* =====================================================
       CLOCK
       ===================================================== */

    updateClock() {

        if (!this.systemClock) return;


        const now =
            new Date();


        let hours =
            now.getHours();


        const minutes =
            String(
                now.getMinutes()
            ).padStart(2, "0");


        const ampm =
            hours >= 12
                ? "PM"
                : "AM";


        hours =
            hours % 12;


        if (hours === 0) {
            hours = 12;
        }


        this.systemClock.textContent =
            `${hours}:${minutes} ${ampm}`;

    }

};


document.addEventListener(
    "DOMContentLoaded",
    () => {

        OSEngine.init();

    }
);