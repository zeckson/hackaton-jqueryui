require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        widget: 'widget',
        jqueryui: '../bower_components/jquery-ui/ui/jquery-ui'
    }
});

require(['jquery', 'popup/popup' ,'popup-list/popup-list', 'combobox/combobox'], function ($) {
    'use strict';

    $(function(){
        $("#popup-content").popup({anchor: '#popup'});
        $("#popuplist-content").popuplist({anchor: '#popuplist'});
        $("#combobox").combobox();
    });
});