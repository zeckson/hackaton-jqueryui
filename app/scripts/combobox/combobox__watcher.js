define(["jquery"],
    function ($) {
        var InputWatcher = function(input) {
            this.input = $(input);
            this.current = $(input).val();
            var it = this;
            this.input.on({
                'keyup': function(){
                    it.valuechange();
                }
            })
        };

        InputWatcher.prototype.valuechange = function() {
            var newVal = this.input.val();
            if (this.current !== newVal) {
                this.current = newVal;
                this.input.trigger("valuechange", newVal);
            }
        };

        InputWatcher.prototype.destroy = function() {
            this.input.off('keyup');
            this.input = null;
        };

        return InputWatcher;

    });
