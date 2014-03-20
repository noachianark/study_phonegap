Ext.define('VIP.sms.EditDepositSMS', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.editdepositsms' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 640,
	height : 400,
	title : '充值短信模板',
	modal : true,
	border : false,
	
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/ok-16.png',
			width : 90,
			handler : function(btn) {
				me.onSave.fn.call(me.onSave.scope);
			}
		}, {
			text : '取消',
			icon : 'images/cancel-16.png',
			width : 90,
			handler : function(btn) {
				me.destroy();
			}
		} ];

		return buttons;
	},

	createView : function() {
		var me = this;

		var items = [{
			xtype : 'vipform',
			defaults : {
				margin : 5
			},
			layout : {
				type : 'anchor'
			},
			items : [{
				xtype : 'fieldset',
				title : '基本信息',
				anchor : '100% 75%',
				defaults : {
					columnWidth: 0.25,
					margin : '5 5 5 5'
				},
				layout:'column',
				items : [{
			        xtype: 'label',
			        text: '字段编码'
			    },{
			        xtype: 'label',
			        text: '代表内容'
			    },{
			        xtype: 'label',
			        text: '字段编码'
			    },{
			        xtype: 'label',
			        text: '代表内容'
			    },{
			        xtype: 'label',
			        text: '[$userId$]'
			    },{
			        xtype: 'label',
			        text: '卡号'
			    },{
			        xtype: 'label',
			        text: '[$userName$]'
			    },{
			        xtype: 'label',
			        text: '会员姓名'
			    },{
			        xtype: 'label',
			        text: '[$realAmount$]'
			    },{
			        xtype: 'label',
			        text: '充值金额'
			    },{
			        xtype: 'label',
			        text: '[$time$]'
			    },{
			        xtype: 'label',
			        text: '时间'
			    },{
			        xtype: 'label',
			        text: '[$rewardAmount$]'
			    },{
			        xtype: 'label',
			        text: '赠送金额'
			    },{
			        xtype: 'label',
			        text: '剩余积分'
			    },{
			        xtype: 'label',
			        text: '[$currentDeposit$]'
			    },{
			        xtype: 'label',
			        text: '当前余额'
			    },{
			        xtype: 'label',
			        text: '[$operatorName$]'
			    },{
			        xtype: 'label',
			        text: '操作员'
			    },{
			        xtype: 'label',
			        text: '[$shopName$]'
			    },{
			        xtype: 'label',
			        text: '消费店铺'
			    }]
			},{
				xtype:'form',
				anchor : '100% 25%',
				layout:'anchor',
				items:[{
		            xtype     : 'textareafield',
		            grow      : true,
		            name      : 'content',
		            allowBlank : false,
		            anchor : '100% 100%'
		        }]
			}]
		}];

		return items;
	},
	
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		this.onLoad.fn.call(this.onLoad.scope);
	}
});