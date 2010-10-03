/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.util.clone

Trick.util.clone = function(obj) {

    // {{{ doClone

    function doClone(o) {

        if (!o || 'object' !== typeof o) {
            return o;
        }

        if ('function' === typeof o.clone) {
            return o.clone();
        }

        if (o.hasOwnProperty('__clonedTo')) {
            return o.__clonedTo;
        }

        var c = '[object Array]' === Object.prototype.toString.call(o) ? [] : {};

        o.__clonedTo = c;

        var p, v;

        for (p in o) {

            if ((p !== '__clonedTo') && o.hasOwnProperty(p)) {

                v = o[p];

                if (v && 'object' === typeof v) {
                    c[p] = doClone(v);
                } else {
                    c[p] = v;
                }
            }
        }

        return c;
    }

    // }}}
    // {{{ finalizeClone

    function finalizeClone(o) {

        if (o.hasOwnProperty('__clonedTo')) {

            delete o.__clonedTo;

            var p, v;

            for (p in o) {

                if (o.hasOwnProperty(p)) {

                    v = o[p];

                    if (v && 'object' === typeof v) {
                        finalizeClone(v);
                    }
                }
            }
        }
    }

    // }}}

    var clone = doClone(obj);
    finalizeClone(obj);

    return clone;
};

// }}}
// {{{ Shorthand

Trick.clone = Trick.util.clone;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
