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
/*TMODJS:{"version":"1.0.0"}*/
!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^\/]+\1\.\.\1/,d=("./"+a).replace(/[^\/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,/*v:3*/
a("dropdown",'<div class="dropdown-menu font-settings"> <div class="buttons"> <button type="button" id="reduce-font-size" class="button size-2">A</button> <button type="button" id="enlarge-font-size" class="button size-2">A</button> </div> <div class="buttons font-family-list"> <button type="button" data-font="0" class="button">Serif</button> <button type="button" data-font="1" class="button">Sans</button> </div> <div class="buttons color-theme-list"> <button type="button" id="color-theme-preview-0" class="button size-2" data-theme="0">White</button> <button type="button" id="color-theme-preview-2" class="button size-2" data-theme="2">Night</button> </div> </div>'),/*v:3*/
a("fn",'<section class="book-header"> <ul> <li class="book-header-btn pull-left"><a href="#" class="btn toggle-summary"><i class="fa fa-align-justify"></i></a></li> <li class="book-header-btn pull-left"><a href="#" class="btn toggle-search"><i class="fa fa-search"></i></a></li> <li class="book-header-btn dropdown pull-left"><a href="#" class="btn toggle-dropdown"><i class="fa fa-font"></i></a></li> </ul> </section>'),/*v:5*/
a("list",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.gitSrc,e=a.header,f=a.src,g=a.srca,h=a.title,i=b.$each,j=a.lists,l=(a.value,a.i,"");return l+='<nav role="navigation"> <ul class="summary"> <li><a href="',l+=c(d),l+='">',l+=c(e),l+='</a></li> <li class="divider"></li> <li class="chapter active" data-level="0" data-path="index.html"> <a href="',l+=c(f),l+='" data-src=',l+=c(g),l+='><i class="fa fa-check"></i>',l+=c(h),l+="</a> </li> ",i(j,function(a){l+=' <li class="chapter " data-level="1" data-path="what-is-a-fd.html"> <a href="',l+=c(a.src),l+='" data-src=',l+=c(a.src),l+='><i class="fa fa-check"></i> <b>',l+=c(a.index),l+="</b>",l+=c(a.title),l+="</a> ",a.childlist&&(l+=" <ul> ",i(a.childlist,function(a){l+=' <li class="chapter " data-level="2.1" data-path="practice/front-end-jobs-titles.html"> <a href="',l+=c(a.src),l+='" data-src=',l+=c(a.src),l+='><i class="fa fa-check"></i><b>',l+=c(a.index),l+="</b>",l+=c(a.title),l+="</a> </li> "}),l+=" </ul> "),l+=" </li> "}),l+=" </ul> </nav>",new k(l)}),/*v:2*/
a("search",'<div class="book-search" role="search"><input type="text" class="form-control" placeholder="Type to search"></div>')}();
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
(function( window, util, template, book) {
    var book = book || {};

    book.Dropdown = function(font, bgcolor) {
        this.el = util.htmlToDom( template("dropdown", {}) );
        this.font = font;
        this.bgcolor = bgcolor;
    }

    book.Dropdown.prototype = {
        init : function(obj) {
            obj.el.appendChild(this.el);
            this.Font = new this.font(obj.fontEl);
            this.BgColor = new this.bgcolor(obj.bgcolorEl.summary, obj.bgcolorEl.article);

            this._initDom();
            this._initEvent();
            this._initListener();
        },

        elements : {
            "$btn_littleA" : "#reduce-font-size",
            "$btn_bigA"    : "#enlarge-font-size",
            "$btn_serif"   : "button[data-font='0']",
            "$btn_sans"    : "button[data-font='1']",
            "$btn_white"   : "#color-theme-preview-0",
            "$btn_night"   : "#color-theme-preview-2"
        },

        _initDom : function() {
            for(var key in this.elements) {
                if( !this[key] ) {
                    this[key] = util.$( this.elements[key] );
                }
            }
        },

        Events : {
            reduceFontSize : function(event) {
                var e = util.returnEvent(event);
                e.stopPropagation();
                this.Font.smaller();
            },

            enlargeFontSize : function(event) {
                var e = util.returnEvent(event);
                e.stopPropagation();
                this.Font.larger();
            },

            Serif : function(event) {
                var e = util.returnEvent(event);
                e.stopPropagation();
                this.Font.Serif();
            },

            Sans : function(event) {
                var e = util.returnEvent(event);
                e.stopPropagation();
                this.Font.Sans();
            },

            ToWhite : function(event) {
                var e = util.returnEvent(event);
                e.stopPropagation();
                this.BgColor.white();
            },

            ToNight : function(event) {
                var e = util.returnEvent(event);
                e.stopPropagation();
                this.BgColor.night();
            }
        },

        _initEvent : function() {
            for(var key in this.Events) {
                if( !this[ key ] ) {
                    this[ key ] = this.Events[ key ].bind(this);
                }
            }
        },

        _initListener : function() {
            util.on(this.$btn_littleA, 'click', this.reduceFontSize);
            util.on(this.$btn_bigA, 'click', this.enlargeFontSize);
            util.on(this.$btn_sans, 'click', this.Sans);
            util.on(this.$btn_serif, 'click', this.Serif);
            util.on(this.$btn_night, 'click', this.ToNight);
            util.on(this.$btn_white, 'click', this.ToWhite);
        },

        toggle : function() {
            this.el.classList.toggle("open");
        },

        close : function() {
            this.el.classList.remove("open");
        }
    };

    window.Book.Dropdown = book.Dropdown;
})( window, util, template, Book);
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
(function( window, util, template, book ) {
    var book = book || {};
    book.Render = function(rooter, dropdown) {
        this.el = null;
        this.bookSummary = document.createElement("div");
        this.bookbody = document.createElement("div");
        this.article = document.createElement("article");

        this.list = null;
        this.config = null;
        this.rooter = rooter;
        this.dropdown = dropdown;
        this.bookSummaryState = "hide";
        this.bookSearchState = "hide";
    }

    book.Render.prototype = {
        init : function(el, list, config) {
            this.el = el;
            this.list = list;
            this.config = config || {};

            this.rooter.init();
            this.renderList();
        },

        renderList : function() {
            this.bookSummary.classList.add("book-summary");
            this.bookbody.classList.add("book-body");

            this.bookSummary.appendChild( util.htmlToDom( template("search", {}) ) );
            this.bookSummary.appendChild( util.htmlToDom( template("list", this.list) ) );
            this.bookbody.appendChild( util.htmlToDom( template("fn", {}) ) );
            this.bookbody.appendChild( this.article );
            this.rooter.get(book.INDEX, function(content) {
                this.article.appendChild( util.htmlToDom(content) );
                this.el.appendChild(this.bookSummary);
                this.el.appendChild(this.bookbody);
                
                this.initDom();
                this.initEvent();
                this.initListener();
                this.dropdown.init({
                    el : this.toggleDropdown.parentElement,
                    fontEl : this.article,
                    bgcolorEl : {
                        summary : this.bookSummary,
                        article : this.bookbody
                    }
                });

            }.bind(this));
        },

        initDom : function() {
            for(var key in this.elements) {
                if( !this[key] ) {
                    this[key] = util.$( this.elements[key], this.el);
                }
            }
        },

        elements : {
            "toggleSummary"  : ".toggle-summary",
            "toggleSearch"   : ".toggle-search",
            "toggleDropdown" : ".toggle-dropdown",
            "inputSearch"    : ".book-search",
            "summary"        : ".summary"
        },

        initListener : function() {
            util.delegate(this.bookSummary, "a", "click", this.getArticle);
            util.on(document, 'keyup', this.keyupS);
            util.on(this.toggleSummary, 'click', this.clickToggleSummary);
            util.on(this.toggleSearch, 'click', this.clickToggleSearch);
            util.on(this.toggleDropdown, 'click', this.clickToggleDropdown);
            util.on(document, 'click', this.clickCloseDropdown);
            //util.on(this.dropdownMenu, 'click', this.banClose);
        },

        initEvent : function() {
            for(var key in this.Events) {
                if(!this[key]) {
                    this[key] = this.Events[key].bind(this);
                }
            }
        },

        Events : {
            showArticle : function(content) {
                this.article.innerHTML = content;
            },

            getArticle : function(event) {
                var e = event || window.event;
                var src = e.target.getAttribute("data-src");
                
                window.location.hash = src;
                e.preventDefault();
                this.rooter.get(src, this.showArticle);
                return false;
            },

            keyupS : function(event) {
                var e = event || window.event;
                if(e.which === 83) {
                    this.toggleBookSammmry();
                }
            },

            clickToggleSummary : function() {
                var e = util.returnEvent(event);
                e.preventDefault();
                this.toggleBookSammmry();
                return false;
            },

            toggleBookSammmry : function() {
                this.bookSummaryState = this.bookSummaryState === "show" ? "hide" : "show";
                if(this.bookSummaryState === "show") {
                    this.bookSummary.style.left = "0";
                    this.bookbody.style.left = "300px";
                }else if(this.bookSummaryState === "hide") {
                    this.bookSummary.style.left = "-300px";
                    this.bookbody.style.left = "0";
                }
            },

            clickToggleSearch : function() {
                if(this.bookSummaryState === "hide") {
                    this.toggleBookSammmry();
                }
                this.bookSearchState = this.bookSearchState === "show" ? "hide" : "show";
                if(this.bookSearchState === "show") {
                    this.summary.style.top = "50px";
                    this.inputSearch.style.top = "0";
                }else if(this.bookSearchState === "hide") {
                    this.summary.style.top = "0";
                    this.inputSearch.style.top = "-50px";
                }
            },

            clickToggleDropdown : function() {
                var e = event || window.event;
                e.stopPropagation();
                this.dropdown.toggle();
            },

            clickCloseDropdown : function(event) {
                this.dropdown.close();
            }
        }
    };

    window.Book.Render = book.Render;




})( window, util, template, Book );
(function( window, util, Book) {
    var Book = Book || {};

    Book.Config = function(config) {
        var booklist = new Book.List(config.BookName);
        var rooter = new Book.Rooter(config.BookFile);
        var dropdown = new Book.Dropdown(Book.Font, Book.BgColor);
        var bookrender = new Book.Render(rooter, dropdown);
        Book.INDEX = config.HomePage;

        for(var key in config.Content) {
            booklist.addList(config.Content[key]);
        }
        Book.init(booklist, bookrender);
    };

    window.Book.Config = Book.Config;
})( window, util, Book);