(function( window, util, book) {
    var book = book || {};
    book.Font = function(el) {
        this.el = el;
        this.index = 3;
    }

    book.Font.prototype = {
        CSSSUB : "my-gitbook-",
        SERIF  : "Serif",
        SANS   : "Sans",
        LENGTH : 7,

        fontSize : ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"],

        next : function(singal) {
            if(singal == "+") {
                return ++this.index;
            }else if(singal == "-") {
                return --this.index;
            }
        },

        checkNext : function(singal) {
            if( singal === "+" && this.index === this.LENGTH - 1) {
                return false;
            }else if( singal === "-" && this.index === 0) {
                return false;
            }else {
                return true;
            }
        },

        larger : function() {
            if( this.checkNext("+") ) {
                this.el.classList.remove( this.CSSSUB + this.fontSize[ this.index ] );
                this.el.classList.add( this.CSSSUB + this.fontSize[ this.next("+") ] );
            }
        },

        smaller : function() {
            if( this.checkNext("-") ) {
                this.el.classList.remove( this.CSSSUB + this.fontSize[ this.index ] );
                this.el.classList.add( this.CSSSUB + this.fontSize[ this.next("-") ] );
            }
        },

        Serif : function() {
            if( !this.el.classList.contains( this.CSSSUB + this.SERIF ) ) {
                this.el.classList.remove( this.CSSSUB + this.SANS );
                this.el.classList.add( this.CSSSUB + this.SERIF );
            }
        },

        Sans : function() {
            if( !this.el.classList.contains( this.CSSSUB + this.SANS ) ) {
                this.el.classList.remove( this.CSSSUB + this.SERIF );
                this.el.classList.add( this.CSSSUB + this.SANS );
            }
        }
    };

    window.Book.Font = book.Font;
})( window, util, Book);