<?php /* Smarty version 2.6.26, created on 2010-07-19 18:47:00
         compiled from .//OmegaTrick/examples/app/screens.html */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'clean', './/OmegaTrick/examples/app/screens.html', 2, false),)), $this); ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "../templates/OmegaTrick/test/head.html", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php echo ''; ?><?php $this->_tag_stack[] = array('clean', array()); $_block_repeat=true;smarty_block_clean($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo '<!-- Title --><title>Screens Application | Omega Trick</title><!-- /Title --><!-- Ext JS --><link rel="stylesheet" href="'; ?><?php echo $this->_tpl_vars['relpath']; ?><?php echo ''; ?><?php echo $this->_tpl_vars['extjsdir']; ?><?php echo '/resources/css/ext-all.css" type="text/css" /><!-- /Ext JS --><!-- Omega Trick --><link rel="stylesheet" href="'; ?><?php echo $this->_tpl_vars['relpath']; ?><?php echo ''; ?><?php echo $this->_tpl_vars['omegatrickdir']; ?><?php echo '/resources/css/OmegaTrick-all.css" type="text/css" /><link rel="stylesheet" href="'; ?><?php echo $this->_tpl_vars['relpath']; ?><?php echo ''; ?><?php echo $this->_tpl_vars['extjsdir']; ?><?php echo '/resources/css/xtheme-gray.css" type="text/css" /><!-- /Omega Trick --></head><body><!-- Ext JS -->'; ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "../templates/OmegaTrick/extjs.html", 'smarty_include_vars' => array('debug' => true)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php echo '<!-- /Ext JS --><!-- Omega Trick -->'; ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "../templates/OmegaTrick/omegatrick.html", 'smarty_include_vars' => array('debug' => true)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php echo '<!-- /Omega Trick --><!-- Screens --><script type="text/javascript" src="Screens/Dashboard.js"></script><script type="text/javascript" src="Screens/ScreenA/item1.js"></script><script type="text/javascript" src="Screens/ScreenA/item2.js"></script><script type="text/javascript" src="Screens/ScreenB.js"></script><!-- /Screens --><!-- Ext Direct --><script type="text/javascript" src="'; ?><?php echo $this->_tpl_vars['relpath']; ?><?php echo 'extdirect.html"></script><!-- /Ext Direct --><!-- Screens Application --><script type="text/javascript" src="screens.js"></script><!-- /Screens Application --></body></html>'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_clean($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo ''; ?>
