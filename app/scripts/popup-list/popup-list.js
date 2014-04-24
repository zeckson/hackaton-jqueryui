define(["jquery", "popup-list/popup-list__itemList", "popup/popup"],
    function ($, ItemList) {
        var DEFAULT_OPTIONS = {
            content: ['one', 'two', 'three'],
            emptyText: "<no matches>"
        };

        $.widget("ring.popuplist", $.ring.popup, {
            // default options
            options: DEFAULT_OPTIONS,

            // the constructor
            _create: function () {
                this._super();
                this.itemList = new ItemList(this.options.emptyText);
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

            list: function () {
                return this.itemList;
            },

            _destroy: function () {
                this.itemList.getElement().remove();
                this.itemList = null;
                this._super();
            }

        });
    }
);
