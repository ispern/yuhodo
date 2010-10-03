/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ OmegaTrickLoadingMask

/**
 * OmegaTrickローディングマスク
 *
 * Ext JS/Omega Trickが読み込まれる前に、ピュアJavaScriptのみで
 * ローディングマスクを動的に生成します。
 */
OmegaTrickLoadingMask = {

    // {{{ createElement

    createElement : function(o) {

        var div = document.createElement((o.tag || 'div'));

        if(o.id) {
            div.id = o.id;
        }

        if(o.html) {
            div.innerHTML = o.html;
        }

        if(o.cls) {
            div.className = o.cls;
        }

        if(o.src) {
            div.src = o.src
        }

        if(o.width) {
            div.width = o.width;
        }

        if(o.height) {
            div.height = o.height;
        }

        if(o.renderTo) {
            o.renderTo.appendChild(div);
        }

        return div;
    }

    // }}}

};

// 全体を覆うマスクDIVタグ生成
OmegaTrickLoadingMask.createElement({
    id: 'OMEGATRICK_LOADINGMASK',
    renderTo: document.body
});

// ロゴ表示用DIVタグ生成
OmegaTrickLoadingMask.createElement({
    id: 'OMEGATRICK_LOADING_LOGO',
    renderTo: document.body
});

// 処理状態表示用DIVタグ生成
OmegaTrickLoadingMask.progress = OmegaTrickLoadingMask.createElement({
    id: 'OMEGATRICK_LOADING_PROGRESS',
    renderTo: document.body
});

OmegaTrickLoadingMask.progressMsg = OmegaTrickLoadingMask.createElement({
    id: 'OMEGATRICK_LOADING_PROGRESS_MSG',
    tag: 'p',
    renderTo: OmegaTrickLoadingMask.progress
});

OmegaTrickLoadingMask.createElement({
    html: '初期化中...',
    tag: 'span',
    renderTo: OmegaTrickLoadingMask.progressMsg
});

delete OmegaTrick;

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
