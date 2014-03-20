Ext.define('VIP.member.ChangeMemberType', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.changemembertypeup' ],
	title : '更改会员等级',
	modal : true,
	resizable:false,
	frame : true,
	width : 400,
	height : 240,
	layout : 'fit',
	padding : 10,
	createView : function() {
		var me = this;
		var items = [ {
			xtype : 'form',
			border : false,
			bodyPadding : 10,
			fieldDefaults : {
				width : 300,
				labelWidth : 120,
				labelAlign : 'right',
				margin : '10 0 0 0'
			},
			items : [ {
				xtype : 'vcombo',
				fieldLabel : '会员等级',				
				name : 'cardTypeId',
				itemId : 'cardTypeId',				
				getProxy : function() {
					return {
						type : 'direct',
						directFn : 'CardTypeAction.getCardTypeOptions',
						extraParams : {
							cardTypeId : me.cardTypeId,
							businessId : window.account.businessId
						}
					};
				},
				listeners : {
					change : {
						fn : function(field, newValue, oldValue) {
							CardTypeAction.getCardTypeById(newValue, function(result) {
								var data = result.data;
								me.down('#discountPercent').setValue(data.discountPercent + "%");
								me.down('#depositMoneyBackPercent').setValue(data.depositMoneyBackPercent + "%");
								me.down('#pointPercent').setValue(data.pointPercent + "%");
							});
						}
					},
					optionsready : {
						fn : function(field){
							if(me.membershipTypeId){
								field.setValue(me.membershipTypeId);
							}
						}
					}
				}
			}, {
				xtype : 'displayfield',
				fieldLabel : '折扣百分比',
				name : 'discountPercent',
				itemId : 'discountPercent',
				fieldStyle : 'font-size:12pt; color:green;font-weight:bold;'
			}, {
				xtype : 'displayfield',
				fieldLabel : '返现百分比',
				name : 'depositMoneyBackPercent',
				itemId : 'depositMoneyBackPercent',
				fieldStyle : 'font-size:12pt; color:#FF9912;font-weight:bold;'
			}, {
				xtype : 'displayfield',
				fieldLabel : '返现百分比',
				name : 'pointPercent',
				itemId : 'pointPercent',
				fieldStyle : 'font-size:12pt; color:#FF9912;font-weight:bold;'
			} ]
		} ];
		return items;
	},
	createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '确定',
			icon : 'images/update.png',
			itemId : 'search',
			handler : function(btn) {
				var typeId = me.down('#cardTypeId').getValue();
				if(typeId==null){
					Ext.Msg.error("请选择会员类型");
					return;
				}
				if(me.userIds.length>1){
					BVipCardAction.changeVipCardTypeAsBulk(me.userIds,typeId, function(result) {
						if (result.success) {
							Ext.Msg.info("修改成功", function() {
								if (me.onSave) {
									me.close();
									me.onSave.fn.call(me.onSave.scope);
								}
							});
						} else {
							Ext.Msg.error("修改失败");
						}
					});
				}else{
					BVipCardAction.changeVipCardType(me.userIds[0],typeId, function(result) {
						if (result.success) {
							Ext.Msg.info("修改成功", function() {
								if (me.onSave) {
									me.close();
									me.onSave.fn.call(me.onSave.scope);
								}
							});
						} else {
							Ext.Msg.error("修改失败");
						}
					});
				}
				
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
	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		
		this.callParent(arguments);
		
		if(me.cardTypeId!=null){
			setTimeout(function(){
				me.down('#cardTypeId').setValue(me.cardTypeId);
			});
		}
	}
});