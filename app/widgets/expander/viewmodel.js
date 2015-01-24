define(['durandal/composition','jquery'], function(composition, $) {
    var ctor = function() { };

    var counter = 0;


    ctor.prototype.activate = function(settings) {
        this.settings = settings;
        this.settings.items.forEach(function(item){
            item.id=counter++;
        });
    };

    ctor.prototype.getHeaderText = function(item) {
        if (this.settings.headerProperty) {
            return item[this.settings.headerProperty];
        }

        return item.toString();
    };

    return ctor;
});