define([
    'jquery','services/uuid','mockjax','mockjson'
],function ($, uuid){
    $.mockJSON.data.PRODUCTNAME = [
        'T-SHIRT', 'SHIRT', 'TROUSERS', 'JEANS', 'SHORTS', 'GLOVES', 'TIE'
    ];

    var lastId = 101;

    var catalog = $.mockJSON.generateFromTemplate({
        "data|5-5": [{
            "id|1-100": 0,
            "name": "@PRODUCTNAME",
            "price|10-500": 0,
            "stock|1-9": 0
        }]
    });
    var updatedCatalog = function () {
        return catalog;
    }

    function findById(id){
        var product;
        catalog.data.forEach(function(item){
            if (item.id === id) {
                product = item;
            }
        });
        return product;
    };

    return function () {
        $.mockjax({
            url: "/products",
            type: "GET",
            dataType: "json",
            responseTime: 750,
            responseText: updatedCatalog()
        });
        $.mockjax({
            url: /^\/products\/([\d]+)$/,
            type: "GET",
            dataType: "json",
            responseTime: 750,
            response: function(settings){
                var parts = settings.url.split("/");
                var id = parseInt(parts[2],10);
                var p = findById(id);
                this.responseText = {
                    "data": p
                }
            }
        });
        $.mockjax({
            url: "/products",
            type:"POST",
            dataType: "json",
            responseTime: 750,
            response: function(settings){
                settings.data.id = lastId;
                lastId++;
                catalog.data.push(settings.data);
                this.responseText = {
                    "data": {
                        result: "true",
                            text: "Product created"
                    }
                }
            }
        });
        $.mockjax({
            url: "/products",
            type:"PUT",
            dataType: "json",
            responseTime: 750,
            response: function (settings) {
                var p = findById(settings.data.id);
                p.name = settings.data.name;
                p.price = settings.data.price;
                p.stock = settings.data.stock;
                this.responseText = {
                    "data": {
                        result: "true",
                        text: "Product saved"
                    }
                }
            }
        });

        $.mockjax({
            url: /^\/products\/([\d]+)$/,
            type:"DELETE",
            dataType: "json",
            responseTime: 750,
            response: function(settings){
                var parts = settings.url.split("/");
                var id = parseInt(parts[2],10);
                var p = findById(id);
                var index = catalog.data.indexOf(p);
                if (index > -1) {
                    catalog.data.splice(index, 1);
                }
                this.responseText = {
                    "data": {
                        result: "true",
                            text: "Product deleted"
                    }
                }
            }

        });

        $.mockjax({
            type: 'PUT',
            url: '/order',
            responseTime: 750,
            response:function (settings){
                var cart = settings.data.order();
                cart.forEach(function(item){
                    var elem = findById(item.product.id());
                    elem.stock -= item.units();
                });

                this.responseText = {
                    "data": {
                        orderId:uuid(),
                        result: "true",
                        text: "Order saved"
                    }
                };
            }
        });
    };
});
