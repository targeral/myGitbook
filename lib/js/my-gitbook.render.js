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