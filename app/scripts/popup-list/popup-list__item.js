define(['jquery'], function ($) {
    Item = function (value, idx) {
        this.index = idx;
        this.hidden = false;
        this.value = value;
        this.element = $('<li>').text(value);
    };

    Item.prototype.getValue = function () {
        return this.value;
    };

    Item.prototype.getElement = function () {
        return this.element;
    };

    Item.prototype.hide = function () {
        this.element.hide();
        this.hidden = true;
    };

    Item.prototype.select = function () {
        this.element.addClass('selected');
    };

    Item.prototype.deselect = function () {
        this.element.removeClass('selected');
    };

    Item.prototype.show = function () {
        this.element.show();
        this.hidden = false;
    };

    Item.prototype.isShown = function () {
        return !this.hidden;
    };

    return Item;
});
