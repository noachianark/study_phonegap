Ext.define('VIP.message.ChooseTemplate', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.choosetemplate' ],
	requires:['VIP.sms.StaticSmsContent'],
	layout : 'fit',
	title:'选择短信模板',
	width : 400,
	height : 400,
	buttonAlign : 'center',
	createView : function() {
		var me = this;

		var items = [{
			xtype:'staticsmscontent',
			isChose:true,
			setContent : me.setContent,
			onClose : {
				fn : function(){
					me.close();
				},
				scope : me
			}
		}];
		return items;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});
		this.callParent(arguments);
	}
});