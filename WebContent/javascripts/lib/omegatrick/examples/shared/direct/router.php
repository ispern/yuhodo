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

// }}}

$isForm = false;
$isUpload = false;

class BogusAction {
    public $action;
    public $method;
    public $data;
    public $tid;
}

if(isset($HTTP_RAW_POST_DATA)) {

    header('Content-Type: text/javascript');
    $data = json_decode($HTTP_RAW_POST_DATA);

} else if(isset($_POST['extAction'])) {

    $isForm = true;
    $isUpload = $_POST['extUpload'] == 'true';
    $data = new BogusAction();
    $data->action = $_POST['extAction'];
    $data->method = $_POST['extMethod'];
    $data->tid = isset($_POST['extTID']) ? $_POST['extTID'] : null;
    $data->data = array($_POST, $_FILES);

} else {

    die('Invalid request.');

}

function doAroundCalls(&$fns, &$cdata, &$returnData=null){
    if(!$fns){
        return;
    }
    if(is_array($fns)){
        foreach($fns as $f){
            $f($cdata, $returnData);
        }
    }else{
        $fns($cdata, $returnData);
    }
}

function doRpc($cdata, $actions){

    try {

        if(!isset($actions[$cdata->action])){
            throw new Exception('Call to undefined action: ' . $cdata->action);
        }

        $action = $cdata->action;
        $a = $actions[$action];

        doAroundCalls($a['before'], $cdata);

        $method = $cdata->method;

        foreach($a as $am) {
            if($am['name'] === $method) {
                $mdef = $am;
            }
        }

        if(!$mdef){
            throw new Exception("Call to undefined method: $method on action $action");
        }
        doAroundCalls($mdef['before'], $cdata);

        $r = array(
            'type'=>'rpc',
            'tid'=>$cdata->tid,
            'action'=>$action,
            'method'=>$method
        );

        require_once("classes/$action.php");
        $o = new $action();

        $params = isset($cdata->data) && is_array($cdata->data) ? $cdata->data : array();

        $r['result'] = call_user_func_array(array($o, $method), $params);

        doAroundCalls($mdef['after'], $cdata, $r);
        doAroundCalls($a['after'], $cdata, $r);

    }
    catch(Exception $e){
        $r['type'] = 'exception';
        $r['message'] = $e->getMessage();
        $r['where'] = $e->getTraceAsString();
    }
    return $r;
}



$response = null;
if(is_array($data)){
    $response = array();
    foreach($data as $d){
        $response[] = doRpc($d, $actions);
    }
}else{
    $response = doRpc($data, $actions);
}
if($isForm && $isUpload){
    echo '<html><body><textarea>';
    echo json_encode($response);
    echo '</textarea></body></html>';
}else{
    echo json_encode($response);
}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
