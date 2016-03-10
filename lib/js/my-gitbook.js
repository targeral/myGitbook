(function( window , util, markdown ) {
    function Book(el) {
        this.el = util.$(el);
        this.list = null;
        this.contro = null;
        this.config = null;
    }

    Book.prototype = {
        init : function(list, render) {
            this.list = list.getList();
            this.contro = render;
        },

        render : function(el) {
            this.el = el ? util.$(el) : this.el;
            this.contro.init(this.el, this.list, this.config);
        }
    };

    window.Book = new Book("#gitbook");
})( window, util, markdown );