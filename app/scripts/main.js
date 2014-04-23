require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        widget: 'widget',
        jqueryui: '../bower_components/jquery-ui/ui/jquery-ui'
    }
});

require(['widget'], function (widget) {
    'use strict';
    new widget().createWidget();
});