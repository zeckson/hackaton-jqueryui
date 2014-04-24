define(['./popup-list__item', 'jquery'],
    function (Item, $) {
        var POPUP_LIST_CLASS = 'popup-list';
        ItemList = function (emptyText) {
            this.selected = -1;
            this.size = 0;
            this.shown = 0;
            this.items = [];
            this.data = {};
            this.element = $('<ul>').addClass(POPUP_LIST_CLASS);
            this.empty = emptyText ? new Item(emptyText) : null;
            if (this.empty) {
                this.element.append(this.empty.getElement());
            }
        };

        ItemList.prototype.add = function (item) {
            var it = this.get(item);
            if (!(it)) {
                this.size++;
                this.shown++;
                it = new Item(item, this.items.length);
                this.items.push(it);
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
                var items = [];
                for (var i = 0; i < this.items.length; i++) {
                    if (i !== it.index) {
                        items.push(this.items[i]);
                    }
                }
                this.selected = -1;
                this.items = items;
                this.data[item] = null;
                el.remove();
                this.update_();
            }
            return it;
        };

        ItemList.prototype.next = function () {
            this.setSelected(this.selected < 0 ? 0 : (this.selected + 1) % (this.items.length));
        };

        ItemList.prototype.prev = function () {
            this.setSelected(this.selected <= 0 ? this.items.length - 1 : (this.selected - 1) % (this.items.length));
        };

        ItemList.prototype.getSelected = function () {
            return this.selected >= 0 ? this.items[this.selected].value : null;
        };

        ItemList.prototype.setSelected = function (idx) {
            if (this.selected < 0) {
                this.selected = 0;
            } else {
                this.items[this.selected].deselect();
            }
            this.selected = idx;
            if (idx >= 0) {
                this.items[this.selected].select();
            }
        };


        ItemList.prototype.getElement = function () {
            return this.element;
        };

        ItemList.prototype.narrow = function (value) {
            var it = this;
            this.shown = this.size;
            this.selected = -1;
            var items = [];
            jQuery.each(this.data, function (key, item) {
                item.deselect();
                if (value) {
                    if (key.toLowerCase().indexOf(value.toLowerCase()) < 0) {
                        item.hide();
                    } else {
                        item.show();
                    }
                } else {
                    item.show();
                }
                if (item.isShown()) {
                    items.push(item);
                    it.shown++;
                } else {
                    it.shown--;
                }
            });
            this.items = items;
            this.update_();
        };

        ItemList.prototype.update_ = function () {
            if (this.empty) {
                if (this.shown > 0) {
                    this.empty.hide()
                } else {
                    this.empty.show()
                }
            }
        };

        return ItemList;
    });