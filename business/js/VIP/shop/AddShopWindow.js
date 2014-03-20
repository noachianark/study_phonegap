Ext.define('VIP.shop.AddShopWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.addshopwindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 640,
	icon : 'images/shop_management.png',
	height : 280,
	title : '添加店铺',
	modal : true,
	border : false,
	resizable:false,
	
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
					itemId : 'name',
					vtype : 'stringblank',
					maxLength : '15',
					maxLengthText : '不可超过15位',
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
				}, /*{
					xtype : 'textfield',
					fieldLabel : '折扣说明',
					name : 'discountDescription',
					allowBlank : false
				}*/,{
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
						checked : true,
						inputValue : '现金'
					}, {
						margin:'0 5',
						boxLabel : '支票',
						name : 'chargeWays',
						inputValue : '支票'
					}, {
						margin:'0 5',
						boxLabel : '刷卡',
						name : 'chargeWays',
						inputValue : '刷卡'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '联系人',
					itemId : 'contactName',
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
				}/*, {
					xtype : 'numberfield',
					fieldLabel : '短信余量',
					name : 'smsLimit',
					minValue: 0,
					value:0,
					allowBlank : false,
				}*//*, {
					xtype : 'vcombo',
					fieldLabel : '位置',
					labelWidth : 30,
					margin : '0 5 0 10',
					itemId : 'areaId',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'areaId.listAsOption',
							extraParams : {
								allowBlank : true,
								blankText : '全部'
							}
						};
					}
				}*/]
			}]
		}];

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
	
	saveShop : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			var chargeWays = [values.chargeWays];
			var str ="";
			for(var i = 0;i<chargeWays.length;i++){
				str+=chargeWays[i];
				if(i<(chargeWays.length-1)){
					str+=",";
				}
				
			}
			if(str=="undefined"){
				Ext.Msg.info("至少需选择一种收费方式！");
				return false;
			}else{
				values.chargeWays = str;
				ShopAction.addShop(values, function(actionResult) {
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