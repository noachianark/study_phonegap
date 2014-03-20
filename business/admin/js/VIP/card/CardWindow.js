Ext.define('VIP.card.CardWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.cardwindw' ],
	requires : [],
	layout : 'fit',
	width : 640,
	height : 280,
	modal : true,
	resizable:false,
	border : false,
	createView : function() {

	},

	createButtons : function() {
		var me = this;

		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				me.saveMembershipType();
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
				items : [{
					xtype : 'textfield',
					fieldLabel : '类别名称',
					name : 'name',
					vtype : 'stringblank',
					maxLength : '15',
					maxLengthText : '不可超过15位',
					allowBlank : false
				}, {
					xtype : 'numberfield',
					fieldLabel : '充值返现百分比',
					name : 'depositMoneyBackPercent',
					allowBlank : false,
					maxValue : 100,
					minValue : 0,
					value : 0
				}, {
					xtype : 'numberfield',
					fieldLabel : '折扣百分比',
					name : 'discountPercent',
					allowBlank : false,
					value : 0,
					maxValue : 100,
					minValue : 0
				}, {
					xtype : 'numberfield',
					fieldLabel : '积分百分比',
					name : 'pointPercent',
					allowBlank : false,
					value : 0,
					minValue : 0
				} ]
			} ]
		} ];

		return items;
	},

	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			title : this.params.cardTypeId? '修改会员等级' : '添加会员等级',
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		
		if(this.params.cardTypeId){
			this.load();
		}
	},

	addListeners : function() {

	},
	load : function(){
		var me =this;
		CardTypeAction.getCardTypeById(this.params.cardTypeId, function(actionResult){
			me.down('vipform').getForm().setValues(actionResult.data);
		});
	},
	saveMembershipType : function(btn) {
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			if(this.params.cardTypeId){
				Ext.apply(values, {
					id : this.params.cardTypeId
				});
				CardTypeAction.updateCardType(values, function(actionResult) {
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
				Ext.apply(values, {
					businessId : window.account.businessId
				});
				CardTypeAction.addCardType(values, function(actionResult) {
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
	}
});