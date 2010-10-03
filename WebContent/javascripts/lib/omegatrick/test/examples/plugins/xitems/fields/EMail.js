/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ EMail

/**
 * EMail Class
 *
 * 通常のコンポーネント継承方式の場合は、次のように
 * initComponent内でコンフィグオプションを定義する
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
EMail = Ext.extend(Ext.form.TextField, {

    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        Ext.apply(me, {

            // フィールドラベル設定
            fieldLabel: 'メールアドレス',

            // アンカー設定
            anchor: '100%'

        });

        // スーパークラスメソッドコール
        EMail.superclass.initComponent.call(me);
    }

    // }}}

});

// }}}
// {{{ Register xtype

Ext.reg('EMail', EMail);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
