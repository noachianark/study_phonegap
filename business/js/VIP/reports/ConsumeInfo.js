Ext.define('VIP.reports.ConsumeInfo', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.consumeinfo' ],
	requires : [],
	layout : 'fit',
	padding : 5,
	title : '详细信息',
	modal : true,
	resizable : false,
	border : false,
	width : 520,
	height : 420,
	createButtons : function() {
		var me = this;

		var buttons = [ {
			text : '关闭',
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
			bodyPadding : 10,
			layout : {
				type : 'table',
				columns : 2
			},
			defaults : {
				labelWidth : 60,
				width : 240,
				labelAlign : 'right'
			},
			items : [ {
				xtype : 'displayfield',
				fieldLabel : '消费单号',
				itemId : 'transactionNumber',
				colspan : 2
			}, {
				xtype : 'displayfield',
				fieldLabel : '会员昵称',
				itemId : 'userName'
			}, {
				xtype : 'displayfield',
				fieldLabel : '消费内容',
				itemId : 'consumeSubject'
			}, {
				xtype : 'displayfield',
				fieldLabel : '消费金额',
				itemId : 'consumptionAmount'
			}, {
				xtype : 'displayfield',
				fieldLabel : '应付金额',
				itemId : 'accountPayable'
			}, {
				xtype : 'displayfield',
				fieldLabel : '折扣金额',
				itemId : 'discount'
			}, {
				xtype : 'displayfield',
				fieldLabel : '卡内支付',
				itemId : 'cardPayment'
			}, {
				xtype : 'displayfield',
				fieldLabel : '现金支付',
				itemId : 'cashPayment'
			}, {
				xtype : 'displayfield',
				fieldLabel : '消费找零',
				itemId : 'changeAmount'
			}, {
				xtype : 'displayfield',
				fieldLabel : '卡内余额',
				itemId : 'currentDeposit'
			}, {
				xtype : 'displayfield',
				fieldLabel : '消费时间',
				itemId : 'time'
			}, {
				xtype : 'displayfield',
				fieldLabel : '店铺名称',
				itemId : 'shopName'
			}, {
				xtype : 'displayfield',
				fieldLabel : '操作人员',
				itemId : 'operatorName',
				colspan : 2
			}, {
				xtype : 'textareafield',
				fieldLabel : '消费备注',
				itemId : 'notes',
				height : 80,
				width : 405,
				readOnly : true,
				colspan : 2
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

	load : function() {
		var me = this;
		me.down("#accountPayable").setValue(this.params.record.accountPayable);
		me.down("#cardPayment").setValue(this.params.record.cardPayment);
		me.down("#cashPayment").setValue(this.params.record.cashPayment);
		me.down("#changeAmount").setValue(this.params.record.changeAmount);
		me.down("#consumeSubject").setValue(this.params.record.consumeSubject);
		me.down("#currentDeposit").setValue(this.params.record.currentDeposit);
		me.down("#discount").setValue(this.params.record.discount);
		me.down("#notes").setValue(this.params.record.notes);
		me.down("#operatorName").setValue(this.params.record.operatorName);
		me.down("#transactionNumber").setValue(this.params.record.transactionNumber);
		me.down("#shopName").setValue(this.params.record.shopName);
		me.down("#time").setValue(this.params.record.time);
		me.down("#userName").setValue(this.params.record.userName);
		me.down("#consumptionAmount").setValue(this.params.record.consumptionAmount);
	}
});