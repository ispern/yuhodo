<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */
$actions = array();

define('TARGET_DIR', './classes/');

$useFormHandler = false;

$filelist = scandir(TARGET_DIR);
foreach($filelist as $value) {
    if(
        is_file(TARGET_DIR . $value) &&
        pathinfo($value, PATHINFO_EXTENSION) === 'php'
    ) {
        $cname = pathinfo($value, PATHINFO_FILENAME);

        if(!class_exists($cname)) {

            $actions[$cname] = array();

            require_once(TARGET_DIR . $value);

            $class = new ReflectionClass($cname);

            $methods = $class->getMethods();
            foreach($methods as $method) {

                $mname = $method->getName();
                $count = count($method->getParameters());

                $action = array(
                    'name' => $mname,
                    'len' => $count
                );

                if(substr($mname, 0, 3) === 'fh_') {
                    $action['formHandler'] = true;
                    $action['len']++;
                    $useFormHandler = true;
                }
                $actions[$cname][] = $action;
            }

        } else {
            die('Duplicate Class Name : ' . $cname);
        }

    }
}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
