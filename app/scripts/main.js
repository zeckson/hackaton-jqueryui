require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'jqueryui': '../bower_components/jquery-ui/ui/jquery-ui',
        'jquery.ui.widget': '../bower_components/jquery-ui/ui/jquery.ui.widget',
        'jquery.ui.position': '../bower_components/jquery-ui/ui/jquery.ui.position',
        'jquery.ui.core': '../bower_components/jquery-ui/ui/jquery.ui.core'
    },
    shim: {
        'jquery.ui.core': ['jquery'],
        'jquery.ui.position': ['jquery'],
        'jquery.ui.widget': ['jquery.ui.core', 'jquery.ui.position']
    }
});

require(['jquery', 'popup/popup' , 'popup-list/popup-list', 'combobox/combobox'], function ($) {
    'use strict';

    $(function () {
        $("#popup-content").popup({anchor: '#popup'});
        $("#popuplist-content").popuplist({anchor: '#popuplist'});
        $("#combobox").combobox({
            'submit': function (evt, item) {
                $("#event").text('submitted: ' + item);
            },
            'newoption': function (evt, item) {
                $("#event").text('new option: ' + item);
            }});
    });
});