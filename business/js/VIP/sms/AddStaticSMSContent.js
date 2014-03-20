Ext.define('VIP.sms.AddStaticSMSContent', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.addstaticsmscontent' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 500,
	height : 200,
	title : '添加短信模板',
	modal : true,
	border : false,
	
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/ok-16.png',
			width : 90,
			handler : function(btn) {
				me.addTemplate();
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
			items :[{
		        xtype: 'textfield',
		        name: 'name',
		        fieldLabel: '名称',
		        itemId:'name',
		        anchor    : '100% 20%',
		        allowBlank : false
		    },{
		        xtype     : 'textareafield',
		        grow      : true,
		        name      : 'content',
		        itemId:'content',
		        fieldLabel: '短信内容',
		        allowBlank : false,
		        anchor    : '100% 80%'
		    }]
		}];

		return items;
	},
	
	addTemplate:function(){
		var me=this;
		var form=me.down('vipform').getForm();
		if (form.isValid()) {
			var name=me.down('#name').getValue();
			var content=me.down('#content').getValue();
			SMSTemplateAction.add({
				name:name,
				content:content,
				type:'0'
			},function(actionResult){
				Ext.Msg.info(actionResult.message,function(){
					if(me.onSave){
						me.onSave.fn.call(me.onSave.scope);
					}
					me.down('vipform').getForm().reset();
				});
				
			});
		}
	},
	
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		
	}
});