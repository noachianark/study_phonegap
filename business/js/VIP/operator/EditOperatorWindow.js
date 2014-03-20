Ext.define('VIP.operator.EditOperatorWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.editoperatorwindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 640,
	height : 480,
	icon : 'images/operator_management.png',
	title : '修改操作员',
	modal : true,
	border : false,
	resizable:false,
	accountName : null,
	
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			itemId : 'saveBtn',
			width : 90,
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
				anchor : '100% 80%',
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [ {
					fieldLabel : '店铺',
					xtype : 'vcombo',
					colspan :2,
					itemId : 'shopId',
					name : 'shopId',
					allowBlank : false,
					value : this.params.actionResult['shopId'],
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
					maxLength : '15',
					value : this.params.actionResult['name'],
					maxLengthText : '不可超过15位',
					vtype : 'stringblank',
					allowBlank : false,
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
				},/* {
					xtype : 'textfield',
					fieldLabel : '操作员编码',
					name : 'operatorNumber',
					allowBlank : false
				}*/, {
					xtype : 'textfield',
					fieldLabel : '用户名',
					name : 'accountName',
					itemId : 'accountName',
					vtype : 'stringblank',

					value : this.params.actionResult['accountName'],
					maxLength : '15',
					maxLengthText : '不可超过15位',
					allowBlank : false,
					validFlag : true,
					validator : function() {
						return this.validFlag;
					},
					listeners : {
						blur : function(field) {
							var mes = this;
							if(field.isDirty()){
								if(me.accountName!=field.getValue()){
									OperatorAction.getOperatorByAccountName(field.getValue(), function(actionResult) {
										mes.validFlag = actionResult.success ? '此用户名已被占用！' : true;
										mes.validate();
									});
								}else{
									mes.validFlag = true;
									mes.validate();
								}
							}
						},
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
					columns: 3,
					items : [ {
						boxLabel : '男',
						name : 'sex',
						checked : this.params.actionResult['sex']=='M',
						inputValue : 'M'
					}, {
						boxLabel : '女',
						name : 'sex',
						checked : this.params.actionResult['sex']=='F',
						inputValue : 'F'
					}, {
						boxLabel : '未知',
						name : 'sex',
						checked : this.params.actionResult['sex']=='U',
						inputValue : 'U'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '身份证号',
					name : 'idCardNumber',
					itemId : 'idCardNumber',
					allowBlank : false,
					value : this.params.actionResult['idCardNumber'],
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
					value : this.params.actionResult['birthday'],
					maxValue : new Date()
				}, {
					xtype : 'vcombo',
					fieldLabel : '教育程度',
					name : 'education',
					value : this.params.actionResult['education'],
					options : [{
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
					}]
				}, {
					xtype : 'textfield',
					fieldLabel : '手机号',
					name : 'mobile',
					itemId : 'mobile',
					colspan : 2,
					allowBlank : false,
					value : this.params.actionResult['mobile'],
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
					maxLength : '30',
					maxLengthText : '不可超过30位',
					value : this.params.actionResult['address'],
					colspan : 2,
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
					maxLength : '140',
					maxLengthText : '不可超过140位',
					name : 'notes',
					itemId : 'notes',
					value : this.params.actionResult['notes'],
					colspan : 2,
					width : 550
				}]					
			}, {
				xtype : 'fieldset',
				title : '操作权限',
				anchor : '100% 20%',
				layout : {
					type : 'table',
					columns : 2
				},
				items : [{
					xtype : 'vcombo',
					name : 'operatorRuleId',
					fieldLabel : '角色',
					labelAlign : 'right',
					width : 275,
					allowBlank : false,
					value : this.params.actionResult['operatorRuleId'],
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'OperatorRuleAction.listAsOption'
						};
					},
					listeners : {
						change : function(field, newValue, oldValue){
							me.down('#saveBtn').setDisabled(newValue == 1);
						}
					}
				},{
					fieldLabel : '状态',
					xtype : 'vcombo',
					name : 'state',
					labelAlign : 'right',
					itemId:'state',
					value : this.params.actionResult['state'],
					options : [ {
						text : '正常',
						value : 1
					}, {
						text : '冻结',
						value : 0
					}, {
						text : '注销',
						value : -2
					} ],
					allowBlank : false,
					listeners : {
						change : {
							fn : function(field, key, option) {
								var value = field.getValue();
								if(value=="-2"){
									Ext.Msg.info("注销无可逆性,请慎重操作！");			
								}
							},
							delay : 200
						}
					}
				} ]
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
		/*this.load();*/
	},
	
	load : function(){
		var me = this;
		this.setLoading('读取中...');
		/*OperatorAction.getOperatorById(this.params.operatorId, function(actionResult){
			setTimeout(function(){
				me.down('vipform').getForm().setValues(actionResult.data);
				me.accountName=actionResult.data.accountName;
				me.setLoading(false);
			},500);
		});*/
		
	},
	
	saveOperator : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			OperatorAction.editOperator(Ext.apply({
				operatorId : this.params.operatorId
			}, values), function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('修改成功', function(){
						if(me.onSave){
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