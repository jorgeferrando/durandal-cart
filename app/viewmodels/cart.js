define([
    'durandal/app','plugins/router','services/log',"services/cart"
],function(app, router, Logger, CartService){

    var vm={};

    vm.cart = CartService.cart;

    vm.addUnit = function(data){
        app.trigger("cart:add",data.product);
    };
    vm.removeUnit = function(data) {
        if (data.units() === 1) {
            app
                .showMessage(
                'Are you sure you want to delete this item?',
                'Delete Item',
                ['Yes', 'No']
            ).then(function(answer){
                    if(answer === "Yes") {
                        app.trigger('cart:remove',data.product);
                        Logger.success("Product removed");
                    } else {
                        Logger.success("Deletion canceled");
                    }
                });
        } else {
            app.trigger("cart:subtract",data.product);
        }

    };

    vm.removeProduct = function(data) {
        app.trigger('cart:remove',data.product);
    };

    vm.toOrder = function() {
        router.navigate('#/order');
    }

    vm.canActivate = function () {
        var result = (vm.cart().length > 0);

        if(!result) {
            Logger.error("Select some products before","Cart is empty")
        }

        return result;
    }

    return vm;
})
