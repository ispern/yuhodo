/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */
Application.setup({

    onReady : function() {

        // Omega Trick Version
        Ext.fly('version').update(Trick.version);

        // Omega Trick Major Version
        Ext.fly('version_major').update(String(Trick.versionDetail.major));

        // Omega Trick Minor Version
        Ext.fly('version_minor').update(String(Trick.versionDetail.minor));

        // Omega Trick Patch Version
        Ext.fly('version_patch').update(String(Trick.versionDetail.patch));

        // Use Ext JS?
        Ext.fly('isExtJS').update(Trick.isExtJS ? 'true' : 'false');

        // Use Ext Core?
        Ext.fly('isExtCore').update(Trick.isExtCore ? 'true' : 'false');

        // Use Sencha Touch?
        Ext.fly('isSenchaTouch').update(Trick.isSenchaTouch ? 'true' : 'false');

    }

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
