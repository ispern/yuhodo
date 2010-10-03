/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ OmegaTrick

Trick = {};

(function(){

    // バージョン情報
    var trick = {
        version : '0.5.0',
        versionDetail : {
            major : 0,
            minor : 5,
            patch : 0
        }
    };

    // OmegaTrick適用フラグ
    var isOmegaTrick = true;

    // SenchaTouch有効フラグ
    var isSenchaTouch = Ext.TouchEventManager ? true : false;

    // Ext Core有効フラグ
    var isExtCore = (!isSenchaTouch && !Ext.ComponentMgr) ? true : false;

    // Ext JS有効フラグ
    var isExtJS = (!isSenchaTouch && !isExtCore) ? true : false;

    // Extオブジェクトに適用
    Ext.apply(Ext, {
        isOmegaTrick : isOmegaTrick,
        trick: trick
    });
    Ext.applyIf(Ext, {
        isSenchaTouch : isSenchaTouch,
        isExtCore : isExtCore,
        isExtJS : isExtJS
    });

    // グローバルオブジェクトへリンク
    Trick = Ext.trick;

    Ext.applyIf(Trick, {
        isSenchaTouch : isSenchaTouch,
        isExtCore : isExtCore,
        isExtJS : isExtJS
    });

})();

Ext.apply(Trick, {

    // {{{ テスティングフレームワーク設定

    testingFramework : {
        name: 'yui'
    },

    // }}}
    // {{{ removeScriptTags

    /**
     * スクリプトタグ削除メソッド
     */
    removeScriptTags : function() {

        var me = this;

        // スクリプトタグ削除
        Ext.select('body script').each(function(el) {
            Ext.removeNode(Ext.getDom(el));
        }, me);

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
