Ext.define('VIP.operator.OperatorInfoWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.operatorinfowindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 640,
	height : 220,
	modal : true,
	resizable:false,
	border : false,
	icon : 'images/my_info.png',
	createButtons : function() {
		var me = this;

		var buttons = [ {
			text : '修改',
			icon : 'images/update.png',
			handler : function(btn) {
				me.updatePassword();
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			handler : function(btn) {
				me.close();
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
			layout : {
				type : 'anchor'
			},
			items : [ {
				xtype : 'fieldset',
				title : '基本信息',
				anchor : '100% 40%',
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [ {
					xtype : 'displayfield',
					fieldLabel : '操作帐号',
					itemId : 'accountName'
				}, {
					xtype : 'displayfield',
					fieldLabel : '管理店铺',
					itemId : 'shopName'
				} ]

			}, {
				xtype : 'fieldset',
				title : '密码修改',
				anchor : '100% 60%',
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
					fieldLabel : '原始密码',
					inputType : 'password',
					allowBlank : false,
					itemId : 'originalPassword',
					colspan : 2,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#password').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '新密码',
					inputType : 'password',
					itemId : 'password',
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
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		this.load();
		setTimeout(function(){
			me.down('#originalPassword').focus(true);
		}, 500);
	},
	updatePassword : function() {
		var me = this;
		if(me.down('#originalPassword').getValue()==""){
			me.down('#originalPassword').markInvalid("原密码为空");
			return false;
		}
		if(me.down('#password').getValue()!=me.down('#passwordAg').getValue()){
			me.down('#password').markInvalid("二次密码不一致");
			me.down('#passwordAg').markInvalid("二次密码不一致");
			return false;
		}
		var operatorId = window.account.id + "";
		var originalPassword = base64encode(me.down('#originalPassword').getValue());
		var newPassword = base64encode(me.down('#password').getValue());
		if (operatorId != "" && originalPassword != "" && newPassword != "") {
			OperatorAction.changePassword(operatorId, originalPassword, newPassword, function(result) {
				if (result.success) {
					Ext.Msg.info('修改成功.', function() {
						me.close();
					});
				} else {
					Ext.Msg.error(result.message);
				}
			});
		} else {
			Ext.Msg.error("请输入正确的值.");
		}

	},
	load : function() {
		var me = this;
		me.down('#shopName').setValue(window.account.shopName);
		me.down('#accountName').setValue(window.account.accountName);
	}
});