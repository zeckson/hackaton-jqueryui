define(["jquery", "jqueryui", "popup-list/popup-list"],
    function ($) {
        var DEFAULT_OPTIONS = {};
        $.widget("ring.combobox", {
            // default options
            options: DEFAULT_OPTIONS,

            // the constructor
            _create: function () {
                var me = this;
                this.itemList = $("<span>").
                    popuplist({anchor: this.element,
                        content: ["first", "second", "third"],
                        hide: function () {
                            me.narrow(null);
                        }
                    }).
                    popuplist("getList");
                this._bindEvents();
            },

            _bindEvents: function () {
                var it = this;
                this.element.on({
                    'keydown': function (e) {
                        it._keydown(e);
                    }
                });
            },

            _keydown: function (event) {
                var value = this.element.val();
                switch (event.keyCode) {
                    case $.ui.keyCode.ENTER:
                        if (value) {
                            this._addNewItem(value);
                        }
                        break;
                    default:
                        this.narrow(value);
                }

            },

            _addNewItem: function (item) {
                this.itemList.add(item);
            },

            narrow: function (value) {
                this.itemList.narrow(value);
            }

        });
    }
);
