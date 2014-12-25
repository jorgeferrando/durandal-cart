define(['services/ajax','services/storage',"mocks/login"],function(ajax,storage,mocks){

    var login = function (user) {
        return ajax.post({ url: '/login', data: user })
    };

    return {
        login: login

    };

});