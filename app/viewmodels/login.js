define([
    "plugins/router",
    "models/user",
    "services/login",
    "services/log",
    "services/storage"],
    function(router,User,Login,Logger,Storage){

        var user = new User();

        var executeLogin = function (form) {
            function success(response) {
                var error = response.data.error;
                if (!error) {
                    if (user.remember()) {
                        Storage.setItem("cartUser",user.obj());
                    } else {
                        Storage.removeItem("cartUser");
                    }
                    Storage.setItem("cartSessionKey",response.data.sessionKey);
                    router.navigate('#/catalog');
                } else {
                    Logger.error("You are not logged in",response.data.errorMessage);
                }
            };

            function error (response) {
                Logger.error("AJAX error", JSON.stringify(response));
            }

            Login.login(user.obj()).then(success,error);
        };

        function attached() {
            var u = Storage.getItem("cartUser");
            if (u) {
                user.username(u.username);
                user.password(u.password);
                user.remember(u.remember);
            }
            return true;
        }

        return {
            attached: attached,
            login: executeLogin,
            user: user
        };
});
