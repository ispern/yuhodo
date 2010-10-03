/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */
Application.setup({

    onReady : function() {

        var lm = Application.LoadingMask;
        var task = {};

        // スクリプトタグ消去
        Trick.removeScriptTags();

        task.remove = new Ext.util.DelayedTask(function(){

            // ローディングマスク解除
            lm.remove();

        });

        // "初期化中..."をフェードアウト非表示
        lm.hideText({
            anim: true,
            callback: function() {

                // "Message1"をメッセージ設定
                lm.setText('Message1');

                lm.showText({
                    anim: true,
                    callback: function() {

                        // ローディングマスク解除タスク開始
                        task.remove.delay(2000);
                    }
                });

            }
        });

    }

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
