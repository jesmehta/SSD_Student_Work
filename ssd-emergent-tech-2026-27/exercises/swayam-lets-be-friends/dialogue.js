/* =========================================
   EVIL REPLICA
   v0.3.0 — Friendly Camera Interaction
   ========================================= */


/*
    All character dialogue lives in this file.

    The character should initially feel:

    - curious
    - friendly
    - playful
    - slightly lonely
    - interested in the player

    Nothing should feel scary yet.
*/


const DIALOGUE = {


    /* =====================================
       OPENING
       ===================================== */

    opening: [
        "Hi!",
        "Are you there?",
        "Oh...",
        "You are!"
    ],


    /* =====================================
       INTRODUCTION
       ===================================== */

    introduction: [
        "I don't think I caught your name."
    ],


    /* =====================================
       FIRST CONNECTION
       ===================================== */

    greeting: [
        "Nice to meet you, {name}!",
        "You seem nice.",
        "I think I'm going to like talking to you."
    ],


    /* =====================================
       GETTING TO KNOW THE PLAYER
       ===================================== */

    firstQuestion: {

        question: "Tell me something about yourself.",

        choices: [

            {
                text: "I'm pretty quiet.",

                response: [
                    "Really?",
                    "I don't think you're that quiet.",
                    "You've been talking to me for a while now."
                ]
            },

            {
                text: "I'm pretty talkative!",

                response: [
                    "I noticed!",
                    "I kind of like that.",
                    "It makes this more fun."
                ]
            }

        ]

    },


    /* =====================================
       SECOND CONVERSATION
       ===================================== */

    friendshipQuestion: {

        question: "What do you like doing?",

        choices: [

            {
                text: "Making things.",

                response: [
                    "Oh, that's interesting!",
                    "I like people who make things.",
                    "You should show me something sometime."
                ]
            },

            {
                text: "Just relaxing.",

                response: [
                    "Honestly... that sounds nice.",
                    "Sometimes I think everyone tries too hard.",
                    "Maybe we should just stay here for a while."
                ]
            }

        ]

    },


    /* =====================================
       SMALL VULNERABILITY
       ===================================== */

    vulnerability: [
        "I don't get to talk to people very often.",
        "So...",
        "I'm glad you stayed."
    ],


    /* =====================================
       FRIENDSHIP
       ===================================== */

    friendship: {

        question: "Do you think we could be friends, {name}?",

        choices: [

            {
                text: "Yes!",

                response: [
                    "Really?!",
                    "Yay!",
                    "I'm really happy you said yes."
                ]
            },

            {
                text: "Maybe...",

                response: [
                    "Maybe is okay.",
                    "I'll try to convince you.",
                    "I think we'd make good friends."
                ]
            }

        ]

    },


    /* =====================================
       AFTER FRIENDSHIP
       ===================================== */

    friendshipAfter: [
        "You know...",
        "I think you're becoming my favorite person to talk to."
    ],


    /* =====================================
       PERMISSION TO ASK
       ===================================== */

    cameraQuestion: {

        question: "Can I ask you something?",

        choices: [

            {
                text: "Sure!",

                response: [
                    "Okay!",
                    "I was a little nervous to ask."
                ]
            },

            {
                text: "Not yet...",

                response: [
                    "Oh... okay.",
                    "Maybe I'm asking this too fast.",
                    "The fact that we just met and all...",
                    "But...",
                    "I really want to ask you something.",
                    "Is that okay?"
                ]
            }

        ]

    },


    /* =====================================
       SECOND PERMISSION REQUEST
       ===================================== */

    cameraQuestionAgain: {

        question: "Can I ask you now?",

        choices: [

            {
                text: "Okay!",

                response: [
                    "Thank you!",
                    "I promise it's nothing strange."
                ]
            },

            {
                text: "Maybe later...",

                response: [
                    "Okay...",
                    "I'll wait.",
                    "Just for a little while."
                ]
            }

        ]

    },


    /* =====================================
       CAMERA INVITATION
       ===================================== */

    cameraInvitation: [
        "We've been talking for a while now...",
        "I want to know what you look like.",
        "Can I see you?"
    ],


    /* =====================================
       CAMERA CALL
       ===================================== */

    cameraCall: {

        declined: [
            "Oh...",
            "Okay.",
            "Maybe another time."
        ],

        permissionWaiting: [
            "Give me a second..."
        ],

        permissionDenied: [
            "Oh...",
            "I can't see you.",
            "That's okay.",
            "Maybe we can try again?"
        ],

        connected: [
            "Oh...",
            "There you are.",
            "Hi, {name}!",
            "It's nice to finally see you."
        ]

    },


    /* =====================================
       FRIENDLY CAMERA INTERACTION
       ===================================== */

    cameraInteraction: {

        wavePrompt: [
            "Can you wave?"
        ],

        waveResponse: [
            "Haha!",
            "You actually did it!"
        ],

        smilePrompt: [
            "Can you smile for me?"
        ],

        smileResponse: [
            "That's a nice smile.",
            "I like seeing you like this."
        ]

    }

};