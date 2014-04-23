require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        widget: 'widget',
        jqueryui: '../bower_components/jquery-ui/ui/jquery-ui'
    }
});

require(['jquery', 'popup-list/popup-list'], function ($, popup) {
    'use strict';

    $(function(){
        $("#content").popuplist({anchor: '#anchor'});
    });
});