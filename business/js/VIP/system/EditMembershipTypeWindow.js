Ext.define('VIP.system.EditMembershipTypeWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.editmembershiptypewindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 640,
	height : 280,
	title : '修改卡片',
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
					fieldLabel : '类别名称',
					name : 'membershipTypeName',
					vtype : 'stringblank',
					maxLength : '15',
					maxLengthText : '不可超过15位',
					allowBlank : false,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#moneyBackRate').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'numberfield',
					fieldLabel : '充值返现百分比',
					name : 'moneyBackRate',
					itemId : 'moneyBackRate',
					allowBlank : false,
					maxValue : 100,
					minValue : 0,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#discountRate').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'numberfield',
					fieldLabel : '折扣百分比',
					name : 'discountRate',
					itemId : 'discountRate',
					allowBlank : false,
					maxValue : 100,
					minValue : 0,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.saveMembershipType();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'numberfield',
					fieldLabel : '积分百分比',
					name : 'pointRate',
					itemId : 'pointRate',
					allowBlank : false,
					value : 0,
					minValue : 0,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.saveMembershipType();
								}
							},
							delay : 200
						}
					}
				}  ]
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
		
		MembershipTypeAction.getMembershipTypeById(me.params.membershipTypeId, function(actionResult) {
			me.down('vipform').getForm().setValues(actionResult.data);
		});
	},

	saveMembershipType : function(btn) {
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			MembershipTypeAction.editMembershipType(me.params.membershipTypeId, values, function(actionResult) {
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
});