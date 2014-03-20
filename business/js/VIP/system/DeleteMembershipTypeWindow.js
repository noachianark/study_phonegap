Ext.define('VIP.system.DeleteMembershipTypeWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.deletemembershiptypewindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 640,
	height : 280,
	title : '删除卡片',
	modal : true,
	resizable:false,
	border : false,
	icon : 'images/level_management.png',
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
				title : '提示信息',
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
					xtype : 'label',
					fieldLabel : '类别名称',
					text: "该会员等级下,共拥有会员"+me.params.membershipNumber+"人,请将他们转移至其他会员等级",
					padding:'10 10 10 20'
				},{
					xtype : 'vcombo',

					labelWidth : 63,
					width : 183,
					itemId : 'membershipTypeId',
					value : '',
					allowBlank : false,
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'MembershipTypeAction.listAsOptionByDelete',
							reader : {
								type : 'json',
								root : 'records'
							},
							extraParams : {
								membetshipTypeId: me.params.membershipTypeId
							}
						};
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

	},

	addListeners : function() {

	},

	saveMembershipType : function(btn) {
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var newMembershipTypeId = me.down('#membershipTypeId').getValue();
			MembershipTypeAction.deleteMembershipTypeById(me.params.membershipTypeId,newMembershipTypeId, function(actionResult) {
				if (actionResult.success) {
					if (me.onSave) {
						me.onSave.fn.call(me.onSave.scope);
					}
					me.destroy();
				} else {
					Ext.Msg.error(actionResult.message);
				}
			});
		}
	}
});