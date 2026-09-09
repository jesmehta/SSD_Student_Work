/* =========================================================
   AMAZON.COM — 1995
   INTERNAL PAGE NAVIGATION
   ========================================================= */

(function () {

    function initAmazonPage() {

        const links =
            document.querySelectorAll(
                "[data-amazon-page]"
            );

        links.forEach((link) => {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const page =
                        this.getAttribute(
                            "data-amazon-page"
                        );

                    amazonNavigate(page);

                }
            );

        });

    }


    function amazonNavigate(page) {

        console.log(
            "Amazon 1995 page requested:",
            page
        );


        /*
         * For now, change the Netscape address bar
         * to show the Amazon internal destination.
         */

        const urls = {

            home:
                "http://www.amazon.com",

            spotlight:
                "http://www.amazon.com/spotlight",

            browse:
                "http://www.amazon.com/browse",

            recommend:
                "http://www.amazon.com/recommend",

            reviews:
                "http://www.amazon.com/reviews",

            awards:
                "http://www.amazon.com/awards",

            bestsellers:
                "http://www.amazon.com/bestsellers",

            "eyes-editors":
                "http://www.amazon.com/eyes-editors",

            "meet-eyes":
                "http://www.amazon.com/meet-eyes",

            account:
                "http://www.amazon.com/account",

            about:
                "http://www.amazon.com/about",

            history:
                "http://www.amazon.com/history",

            employment:
                "http://www.amazon.com/employment",

            buy:
                "http://www.amazon.com/buy",

            basket:
                "http://www.amazon.com/basket",

            email:
                "http://www.amazon.com/email",

            help:
                "http://www.amazon.com/help",

            notifications:
                "http://www.amazon.com/notifications",

            book:
                "http://www.amazon.com/book",

            author:
                "http://www.amazon.com/author",

            biographies:
                "http://www.amazon.com/biographies"

        };


        const targetURL = urls[page];

        if (!targetURL) {

            console.warn(
                "Unknown Amazon page:",
                page
            );

            return;
        }


        /*
         * Send the URL to the parent Netscape window.
         */

        if (
            window.parent &&
            window.parent !== window
        ) {

            window.parent.postMessage(
                {
                    type: "amazon-navigation",
                    url: targetURL,
                    page: page
                },
                "*"
            );

        }

    }


    /*
     * Initialize when the Amazon document loads.
     */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initAmazonPage
        );

    } else {

        initAmazonPage();

    }

})();