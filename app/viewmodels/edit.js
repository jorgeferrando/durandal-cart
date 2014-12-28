define([
    "knockout",
    "durandal/app",
    "plugins/router",
    "services/log",
    "services/uuid",
    "services/product",
    "models/product"
],function(ko, app, router,Logger,uuid,ProductService,Product){
    var vm = {};

    vm.title = ko.observable("Edit Product");
    vm.btn = "Edit product";

    vm.activate = function(id) {
        return ProductService.get(id).then(function(response){
            var p = response.data;
            if (p) {
                vm.product = new Product(p.id, p.name, p.price, p.stock);
            } else {
                Logger.error("We didn't find product with id:"+id)
                router.navigate('#/catalog');
            }
        });
    };


    vm.edit = function() {
        ProductService.save(vm.product.toObj()).then(function(response){
            Logger.success("Product saved","Product "+vm.product.name()+" saved");
            router.navigate("#/catalog");
            app.trigger("catalog:refresh");
        });
    };

    return vm;
});