Ext.define('VIP.operator.AddOperatorWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.addoperatorwindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 640,
	icon : 'images/operator_management.png',
	height : 480,
	title : '添加操作员',
	modal : true,
	border : false,
	resizable:false,

	createButtons : function() {
		var me = this;

		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			itemId : 'saveBtn',
			width : 90,
			disabled : true,
			handler : function(btn) {
				me.saveOperator();
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			width : 90,
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
			layout : {
				type : 'anchor'
			},
			items : [ {
				xtype : 'fieldset',
				title : '基本信息',
				anchor : '100% 80%',
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [{
					fieldLabel : '店铺',
					xtype : 'vcombo',
					name : 'shopId',
					allowBlank : false,
					colspan : 2,
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption'
						};
					},
					listeners : {
						change : {
							fn : function(field, key, option) {
								me.down('#name').focus(true);
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '姓名',
					name : 'name',
					itemId :'name',
					allowBlank : false,
					maxLength : '15',
					maxLengthText : '不可超过15位',
					vtype : 'stringblank',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#accountName').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '用户名',
					name : 'accountName',
					itemId : 'accountName',
					maxLength : '15',
					maxLengthText : '不可超过15位',
					vtype : 'stringblank',
					allowBlank : false,
					validFlag : true,
					validator : function() {
						return this.validFlag;
					},
					listeners : {
						blur : function(field) {
							var me = this;
							OperatorAction.getOperatorByAccountName(field.getValue(), function(actionResult) {
								me.validFlag = actionResult.success ? '此用户名已被占用！' : true;
								me.validate();
							});
						},
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
					fieldLabel : '密码',
					name : 'password',
					itemId : 'password',
					inputType : 'password',
					allowBlank : false,
					vtype : 'password',
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
					name : 'passwordAg',
					itemId : 'passwordAg',
					inputType : 'password',
					allowBlank : false,
					vtype : 'password',
					initialPassField : 'password',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#idCardNumber').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'radiogroup',
					fieldLabel : '会员性别',
					columns : 3,
					items : [ {
						boxLabel : '男',
						name : 'sex',
						checked : true,
						inputValue : 'M'
					}, {
						boxLabel : '女',
						name : 'sex',
						inputValue : 'F'
					}, {
						boxLabel : '未知',
						name : 'sex',
						inputValue : 'U'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '身份证号',
					name : 'idCardNumber',
					itemId : 'idCardNumber',
					allowBlank : false,
					regex:/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2013)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,
					regexText:'无效的身份证',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#mobile').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'datefield',
					fieldLabel : '生日',
					name : 'birthday',
					maxValue : new Date()
				}, {
					xtype : 'vcombo',
					fieldLabel : '教育程度',
					name : 'education',
					options : [ {
						text : '小学',
						value : '小学'
					}, {
						text : '初中',
						value : '初中'
					}, {
						text : '高中',
						value : '高中'
					}, {
						text : '大专',
						value : '大专'
					}, {
						text : '本科',
						value : '本科'
					}, {
						text : '硕士',
						value : '硕士'
					}, {
						text : '博士',
						value : '博士'
					}, {
						text : '其他',
						value : '其他'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '手机号',
					name : 'mobile',
					itemId : 'mobile',
					colspan : 2,
					allowBlank : false,
					regex:/^1[3|4|5|8][0-9]{9}$/,
					regexText:'无效的手机号码',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#address').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '地址',
					name : 'address',
					itemId : 'address',
					colspan : 2,
					maxLength : '30',
					maxLengthText : '不可超过30位',
					width : 550,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#notes').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textareafield',
					fieldLabel : '备注',
					name : 'notes',
					itemId : 'notes',
					maxLength : '140',
					maxLengthText : '不可超过140位',
					colspan : 2,
					width : 550
				}]
			}, {
				xtype : 'fieldset',
				title : '操作权限',
				anchor : '100% 20%',
				items :  {
					xtype : 'vcombo',
					name : 'operatorRuleId',
					fieldLabel : '角色',
					labelAlign : 'right',
					width : 275,
					allowBlank : false,
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'OperatorRuleAction.listAsOption'
						};
					},
					listeners : {
						change : function(field, newValue, oldValue) {
							me.down('#saveBtn').setDisabled(newValue == 1);
						}
					}
				} 
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
		setTimeout(function(){
			me.down('#name').focus(true);
		}, 500);
	},

	addListeners : function() {

	},

	saveOperator : function(btn) {
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			OperatorAction.addOperator(values, function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('添加成功.', function() {
						if (me.onSave) {
							me.onSave.fn.call(me.onSave.scope);
						}
						me.destroy();
					});
				} else {
					Ext.Msg.error(actionResult.message);
				}
			});
		}
	}
});