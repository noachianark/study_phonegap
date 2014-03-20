Ext.define('VIP.shop.EditShopWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.editshopwindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 640,
	icon : 'images/shop_management.png',
	height : 280,
	title : '修改店铺',
	modal : true,
	resizable:false,
	border : false,

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
					maxLength : '15',
					maxLengthText : '不可超过15位',
					vtype : 'stringblank',
					allowBlank : false,
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
				}/*, {
					xtype : 'textfield',
					fieldLabel : '折扣说明',
					name : 'discountDescription',
					allowBlank : false
				}*/, {
					xtype : 'fieldcontainer',
					fieldLabel :'收费方式',
					allowBlank : false,
					border : false,
					defaultType: 'checkbox',
					layout: 'hbox',
					columns : 3,
					items : [ {
						margin:'0 5',
						boxLabel : '现金',
						name : 'chargeWays',
						itemId : 'xj',
						checked : true,
						inputValue : '现金'
					}, {
						margin:'0 5',
						boxLabel : '支票',
						itemId : 'zp',
						name : 'chargeWays',
						inputValue : '支票'
					}, {
						margin:'0 5',
						boxLabel : '刷卡',
						itemId : 'sk',
						name : 'chargeWays',
						inputValue : '刷卡'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '联系人',
					name : 'contactName',
					itemId : 'contactName',
					vtype : 'stringblank',
					allowBlank : false,
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
					itemId : 'telephone',
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
				}, /*{
					xtype : 'numberfield',
					fieldLabel : '短信余量',
					name : 'smsLimit',
					allowBlank : false,
				},*/ {
					fieldLabel : '状态',
					xtype : 'vcombo',
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
					allowBlank : false,
					listeners : {
						change : {
							fn : function(field, key, option) {
								var value = field.getValue();
								if(value=="0"){
									if(me.params.shopId==1){
										Ext.Msg.error("总店无法冻结！",function(){
											me.down('#state').setValue('1');
										});
									}
								}
								if(value=="-2"){
									if(me.params.shopId==1){
										Ext.Msg.error("总店无法注销！",function(){
											me.down('#state').setValue('1');
										});
									}else{
										Ext.Msg.info("注销无可逆性,请慎重操作！");
									}
									
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
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);

		this.load();
	},

	addListeners : function() {

	},

	load : function() {
		var me = this;
		ShopAction.getShop({
			shopId : this.params.shopId
		}, function(actionResult) {
			me.down('vipform').getForm().setValues(actionResult.data);
			
			var str=actionResult.data.chargeWays;
			var array = str.split(',');
			for(var i=0;i<array.length;i++){
				if(array[i]=='现金'){
					me.down('#xj').setValue(true);
				}else if(array[i]=='支票'){
					me.down('#zp').setValue(true);
				}else if(array[i]=='刷卡'){
					me.down('#sk').setValue(true);
				}
			}
		});
	},

	saveShop : function() {
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			var chargeWays = [values.chargeWays];
			var str ="";
			if(chargeWays!=null){
				for(var i = 0;i<chargeWays.length;i++){
					str+=chargeWays[i];
					if(i<(chargeWays.length-1)){
						str+=",";
					}
					
				}
			}
			if(str=="undefined"){
				Ext.Msg.info("至少需选择一种收费方式！");
				return false;
			}else{
				values.chargeWays = str;
				ShopAction.editShop(Ext.apply({
					shopId : this.params.shopId
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
			}
		}
	}
});