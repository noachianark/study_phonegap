Ext.define('VIP.search.SearchMember', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.serchmember' ],
	requires : [ 'VIP.search.MemberInfo' ],
	title : '会员查询',
	modal : true,
	frame : true,
	resizable:false,
	width : 500,
	height : 160,
	y:120,
	icon : 'images/search-16.png',
	layout : 'fit',
	createView : function() {
		var me = this;
		var items = [ {
			xtype : 'searchmemberinfo',
			border : false
		} ];
		return items;
	},
	createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '选择',
			icon : 'images/update.png',			
			itemId : 'search',
			disabled : true,
			handler : function(btn) {
				var memberInfo = me.down('searchmemberinfo');
				memberInfo.doSelect(btn);
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			handler : function(btn) {
				me.destroy();
			}
		}];
		return buttons;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
	}
});