<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ load config

require_once('config.php');

$cfg = array(
    'url'=>'../shared/direct/router.php',
    'type'=>'remoting',
    'actions'=>$actions
);

if($useFormHandler) {
    $cfg['enableBuffer'] = true;
}

// }}}
// {{{ header

header('Content-Type: text/javascript');

// }}}
// {{{ output

echo 'Ext.app.REMOTING_API = ';
echo json_encode($cfg);
echo ';';

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
