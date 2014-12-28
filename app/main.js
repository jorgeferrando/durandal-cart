requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.1.0.debug',
        'bootstrap': '../lib/bootstrap/js/bootstrap.min',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'toastr': '../lib/toastr/toastr.min',
        'ko.validation': '../lib/kovalidation/ko.validation',
        'mockjax': '../lib/mockjax/jquery.mockjax',
        'mockjson': '../lib/mockjson/jquery.mockjson',
        'icheck': '../lib/icheck/icheck'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        mockjax: {
            deps:['jquery']
        },
        mockjson: {
            deps:['jquery']
        },
        'ko.validation':{
            deps:['knockout']
        },
        'icheck': {
            deps: ['jquery']
        }
    }
});

define([
    'durandal/system',
    'durandal/app',
    'durandal/viewLocator',
    'mocks',
    'bindings',
    'components',
    'bootstrap',
    'ko.validation',
    'icheck',
],  function (system, app, viewLocator,mocks,bindings,components) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Shop';

    app.configurePlugins({
        router:true,
        dialog: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        //viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('shell/shell', 'entrance');

        mocks();
        bindings.init();
        components.init();
    });
});