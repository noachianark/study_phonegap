Ext.define('VIP.search.MemberInfo', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.searchmemberinfo' ],
	requires : [ 'VIP.search.MemberGrid' ],
	userId : null,

	createView : function() {
		var me = this;
		var win = this.up();
		var items = [ {
			border : false,
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [ {
				margin : '10 0 0 120',
				xtype : 'radiofield',
				name : 'type',
				checked : true,
				inputValue : true,
				handler : function(checkbox, checked) {
					var win = me.up();
					if (checked == true) {
						me.down('#info').hide();
						win.setSize(500, 160);
						me.down('#number').show();
						me.focus();
						win.down('#search').setDisabled(true);
					}
				}
			}, {
				xtype : 'label',
				text : '二维码扫描',
				margin : '13 0 0 10'
			}, {
				margin : '10 0 0 40',
				xtype : 'radiofield',
				name : 'type',
				inputValue : false,
				handler : function(checkbox, checked) {
					var win = me.up();
					if (checked == true) {
						me.down('#number').hide();
						win.setSize(500, 500);
						me.down('#info').show();
						me.typeFocus();
					}
				}
			}, {
				xtype : 'label',
				text : '手动查询',
				margin : '13 0 0 10'
			} ]
		}, {
			xtype : 'panel',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			itemId : 'info',
			hidden : true,
			border : false,
			items : [ {
				xtype : 'form',
				width : '100%',
				height : 160,
				layout : 'fit',
				border : false,
				items : [ {
					xtype : 'fieldset',
					title : '查询条件',
					margin : 5,
					defaults : {
						xtype : 'textfield',
						labelAlign : 'right',
						labelWidth : 80,
						selectOnFocus : true,
						width : 300
					},
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
					items : [  {
						fieldLabel : 'Email',
						emptyText : 'Email',
						name : 'userEmail',
						itemId : 'userEmail'
					},{
						fieldLabel : '会员手机',
						emptyText : '会员手机',
						name : 'userTelephone',
						itemId : 'userTelephone'
					},{
						fieldLabel : '会员昵称',
						emptyText : '会员昵称',
						name : 'userName',
						itemId : 'userName'
					}, {
						xtype : 'button',
						icon : 'images/search.png',
						width : 120,
						margin : '5 0 0 0',
						scale : 'medium',
						text : '查询',
						handler : function(btn) {
							var panel = this.up("searchmemberinfo");
							var grid = panel.down('searchmembergrid');
							var form = panel.down('form').getForm();
							var values = form.getValues();
							grid.getSelectionModel().deselectAll();
							grid.doQuery(values);
						}
					} ]
				} ]
			}, {
				xtype : 'searchmembergrid',
				height : 235,
				onRecordSelect : {
					fn : me.onRecordSelect,
					scope : me
				},
				onSelectChange : {
					fn : me.onSelectChange,
					scope : me
				}
			} ]
		}, {
			xtype : 'panel',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			itemId : 'number',
			hidden : false,
			border : false,
			items : [ {
				xtype : 'fieldset',
				title : '二维码身份识别',
				margin : 5,
				defaults : {
					xtype : 'textfield',
					labelAlign : 'right',
					labelWidth : 80,
					selectOnFocus : true,
					width : 300
				},
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				items : [ {
					fieldLabel : '会员二维码',
					emptyText : '请扫描会员身份二维码',
					name : 'qrString',
					itemId : 'qrString',
					inputType : 'password',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.onPasswordSelect();
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
	focus : function() {
		var me = this;
		setTimeout(function() {
			me.down('#qrString').focus(true);
		}, 500);

	},
	typeFocus : function() {
		var me = this;
		setTimeout(function() {
			me.down('#userName').focus(true);
		}, 500);
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});
		this.callParent(arguments);

		this.focus();
	},
	onRecordSelect : function(grid, record, eOpts) {
		var win = this.ownerCt;
		var data = record.data;

		win.onRecordSelect.fn.call(win.onRecordSelect.scope, data.id, false);
		win.close();
	},
	onSelectChange : function(grid, selected, eOpts) {
		var win = this.ownerCt;
		if (selected.length != 0) {
			this.userId = selected[0].data.id;
			win.down('#search').setDisabled(false);
		}

	},
	onPasswordSelect : function() {
		var win = this.ownerCt;
		var me = this;
		value = this.down("#qrString").getValue();
		BVipCardAction.getVipCardIdByQrString(window.account.businessId,value, function(result) {
			if (result.success) {
				var id = result.data.id;
				win.onRecordSelect.fn.call(win.onRecordSelect.scope, id , true, value);
				win.close();
			} else {
				Ext.Msg.error(result.message, function() {
					me.down('#qrString').setValue();
					me.focus();
				});
			}
		});
	},
	doSelect : function() {
		var win = this.ownerCt;
		win.onRecordSelect.fn.call(win.onRecordSelect.scope, this.userId, false);
		win.close();
	}
});