Ext.ux.SlickCardLayout = Ext.extend(Ext.layout.CardLayout, {
	setActiveItem : function(item){
		var me = this;

		item = me.container.getComponent(item);
		if (me.activeItem != item) {
			if (me.activeItem) {
				me.activeItem.getEl().fadeOut({
					callback: function() {
						me.activeItem.hide();
						me.activeItem = item;
						me.layout();
						item.show();
						item.getEl().fadeIn();
					}
				});
			} else {
				me.activeItem = item;
				me.layout();
				item.show();
				item.getEl().fadeIn();
			}
		}
	}
}); 
Ext.Container.LAYOUTS['slickcard'] = Ext.ux.SlickCardLayout;
