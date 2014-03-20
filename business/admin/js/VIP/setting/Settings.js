Ext.define('VIP.setting.Settings',{
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.settings' ],
	requires : [],
	title : '',
	layout : 'fit',
	title : '设置管理',
	createView : function() {
		var me = this;
		var items = [{
			xtype : 'vipform',
			bodyPadding : 10,
			items : [{
				xtype : 'fieldset',
				title : '积分策略设置',
				padding : 10,
				layout : 'hbox',
				items : [{
					xtype : 'numberfield',
					fieldLabel : '积分兑换金额比例',
					allowBlank : false,
					maxValue : 100,
					minValue : 0,
					width: 160,
					allowDecimals : false,
					allowExponential : false,
					name : 'pointToMeneyRate'
				},{
					xtype : 'label',
					margin : 3,
					text : '%'
				}]
			},{
				xtype : 'container',
				layout : {
					type : 'vbox',
					align : 'center'
				},
				items : [{
					xtype : 'button',
					width : 180,
					height : 35,
					text : '保存基本信息',
					handler : function(){
						me.save();
					}
				}]
			}]
		}];
		return items;
	},
	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			items : this.createView(),
		});
		this.callParent(arguments);
		
		this.load();
	},
	load : function(){
		var me = this;
		BusinessConfigurationAction.getConfigurations(window.account.businessId,function(actionResult){
			if(actionResult.success){
				me.down('vipform').getForm().setValues(actionResult.data);
			}else {
				Ext.Msg.error(actionResult.message);
			}
		});
	},
	save : function(){
		var me = this;
		var form = me.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			Ext.apply(values,{
				businessId : window.account.businessId
			});
			BusinessConfigurationAction.saveConfiguration(values,function(actionResult){
				if(actionResult.success){
					Ext.Msg.info("保存成功");
				}else {
					Ext.Msg.error(actionResult.message);
				}
			});
		}
	}
});