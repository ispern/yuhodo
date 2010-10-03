<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Account

/**
 * Account Class
 */
class Account
{
    // {{{ Account Session KEY

    /**
     * ユーザーセッションキー
     */
    private $_sessKey = 'OmegaTrickAccount';

    /**
     * 自動サインイン暗号化キー
     */
    private $_encryptKey = 'OMEGATRICK_AUTO_SIGNIN_KEY';

    // }}}
    // {{{ isSignin

    /**
     * サインイン確認メソッド
     */
    public function isSignin()
    {
        session_start();

        if(isset($_SESSION[$this->_sessKey])) {
            return $_SESSION[$this->_sessKey];
        }

        return false;
    }

    // }}}
    // {{{ autoSignin

    /**
     * 自動サインインメソッド
     */
    public function autoSignin($key)
    {
        session_start();

        /*
        // 何らかの複合化処理実装をおすすめします。
        $key = decrypt(
            $this->autoSigninEncryptKey,
            $key
        );
         */

        // 独自に認証処理に書き換えてください。
        if($key === 'OmegaTrickAutoSignin') {

            // 自動ログイン用キー更新
            $autoSigninKey = md5(uniqid("",1));

            // 下記は実際の実装では不要です。
            // 上記のサインイン用キーをDBなどに保存して利用してください。
            $autoSigninKey = 'OmegaTrickAutoSignin';

            // ユーザーデータをセッションに格納
            $_SESSION[$this->_sessKey] = array(
                'id' => 1,
                'lastName' => '尾女鹿',
                'firstName' => '太朗'
            );

            /*
            // 何らかの暗号化処理実装をおすすめします。
            $autoSigninKey = encrypt(
                $this->autoSigninEncryptKey,
                $autoSigninKey
            );
             */

            return array(
                'success' => true,
                'info' => $_SESSION[$this->_sessKey],
                'auto_signin_key' => $autoSigninKey
            );

        }

        return array(
            'success' => false
        );
   }

    // }}}
    // {{{ signout

    public function signout()
    {
        session_start();

        unset($_SESSION[$this->_sessKey]);
    }

    // }}}
    // {{{ auth

    /**
     * 認証メソッド
     */
    public function auth($id, $passwd, $auto)
    {
        session_start();

        $ret = array(
            'success' => false,
            'options' => array()
        );

        // 認証方式はユーザー実装依存
        if($id === 'omega' && $passwd === 'trick') {

            $ret['success'] = true;

            if($auto) {

                // 自動サインイン用キー更新
                $autoSigninKey = md5(uniqid("",1));

                /*
                // 何らかの暗号化処理実装をおすすめします。
                $autoSigninKey = encrypt(
                    $this->autoSigninEncryptKey,
                    $autoSigninKey
                );
                */

                // 下記は実際の実装では不要です。
                // 上記のサインイン用キーをDBなどに保存して利用してください。
                $autoSigninKey = 'OmegaTrickAutoSignin';


                $ret['auto_signin_key'] = $autoSigninKey;
            }

            // ユーザーデータをセッションに格納
            $_SESSION[$this->_sessKey] = array(
                'id' => 1,
                'lastName' => '尾女鹿',
                'firstName' => '太朗'
            );

            $ret['info'] = $_SESSION[$this->_sessKey];

        } else {
            $ret['options']['msg'] = 'ユーザーIDかパスワードが間違っています。';
        }

        return $ret;
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
