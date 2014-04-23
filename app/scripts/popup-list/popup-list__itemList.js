define(["popup-list/popup-list__item", "jquery"],
    function (Item, $) {
        var POPUP_LIST_CLASS = "popup-list";
        ItemList = function (emptyText) {
            this.size = 0;
            this.shown = 0;
            this.data = {};
            this.element = $("<ul>").addClass(POPUP_LIST_CLASS);
            this.empty = emptyText ? new Item(emptyText) : null;
            if(this.empty) {
                this.element.append(this.empty.getElement());
            }
        };

        ItemList.prototype.add = function (item) {
            var it = this.get(item);
            if (!(it)) {
                this.size++;
                this.shown++;
                it = new Item(item);
                this.data[item] = it;
                this.element.append(it.getElement());
                this.update_();
            }
            return it;
        };

        ItemList.prototype.get = function (item) {
            return this.data[item];
        };

        ItemList.prototype.remove = function (item) {
            var it = this.get(item);
            if (it) {
                var el = it.getElement();
                this.size--;
                if (el.isShown()) {
                    this.shown--;
                }
                this.data[item] = null;
                el.remove();
                this.update_();
            }
            return it;
        };

        ItemList.prototype.getElement = function () {
            return this.element;
        };

        ItemList.prototype.narrow = function (value) {
            var it = this;
            this.shown = this.size;
            jQuery.each(this.data, function (key, val) {
                if (value) {
                    if (key.toLowerCase().indexOf(value.toLowerCase()) < 0) {
                        val.hide();
                    } else {
                        val.show();
                    }
                    if(val.isShown()) {
                        it.shown++;
                    } else {
                        it.shown--;
                    }
                } else {
                    val.show();
                }
            });
            this.update_();
        };

        ItemList.prototype.update_ = function() {
            if(this.empty) {
                if (this.shown > 0) {
                    this.empty.hide()
                } else {
                    this.empty.show()
                }
            }
        };

        return ItemList;
    });