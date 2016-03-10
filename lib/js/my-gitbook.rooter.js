(function( window, util, book, markdown) {
    var book = book || {};

    book.Rooter = function(folder) {
        this.folder = folder;
        this.xhr = new XMLHttpRequest();
        this.result = "";
    }

    book.Rooter.prototype = {
        init : function() {
            var xhr = this.xhr,
                callback = this.transform.bind(this);
        },

        transform : function(callback) {
            return function(content) {
                this.result = markdown.toHTML(content);
                callback(this.result);
                this.result = "";
            }.bind(this);
        },

        get : function(file, callback, b) {
            var xhr = this.xhr;
            callback = this.transform(callback);

            xhr.open("GET", this.folder + file + "", b || true);
            xhr.onreadystatechange = function() {
                    if(xhr.readyState === 4) {
                        if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                            callback(xhr.responseText);
                        }
                    }
            };
            xhr.onerror = function() {
                console.log("not find this page");
            }
            xhr.send();
        }
    };

    window.Book.Rooter = book.Rooter;
})( window, util, Book, markdown );