define(["jquery", "jqueryui"],
    function ($) {
        var POPUP_ROOT_CLASS = "popup";
        var DEFAULT_OPTIONS = {
            anchor: "a:first",
            position: {
                my: "left top",
                at: "left bottom"
            },
            autoBind: true
        };

        var EVENT_SHOW = "show";
        var EVENT_HIDE = "hide";


        $.widget("ring.popup", {
            // default options
            options: DEFAULT_OPTIONS,

            // the constructor
            _create: function () {

                this.element.
                    hide().
                    addClass(POPUP_ROOT_CLASS).
                    disableSelection();

                this.anchor = $(this.options.anchor);
                this.shown = false;
            },
            _init: function () {
                this._bind();
            },

            _bind: function () {
                if (this.options.autoBind) {
                    this._on(this.anchor, {
                        'mouseover': function () {
                            this.show();
                        },
                        'mouseout': this.hide
                    });
                }

            },

            _unbind: function () {
                if (this.options.autoBind) {
                    this._off(this.anchor, 'mouseover mouseout');
                }
            },

            /**
             *
             * @param {*=} el
             */
            show: function (el) {
                if (el) {
                    this.anchor = $(el);
                }
                if (this.anchor.first()) {
                    this._setVisible(true);
                }
            },

            hide: function () {
                this._setVisible(false);
            },

            _setVisible: function (visible) {
                if (this.shown === visible) {
                    return;
                }

                this.shown = visible;
                var position = $.extend({
                    of: this.anchor
                }, this.options.position);

                if (visible) {
                    this._trigger(EVENT_SHOW, event, this.anchor);
                    this.element.
                        show().
                        position(position);
                } else {
                    this._trigger(EVENT_HIDE, event, this.anchor);
                    this.element.hide();
                }
            },

            // events bound via _on are removed automatically
            // revert other modifications here
            _destroy: function () {
                this._unbind();
                // remove generated elements
                this.element
                    .removeClass(POPUP_ROOT_CLASS)
                    .enableSelection();
            },

            // _setOption is called for each individual option that is changing
            _setOption: function (key, value) {
                // prevent invalid color values
                if (/anchor/.test(key)) {
                    this._unbind();
                    this.anchor = $(value);
                    this._bind();
                }
                this._super(key, value);
            }


        });
    }
);
