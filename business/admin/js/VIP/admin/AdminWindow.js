Ext.define('VIP.admin.AdminWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.adminwindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	id : 'adminwindow',
	width : 640,
	height : 300,
	resizable:false,
	closable :false,
	border : false,
	modal : true,
	createButtons : function() {
		var me = this;

		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			handler : function(btn) {
				me.saveAdmin();
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			handler : function(btn) {
				me.destroy();
			}
		} ];

		return buttons;
	},

	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'vipform',
			defaults : {
				margin : 5
			},
			items : [ {
				xtype : 'fieldset',
				title : '基本信息',
				margin : 5,
				height : 155,
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [ {
					xtype : 'textfield',
					fieldLabel : '账号名',
					itemId : 'accountName',
					allowBlank : false,
					name : 'accountName',
					validFlag : true,
					validator : function() {
						return this.validFlag;
					},
					listeners : {
						blur : function(field) {
							var me = this;
							BusinessAdminAction.isBusinessAdminExists(field.getValue(), function(actionResult) {
								var isBusinessAdminExists = actionResult.data.isBusinessAdminExists;
								if(isBusinessAdminExists=="true"){
									me.validFlag = '此账号名已被占用！',
									me.validate(false);
								}else{
									me.validFlag = true,
									me.validate(true);
								}
							});
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '姓名',
					allowBlank : false,
					name : 'name'
				},{
					xtype : 'textfield',
					fieldLabel : '电子邮箱',
					allowBlank : false,
					regex:/^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/,
					regexText:'无效的电子邮箱',
					name : 'email',
					colspan : 2
				},{
					xtype : 'textareafield',
					fieldLabel : '描述',
					name : 'description',
					colspan : 2,
					width : 550
				} ]

			}, {
				xtype : 'fieldset',
				title : '密码',
				margin : 5,
				height : 65,
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [{
					xtype : 'textfield',
					fieldLabel : '密码',
					inputType : 'password',
					itemId : 'password',
					name : 'password',
					allowBlank : false,
					vtype : 'password',
					labelStyle : 'color:red',
					initialPassField : 'passwordAg',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#passwordAg').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '确认密码',
					itemId : 'passwordAg',
					name : 'passwordAg',
					inputType : 'password',
					allowBlank : false,
					vtype : 'password',
					initialPassField : 'password',
					labelStyle : 'color:red',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.updatePassword();
								}
							},
							delay : 200
						}
					}
				} ]
			} ]
		} ];

		return items;
	},

	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			title : this.params.adminId? '修改Admin' : '添加Admin',
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		if(this.params.adminId){
			this.load();
		}
		
	},
	saveAdmin : function(){
		var me = this;
		var form = me.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			values.passwordAg= undefined ;
			if(me.params.adminId){
				Ext.apply(values, {
					id : me.params.adminId
				});
				if(values.password=="******"){
					values.password= undefined ;
				}
				BusinessAdminAction.updateBusinessAdmin(values,function(actionResult){
					if(actionResult.success){
						Ext.Msg.info("修改成功");
						if (me.onSave) {
							me.onSave.fn.call(me.onSave.scope);
						}
						me.destroy();
					}else{
						Ext.Msg.error(actionResult.message);
					}
				});
			}else{
				Ext.apply(values, {
					businessId : window.account.businessId
				});
				BusinessAdminAction.addBusinessAdmin(values,function(actionResult){
					if(actionResult.success){
						Ext.Msg.info("添加成功");
						if (me.onSave) {
							me.onSave.fn.call(me.onSave.scope);
						}
						me.destroy();
					}else{
						Ext.Msg.error(actionResult.message);
					}
				});
			}
		}
		
	},
	load : function() {
		var me = this;
		me.down('#password').setValue('******');
		me.down('#passwordAg').setValue('******');
		me.down('#accountName').setReadOnly(true);
		BusinessAdminAction.findBusinessAdminById(me.params.adminId,function(actionResult){
			if(actionResult.success){
				me.down('vipform').getForm().setValues(actionResult.data);
			}else{
				Ext.Msg.error(actionResult.message);
			}
		});
	}
});