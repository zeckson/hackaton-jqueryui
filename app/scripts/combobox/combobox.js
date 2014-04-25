define(['jquery', './combobox__watcher', 'jquery.ui.widget', 'popup-list/popup-list'],
    function ($, Watcher) {
        var DEFAULT_OPTIONS = {
            addNewOption: true
        };

        var SUBMIT_EVENT = 'submit';
        var NEW_OPTION_EVENT = 'newoption';
        $.widget('ring.combobox', {
            // default options
            options: DEFAULT_OPTIONS,

            // the constructor
            _create: function () {
                var me = this;
                this.watcher = new Watcher(this.element);
                this.popupList = $('<span>').
                    hide();
                this.popupList.popuplist({
                    anchor: this.element,
                    content: ['first', 'second', 'third'],
                    hide: function () {
                        me.narrow(null);
                    },
                    autoBind: false
                });
                this._bindEvents();
            },

            _init: function () {
                $('body').append(this.popupList);
            },

            _bindEvents: function () {
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
                this.popupList.popuplist(this.visible ? 'show' : 'hide');
            },


            _keydown: function (event) {
                var value = this.element.val();
                switch (event.keyCode) {
                    case $.ui.keyCode.ENTER:
                        var item = this._list().getSelected();
                        if (item) {
                            this._submit(item);
                        }
                        if (value) {
                            this._addNewItem(value);
                        }
                        event.preventDefault();
                        break;
                    case $.ui.keyCode.DOWN:
                        this._list().next();
                        break;
                    case $.ui.keyCode.UP:
                        this._list().prev();
                        break;
                    default:
                }
            },

            _submit: function (item) {
                if (this._trigger(SUBMIT_EVENT, null, item) !== false) {
                    this.element.val(item);
                }
            },

            _addNewItem: function (item) {
                if (this._trigger(NEW_OPTION_EVENT, null, item) !== false) {
                    if (this.options.addNewOption) {
                        this._list().add(item);
                    }
                }
            },

            narrow: function (value) {
                this._list().narrow(value);
            },

            _list: function () {
                return this.popupList.popuplist('list');
            },

            _destroy: function () {
                this._super();
                this.popupList.popuplist('destroy');
                this.watcher.destroy();
            }

        });
    }
);
