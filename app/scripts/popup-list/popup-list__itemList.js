define(["popup-list/popup-list__item"],
    function (Item) {
        var POPUP_LIST_CLASS = "popup-list";
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

        return ItemList;
    });