define(['plugins/http', 'durandal/app', '../../lib/knockout/knockout-3.1.0'], function (http, app, ko) {
    return {
        title: 'Accordion',
        projects: ko.observableArray([]),
        activate: function () {
            this.projects.push({name:'Project 1',number:1});
            this.projects.push({name:'Project 2',number:2});
            this.projects.push({name:'Project 3',number:3});
        },
        add: function () {

        }
    };
});
