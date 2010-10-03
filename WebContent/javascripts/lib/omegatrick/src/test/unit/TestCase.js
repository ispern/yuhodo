/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.test.unit.TestCase

/**
 * Trick.test.unit.TestCase
 *
 * テストケースクラス
 */
Trick.test.unit.TestCase = function(o) {

    var me = this,
        ret;

    switch(Trick.testingFramework.name) {

        // {{{ YUI Test

        case 'yui':

            // テストケース生成
            ret = new YAHOO.tool.TestCase(o);

            // assetメソッドショートハンド
            ret.assert = YAHOO.util.Assert;

            break;

        // }}}

    }

    return ret;
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
