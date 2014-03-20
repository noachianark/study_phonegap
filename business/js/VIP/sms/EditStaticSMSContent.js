Ext.define('VIP.sms.EditStaticSMSContent', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.editstaticsmscontent' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 500,
	height : 200,
	title : '编辑短信模板',
	modal : true,
	id:null,
	border : false,
	
	createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '保存',
			icon : 'images/ok-16.png',
			width : 90,
			handler : function(btn) {
				var form=me.down('vipform').getForm();
				if (form.isValid()) {
					var values=me.down('vipform').getValues();
					SMSTemplateAction.UpdateTemplate({
						id : me.id,
						type:'0',
						name:values['name'],
						content:values['content']
					},function(actionResult){
						if(me.onSave){
							me.onSave.fn.call(me.onSave.scope);
						}
						Ext.Msg.info(actionResult.message,function(){
							me.down('vipform').getForm().reset();
						});
					});
				}
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
		        allowBlank : false,
		        anchor    : '100% 20%'
		    },{
		        xtype     : 'textareafield',
		        grow      : true,
		        name      : 'content',
		        fieldLabel: '短信内容',
		        allowBlank : false,
		        anchor    : '100% 80%'
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