define([
    'knockout',
    'durandal/app',
    'plugins/router',
    'services/log',
    'services/product',
    'services/cart',
    'models/product',
    'models/cartproduct'
],function(ko, app, router, Logger, ProductService, CartService, Product, CartProduct){
    var vm = {};
    vm.showSearchBar=ko.observable(true);
    vm.searchTerm = ko.observable("");
    vm.catalog = ko.observableArray([]);
    vm.filteredCatalog = ko.observableArray([]);
    vm.CartService = CartService;

    vm.filterCatalog = function () {
        if (!vm.catalog()) {
            vm.filteredCatalog([]);
        }
        var filter = vm.searchTerm().toLowerCase();
        if (!filter) {
            vm.filteredCatalog(vm.catalog());
        }
        //filter data
        var filtered = ko.utils.arrayFilter(vm.catalog(), function (item) {
            var fields = ["name"]; //we can filter several properties
            var i = fields.length;
            while (i--) {
                var prop = fields[i];
                if (item.hasOwnProperty(prop) && ko.isObservable(item[prop])) {
                    var strProp = ko.utils.unwrapObservable(item[prop]).toLocaleLowerCase();
                    if (item[prop]() && (strProp.indexOf(filter) !== -1)) {
                        return true;
                    }
                }
            }
            return false;
        });
        vm.filteredCatalog(filtered);
    };

    vm.add = function(item) {
        app.trigger('cart:add',item);
    };
    vm.edit = function(item) {
        router.navigate('#/edit/'+item.id());
    }
    vm.remove = function(item) {
        app
            .showMessage(
                'Are you sure you want to delete this item?',
                'Delete Item',
                ['Yes', 'No']
            ).then(function(answer){
                if(answer === "Yes") {
                    ProductService.remove(item.id()).then(function(response){
                        vm.refresh();
                        CartService.remove(item);
                    })
                }
            });
    }
    vm.refresh = function () {
        ProductService.all().then(function(response){
            vm.catalog([]);
            response.data.forEach(function(item){
                vm.catalog.push(new Product(item.id,item.name,item.price,item.stock));
            });
            var catalog = vm.catalog();
            CartService.update(catalog);
            vm.catalog(catalog);
            vm.filteredCatalog(vm.catalog());
            Logger.success("Downloaded "+vm.catalog().length+" products", "Catalog loaded");
        });
    }
    vm.activate = function() {
        if(vm.catalog().length === 0) {
            vm.refresh();
            app.on("catalog:refresh").then(function(){
                vm.refresh();
            })
        }
        return true;
    }
    return vm;
});