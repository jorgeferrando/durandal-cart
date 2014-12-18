define(['durandal/composition','jquery'], function(composition, $) {
    var ctor = function() { };

    function guid() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return S4();
        //return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }


    ctor.prototype.activate = function(settings) {
        this.settings = settings;
        this.settings.items.forEach(function(item){
            item.id=guid();
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