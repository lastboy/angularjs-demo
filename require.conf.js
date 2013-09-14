
var app = {modules:{}};

/**
 * RequireJS Main Configuration
 */
require.config({
    baseUrl:".",

    paths:{

        // libs
        "jquery":"lib/jquery",
        "jqueryui":"lib/jquery-ui",

        // application
        "angular": "lib/angular-1.0.5",
        "app": "module/MainModule",
        "dummyctrl": "controller/Dummy",
        "democtrl": "controller/DemoCtrl",
        "mainctrl": "controller/Main",
        "tplLoader": "directive/TemplateLoader",
        "wrapperw": "directive/WrapperWidget"

    },
   
    shim: {
        'jqueryui': {
            deps: ['jquery']
        }
    },

    out:"demo-app-built.js",
    name:"demo-app"

});

// Includes File Dependencies
require([
    "jquery",
    "jqueryui",
    "angular",
    "app"

], function ($, $ui, ang, app) {

    app.initialize();


});