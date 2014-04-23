define(["jquery", "popup/popup"],
    function ($) {
        var POPUP_LIST_CLASS = "popup-list";
        var DEFAULT_OPTIONS = {
            content: ['one', 'two', 'three']
        };

        Item = function (value) {
            this.value = value;
            this.element = $("<li>").text(value);
        };

        Item.prototype.getValue = function () {
            return this.value;
        };

        Item.prototype.getElement = function () {
            return this.element;
        };

        ItemList = function () {
            this.size = 0;
            this.data = {};
            this.element = $("<ul>").addClass(POPUP_LIST_CLASS);
        };

        ItemList.prototype.add = function (item) {
            var it = this.get(item);
            if (!(it)) {
                it = new Item(item);
                this.data[item] = it;
                this.element.append(it.getElement());
            }
            return it;
        };

        ItemList.prototype.get = function (item) {
            return this.data[item];
        };

        ItemList.prototype.remove = function (item) {
            var it = this.get(item);
            if (it) {
                this.data[item] = null;
                it.getElement().remove();
            }
            return it;
        };

        ItemList.prototype.getElement = function () {
            return this.element;
        };

        $.widget("ring.popuplist", $.ring.popup, {
            // default options
            options: DEFAULT_OPTIONS,

            // the constructor
            _create: function () {
                this._super();
                this.itemList = new ItemList();
                this.element.empty();
            },

            _init: function () {
                this._super();
                var it = this;
                jQuery.each(this.options.content, function (idx, item) {
                    it.itemList.add(this);
                });
                this.element.append(this.itemList.getElement());
            },

            add: function (item) {
                this.itemList.add(item);
            },

            remove: function (item) {
                this.itemList.remove(item);
            },

            _destroy: function () {
                this.itemList.getElement().remove();
                this.itemList = null;
                this._super();
            }

        });
    }
);
