/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */
Application.setup({

    onReady : function() {

        // テストランナー生成
        var r = Trick.test.unit.TestRunner;

        // テストスイート生成
        var suite = {};
        suite.core = new Trick.test.unit.TestSuite("Omega Trick Core Suite");

        // テストケース追加
        suite.core.add(Trick.test.case.Trick);

        // テストランナーに追加
        Ext.iterate(suite, function(index, o) {
            r.add(o);
        });

        // ロガー生成
        var logger = new Trick.test.unit.TestLogger('UnitTestLogger');

        // テスト実行
        r.run();

    }

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
