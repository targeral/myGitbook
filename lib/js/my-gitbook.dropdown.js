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