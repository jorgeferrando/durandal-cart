define(['jquery'], function($) {
    var ctor = function() { };

    ctor.prototype.activate = function(settings) {
        this.settings = settings;
        $('dropdown').dropdown();
    };

    return ctor;
});