/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// for Ext Core
if(Ext.isExtCore) {

    Ext.Element.addMethods({

        getSize : function(contentSize){
            return {width: this.getWidth(contentSize), height: this.getHeight(contentSize)};
        }

    });

}

// for Ext Core and Sencha Touch
if(Ext.isExtCore || Ext.isSenchaTouch) {

    Ext.Element.addMethods({

        setLeftTop : function(left, top){
            var me = this,
            style = me.dom.style;
            style.left = me.addUnits(left);
            style.top = me.addUnits(top);
            return me;
        },

        getStyles : function(){
            var ret = {};
            Ext.each(arguments, function(v) {
               ret[v] = this.getStyle(v);
            },
            this);
            return ret;
        }

    });

}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
