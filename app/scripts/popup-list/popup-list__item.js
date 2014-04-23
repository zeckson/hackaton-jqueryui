define([],
    function () {
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

        return Item;
    });
