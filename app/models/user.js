define(["knockout"],function(ko){

    return function() {
        this.username = ko.observable();
        this.password = ko.observable();
        this.remember = ko.observable();

        this.serialize = function () {
            var u = this.obj();
            return JSON.stringify(u);
        };
        this.obj = function () {
            var u = {};
            u.username = this.username();
            u.password = this.password();
            u.remember = this.remember();
            return u;
        }
    }

})
