//When given a firstname, last name, and optional language, it generates formal and informal greetings

//Support English and Spanish languages

//Reusable

//$G()

//support Jquery

(function (global, $) {
    // 'new' an object
    var Greetr = function (firsname, lastname, language) {
        return new Greetr.init(firsname, lastname, language);
    };

    // hidden within the scope of the IIFE and not directly accessable
    var supportedLangs = ["en", "es"];

    // informal greetings
    var greetings = {
        en: "hello",
        es: "Hola",
    };

    //formal greetings
    var formalGreetings = {
        en: "Greetings",
        es: "Saludos",
    };

    // log messages (based on language)
    var logMessages = {
        en: "Logged in",
        es: "Inicio session",
    };

    //Greetr prototype
    Greetr.prototype = {
        //returns first and last name
        fullName: function () {
            return this.firstName + " " + this.lastName;
        },

        // checks if language submited is in the supportedLangs array
        validate: function () {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },

        // informal greeting
        greeting: function () {
            return greetings[this.language] + " " + this.firstName + "!";
        },

        // formal greeting
        formalGreeting: function () {
            return formalGreetings[this.language] + ", " + this.fullName();
        },

        // main greet method, user inputs 'true' or 'false' for formal. Console logs message
        greet: function (formal) {
            var msg;

            if (formal) {
                msg = this.formalGreeting(); //use formal Greeting
            } else {
                msg = this.greeting(); // use informal Greeting
            }

            if (console) {
                console.log(msg);
            }

            return this; //Chainable
        },

        // console logs langauge and fullName
        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ":" + this.fullName());
            }

            return this; //Chainable
        },

        // sets the language
        setLang: function (language) {
            this.language = language;

            this.validate(); //validates language (will throw error if invalid)

            return this; //chainable
        },

        // Allows user to use jQuery in Greetr methods
        HTMLGreeting: function (selector, formal) {
            {
                // Look for jQuery
                if (!$) {
                    throw "Missing jQuery selector";
                } else {
                    var msg;
                    if (formal) {
                        msg = this.formalGreeting(); // return formal Greeting
                    } else {
                        msg = this.greeting(); // return informal Greeting
                    }

                    $(selector).html(msg); //apply selector to message

                    return this; //chainable
                }
            }
        },
    };

    //Object is actually called here, so we can 'new' an object, without typing 'new'
    Greetr.init = function (firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || "";
        self.lastName = lastName || "";
        self.language = language || "en";

        self.validate();
    };

    // Stole this from jQuery, redirects what prototype is being pointed at
    Greetr.init.prototype = Greetr.prototype;

    // attach Greetr to global object, and provide a shorthand '$G' (also stole from jQuery)
    global.Greetr = global.G$ = Greetr;
})(window, jQuery);
