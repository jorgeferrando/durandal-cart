define(["toastr"],function(toastr){

    toastr.options.positionClass = 'toast-bottom-right';

    var error = function(title,text) {
        toastr.error(title,text);
        console.error(text);
    };

    var success = function(title,text) {
        toastr.success(title,text);
        console.log(text || title);
    };

    var warning = function(title,text) {
        toastr.warning(title,text);
        console.warn(text || title);
    };

    var info = function(title,text) {
        toastr.info(atitle,text);
        console.info(text || title);
    };

    return {
        error:error,
        success:success,
        warning:warning,
        info:info
    }

});