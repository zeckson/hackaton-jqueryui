define(["jquery", "combobox/combobox__watcher", "jqueryui", "popup-list/popup-list"],
    function ($, Watcher) {
        var DEFAULT_OPTIONS = {};
        $.widget("ring.combobox", {
            // default options
            options: DEFAULT_OPTIONS,

            // the constructor
            _create: function () {
                var me = this;
                this.watcher = new Watcher(this.element);
                this.popupList = $("<span>").
                    hide();
                this.popupList.popuplist({
                    anchor: this.element,
                    content: ["first", "second", "third"],
                    hide: function () {
                        me.narrow(null);
                    }
                });
                this._bindEvents();
            },

            _init: function () {
                $("body").append(this.popupList);
            },

            _bindEvents: function () {
                var it = this;
                this.element.on({
                    'keyup': function (e) {
                        it._keyup(e);
                    },
                    'valuechange': function (e,val) {
                        it.narrow(val);
                    }
                });
            },

            _keyup: function (event) {
                var value = this.element.val();
                switch (event.keyCode) {
                    case $.ui.keyCode.ENTER:
                        if (value) {
                            this._addNewItem(value);
                        }
                        event.preventDefault();
                        break;
                    default:
                }
            },

            _addNewItem: function (item) {
                this.popupList.popuplist("getList").add(item);
            },

            narrow: function (value) {
                this.popupList.popuplist("getList").narrow(value);
            },

            _destroy: function () {
                this.popupList.popuplist("destroy");
                this.watcher.destroy();
                this.element.off('keyup valuechange')
            }

        });
    }
);
