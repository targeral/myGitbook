(function(book, util, window) {
    var book = book || {};
    book.List = function(header, gitsrc) {
        this.header = header || "";
        this.gitSrc = gitsrc || "#";
        this.lv1Index = 0;
        this.lv2Index = 0;
    }

    book.List.prototype = {
        list : {},

        addListTitle : function(listTitle, src) {
            this.list.title = listTitle || this.header;
            this.list.src = src || book.INDEX;
        },

        addList : function(listObj) {
            var childlist = {}, i, il;
            this.list['lists'] = this.list['lists'] || [];

            util.deepClone(listObj, childlist);
            childlist['index'] = this.getLv1();
            if( childlist['childlist'] ) {
                for(i = 0, il = childlist['childlist'].length; i < il; i++) {
                    childlist['childlist'][i]['index'] = this.getLv2();
                }
            }
            
            this.list['lists'].push(childlist);
        },

        getLv1 : function() {
            this.lv1Index ++ ;
            return this.lv1Index + "";
        },

        getLv2 : function() {
            this.lv2Index ++;
            return this.lv1Index + "." + this.lv2Index;
        },

        getList : function() {
            this.list.header = this.header;
            this.list.gitSrc = this.gitSrc;
            return this.list;
        }
    };

    window.Book.List = book.List;

})(Book, util, window);