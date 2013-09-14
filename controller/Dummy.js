/**
 * Dummy controller if no controller defined for the custom directive
 *
 */
define ([], function(){
       return {
           init: function(app) {
               app.controllers.Dummy = function() {

               };
           }
       }
    });