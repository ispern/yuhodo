/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */
Application.setup({

    onReady : function() {

        var r = Trick.test.unit.TestRunner;

        // テストケース追加
        r.add(Trick.test.case.Trick);

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
