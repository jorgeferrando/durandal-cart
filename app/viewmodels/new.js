define([
    'knockout',
    "durandal/app",
    "plugins/router",
    "services/log",
    "services/uuid",
    "services/product",
    "models/product"
],function(ko, app, router,Logger,uuid, ProductService,Product){
    var vm = {};

    var id = (new Date()).getTime();

    vm.title=ko.observable("New product");
    vm.btn = "Add product";

    vm.product = new Product(id);

    vm.edit = function() {
        ProductService.create(vm.product.toObj()).then(function(response){
            Logger.success("Product added","New product "+vm.product.name()+" added");
            router.navigate("#/catalog");
            app.trigger("catalog:refresh");
        });
    };

    vm.activate = function () {
        vm.product = new Product(id)
    }

    return vm;
});
