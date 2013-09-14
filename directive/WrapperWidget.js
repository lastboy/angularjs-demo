/**
 * Directive - Template wrapper
 * Use this directive if you need a basic decoration with inner dynamic content
 *
 */
define([], function () {

    return {

        init: function (app) {

            /**
             * Directive for 'wrapper' style decoration
             *
             * @attr width The parent element width
             * @attr height The parent element height
             * @attr refobject The reference object to be referred on the transclude anchors
             *       and to be referred on the handler.
             *
             * e.g. <wrapper label="Test">{{foo.name}}</wrapper>
             *
             */
            app.modules.app.directive('wrapper', ["$http", "$interpolate", "$compile", function ($http, $interpolate, $compile) {

                return {
                    restrict: 'E',

                    scope: {
                        width: '@width',
                        height: '@height',
                        style: '@style',
                        label: '@label',
                        __ref: "=refobject"
                    },

                    controller: function ($scope, $transclude) {

                        var scope = $scope;
                        $transclude(function (clone) {
                            /**
                             * This is a fix for compiling a template which has ng-transclude
                             * attribute within. It's seems that in this case you cannot compile
                             * The template since an error occurs "undefined is not a function..."
                             *
                             * In this fix the ng-transclude attribute is been removed.
                             *
                             * @private
                             */
                            function _transcludeFix() {
                                var ngtrans = $("div").find("[ng-transclude='']");
                                if (ngtrans) {
                                    ngtrans.removeAttr("ng-transclude");
                                }
                            }

                            _transcludeFix();

                        });

                    },

                    transclude: true,
                    templateUrl: 'templates/wrapper_widget.html',

                    link: function (scope, element, attrs) {

                        /**
                         * Setting the defaults
                         *
                         * @param scope
                         * @param attrs
                         * @private
                         */
                        function _init(scope, element, attrs) {

                            scope.dwidth = (attrs.width || "300");
                            scope.dheight = (attrs.height || "150");
                            scope.dlabel = (attrs.label || "NA");
                            scope.dstyle = (attrs.style || " ;");
                            debugger;

                            if (attrs && attrs.refobject) {
                                scope[attrs.refobject] = scope.__ref;
                                scope.entity = scope.__ref;
                            }
                        }

                        _init(scope, element, attrs);
                        element.replaceWith($compile(element.html())(scope));

                    }
                }
            }]);
        }
    };
});