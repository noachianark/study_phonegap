Ext.define('VIP.member.MemberInfo', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipmembermemberinfo' ],
	requires : [ 'VIP.member.DetailMain', 'VIP.member.MemberGrid' ],
	iconCls : 'icon-member-info',
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	defaults : {
		border : false
	},
	createView : function() {
		var me = this;
		
		var items = [ {
			xtype : 'panel',
			width : '30%',
			layout : 'anchor',
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
						width : 300
					},
					layout : {
						type : 'vbox',
						align : 'stretch'
					},
					items : [ {
						fieldLabel : 'Email',
						emptyText : 'Email',
						name : 'userEmail',
						itemId : 'userEmail',
						listeners : {
							specialKey : {
								fn : function(field, key, option) {
									if (key.keyCode == 13) {
										var panel = this.up("vipmembermemberinfo");
										var grid = panel.down('membergrid');
										var form = panel.down('form').getForm();
										var values = form.getValues();
										grid.getSelectionModel().deselectAll();
										grid.doQuery(values);
										
									}
								},
								delay : 200
							}
						}
					},{
						fieldLabel : '会员手机',
						emptyText : '会员手机',
						name : 'userTelephone',
						itemId : 'userTelephone',
						listeners : {
							specialKey : {
								fn : function(field, key, option) {
									if (key.keyCode == 13) {
										var panel = this.up("vipmembermemberinfo");
										var grid = panel.down('membergrid');
										var form = panel.down('form').getForm();
										var values = form.getValues();
										grid.getSelectionModel().deselectAll();
										grid.doQuery(values);
										
									}
								},
								delay : 200
							}
						}
					},{
						fieldLabel : '会员昵称',
						emptyText : '会员昵称',
						name : 'userName',
						itemId : 'userName',
						listeners : {
							specialKey : {
								fn : function(field, key, option) {
									if (key.keyCode == 13) {
										var panel = this.up("vipmembermemberinfo");
										var grid = panel.down('membergrid');
										var form = panel.down('form').getForm();
										var values = form.getValues();
										grid.getSelectionModel().deselectAll();
										grid.doQuery(values);
										
									}
								},
								delay : 200
							}
						}
					},{	
						xtype : 'button',
						icon : 'images/search.png',
						width : 120,
						margin : '5 0 0 0',
						scale : 'medium',
						text : '查询',
						handler : function(btn) {
							var panel = this.up("vipmembermemberinfo");
							var grid = panel.down('membergrid');
							var form = panel.down('form').getForm();
							var values = form.getValues();
							grid.getSelectionModel().deselectAll();
							grid.doQuery(values);
						}
					} ]
				} ]
			}, {
				xtype : 'membergrid',
				anchor : '100% -160',
				
				onSelectChange : {
					fn : me.onSelectChange,
					scope : me
				}
			} ]
		} ];

		return items;
	},

	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			items : this.createView()
		});

		this.callParent(arguments);
	},
	
	onSelectChange : function(grid, selected, eOpts) {
		var detailmain = this.down("detailmain");
		var me = this;
		if(detailmain != undefined){
			this.remove(detailmain);
		}
		
		if(selected.length != 0){
			me.setLoading('查询中...');
			me.down("membergrid").suspendEvents();
			setTimeout(function(){
				var data = selected[0].data;
				detailmain = Ext.create('VIP.member.DetailMain', {
					
					width : '70%',
					title : '【' + data.userName + '】',
					userId : data.id,
					marking : '1',
					onLoad : {
						fn : function(){
							me.setLoading(false);
							me.down("membergrid").resumeEvents();
						},
						scope : me
					},
					onSave : {
						fn : function(){
							var grid = this.down('membergrid');
							grid.refresh();
						},
						scope : me
					}
				});
				me.add(detailmain);
			}, 800);			
		}		
	}
});