/**
 * The Main controller
 *
 * - Navigation map index for the templates
 * - Toolbar's buttons meta data
 *
 */
define(["jquery"], function ($) {

    return {
        init: function (app) {

            app.controllers.Main = function ($scope, $routeParams) {

                var paths = {
                    demo1: "templates/views/demo1.html",
                    demo2: "templates/views/demo2.html"
                }

                if (!$routeParams.navigateTo) {
                    $scope.navigateTo = paths.demo1;
                } else {
                    $scope.navigateTo = paths[$routeParams.navigateTo];
                }

                // toolbar buttons meta data
                $scope.buttons = [
                    {
                        name: "Demo1",
                        click: function () {
                            $scope.navigateTo = paths["demo1"];
                        }
                    },
                    {
                        name: "Demo2",
                        click: function () {
                            $scope.navigateTo = paths["demo2"];
                        }
                    }
                ]

            }
        }
    };
});