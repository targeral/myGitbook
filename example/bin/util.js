(function(window) {
    var util = {
        //判断类型
        is : function(obj, type) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        deepClone : function(oldObj, newObj) {
            for(var key in oldObj) {
                var clone = oldObj[key];
                if(oldObj === clone) continue;

                if( this.is(clone, "Object") ) {
                    newObj[ key ] = this.deepClone( clone, newObj[key] || {} );
                }else if( this.is(clone, "Array") ) {
                    newObj[ key ] = this.deepClone( clone, newObj[key] || []);
                }else {
                    newObj[ key ] = clone;
                }
            }

            return newObj;
        },

        $ : function(el, scope) {
            d = scope || document;
            return d.querySelector(el);
        },

        on : function(parent, type, callback, useCapture) {
            parent.addEventListener(type, callback, useCapture || false);
        },

        delegate : function(parent, target, type, callback, obj) {
            var obj = obj || {};
            
            parent.addEventListener(type, function(e) {
                var t = e.target,
                    current = e.currentTarget;
                
                while(t && current !== t) {

                    if(t && t.tagName === target.toUpperCase() && (obj.fn ? obj.fn(t) : true) ) {
                        callback(e, t);
                    }
                    t = t.parentElement;
                }
            }, obj.useCapture || false);
        },

        htmlToDom : function(html) {
            var div = document.createElement("div");
            div.innerHTML = html;
            return div.firstElementChild;
        },

        returnEvent : function(event) {
            return event || window.event;
        }
    };

    window.util = util;
})(window);