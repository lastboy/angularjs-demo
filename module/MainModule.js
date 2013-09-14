define(["angular", "mainctrl", "dummyctrl", "democtrl", "tplLoader", "wrapperw"], function(ang, mainctrl, dummyctrl, wrapperdemoctrl, tplloader, wrapperw) {

    app.modules = {};
    app.controllers = {};

    function _init() {
        app.modules.app = angular.module('App', [])
            .config(function ($compileProvider) {
                $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

            }).config(function ($routeProvider) {

                $routeProvider
                    .when('/main/:navigateTo', {
                        controller:app.controllers.Main,
                        templateUrl:'templates/main.html'

                    });
            });

        // controllers Init
        wrapperdemoctrl.init(app);
        mainctrl.init(app);
        mainctrl.init(app);
        dummyctrl.init(app);

        // directive init
        tplloader.init(app);
        wrapperw.init(app);


        app.modules.app.run(['$document', '$location', '$rootElement', function ($document, $location, $rootElement) {
            console.log("[Main Module] App module's Run method is ready.");
            // Initial navigate to demo1
            $location.path("/main/demo1");
        }]);

        // init
        angular.bootstrap(document, ['App']);
    }

    return {
        initialize: _init
    };

});