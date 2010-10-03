/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */
Trick.test.case.Trick = new Trick.test.unit.TestCase({

    // {{{ name

    /**
     * テストケース名
     */
    name: 'Trick.test.case.Trick',

    // }}}
    // {{{ testVersionInfo

    /**
     * バージョン情報取得テスト
     */
    testVersionInfo : function() {

        var me = this;

        // バージョン情報取得テスト
        me.assert.areEqual('0.5.0', Trick.version);

        // メジャーバージョン情報取得テスト
        me.assert.areEqual(0, Trick.versionDetail.major);

        // マイナーバージョン情報取得テスト
        me.assert.areEqual(5, Trick.versionDetail.minor);

        // パッチバージョン情報取得テスト
        me.assert.areEqual(0, Trick.versionDetail.patch);

    },

    // }}}
    // {{{ testUseLibrary

    /**
     * 利用ライブラリテスト
     */
    testUseLibrary : function() {

        var me = this;

        // Omega Trick利用フラグ
        me.assert.areEqual(true, Ext.isOmegaTrick);

        // Ext JS利用フラグ
        me.assert.areEqual(true, Trick.isExtJS);

        // Ext Core利用フラグ
        me.assert.areNotEqual(true, Trick.isExtCore);

        // Sencha Touch利用フラグ
        me.assert.areNotEqual(true, Trick.isSenchaTouch);

    }

    // }}}

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
