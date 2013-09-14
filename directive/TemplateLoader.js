/**
 * Directive - Template Loader
 * Loading and compiling template according to a set of given attributes
 *
 * e.g. <dtemplate src="foo.html"/>
 *
 */
define([], function() {

    return {

        init: function(app) {

            /**
             * Directive for loading dynamic templates
             */
            app.modules.app.directive('dtemplate', ["$http", "$interpolate", "$compile", function ($http, $interpolate, $compile) {

                var _me;

                return {
                    restrict:'E',

                    // Additional attributes definitions in here
                    scope:{ name:'@name',
                        src:'@src',
                        handler:"@handler",
                        image: "@image"
                    },

                    // Directive's controller
                    controller:function ($scope) {
                        this.scope = $scope;
                        _me = this;
                    },

                    replace:true,

                    transclude:true,

                    link:function (scope, element, attrs) {

                        var self = this;

                        if (!attrs.src) {

                            attrs.$observe('src', function (value) {
                                attrs.src = value;
                                process();
                            });
                        } else {

                            process();
                        }

                        function process() {

                            if (!attrs.src) {
                                console.error("[Template Loader] 'src' attribute is mandatory for dtemplate directive ");
                            }

                            var resource = "", _fn,
                                resource = attrs.src;
                            _me = self;

                            // remove the template's former content for setting the new.
                            element.children().remove();

                            /**
                             * Functionality in case the resource was loaded successfully
                             *
                             * @private
                             */
                            _fn = function (data, status, headers, config) {

                                // default scope values settings
                                scope.width = (scope.width || "300");
                                scope.height = (scope.height || "150");
                                scope.selected = (scope.selected || false);

                                // if no controller passed as argument use the dummy controller
                                if (!scope.handler) {
                                    scope.handler = app.controllers.Dummy;

                                } else {
                                    scope.handler = eval(scope.handler);
                                }

                                // point the image to the right path
                                if (!scope.image) {
                                    scope.image_hidden = "display:none;";
                                } else {
                                    scope.image = "images/" + scope.dimage;
                                }

                                // compile the template with the incoming scope data
                                var template = ($compile(data))(scope);
                                element.append(template);
                            };

                            // HTTP loader for the template
                            $http({method:'GET', url:resource}).
                                success(_fn).
                                error(function (data, status, headers, config) {
                                    console.log("[Template Loade] Failed to load template: ", data, status, headers, config);
                                });

                        }

                    }
                }
            }]);
        }
    };
});