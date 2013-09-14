/**
 * Wrapper Demo Controller
 *
 */
define ([], function(){
    return {
        init: function(app) {
            app.controllers.democtrl = function($scope) {
                $scope.wrapperdemo = {
                    dynname: "Dynamic Template name",
                    dyndesc: "Dynamic Template desc"
                }
            };
        }
    }
});