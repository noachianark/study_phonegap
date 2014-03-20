Ext.define('VIP.common.PrintWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.printwindow' ],
	layout : 'fit',
	width : 360,
	height : 480,
	url : null,
	buttonAlign : 'center',
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'panel',
			border : false,
			html : '<iframe frameborder="0" scrolling="auto" src="' + me.url + '"></iframe>',
			listeners : {
				resize : function(panel, adjWidth, adjHeight) {
					var iframe = panel.up('printwindow').iframe;
					iframe.setWidth(panel.getWidth());
					iframe.setHeight(panel.getHeight() - 27);
				},
				afterrender : function(panel) {
					var iframe = panel.getEl().select('iframe').first();
					me.iframe = iframe;
					
					iframe.dom.onload = iframe.dom.onreadystatechange = function() {
						if (!this.readyState || this.readyState == 'complete') {
							me.down('#print').enable();
							me.down('#print').focus(true, 100);
							me.down('#close').enable();
						}
					};
				}
			}
		} ];
		return items;
	},
	createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '打印',
			icon : 'images/print.png',
			scale : 'medium',
			itemId : 'print',
			disabled : true,
			handler : function(btn) {
				me.print(btn);
			}
		}, {
			text : '关闭',
			icon : 'images/cancel.png',
			scale : 'medium',
			itemId : 'close',
			disabled : true,
			handler : function(btn) {
				me.close();
			}
		} ];
		return buttons;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
	},

	print : function(btn) {
		btn.disable();
		this.iframe.dom.contentWindow.focus();
		this.iframe.dom.contentWindow.print();
		btn.enable();
	}
});