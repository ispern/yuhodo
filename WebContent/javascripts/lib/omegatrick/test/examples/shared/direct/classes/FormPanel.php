<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ FormPanel

/**
 * FormPanel Class
 */
class FormPanel
{
    // {{{ load

    /**
     * ロードメソッド
     */
    public function load()
    {
        return array(
            'success'=>true,
            'data'=>array(
                'textfield'=>'Direct Text Field',
            )
        );
    }

    // }}}
    // {{{ submit

    /**
     * サブミットメソッド
     */
    public function fh_submit($values)
    {
        $res = array();

        $success = true;

        $res['success'] = $success;
        $res['debug_values'] = $values;

        return  $res;
    }

    // }}}

}

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
