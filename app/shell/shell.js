define([
    'plugins/router',
    'durandal/app',
    'bindings'
], function (router, app, bindings) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {

            router.map([
                { route: ['','/','catalog'], title:'Catalog', moduleId: 'catalog/catalog', nav: true },
                { route: 'new', title:'New product', moduleId: 'product/new', nav: true },
                { route: 'edit/:id', title:'Edit product', moduleId: 'product/edit', nav: false },
                { route: 'cart', title:'Cart', moduleId: 'cart/cart', nav: false },
                { route: 'order', title:'Order', moduleId: 'order/order', nav: true }
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});