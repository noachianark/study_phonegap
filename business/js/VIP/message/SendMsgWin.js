Ext.define('VIP.message.SendMsgWin', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.sendmsgwin' ],
	layout : 'fit',
	width : 360,
	height : 400,
	tel : null,
	ids:null,
	buttonAlign : 'center',
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'form',
			frame : true,

			width : 400,
			layout : 'anchor',
			border : false,
			bodyPadding : 10,
			fieldDefaults : {
				labelAlign : 'top',
				labelWidth : 100,
				labelStyle : 'font-weight:bold'
			},
			defaults : {
				anchor : '100%',
				margins : '0 0 10 0'
			},
			items : [ {
				xtype : 'textareafield',
				fieldLabel : '手机号码',
				allowBlank : false,
				disabled : true,
				height : 60,
				value:me.tel
			}, {
				xtype : 'textareafield',
				fieldLabel : '短信内容',
				labelAlign : 'top',
				name:'content',
				itemId:'content',
				height : 240,
				margin : '0',
				allowBlank : false
			} ]
		} ];
		return items;
	},
	createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '选择模板',
			scale : 'medium',
			itemId : 'choose',
			handler : function(btn) {
				Ext.create('VIP.message.ChooseTemplate', {
					modal:true,
					frame: true,
					setContent : {
						fn : function(content){
							me.down('#content').setValue(me.down('#content').getValue()+content);
						},
						scope : this
					}
				}).show();
			}
		},{
			text : '发送',
			icon : 'images/printer-22.png',
			scale : 'medium',
			itemId : 'send',
//			disabled : true,
			handler : function(btn) {
				me.sendMsg(btn);
			}
		}, {
			text : '关闭',
			icon : 'images/cancel-22.png',
			scale : 'medium',
			itemId : 'close',
//			disabled : true,
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

	sendMsg : function(btn) {
		var me=this;
		var values=me.down('form').getValues();
		var content=values["content"];
		btn.disable();
		SMSMessageAction.broadCastingMessage({
			tel : me.tel,
			content:content,
			ids:me.ids
		}, function(actionResult) {
			if (actionResult.success) {
				Ext.Msg.info("发送成功");
				me.down('form').getForm().reset();
			}
		});
		btn.enable();
	}
});