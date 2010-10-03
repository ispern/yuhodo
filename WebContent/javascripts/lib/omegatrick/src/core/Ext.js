/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Ext.emptyFn

// for Ext Core
if(Ext.isExtCore && !Ext.emptyFn) {
    Ext.emptyFn = function(){};
}

// }}}
// {{{ Ext.Loader

if(!Ext.Loader) {

    Ext.Loader = Ext.apply({}, {

        load: function(fileList, callback, scope, preserveOrder) {
            var scope       = scope || this,
            head        = document.getElementsByTagName("head")[0],
            fragment    = document.createDocumentFragment(),
            numFiles    = fileList.length,
            loadedFiles = 0,
            me          = this;

            var loadFileIndex = function(index) {
                head.appendChild(
                    me.buildScriptTag(fileList[index], onFileLoaded)
                );
            };

            var onFileLoaded = function() {
                loadedFiles ++;

                if (numFiles == loadedFiles && typeof callback == 'function') {
                    callback.call(scope);
                } else {
                    if (preserveOrder === true) {
                        loadFileIndex(loadedFiles);
                    }
                }
            };

            if (preserveOrder === true) {
                loadFileIndex.call(this, 0);
            } else {
                Ext.each(fileList, function(file, index) {
                    fragment.appendChild(
                        this.buildScriptTag(file, onFileLoaded)
                    );
                }, this);

                head.appendChild(fragment);
            }
        },

        buildScriptTag: function(filename, callback) {
            var script  = document.createElement('script');
            script.type = "text/javascript";
            script.src  = filename;

            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                script.onload = callback;
            }

            return script;
        }
    });

}

// }}}
// {{{ Function.prototype.createCallback

// for Sencha Touch
if(Ext.isSenchaTouch && !Function.prototype.createCallback) {

    Ext.apply(Function.prototype, {

        createCallback : function(/*args...*/){

            var args = arguments,
            method = this;

            return function() {
                return method.apply(window, args);
            };

        }

    });

}

// }}}
// {{{ Function.createSequence

// for Ext Core and Sencha Touch
if((Ext.isExtCore || Ext.isSenchaTouch) && !Function.prototype.createSequence) {

    Ext.apply(Function.prototype, {

        createSequence : function(fcn, scope){
            var method = this;
            return (typeof fcn != 'function') ?
                this :
                    function(){
                var retval = method.apply(this || window, arguments);
                fcn.apply(scope || this || window, arguments);
                return retval;
            };
        }

    });

}

// }}}
// {{{ Ext expand methods

/**
 * Ext expand methods
 */
Ext.applyIf(Ext,{

    // {{{ getMaxZindex

    /**
     * DOMツリー内のzindex最大値を取得します。
     *
     * @return zindex最大値
     */
    getMaxZindex : function() {

        var ret = 0;
        Ext.select('*').each(function(el){

            var zIndex = el.getStyle('z-index');
            if(Ext.isNumber(parseInt(zIndex, 10)) && ret < zIndex) {
                ret = zIndex;
            }

        }, this);

        return ret;
    },

    // }}}
    // {{{ getScrollPos

    /**
     * スクロール位置取得
     *
     * @return Object x:x位置 y:y位置
     */
    getScrollPos: function() {

        var y = (document.documentElement.scrollTop > 0) ? document.documentElement.scrollTop : document.body.scrollTop;
        var x = (document.documentElement.scrollLeft > 0) ? document.documentElement.scrollLeft : document.body.scrollLeft;

        return {
            x: x,
            y: y
        };

    }

    // }}}

});

// }}}


/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
