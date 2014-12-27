define(['jquery'],function($){
    return {
        save: function (orderAndCustomer) {
            return $.ajax({
                type: 'PUT',
                url: '/order',
                data: orderAndCustomer
            });
        }
    }
});
