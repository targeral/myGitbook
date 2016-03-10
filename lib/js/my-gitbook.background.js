(function( window, util, book) {
    var book = book || {};

    book.BgColor = function( summary, article) {
        this.summary = summary;
        this.article = article;
        this.state = "white";
    }

    book.BgColor.prototype = {
        SUMMARY : "my-gitbook-summary-",
        BODY : "my-gitbook-body-",
        NIGHT : "night",

        night : function() {
            if( this.state != "night") {
                this.state = "night";
                this.summary.classList.add( this.SUMMARY + this.NIGHT);
                this.article.classList.add( this.BODY + this.NIGHT);
            }
        },

        white : function() {
            if( this.state != "white" ) {
                this.state = "white";
                this.summary.classList.remove( this.SUMMARY + this.NIGHT);
                this.article.classList.remove( this.BODY + this.NIGHT);
            }
        }
    };

    window.Book.BgColor = book.BgColor;
})( window, util, Book );