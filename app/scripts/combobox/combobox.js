define(["jquery", "combobox/combobox__watcher", "jqueryui", "popup-list/popup-list"],
    function ($, Watcher) {
        var DEFAULT_OPTIONS = {};

        var SUBMIT_EVENT = "submit";
        var NEW_OPTION_EVENT = "newoption";
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
                    },
                    autoBind: false
                });
                this._bindEvents();
            },

            _init: function () {
                $("body").append(this.popupList);
            },

            _bindEvents: function () {
                var it = this;
                this._on(this.element, {
                    'keydown': this._keydown,
                    'valuechange': function (evt, value) {
                        this.narrow(value);
                    },
                    'click': this.toggle
                });

                this._on(this.document, {
                    'click': function (event) {
                        if (!$(event.target).is(this.element)) {
                            this._setVisible(false);
                        }
                    }
                })
            },

            toggle: function (event) {
                this._setVisible(!this.shown);
            },

            _setVisible: function (visible) {
                if (this.visible === visible) {
                    return;
                }
                this.visible = visible;
                this.popupList.popuplist(this.visible ? "show" : "hide");
            },


            _keydown: function (event) {
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
                this.popupList.popuplist("list").add(item);
            },

            narrow: function (value) {
                this.popupList.popuplist("list").narrow(value);
            },

            _destroy: function () {
                this.popupList.popuplist("destroy");
                this.watcher.destroy();
            }

        });
    }
);
