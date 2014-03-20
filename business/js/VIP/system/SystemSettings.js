Ext.define('VIP.system.SystemSettings', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.systemsettings' ],
	requires : [ ],
	icon : 'images/system_management.png',
	title : '系统参数设置',
	defaults : {
	},
	createView : function() {
		var me = this;
		
		var items = [ {
			xtype : 'form',
			border : false,
			
			layout : {
				type : 'vbox',
				align : 'center',
				pack : 'center'
			},		
			items :[{
				xtype : 'fieldset',
				title : '积分兑现设置',
				width : '98%',
				margin : 5,
				items : [{
					xtype : 'numberfield',
					name : 'pointMoneyRate',
					itemId : 'pointMoneyRate',
					fieldLabel : '积分兑现百分比',
					margin : 10,
					value :0,
					maxValue : 100,
					minValue : 0
				}]
			},{
				xtype : 'button',
				text : '保存设置',
				width : 150,
				height : 40,
				handler : function(){
					Ext.Msg.alert("提示","保存设置");
				}
			}]
		}];
		return items;
	},

	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			items : this.createView()
		});
		this.callParent(arguments);
		
		this.load();
	},
	
	load : function(){
		var me = this;
		ConfigurationAction.getConfigur(function(actionResult){
			me.down('#pointMoneyRate').setValue(actionResult.data.pointMoneyRate);
		});
	},
	save : function(){
		var form = this.getForm();
		var me = this;
		if (form.isValid()) {
			var values = this.getValues();
			ConfigurationAction.setConfigur(values,function(actionResult){
				
			});
		}
		
	}
});