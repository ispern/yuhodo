/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.test.unit.Runner

/**
 * Trick.test.unit.TestRunner
 *
 * テストランナークラス
 */
Trick.test.unit.TestRunner = function() {

    var me = this,
        runner;

    return {

        // {{{ _runner

        _runner : function() {

            if(!runner) {

                // テストランナーオブジェクト生成
                switch(Trick.testingFramework.name) {

                    // YIU Test
                    case 'yui':
                        runner = YAHOO.tool.TestRunner;
                    break;
                }

            }

            return runner;
        },

        // }}}
        // {{{ add

        /**
         * テストケース/スイート追加メソッド
         *
         * @param t Ext.trick.unit.TestCase/Ext.trick.unit.TestSuite テストランナーに追加するオブジェクトを設定します。
         * @return void
         */
        add : function (t) {

            var me = this;

            switch(Trick.testingFramework.name) {

                // YUI Test
                case 'yui':
                    me._runner().add(t);
                    break;
            }
        },

        // }}}
        // {{{ run

        /**
         * テスト実行メソッド
         *
         * @return void
         */
        run : function() {

            var me = this;

            switch(Trick.testingFramework.name) {

                // YUI Test
                case 'yui':
                    me._runner().run();
                    break;
            }
        }

        // }}}
    };

}();

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
