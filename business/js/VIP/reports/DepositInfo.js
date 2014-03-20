Ext.define('VIP.reports.DepositInfo', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.depositinfo' ],
	requires : [],
	layout : 'fit',
	padding : 5,
	title : '详细信息',
	modal : true,
	resizable : false,
	border : false,
	width : 520,
	height : 360,
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
				fieldLabel : '存款单号',
				itemId : 'transactionNumber',
				colspan : 2
			}, {
				xtype : 'displayfield',
				fieldLabel : '会员昵称',
				itemId : 'userName'
			}, {
				xtype : 'displayfield',
				fieldLabel : '充值金额',
				itemId : 'realAmount'
			}, {
				xtype : 'displayfield',
				fieldLabel : '赠送金额',
				itemId : 'rewardAmount'
			}, {
				xtype : 'displayfield',
				fieldLabel : '充值时间',
				itemId : 'time'
			}, {
				xtype : 'displayfield',
				fieldLabel : '会员余额',
				itemId : 'currentDeposit'
			}, {
				xtype : 'displayfield',
				fieldLabel : '充值店铺',
				itemId : 'shopName'
			}, {
				xtype : 'displayfield',
				fieldLabel : '操作人员',
				colspan : 2,
				itemId : 'operatorName'
			}, {
				xtype : 'textareafield',
				fieldLabel : '充值备注',
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
		
		me.down("#userName").setValue(this.params.record.userName);
		me.down("#operatorName").setValue(this.params.record.operatorName);
		me.down("#shopName").setValue(this.params.record.shopName);
		me.down("#transactionNumber").setValue(this.params.record.transactionNumber);
		me.down("#realAmount").setValue(this.params.record.realAmount);
		me.down("#rewardAmount").setValue(this.params.record.rewardAmount);
		me.down("#time").setValue(this.params.record.time);
		me.down("#currentDeposit").setValue(this.params.record.currentDeposit);
		me.down("#notes").setValue(this.params.record.notes);
	}
});