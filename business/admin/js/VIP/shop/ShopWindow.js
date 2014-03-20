Ext.define('VIP.shop.ShopWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.shopwindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 640,
	height : 280,
	border : false,
	resizable:false,
	modal : true,
	closable: false,  
	createView : function(){
		
	},
	
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				me.saveShop();
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
				anchor : '100% 100%',
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
					fieldLabel : '店铺名',
					name : 'name',
					vtype : 'stringblank',
					maxLength : '15',
					maxLengthText : '不可超过15位',
					allowBlank : false,
					colspan : 2,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#contactName').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '联系人',
					name : 'contactName',
					allowBlank : false,
					vtype : 'stringblank',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#telephone').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '联系电话',
					name : 'telephone',
					allowBlank : false,
					regex:/^1[3|4|5|8][0-9]{9}$/,
					regexText:'无效的手机号码',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.saveShop();
								}
							},
							delay : 200
						}
					}
				},{
					xtype : 'textfield',
					fieldLabel : '分店地址',
					name : 'address',
					colspan : 2,
					width: 550,
					allowBlank : false
				},{
					xtype : 'numberfield',
					fieldLabel : '经度',
					name : 'longitude',
					allowBlank : false
				},{
					xtype : 'numberfield',
					fieldLabel : '纬度',
					name : 'latitude',
					allowBlank : false
				},{
					fieldLabel : '状　态',
					xtype : 'vcombo',
					hidden : true,
					name : 'state',
					itemId:'state',
					options : [ {
						text : '正常',
						value : '1'
					}, {
						text : '冻结',
						value : '0'
					}, {
						text : '注销',
						value : '-2'
					} ],
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
		var me = this;
		Ext.apply(this, {
			title : this.params.shopId? '修改店铺' : '添加店铺',
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		
		
		if(this.params.shopId){
			this.down('#state').show();
			this.load();
		}
	},
	load : function(){
		var me = this;
		ShopAction.findShopById(this.params.shopId, function(actionResult) {
			me.down('vipform').getForm().setValues(actionResult.data);
		});
	},
	saveShop : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			if(me.params.shopId){
				ShopAction.editShop(Ext.apply({
					id : me.params.shopId
				}, values), function(actionResult) {
					if (actionResult.success) {
						Ext.Msg.info('修改成功.', function() {
							if (me.onSave) {
								me.onSave.fn.call(me.onSave.scope);
							}
							me.destroy();
						});
					} else {
						Ext.Msg.error(actionResult.message);
					}
				});
			}else{
				values.state = "1";
				ShopAction.addShop(Ext.apply({
					businessId : window.account.businessId
				},values), function(actionResult) {
					if (actionResult.success) {
						Ext.Msg.info('添加成功.', function(){
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
	}
});