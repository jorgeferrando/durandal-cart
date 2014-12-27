define([
    'knockout','durandal/app','services/log','models/product','models/cartproduct'
],function(ko,app,Logger, Product,CartProduct){

    var service = {};

    service.cart = ko.observableArray([]);

    service.add = function(data){
        if(!data.hasStock()) {
            Logger.error("This product has no stock available");
            return;
        }
        var item = null;
        var tmpCart = service.cart();
        var n = tmpCart.length;

        while(n--) {
            if (tmpCart[n].product.id() === data.id()) {
                item = tmpCart[n];
            }
        }

        if (item) {
            item.addUnit();
        } else {
            item = new CartProduct(data,1);
            tmpCart.push(item);
            item.product.decreaseStock(1);
        }

        service.cart(tmpCart);
    };

    service.subtract = function(data) {
        var item = service.find(data);
        item.removeUnit();
    }

    service.grandTotal = ko.computed(function(){
        var tmpCart = service.cart();
        var total = 0;
        tmpCart.forEach(function(item){
            total+= (item.units() * item.product.price());
        });
        return total;
    });

    service.find = function (data) {
        var tmp;
        service.cart().forEach(function(item){
            if (item.product.id() === data.id()) {
                tmp = item;
            }
        });
        return tmp;
    }

    service.remove = function (data) {
        var tmp = service.find(data);
        var units = tmp.product.stock()+tmp.units();
        tmp.product.stock(units);
        service.cart.remove(tmp);
    };

    service.update = function (catalog){
        var cart = service.cart();
        var newCart = [];
        for(var i =0;i<catalog.length;i++){
            for(var j=0;j<cart.length;j++){
                var catalogItem = catalog[i];
                var cartItem = cart[j];
                if(cartItem.product.id() === catalogItem.id()){
                    catalogItem.stock(catalogItem.stock() - cartItem.units());
                    newCart.push(new CartProduct(catalogItem,cartItem.units()));
                }
            }
        }
        service.cart(newCart);
    }

    app.on("cart:add").then(function(data){
        service.add(data);
    });
    app.on("cart:subtract").then(function(data){
        service.subtract(data);
    });
    app.on("cart:remove").then(function(data){
        service.remove(data);
    });

    return service;
});