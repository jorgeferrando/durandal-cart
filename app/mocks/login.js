define(["mockjax","services/uuid"],function (mockjax,uuid) {

    var successResponse = {
        sessionKey: uuid(),
        error: false,
        errorMessage: ''
    };

    var errorResponse = {
        error:true,
        errorMessage: 'No user found with these credentials'
    }

    $.mockjax({
        type: 'POST',
        url: '/login',
        responseTime: 750,
        response: function(settings){
            console.log(settings);
            this.responseText = {
                'data':(function() {
                    var isNormalUser = (settings.data.username === 'john@doe.com' && settings.data.password === 'Nobody2014');
                    var isAdmin = (settings.data.username === 'Admin' && settings.data.password === 'Admin123')
                    if (isNormalUser) {
                        successResponse.isAdmin = false;
                        return successResponse;
                    } else if (isAdmin) {
                        successResponse.isAdmin = true;
                        return successResponse;
                    } else {
                        return errorResponse;
                    }

                })()
            }
        }
    });
});
