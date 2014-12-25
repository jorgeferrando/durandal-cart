define(["jquery","services/storage"],function($,storage){

    var ajax = {};

    var defaultOpts = {
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Cart-Token", storage.getItem("cartSessionKey"));
        }
    };

    ajax.get = function(customOpts) {
        var options = $.extend({}, defaultOpts, customOpts, {type: 'GET'});
        return $.ajax(options);
    };
    ajax.post = function(customOpts) {
        var options = $.extend({},defaultOpts,customOpts,{type:'POST'});
        return $.ajax(options);
    };
    ajax.put = function(customOpts) {
        var options = $.extend({},defaultOpts,customOpts,{type:'PUT'});
        return $.ajax(options);
    };
    ajax.delete = function(customOpts) {
        var options = $.extend({},defaultOpts,customOpts,{type:'DELETE'});
        return $.ajax(options);
    };


    return ajax;

});