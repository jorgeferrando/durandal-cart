define([
    'knockout',
    "durandal/app",
    "plugins/router",
    "services/log",
    "services/product",
    "models/product"
],function(ko, app, router, Logger, ProductService,Product){
    var vm = {};
    vm.title=ko.observable("New product");
    vm.btn = "Add product";
    vm.edit = function() {
        ProductService.create(vm.product.toObj()).then(function(response){
            Logger.success("Product added","New product "+vm.product.name()+" added");
            router.navigate("#/catalog");
            app.trigger("catalog:refresh");
        });
    };
    vm.activate = function () {
        vm.product = new Product();
    };
    return vm;
});
