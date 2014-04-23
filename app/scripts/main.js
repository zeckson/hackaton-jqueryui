require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        widget: 'widget',
        jqueryui: '../bower_components/jquery-ui/ui/jquery-ui'
    }
});

require(['jquery', 'popup/popup'], function ($, popup) {
    'use strict';

    $(function(){
        $("#content").popup({anchor: '#anchor'}).popup("show");
    });
});