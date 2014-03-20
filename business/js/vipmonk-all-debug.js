Ext.define('VIP.widget.Link', {
	extend :  Ext.Component ,
	alias : [ 'widget.link' ],
	requires : [],
	height : 30,
	padding : '6 20 6 20',	
	baseCls : 'x-link',
	initComponent : function() {
		if(this.icon){
			this.html = '<img src="'+this.icon+'"><span>' + this.text + '</span>';
		} else {
			this.html = '<span>' + this.text + '</span>';
		}		
		
		this.callParent(arguments);
		
		this.on('render', function(){
			this.getEl().on('mouseover', function(){
				this.addCls('x-boundlist-item-over');
			}, this);
			
			this.getEl().on('mouseout', function(){
				this.removeCls('x-boundlist-item-over');
			}, this);
			
			if(this.handler){
				this.getEl().on('click', function(){
					this.handler.call(this, this);
				}, this);
			}
		}, this);
	}
});
Ext.define('VIP.welcome.Summary', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.welcomesummary' ],
	requires : [],
	title : '信息汇总',
	iconCls : 'icon-member-welcome',
	layout : {
		type : 'table',
		columns : 2
	},
	defaults : {
		margin : 10
	},
	items : [],
	createDockedItems : function(store) {
		var me = this;
		var topBars = [];

		return topBars;
	},
	initComponent : function() {
		this.callParent(arguments);
	}
});
Ext.define('VIP.west.Welcome', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipwestwelcome' ],
	                                                      
	title : '欢迎',
	collapsible : false,
	iconCls : 'west-welcome',
	defaults : {
		xtype : 'link'
	},
	layout : {
		type : 'vbox',
		align: 'stretch'
	},
	
	createItems : function(){
		var me = this;
		var handler = function(link){
			me.handleAction.call(me, link.text,link.itemId);
		};
		var items = [{
			text : '信息汇总',
			icon : 'images/star.png',
			itemId : 'welcome',
			handler : handler
		}];
		return items;
	},	

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},
	
	handleAction : function(action,itemId){
		var me = this;
		vip.viewport.main.removeAll();
		me.up().changeLink(itemId);
		if (action == '信息汇总') {
			
			vip.viewport.main.add({
				xtype : 'welcomesummary'
			});
		} 
	}
});
Ext.define('VIP.member.MemberWithdraw', {
	extend :  Ext.form.Panel ,
	alias : [ 'widget.memberwithdraw', 'VIP.member.DetailMain' ],
	userId : null,
	icon : 'images/withdraw.png',
	layout : 'border',
	createView : function() {
		var me = this;
		
		var labelStyle = 'font-size:11pt;margin-top:12px';
		var fieldStyle = 'font-size:14pt;background-image:none;border-width:0px 0px 1px 0px';

		var items = [ {
			xtype : 'panel',
			region : 'center',
			layout : {
				type : 'vbox',
				align : 'center',
				pack : 'center'
			},
			items : [ {
				xtype : 'form',
				title : '取款信息',
				icon : 'images/withdraw.png',
				width : 300,
				height : 250,
				bodyPadding : 10,
				layout : {
					type : 'vbox'
				},
				fieldDefaults : {
					height : 30,
					border : false,
					labelStyle : labelStyle,
					fieldStyle : fieldStyle,
					labelAlign : 'right',
					labelWidth : 110,
					width : 340,
					hideTrigger : true
				},
				items : [ {
					xtype : 'fieldcontainer',
					fieldLabel : '取款金额',
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [ {
						xtype : 'numberfield',						
						fieldStyle : fieldStyle + ';color:green',
						width : 100,
						mouseWheelEnabled: false, 
						allowBlank : false,
						value : 0,
						name : 'amount',
						itemId : 'amount',
						selectOnFocus : true,
						minValue : 0,
						negativeText : "最小值为0,最大值为100000",
						maxValue : me.currentDeposit,
						listeners : {
							change : {
								fn :function(field, key, option) {
									if (parseFloat(field.getValue()) > parseFloat(me.currentDeposit)) {
										Ext.Msg.error("余额不足", function() {
											field.setValue(me.currentDeposit);
											field.focus(true, 100);
										});
									}
								},
								delay : 200
							},
							specialKey : {
								fn : function(field, key, option) {
									if (key.keyCode == 13) {
										me.down('#note').focus(true);
									}
								},
								delay : 200
							}
						}
					}, {
						xtype : 'label',
						style : labelStyle,
						text : '元'
					} ]
				}, {
					xtype : 'textareafield',
					name : 'note',
					itemId : 'note',
					height : 80,
					width : 235,
					labelWidth : 40,
					maxLength:100,
					maxLengthText:'不可超过100字符',
					hideEmptyLabel : false,
					fieldStyle : 'font-size:11pt',
					emptyText : '备注',
					listeners : {
						specialKey : function(field, key) {
							if (key.keyCode == 13) {
								me.specialKeyListener(field, key);
							}
						},
						change : function(field, key){
							var length = field.getValue().length;
							var len = 100-length;
							if(len>0&&len!=100){
								me.down('#lengthInfo').setText("还可输入"+len+"个字符");
							}else if(len==0||len==100){
								me.down('#lengthInfo').setText("");
							}else{
								me.down('#lengthInfo').setText("已经超出"+(-len)+"个字符");
							}
						}
						
					}				
				},{
					xtype: 'label',
					margin:'0 100',
					style : 'color:red',
					itemId : 'lengthInfo',
					text:''
				},{
					xtype : 'container',
					border : false,
					width : 280,
					margin : '15 0 0 0',
					layout : {
						type : 'vbox',
						align : 'center',
						pack : 'center'
					},
					items : [ {
						xtype : 'button',
						itemId : 'save',
						text : '确定',
						icon : 'images/update.png',
						scale : 'large',
						width : 190,
						height : 60,
						padding : 10,
						cls : 'big-button',
						handler : function(btn) {
							me.withdrawSave();
						}
					} ]
				}  ]
			}]
		}, {
			xtype : 'detailmain',
			title : '会员信息',
			icon : 'images/basic_info.png',
			region : 'south',
			collapsed : false,
			collapsible : true,
			titleCollapse : true,
			split : true,
			height : 400,
			userId : this.userId
		} ];

		return items;
	},
	
	load : function(userId) {
		var me = this;
		if (userId) {
			this.userId = userId;
		}

		me.removeAll(true);		
		WithdrawAction.canWithdraw(function(result){
			if(result.success){
				MemberAction.getMemberById(me.userId, function(result) {
					var data = result.data;
					me.userAccountName = data.userAccountName;
					me.currentDeposit = data.currentDeposit;
					me.add(me.createView());
					
					me.down('#amount').focus(true, 100);
				});
			}else{
				Ext.Msg.error(result.message);
			}
		});
	
		
	},
	
	withdrawSave : function() {
		var form = this.getForm();
		var me = this;
		if (form.isValid()) {
			var values = this.getValues();
			if (values.amount == 0) {
				Ext.Msg.error("请输入取款金额", function() {
					me.down('#amount').focus(true, 100);
				});
			} else {

				Ext.Msg.confirm('确认', '确认要从卡 [' + me.userAccountName + '] 取现 [' + values['amount'] + '] 元吗?', function(r) {
					if (r == 'yes') {
						WithdrawAction.add(me.userId,values, function(result) {

							if (result.success) {
								Ext.Msg.info('取款成功.', function() {
									me.doPrint(result.data._id);
									me.close();
								});
							} else {
								Ext.Msg.error(result.message, function() {
									
								});
							}
						});
					}
				});
			}
		}
	},
	doPrint : function(id) {
		Ext.create('VIP.common.PrintWindow', {
			title : '打印预览',
			modal : true,
			frame : true,
			url : 'print/withdraw.jsp?id=' + id
		}).show();
	},

	specialKeyListener : function(field, key) {
		var fields = this.getForm().getFields().items;
		var index = fields.indexOf(field);
		if (key.keyCode == 13) {
			index++;
			var next = fields[index];

			while (next.readOnly || next.isDisabled() || !next.focus) {
				index++;
				next = fields[index];
			}
			next.focus(true, 100);
		}
	},

	memberSearch : function() {
		var me = this;
		Ext.create('VIP.search.SearchMember', {
			onRecordSelect : {
				fn : function(userId) {
					me.load(userId);
				}
			}
		}).show();
	},
	initComponent : function() {
		this.callParent(arguments);
		this.memberSearch();
	}
});
Ext.define('VIP.store.BaseStore',{
	extend:  Ext.data.Store ,
	                            	
	
	constructor: function(config) {
		this.callParent([config]);
		
		this.on('load', function(){
			var rawData = this.getProxy().getReader().rawData;
			if(rawData.message){
				Ext.MessageBox.show({
					title : rawData.success? '信息' : '错误',
					msg : rawData.message,
					buttons : Ext.MessageBox.OK,
					icon : rawData.success? Ext.MessageBox.INFO : Ext.MessageBox.ERROR,
					fn : function(id,msg){
						if(rawData.errorType==0){
							document.location.href="http://localhost:8080/vipmonk/business/index.html";
						}
					}
				});
			}
		}, this);
	}
});
Ext.define('VIP.member.model.Member', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'userId',
		type : 'string'
	}, {
		name : 'userScreenName',
		type : 'string'
	}, {
		name : 'userAccountName',
		type : 'string'
	}, {
		name : 'totalConsume',
		type : 'string'
	},{
		name : 'vipCardTypeName',
		type : 'string'
	},{
		name : 'membershipTypeId',
		type : 'string'
	}, {
		name : 'discountRate',
		type : 'string'
	}, {
		name : 'moneyBackRate',
		type : 'string'
	}, {
		name : 'currentDeposit',
		type : 'string'
	}, {
		name : 'phoneNumber',
		type : 'string'
	}]
});
Ext.define('VIP.member.store.Member',{
	extend:  VIP.store.BaseStore ,
	                                                            
	model : 'VIP.member.model.Member',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'lastUpdateTime',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'MemberAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.member.MemberGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.membergrid' ],
	                                       
	margin : 5,
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        flex : 1,
        sortable: false
	},{
		text : '会员昵称',
		dataIndex : 'userScreenName',
		flex : 2
	}, {
		text : '会员手机',
		dataIndex : 'phoneNumber',
		flex : 2
	}, {
		text : '级别',
		dataIndex : 'vipCardTypeName',
		flex : 1
	} ],
	
	createDockedItems : function(store) {
		var dockedItems = [ {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			displayMsg : '',
			emptyMsg : ''
		} ];

		return dockedItems;
	},
	initComponent : function() {
		var store = Ext.create('VIP.member.store.Member');

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.on('selectionchange', this.onSelectChange.fn, this.onSelectChange.scope);
		
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);

		this.callParent(arguments);
	},
	refresh : function() {
		this.getStore().reload();
	},
	doQuery : function(values) {
		var params = this.getStore().getProxy().extraParams;
		var me = this;
		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}
		
		/*if (values.qrString != "") {
			params.qrString = values.qrString;
		} else {
			params.qrString = undefined;
		}*/
		if (values.userScreenName != "") {
			params.accountName = values.userScreenName;
		} else {
			params.accountName = undefined;
		}		
		if(values.telephone != ""){
			params.telephone = values.telephone;
		} else {
			params.telephone = undefined;
		}		
		/*me.up().down("#userScreenName").setValue();
		me.up().down("#telephone").setValue();*/
		this.getStore().loadPage(1);
		
	}
});
Ext.define('VIP.member.MemberInfo', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipmembermemberinfo' ],
	                                                                
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
				height : 130,
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
					items : [ /*{
						fieldLabel : '会员ID',
						emptyText : '请扫描会员身份二维码',
						inputType : 'password',
						name : 'qrString',
						itemId : 'qrString',
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
					}, */{
						fieldLabel : '会员昵称',
						emptyText : '会员昵称',
						name : 'userScreenName',
						itemId : 'userScreenName',
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
					}, {
						fieldLabel : '会员手机号',
						emptyText : '会员手机号',
						name : 'telephone',
						itemId : 'telephone',
						regex:/^1[3|4|5|8][0-9]{9}$/,
						regexText:'无效的手机号码',
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
					},
					{	
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
				anchor : '100% -130',
				
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
					title : '[' + data.userScreenName + '] ',
					userId : data.userId,
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
Ext.define('VIP.common.PrintWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.printwindow' ],
	layout : 'fit',
	width : 360,
	height : 480,
	url : null,
	buttonAlign : 'center',
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'panel',
			border : false,
			html : '<iframe frameborder="0" scrolling="auto" src="' + me.url + '"></iframe>',
			listeners : {
				resize : function(panel, adjWidth, adjHeight) {
					var iframe = panel.up('printwindow').iframe;
					iframe.setWidth(panel.getWidth());
					iframe.setHeight(panel.getHeight() - 27);
				},
				afterrender : function(panel) {
					var iframe = panel.getEl().select('iframe').first();
					me.iframe = iframe;
					
					iframe.dom.onload = iframe.dom.onreadystatechange = function() {
						if (!this.readyState || this.readyState == 'complete') {
							me.down('#print').enable();
							me.down('#print').focus(true, 100);
							me.down('#close').enable();
						}
					};
				}
			}
		} ];
		return items;
	},
	createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '打印',
			icon : 'images/print.png',
			scale : 'medium',
			itemId : 'print',
			disabled : true,
			handler : function(btn) {
				me.print(btn);
			}
		}, {
			text : '关闭',
			icon : 'images/cancel.png',
			scale : 'medium',
			itemId : 'close',
			disabled : true,
			handler : function(btn) {
				me.close();
			}
		} ];
		return buttons;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
	},

	print : function(btn) {
		btn.disable();
		this.iframe.dom.contentWindow.focus();
		this.iframe.dom.contentWindow.print();
		btn.enable();
	}
});
Ext.define('VIP.member.MemberDeposit', {
	extend :  Ext.form.Panel ,
	alias : [ 'widget.memberdeposit' ],
	                                                                 
	icon : 'images/deposit-16.png',
	userId : null,
	moneyBackRate :null,
	layout : 'border',
	createView : function() {
		var me = this;
		
		var labelStyle = 'font-size:11pt;margin-top:12px';
		var fieldStyle = 'font-size:14pt;background-image:none;border-width:0px 0px 1px 0px';
		
		var items = [ {
			xtype : 'panel',
			region : 'center',
			layout : {
				type : 'vbox',
				align : 'center',
				pack : 'center'
			},					
			items : [ {
				xtype : 'form',
				title : '充值信息',
				iconCls : 'icon-member-deposit',
				width : 300,
				height : 280,
				bodyPadding : 10,
				layout : {
					type : 'vbox'
				},
				fieldDefaults : {
					height: 30,
					border : false,
					labelStyle : labelStyle,
					fieldStyle : fieldStyle,
					labelAlign : 'right',
					labelWidth : 110,
					width : 340,
					hideTrigger : true,
					selectOnFocus : true
				},
				items : [ {
					xtype : 'fieldcontainer',
					fieldLabel : '充值金额',					
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [{
						xtype : 'numberfield',
						name : 'realAmount',
						itemId : 'realAmount',	
						width : 100,
						fieldStyle : fieldStyle + ';color:red',
						allowBlank : false,
						mouseWheelEnabled: false, 
						value : 0,
						minValue : 0,
						maxValue : 100000,
						negativeText : "最小值为0,最大值为100000",
						listeners : {
							change : {
								fn : function(field, key, option) {	
									if (field.getValue() == null || field.getValue() == 0 || field.getValue()=="e") {
										me.down('#rewardAmount').setValue(0);
										me.down('#realAmount').setValue(0);
									} else {
										var payable = parseFloat(field.getValue()) * (parseFloat(me.moneyBackRate)) / 100;
										me.down('#rewardAmount').setValue(payable);
									}
								},
								delay : 200
							},
							specialKey : {
								fn : function(field, key, option) {
									if (key.keyCode == 13) {
										me.down('#rewardAmount').focus(true);
									}
								},
								delay : 200
							}

						}
					}, {
						xtype : 'label',
						style : labelStyle,
						text : '元'
					}]				
				}, {
					xtype : 'fieldcontainer',
					fieldLabel : '赠送金额',					
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [{
						xtype : 'numberfield',
						name : 'rewardAmount',
						itemId : 'rewardAmount',
						width : 100,
						fieldStyle : fieldStyle + ';color:#FF9912',						
						readOnly : true,
						mouseWheelEnabled: false, 
						value : 0,						
						minValue : 0,
						maxValue : 100000,
						negativeText : "最小值为0,最大值为100000",
						listeners : {
							specialKey : {
								fn : function(field, key, option) {
									if (key.keyCode == 13) {
										me.down('#note').focus(true);
									}
								},
								delay : 200
							}
						}
					}, {
						xtype : 'label',
						style : labelStyle,
						text : '元'
					}]				
				}, {
					xtype : 'textareafield',
					name : 'note',
					itemId : 'note',					
					height : 80,
					width : 235,		
					maxLength:100,
					maxLengthText:'不可超过100字符',
					labelWidth : 40,
					hideEmptyLabel : false,
					fieldStyle : 'font-size:11pt',
					emptyText : '备注',					
					listeners : {
						specialKey : function(field, key) {
							if (key.keyCode == 13) {
								me.specialKeyListener(field, key);
							}
						},
						change : function(field, key){
							var length = field.getValue().length;
							var len = 100-length;
							if(len>0&&len!=100){
								me.down('#lengthInfo').setText("还可输入"+len+"个字符");
							}else if(len==0||len==100){
								me.down('#lengthInfo').setText("");
							}else{
								me.down('#lengthInfo').setText("已经超出"+(-len)+"个字符");
							}
						}
						
					}				
				},{
					xtype: 'label',
					margin:'0 100',
					style : 'color:red',
					itemId : 'lengthInfo',
					text:''
				}, {
					xtype : 'container',
					border : false,
					width : 280,
					margin : '15 0 0 0',
					layout : {
						type : 'vbox',
						align : 'center',
						pack : 'center'
					},
					items : [ {
						xtype : 'button',
						itemId : 'save',
						text : '确定',
						icon : 'images/update.png',
						scale : 'large',
						width : 190,
						height : 60,
						padding : 10,
						cls : 'big-button',
						handler : function(btn) {
							me.depositSave();
						}
					}]
				} ]
			} ]
		}, {
			xtype : 'detailmain',
			title : '会员信息',
			icon : 'images/basic_info.png',
			region : 'south',
			collapsed : false,
			collapsible: true,
			titleCollapse : true,
			split: true,
			height : 400,
			userId : this.userId
		}];

		return items;
	},
	load : function(userId) {
		var me = this;
		if(userId){
			this.userId = userId;
		}
		
		this.removeAll(true);
		DepositAction.canDeposit(function(result){
			if(result.success){
				MemberAction.getMemberById(me.userId, function(result) {
					var data = result.data;
					me.moneyBackRate = data.moneyBackRate;
					me.add(me.createView());
					
					me.down('#realAmount').focus(true, 100);
				});
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	memberSearch : function() {
		var me = this;
		Ext.create('VIP.search.SearchMember', {
			onRecordSelect : {
				fn : function(userId) {
					me.load(userId);					
				}
			}
		}).show();
			
		
	},
	initComponent : function() {
		this.callParent(arguments);
		this.memberSearch();
	},

	depositSave : function() {
		var form = this.getForm();
		var me = this;
		if (form.isValid()) {
			var values = this.getValues();
			if (values.realAmount == 0) {
				Ext.Msg.error("请输入充值金额", function() {
					me.down('#realAmount').focus(true, 100);
				});
			} else {
				Ext.Msg.confirm('确认', '确认要存入 [' + values['realAmount'] + '] 元 并 赠送 ['+values['rewardAmount']+']元 吗?', function(r) {
					if (r == 'yes') {
						DepositAction.add(me.userId,values, function(result) {
							if (result.success) {
								Ext.Msg.info('充值成功.', function() {
									me.doPrint(result.data._id);
									me.close();
								});
							} else {
								Ext.Msg.error(result.message);
							}
						});
					}
				});
			}
		}
	},
	
	doPrint : function(id) {
		var me = this;
		Ext.create('VIP.common.PrintWindow', {
			title : '打印预览',
			modal : true,
			frame : true,
			url : 'print/deposit.jsp?id=' + id
		}).show();
	},	
	specialKeyListener : function(field, key) {
		var fields = this.getForm().getFields().items;
		var index = fields.indexOf(field);
		if (key.keyCode == 13) {
			index++;
			var next = fields[index];

			while (next.readOnly || next.isDisabled() || !next.focus) {
				index++;
				next = fields[index];
			}

			next.focus(true, 100);
		}
	}
});
Ext.define('Option', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'text',
		type : 'string'
	}, {
		name : 'value',
		type : 'string'
	} ]
});

Ext.define('VIP.widget.field.ComboBox', {
	extend :  Ext.form.field.ComboBox ,
	alias : [ 'widget.vcombo' ],
	forceSelection : true,
	editable : false,
	queryMode : 'local',
	displayField : 'text',
	valueField : 'value',
	triggerAction : 'all',
	
	initComponent : function() {
		var me = this;
		
		this.addEvents(	          
			'optionsready'
		);
		if (me.options) {
			me.store = Ext.create('Ext.data.Store', {
				fields : [ 'text', 'value' ],
				data : me.options
			});
			
			me.fireEvent('optionsready', me);
		} else {
			me.store = Ext.create('Ext.data.Store', {
				model : 'Option',
				proxy : me.getProxy(),
				autoLoad : true
			});
			
			me.store.on('load', function(){
				if(me.originalValue != undefined && me.originalValue != ''){
					me.setValue(me.originalValue);
				} else if (me.allowBlank === false && me.store.getTotalCount() > 0){
//					me.setValue(me.store.first());
				}
				me.fireEvent('optionsready', me);
			}, me, {
				delay: 200
			});
			
			if(!me.isDisabled()){
				me.store.on('beforeload', function(){
					this.setDisabled(true);
				}, me);
				
				me.store.on('load', function(){
					this.setDisabled(false);
				}, me);
			}
		}		
		
		this.callParent();
	},	

	refresh : function() {
		if (!this.store.isLoading()) {
			this.store.setProxy(this.getProxy());
			this.store.load();
		}
	},
		
	setOptions : function(options){
		this.store.loadData(options, false);
	},
	
	getText : function(){
		var index = this.store.findExact('value', this.getValue()); 
        if (index != -1){
            var record = this.store.getAt(index).data; 
            return record.text; 
        }
	}
});
Ext.define('VIP.widget.field.CKEditor', {
    extend: Ext.form.field.TextArea ,
    alias: ['widget.ckeditorfield'],    
    requires: [],    
    ckfinderOpts : {    				
    	filebrowserBrowseUrl : contextPath + 'ckfinder/ckfinder.html',
    	filebrowserImageBrowseUrl : contextPath + 'ckfinder/ckfinder.html?type=Images',
    	filebrowserFlashBrowseUrl : contextPath + 'ckfinder/ckfinder.html?type=Flash',
    	filebrowserUploadUrl : contextPath + 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Files',
    	filebrowserImageUploadUrl : contextPath + 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Images',
    	filebrowserFlashUploadUrl : contextPath + 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Flash',
    	filebrowserWindowWidth : '720',
     	filebrowserWindowHeight : '560'
    },
    listeners : {
    	afterrender : function(textarea){
    		if(typeof CKEDITOR != 'undefined'){
    			CKEDITOR.config.height = textarea.getHeight();    			
    			var domId = textarea.inputEl.dom.id;
    			CKEDITOR.replace(domId, this.ckfinderOpts);
    			textarea.ckeditor = CKEDITOR.instances[domId];    			
    		}			 
    	},
    	destroy: function(textarea){
    		textarea.ckeditor.destroy();
    	}
    }
});
Ext.define('VIP.widget.form.Panel', {
	extend :  Ext.form.Panel ,
	alias : [ 'widget.vipform' ],
	                                                                        

	initComponent : function() {
		this.callParent(arguments);
	},

	bindEnterKeyEvent : function() {
		var specialKeyListener = function(field, key) {
			var fields = this.getForm().getFields().items;
			var index = fields.indexOf(field);
			if (key.keyCode == 13) {
				index++;
				var next = fields[index];

				while (next.readOnly || next.isDisabled() || !next.focus) {
					index++;
					next = fields[index];
				}

				next.focus(true, 100);
			}
		};

		var fields = this.getForm().getFields().items;

		for ( var i = 0; i < fields.length; i++) {
			var f = fields[i];
			if (f.readOnly || f.isDisabled() || f.xtype == 'radio' || f.xtype == 'textarea') {
				continue;
			} else {
				f.on('specialKey', specialKeyListener, this);
			}
		}
	}
});
Ext.define('VIP.shopping.QuickConsume', {
	extend :  VIP.widget.form.Panel ,
	alias : [ 'widget.quickconsume' ],
	                                                                                                                  
	  
	userId : null,
	discountRate : null,
	currentDeposit : null,
	hasPassword : null,
	icon : 'images/consume-16.png',
	userPassword:null,
	layout : 'border',
	type:false,
	createView : function() {
		var me = this;
		
		var labelStyle = 'font-size:11pt;margin-top:12px';
		var fieldStyle = 'font-size:14pt;background-image:none;border-width:0px 0px 1px 0px';
		
		var items = [ {
			xtype : 'panel',
			region : 'center',
			layout : {
				type : 'vbox',
				align : 'center',
				pack : 'center'
			},					
			items : [ {
				xtype : 'form',
				title : '订单信息',
				icon : 'images/consume-16.png',
				width : 515,
				height : 370,
				bodyPadding : 10,
				layout : {
					type : 'table',
					columns : 2
				},
				fieldDefaults : {
					height: 30,
					border : false,
					labelStyle : labelStyle,
					fieldStyle : fieldStyle,
					labelAlign : 'right',
					width : 240,
					hideTrigger : true,
					selectOnFocus : true
				},
				items : [ {
					xtype : 'fieldcontainer',
					fieldLabel : '消费金额',
					width : 240,
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [{
						xtype : 'numberfield',
						allowBlank : false,
						mouseWheelEnabled: false, 
						hideTrigger : true,
						fieldStyle : fieldStyle + ';color:red',
						width : 100,						
						value : 0,
						minValue : 0,
						maxValue : 100000,
						negativeText : "最小值为0,最大值为100000",
						itemId : 'consumptionAmount',
						name : 'consumptionAmount',
						listeners : {
							change : {
								fn : function(field, key, option) {
									var value = parseFloat(field.getValue());
									if(value!=""&&value!=null&&value!=0){
										var payable = value*(me.numSub(100, parseFloat(me.discountRate)))/100;
										me.down("#accountPayable").setValue(payable);
										me.down("#discount").setValue(me.numSub(value, payable));
										me.down("#cashPayment").clearInvalid();
										me.down("#cashPayment").setMinValue(0);
										me.down("#change").setValue(0);
									}else{
										me.down("#accountPayable").setValue(0);
										me.down("#discount").setValue(0);
										me.down("#memberPayment").setValue(0);
										me.down("#cashPayment").setValue(0);
										me.down("#change").setValue(0);
									}
								},
								delay : 200
							}
						}
					}, {
						xtype : 'label',
						style : labelStyle,
						text : '元'
					}]
				}, {
					xtype : 'textfield',
					fieldLabel : '内容',
					allowBlank : false,
					maxLength:10,
					maxLengthText:'不可超过10字符',
					name : 'consumeSubject',
					itemId : 'consumeSubject',
					value : '消费'
				}, {					 
					xtype : 'fieldcontainer',
					fieldLabel : '折扣',					
					width : 240,
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [{
						xtype : 'numberfield',
						fieldStyle : fieldStyle + ';color:green',
						name : 'discount',
						mouseWheelEnabled: false, 
						itemId : 'discount',
						readOnly : true,
						width : 100,						
						value : 0,
						minValue : 0,
						negativeText : "最小值为0,最大值为100000"
					}, {
						xtype : 'label', 
						style : labelStyle,
						text : '元'
					}]
				}, {
					xtype : 'textarea',
					hideEmptyLabel : false,
					labelWidth : 30,
					rowspan : 6,
					height : 205,
					emptyText : '备注',
					maxLength:100,
					maxLengthText:'不可超过100字符',
					fieldStyle : 'font-size:11pt',
					itemId : 'notes',
					name : 'notes',
					listeners : {
						specialKey : function(field, key) {
							if (key.keyCode == 13) {
								me.specialKeyListener(field, key);
							}
						},
						change : function(field, key){
							var length = field.getValue().length;
							var len = me.numSub(100, length);
							if(len>0&&len!=100){
								me.down('#lengthInfo').setText("还可输入"+len+"个字符");
							}else if(len==0||len==100){
								me.down('#lengthInfo').setText("");
							}else{
								me.down('#lengthInfo').setText("已经超出"+(-len)+"个字符");
							}
						}
						
					}				
				},{
					xtype : 'fieldcontainer',
					fieldLabel : '应付金额',
					width : 240,
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [{
						xtype : 'numberfield',
						fieldStyle : fieldStyle + ';color:red',
						width : 100,
						allowBlank : false,
						mouseWheelEnabled: false, 
						readOnly : true,
						value : 0,
						itemId : 'accountPayable',
						name : 'accountPayable',
						minValue : 0,
						negativeText : "最小值为0,最大值为100000",
						listeners : {
							change : {
								fn : function(field, key, option) {
									var value = parseFloat(field.getValue());
									me.down("#memberPayment").suspendEvents();
									me.down("#cashPayment").suspendEvents();
									me.down("#change").suspendEvents();
									if(me.type==false||me.type==null||me.type==null){
										me.down("#cashPayment").setValue(value);
										me.down("#cashPayment").clearInvalid();
										me.down("#cashPayment").setMinValue(value);
										me.down("#change").setValue(0);
									}else{
										var deposit = parseFloat(me.currentDeposit);
										if(value>deposit){
											me.down("#memberPayment").setValue(deposit);
											me.down("#cashPayment").setValue(me.numSub(value, deposit));
											me.down("#cashPayment").clearInvalid();
											me.down("#memberPayment").setMaxValue(deposit);
											me.down("#cashPayment").setMinValue(me.numSub(value, deposit));
										}else{
											me.down("#memberPayment").setValue(value);
											me.down("#cashPayment").setValue(0);
											me.down("#memberPayment").setMaxValue(deposit);
										}
									}
									me.down("#memberPayment").resumeEvents();
									me.down("#cashPayment").resumeEvents();
									me.down("#change").resumeEvents();
								},
								delay : 200
							}
						}
					}, {
						xtype : 'label',
						style : labelStyle,
						text : '元'
					}]					
				}, {
					xtype : 'fieldcontainer',
					fieldLabel : '卡内支付',
					width : 240,
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [{
						xtype : 'numberfield',						
						itemId : 'memberPayment',
						name : 'memberPayment',
						width : 100,
						allowBlank : false,
						mouseWheelEnabled: false, 
						readOnly : true,
						value : 0,
						minValue : 0,
						negativeText : "最小值为0,最大值为100000",
						listeners : {
							change : {
								fn : function(field, key, option) {
									var value = parseFloat(field.getValue());
									if(me.type==true){
										var payable = parseFloat(me.down("#accountPayable").getValue());
										var payment = parseFloat(me.down("#cashPayment").getValue());
										me.down("#cashPayment").suspendEvents();
										me.down("#change").suspendEvents();
										if(payable>me.numAdd(value,payment)){
											me.down("#cashPayment").clearInvalid();
											me.down("#cashPayment").setValue(me.numSub(payable, value));
											me.down("#cashPayment").setMinValue(me.numSub(payable,value));
										}else if(payable==me.numAdd(value,payment)){
											me.down("#cashPayment").clearInvalid();
											me.down("#cashPayment").setValue(payment);
											me.down("#cashPayment").setMinValue(payment);
											me.down("#change").setValue(0);
										}else{
											if(payable<value){
												me.down("#memberPayment").markInvalid("卡支付金额超出消费金额");
												me.down("#cashPayment").setValue(0);
												me.down("#cashPayment").clearInvalid();
												me.down("#cashPayment").setMinValue(0);
												me.down("#change").setValue(0);
											}else{
												
												me.down("#cashPayment").setValue(me.numSub(payable,value));
												me.down("#change").setValue(0);
												me.down("#cashPayment").clearInvalid();
												me.down("#cashPayment").setMinValue(me.numSub(payable,value));
											}
										}
										
										me.down("#cashPayment").resumeEvents();
										me.down("#change").resumeEvents();
									}
								},
								delay : 200
							}
							/*blur : function(field, key, option) {
								me.changeAmount(field);
							},
							specialKey : function(field, key) {
								if (key.keyCode == 13) {
									me.changeAmount(field);
								}
							}*/
						}
					}, {
						xtype : 'label',
						style : labelStyle,
						text : '元'
					}]
				}, {
					xtype : 'fieldcontainer',
					fieldLabel : '现金支付',					
					width : 240,
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [{
						xtype : 'numberfield',						
						itemId : 'cashPayment',
						name : 'cashPayment',
						mouseWheelEnabled: false, 
						width : 100,
						value : 0,
						minValue : 0,
						maxValue : 100000,
						negativeText : "最小值为0,最大值为100000",
						allowBlank : false,
						listeners : {				
							change : {
								fn : function(field, key, option) {
									var value = parseFloat(field.getValue());
									if(isNaN(value)){
										value=0;
									}
									var payable = parseFloat(me.down("#accountPayable").getValue());
									if(me.type==false||me.type==null){
										if(value>=payable){
											me.down("#change").setValue(me.numSub(value, payable));
											
										}else if(value<payable){
											me.down("#change").setValue(0);
											me.down("#cashPayment").markInvalid("现金支付金额小于应付金额");
										}
									}else{
										if(me.type==true){
											var payable = parseFloat(me.down("#accountPayable").getValue());
											var payment = parseFloat(me.down("#memberPayment").getValue());
											var deposit = parseFloat(me.currentDeposit);
											me.down("#memberPayment").suspendEvents();
											me.down("#change").suspendEvents();
											if(payable>me.numAdd(value, payment)){
												var val = me.numSub(payable, value);
												if(deposit>=val){
													/*me.down("#memberPayment").setValue(val);*/
												}else{
													me.down("#cashPayment").markInvalid("现金支付金额小于应付金额");
												}
												
											}else if(payable==me.numAdd(value,payment)){
												me.down("#change").setValue(0);
											}else{
												if(value==0){
													me.down("#memberPayment").markInvalid("卡支付金额超出消费金额");
												}else{
													me.down("#change").setValue(me.numSub(me.numAdd(value, payment),payable));
												}
												
											}
											
											me.down("#memberPayment").resumeEvents();
											me.down("#change").resumeEvents();
										}
									}
									me.down('#cashPayment').setValue(value);
									
								},
								delay : 200
							},
							specialKey : {
								fn : function(field, key, option) {
									if (key.keyCode == 13) {
										me.down('#notes').focus(true);
									}
								},
								delay : 200
							}
							/*specialKey : function(field, key) {
								if (key.keyCode == 13) {
									me.changeAmount(field);
								}
							},
							blur : function(field, key, option) {
								me.changeAmount(field);
							}*/
						}
					}, {
						xtype : 'label',
						style : labelStyle,
						text : '元'
					}]					
				}, {
					xtype : 'fieldcontainer',
					fieldLabel : '找余金额',					
					width : 240,
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [{
						xtype : 'textfield',					
						itemId : 'change',
						name : 'change',
						fieldStyle : fieldStyle + ';color:green',
						width : 100,							
						readOnly : true,					
						value : 0
					}, {
						xtype : 'label',
						style : labelStyle,
						text : '元'
					}]					
				}, {
					xtype : 'fieldcontainer',
					fieldLabel : '获得积分',					
					width : 240,
					layout : {
						type : 'hbox',
						algin : 'center'
					},
					items : [{
						xtype : 'textfield',					
						itemId : 'point',
						name : 'point',
						fieldStyle : fieldStyle + ';color:green',
						width : 100,							
						readOnly : true,					
						value : 0
					}, {
						xtype : 'label',
						style : labelStyle,
						text : '分'
					}]	
				}, {
					xtype : 'container',
					border : false,	
					colspan : 2,
					layout : {
						type : 'vbox',
						align : 'center',
						pack : 'center'
					},
					items : [ {
						xtype: 'label',
						margin:'0',
						height:20,
						padding: '0 0 0 250',
						style : 'color:red',
						colspan : 2,
						itemId : 'lengthInfo',
						text:' '
					},{
						xtype : 'button',
						itemId : 'save',
						text : '确定',
						icon : 'images/update.png',
						scale : 'large',
						width : 490,
						height : 50,
						padding : 10,						
						cls : 'big-button',
						handler : function(btn) {
							me.onConsume();
						}
					}]
				} ]
			} ]
		}, {
			xtype : 'detailmain',
			title : '会员信息',
			region : 'south',
			icon : 'images/basic_info.png',
			collapsed : false,
			collapsible: true,
			titleCollapse : true,
			split: true,
			height : 400,
			userId : this.userId
		} ];

		return items;
	},

	onConsume : function() {
		var form = this.getForm();
		var me = this;
		if (form.isValid()) {
			if (me.down("#accountPayable").getValue() > 0) {
				var userId = me.userId;
				var qrString = me.qrString;
				var accountPayable = me.down("#accountPayable").getValue();
				var consumeSubject = me.down("#consumeSubject").getValue();
				var memberPayment = me.down("#memberPayment").getValue();
				var cashPayment = me.down("#cashPayment").getValue();
				var discount = me.down("#discount").getValue();
				var consumptionAmount = me.down("#consumptionAmount").getValue();
				var notes = me.down("#notes").getValue();
	
				var params = {
					userId : userId,
					accountPayable : accountPayable + '',
					consumeSubject : consumeSubject,
					discount : discount+'',
					cardPayment : memberPayment + '',
					cashPayment : cashPayment + '',
					consumptionAmount : consumptionAmount + '',
					notes : notes
				};
				var change = me.down("#change").getValue();
				if(change>=0){
					Ext.Msg.confirm('确认', '确认 [' + me.userAccountName + '] 消费 [' + accountPayable + '] 元 卡支付 [' + memberPayment + '] 元 现金支付 ['
							+ cashPayment + ']', function(r) {
						if (r == 'yes') {
							if(me.type){
								ConsumeAction.consumeFromDeposit(qrString,params,function(result){
									if(result.success){
										Ext.Msg.info('消费成功.', function() {
											me.doPrint(result.data._id);
											me.close();
										});
									}else{
										Ext.Msg.error(result.message);	
									}
								});
							}else{
								ConsumeAction.consume(userId,params,function(result){
									if(result.success){
										Ext.Msg.info('消费成功.', function() {
											me.doPrint(result.data._id);
											me.close();
										});
									}else{
										Ext.Msg.error(result.message);	
									}
								});
							}
								/*ConsumeAction.add(userId,params, function(result) {
									if(result.success){
										Ext.Msg.info('消费成功.', function() {
											me.doPrint(result.data.id);
											me.load(me.userId);
											me.close();
										});
									}else{
										Ext.Msg.error("消费失败");	
									}
								});*/

						}
					});
				}else{
					Ext.Msg.error("输入错误");
				}
			} else {
				Ext.Msg.error("消费金额不能为  0", function(){
					me.down('#consumptionAmount').focus(true, 100);
				}, me);
			}
		}
		
	},
	load : function(userId,type,qrString) {
		var me = this;
		if (userId) {
			this.userId = userId;
		}
		me.removeAll(true);
		me.type=type;
		me.qrString = qrString;
		ConsumeAction.canConsume(function(result){
			if(result.success){
				MemberAction.getMemberById(me.userId, function(result) {
					var data = result.data;
					me.discountRate = data.discountRate;
					me.currentDeposit = data.currentDeposit;
					me.hasPassword = data.hasPassword;
					me.userAccountName=data.userAccountName;
					me.add(me.createView());
					me.addListeners();
					
					me.down('#consumptionAmount').focus(true, 100);
					if(type==true){
						me.down('#memberPayment').setReadOnly(false);
					}
				});	
			}else{
				Ext.Msg.error(result.message);
			}
			
		});
			
		
	},
	memberSearch : function() {
		var me = this;
		Ext.create('VIP.search.SearchMember', {
			onRecordSelect : {
				fn : function(userId,type,qrString) {
					me.load(userId,type,qrString);
				}
			}
		}).show();
		
	},
	initComponent : function() {
		this.callParent(arguments);
		this.memberSearch();
	},

	specialKeyListener : function(field, key) {
		var fields = this.getForm().getFields().items;
		var index = fields.indexOf(field);
		if (key.keyCode == 13) {
			index++;
			var next = fields[index];

			while (next.readOnly || next.isDisabled() || !next.focus || next.xtype == 'textarea' || next.xtype == 'displayfield') {
				index++;
				next = fields[index];
			}

			next.focus(true, 100);
		}
	},
	addListeners : function() {
		var fields = this.getForm().getFields().items;
		for ( var i = 0; i < fields.length; i++) {
			var f = fields[i];
			if (f.xtype == 'radio' || f.xtype == 'textarea') {
				continue;
			} else {
				f.on('specialKey', "specialKeyListener", this);
			}
		}
	},
	doPrint : function(id) {
		var me = this;
		Ext.create('VIP.common.PrintWindow', {
			title : '打印预览',
			modal : true,
			frame : true,
			url : 'print/consume.jsp?id=' + id
		}).show();
	},
	numAdd : function (num1, num2) {
	    var baseNum, baseNum1, baseNum2;
	    try {
	        baseNum1 = num1.toString().split(".")[1].length;
	    } catch (e) {
	        baseNum1 = 0;
	    }
	    try {
	        baseNum2 = num2.toString().split(".")[1].length;
	    } catch (e) {
	        baseNum2 = 0;
	    }
	    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	    return (num1 * baseNum + num2 * baseNum) / baseNum;	
	},
	numSub : function(num1, num2) {
	    var baseNum, baseNum1, baseNum2;
	    var precision;// 精度
	    try {
	        baseNum1 = num1.toString().split(".")[1].length;
	    } catch (e) {
	        baseNum1 = 0;
	    }
	    try {
	        baseNum2 = num2.toString().split(".")[1].length;
	    } catch (e) {
	        baseNum2 = 0;
	    }
	    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
	    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
	}

});
Ext.define('VIP.member.IntegralExchange', {
	extend :  Ext.form.Panel ,
	alias : [ 'widget.integralexchange' ],
	                                                                 
	icon : 'images/Coin256.png',
	userId : null,
	moneyBackRate :null,
	layout : 'border',
	createView : function() {
		var me = this;
		var labelStyle = 'font-size:11pt;margin-top:12px';
		var fieldStyle = 'font-size:14pt;background-image:none;border-width:0px 0px 1px 0px';
		var items = [{
			xtype : 'panel',
 			region : 'center',
			layout : {
				type : 'vbox',
				align : 'center',
				pack : 'center'
			},					
			items : [ {
				xtype : 'tabpanel',
		        width: 300,
		        defaults :{
		            bodyPadding: 10
		        },
		        items: [{
		            title: '积分兑换金额',
		            xtype: 'form',
					width : 300,
					height : 210,
					bodyPadding : 10,
					layout : {
						type : 'vbox'
					},
					fieldDefaults : {
						height: 30,
						border : false,
						labelStyle : labelStyle,
						fieldStyle : fieldStyle,
						labelAlign : 'right',
						labelWidth : 110,
						width : 340,
						hideTrigger : true,
						selectOnFocus : true
					},
					items : [ {
						xtype : 'fieldcontainer',
						fieldLabel : '消耗积分',					
						layout : {
							type : 'hbox',
							algin : 'center'
						},
						items : [{
							xtype : 'numberfield',
							name : 'realAmount',
							itemId : 'realAmount',	
							width : 100,
							fieldStyle : fieldStyle + ';color:red',
							allowBlank : false,
							mouseWheelEnabled: false, 
							value : 0,
							minValue : 0,
							maxValue : 100000,
							negativeText : "最小值为0,最大值为100000",
							listeners : {
								change : {
									fn : function(field, key, option) {	
										if (field.getValue() == null || field.getValue() == 0 || field.getValue()=="e") {
											me.down('#rewardAmount').setValue(0);
											me.down('#realAmount').setValue(0);
										} else {
											var payable = parseFloat(field.getValue()) * (parseFloat(me.moneyBackRate)) / 100;
											me.down('#rewardAmount').setValue(payable);
										}
									},
									delay : 200
								},
								specialKey : {
									fn : function(field, key, option) {
										if (key.keyCode == 13) {
											me.down('#rewardAmount').focus(true);
										}
									},
									delay : 200
								}

							}
						}, {
							xtype : 'label',
							style : labelStyle,
							text : '分'
						}]				
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '兑换金额',					
						layout : {
							type : 'hbox',
							algin : 'center'
						},
						items : [{
							xtype : 'numberfield',
							name : 'rewardAmount',
							itemId : 'rewardAmount',
							width : 100,
							fieldStyle : fieldStyle + ';color:#FF9912',						
							readOnly : true,
							mouseWheelEnabled: false, 
							value : 0,						
							minValue : 0,
							maxValue : 100000,
							negativeText : "最小值为0,最大值为100000"
						}, {
							xtype : 'label',
							style : labelStyle,
							text : '元'
						}]				
					},{
						xtype : 'container',
						border : false,
						width : 280,
						margin : '15 0 0 0',
						layout : {
							type : 'vbox',
							align : 'center',
							pack : 'center'
						},
						items : [ {
							xtype : 'button',
							itemId : 'save',
							text : '确定',
							icon : 'images/update.png',
							scale : 'large',
							width : 190,
							height : 60,
							padding : 10,
							cls : 'big-button',
							handler : function(btn) {
								me.exchangeSave();
							}
						}]
					} ]
		        },{
		            title: '积分兑换商品',
		            xtype: 'form',
					width : 300,
					height : 210,
					bodyPadding : 10,
					layout : {
						type : 'vbox'
					},
					fieldDefaults : {
						height: 30,
						border : false,
						labelStyle : labelStyle,
						fieldStyle : fieldStyle,
						labelAlign : 'right',
						labelWidth : 110,
						width : 340,
						hideTrigger : true,
						selectOnFocus : true
					},
					items : [ {
						xtype : 'fieldcontainer',
						fieldLabel : '消耗积分',					
						layout : {
							type : 'hbox',
							algin : 'center'
						},
						items : [{
							xtype : 'numberfield',
							name : 'realAmount',
							itemId : 'realAmount',	
							width : 100,
							fieldStyle : fieldStyle + ';color:red',
							allowBlank : false,
							mouseWheelEnabled: false, 
							value : 0,
							minValue : 0,
							maxValue : 100000,
							negativeText : "最小值为0,最大值为100000",
							listeners : {
								change : {
									fn : function(field, key, option) {	
										if (field.getValue() == null || field.getValue() == 0 || field.getValue()=="e") {
											me.down('#rewardAmount').setValue(0);
											me.down('#realAmount').setValue(0);
										} else {
											var payable = parseFloat(field.getValue()) * (parseFloat(me.moneyBackRate)) / 100;
											me.down('#rewardAmount').setValue(payable);
										}
									},
									delay : 200
								},
								specialKey : {
									fn : function(field, key, option) {
										if (key.keyCode == 13) {
											me.down('#rewardAmount').focus(true);
										}
									},
									delay : 200
								}

							}
						}, {
							xtype : 'label',
							style : labelStyle,
							text : '分'
						}]				
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '兑换商品',					
						layout : {
							type : 'hbox',
							algin : 'center'
						},
						items : [{
							xtype : 'textfield',
							name : 'rewardAmount',
							itemId : 'rewardAmount',
							width : 100,
							fieldStyle : fieldStyle + ';color:#FF9912'	
						}]				
					},{
						xtype : 'container',
						border : false,
						width : 280,
						margin : '15 0 0 0',
						layout : {
							type : 'vbox',
							align : 'center',
							pack : 'center'
						},
						items : [ {
							xtype : 'button',
							itemId : 'save',
							text : '确定',
							icon : 'images/update.png',
							scale : 'large',
							width : 190,
							height : 60,
							padding : 10,
							cls : 'big-button',
							handler : function(btn) {
								me.exchangeSave();
							}
						}]
					} ]
		        }]
			}]
		}, {
			xtype : 'detailmain',
			title : '会员信息',
			icon : 'images/basic_info.png',
			region : 'south',
			collapsed : false,
			collapsible: true,
			titleCollapse : true,
			split: true,
			height : 400,
			userId : this.userId
		}];
		return items;
	},
	load : function(userId) {
		var me = this;
		if(userId){
			this.userId = userId;
		}
		
		this.removeAll(true);
//		(function(result){
//			if(result.success){
//				MemberAction.getMemberById(me.userId, function(result) {
//					var data = result.data;
//					me.moneyBackRate = data.moneyBackRate;
					me.add(me.createView());
					
//					me.down('#realAmount').focus(true, 100);
//				});
//			}else{
//				Ext.Msg.error(result.message);
//			}
//		});
		
	},
	memberSearch : function() {
		var me = this;
		Ext.create('VIP.search.SearchMember', {
			onRecordSelect : {
				fn : function(userId) {
					me.load(userId);					
				}
			}
		}).show();
			
		
	},
	initComponent : function() {
		this.callParent(arguments);
		this.memberSearch();
	},

/*	exchangeSave : function() {
		var form = this.getForm();
		var me = this;
		if (form.isValid()) {
			var values = this.getValues();
			if (values.realAmount == 0) {
				Ext.Msg.error("请输入充值金额", function() {
					me.down('#realAmount').focus(true, 100);
				});
			} else {
				Ext.Msg.confirm('确认', '确认要存入 [' + values['realAmount'] + '] 元 并 赠送 ['+values['rewardAmount']+']元 吗?', function(r) {
					if (r == 'yes') {
						DepositAction.add(me.userId,values, function(result) {
							if (result.success) {
								Ext.Msg.info('充值成功.', function() {
									me.doPrint(result.data._id);
									me.close();
								});
							} else {
								Ext.Msg.error(result.message);
							}
						});
					}
				});
			}
		}
	},
	
	doPrint : function(id) {
		var me = this;
		Ext.create('VIP.common.PrintWindow', {
			title : '打印预览',
			modal : true,
			frame : true,
			url : 'print/deposit.jsp?id=' + id
		}).show();
	},	
	specialKeyListener : function(field, key) {
		var fields = this.getForm().getFields().items;
		var index = fields.indexOf(field);
		if (key.keyCode == 13) {
			index++;
			var next = fields[index];

			while (next.readOnly || next.isDisabled() || !next.focus) {
				index++;
				next = fields[index];
			}

			next.focus(true, 100);
		}
	}*/
});
Ext.define('VIP.west.MemberManage', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipwestmembermanage' ],
	                                                                
			                                                                                       
	title : '会员管理',
	iconCls : 'west-membermanage',
	defaults : {
		xtype : 'link'
/*		icon : 'images/member_management.png'*/
	},
	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	createItems : function() {
		var me = this;
		var handler = function(link) {
			me.handleAction.call(me, link.text,link.itemId);
		};
		var items = [{
			text : '会员档案',
			icon : 'images/member_info-16.png',
			itemId : 'member',
			handler : handler
		}, {
			text : '充值',
			icon : 'images/deposit-16.png',
			itemId : 'deposit',
			handler : handler
		},{
			text : '取款',
			icon : 'images/withdraw.png',
			itemId : 'withdraw',
			handler : handler
		}, {
			text : '消费',
			icon : 'images/consume-16.png',
			itemId : 'consume',
			handler : handler
		},{
			text : '积分兑换',
			icon : 'images/Coin256.png',
			itemId : 'integral',
			handler : handler
			
		} ];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},

	handleAction : function(action,itemId) {
		var me = this;
		vip.viewport.main.removeAll();
		me.up().changeLink(itemId);
		if (action == '会员档案') {
			
			MemberAction.canList(function(result){
				if(result.success){
					vip.viewport.main.add({
						xtype : 'vipmembermemberinfo',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});		
		} else if (action == '充值') {
			
			MemberAction.canList(function(result){
				if(result.success){
					vip.viewport.main.add({
						xtype : 'memberdeposit',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});		
		} else if (action == '取款') {
			
			MemberAction.canList(function(result){
				if(result.success){
					vip.viewport.main.add({
						xtype : 'memberwithdraw',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});			
		}else if(action == '消费'){
			
			MemberAction.canList(function(result){
				if(result.success){
					vip.viewport.main.add({
						xtype : 'quickconsume',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});		
			
		}else if(action == '积分兑换'){
			MemberAction.canList(function(result){
				if(result.success){
					vip.viewport.main.add({
						xtype : 'integralexchange',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});		
		}
	}
});
Ext.define('VIP.west.ShoppingManage', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipwestshoppingmanage' ],
	                                       
	title : '消费管理',
	iconCls: 'west-shoppingmanage',
	defaults : {
		xtype : 'link'
	},
	layout : {
		type : 'vbox',
		align: 'stretch'
	},
	
	createItems : function(){
		var me = this;
		var handler = function(link){
			me.handleAction.call(me, link.text);
		};
		var items = [{
			text : '消费',
			handler : handler
		}];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},
	
	handleAction : function(action){
		if (action == '消费') {
			vip.viewport.main.setContent({
				xtype : 'quickconsume'
			});
		}
	}
});
Ext.define('VIP.reports.model.DepositHistory', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'userId',
		type : 'string'
	}, {
		name : 'userScreenName',
		type : 'string'
	}, {
		name : 'userName',
		type : 'string'
	}, {
		name : 'operatorName',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'orderNumber',
		type : 'string'
	}, {
		name : 'realAmount',
		type : 'string'
	}, {
		name : 'rewardAmount',
		type : 'string'
	}, {
		name : 'time',
		type : 'string'
	}, {
		name : 'currentDeposit',
		type : 'string'
	}, {
		name : 'notes',
		type : 'string'
	} , {
		name : 'shopState',
		type : 'string'
	}]
});
Ext.define('VIP.reports.DepositGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.depositgrid' ],
	                                                  
	icon : 'images/deposit_list.png',
	
	userId : null,
	createStore : function() {
		var store = Ext.create('VIP.reports.store.DepositHistory', {
			autoLoad : this.autoLoad != false
		});
		var params = store.getProxy().extraParams;
		if (!params) {
			params = {};
			store.getProxy().extraParams = params;
		}
		
		if (this.userId != null) {			
			params.userId = this.userId;
		}
		return store;
	},

	createDockedItems : function(store) {
		var me = this;
		var topBars = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',
				hidden : !!this.userId,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '会员号',
					emptyText : '请扫描会员身份二维码',
					labelWidth : 40,
					width : 250,
					margin : '0 5 0 5',
					inputType : 'password',
					itemId : 'qrString',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '会员昵称',
					emptyText : '会员昵称',
					labelWidth : 60,
					width : 180,
					margin : '0 5 0 5',
					itemId : 'userScreenName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}/*, {
					xtype : 'textfield',
					fieldLabel : '会员姓名',
					emptyText : '会员姓名',
					labelWidth : 60,
					width : 180,
					margin : '0 5 0 5',
					itemId : 'userName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}*/]
			}, {
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					xtype : 'datefield',
					itemId : 'start_date',
					vtype : 'daterange',
					fieldLabel : '充值时间',
					emptyText : '开始时间',
					labelWidth : 60,
					maxValue : new Date(),
					endDateField : 'end_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'end_date',
					vtype : 'daterange',
					emptyText : '结束时间',
					maxValue : new Date(),
					startDateField : 'start_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '单号',
					labelWidth : 30,
					width : 220,
					emptyText : '请扫描或输入充值单号二维码',
					itemId : 'orderNumber',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				},  {
					xtype : 'vcombo',
					fieldLabel : '店铺',
					labelWidth : 30,
					width: 200,
					margin : '0 5 0 10',
					emptyText : '选择店铺',
					itemId : 'shopId',
					value : window.operator.shopId+'',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption',												
							extraParams : {
								allowBlank : true,
								blankText : '全部'
							}
						};
					}
					
				},{
					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doSearch();
					}
				}, '->',/* {
					xtype : 'button',
					icon : 'images/excel-16.png',
					text : '导出'
				},*/ '-', {
					xtype : 'button',
					icon : 'images/print.png',
					text : '打印',
					itemId : 'print',
					disabled : true,
					handler : function() {
						var data = me.getSelectionModel().selected.getAt(0).data;
						me.doPrint(data.id);
					}
				} ]
			}]
		}];

		var bottomBar = {
			dock : 'bottom',
			xtype : 'pagingtoolbar',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBars.concat(bottomBar);
	},
	onSelectChange : function(grid, selected, eOpts) {
		if (selected.length != 0) {
			this.down("#print").enable();
		} else {
			this.down("#print").setDisabled(true);
		}
	},
	doPrint : function(id) {
		Ext.create('VIP.common.PrintWindow', {
			title : '打印预览',
			modal : true,
			frame : true,
			url : 'print/deposit.jsp?id=' + id
		}).show();
	},

	createColumns : function() {
		var me = this;
		var columns = [{
	        xtype: 'rownumberer',
	        text:'序列',
	        align : 'center',
	        width: 50,
	        sortable: false
		},  {
			dataIndex : 'orderNumber',
			text : '充值单号',
			flex : 1
		}];
		var names = [{
			dataIndex : 'userScreenName',
			text : '会员昵称',
			flex : 1
		}/*, {
			dataIndex : 'userName',
			text : '会员姓名',
			flex : 1
		}*/];
		var column = [{
			dataIndex : 'realAmount',
			text : '充值金额(元)',
			flex : 1
		}, {
			dataIndex : 'rewardAmount',
			text : '赠送金额(元)',
			flex : 1
		}, {
			dataIndex : 'time',
			text : '充值时间',
			flex : 1
		}, {
			dataIndex : 'currentDeposit',
			text : '会员余额(元)',
			flex : 1
		}, {
			dataIndex : 'operatorName',
			text : '操作人员',
			flex : 1
		}, {
			dataIndex : 'shopName',
			text : '充值店铺',
			flex : 1,
			renderer : function(value, metaData,record ) {
				var state = record.raw.shopState;
				if(state=='1'){
	/*				metaData.style = 'color:#0F0';*/
					return value;
				}else if(state=='0'){
					metaData.style = 'color:#00F';
					return value+"　【已冻结】";
				}else if(state=='-2'){
					metaData.style = 'color:#F00';
					return value+"　【已注销】";
				}else {
					return value;
				}
			}
		}];
		if(me.userId==null){
			return columns.concat(names).concat(column);
		}else{
			return columns.concat(column);
		}
	},
	initComponent : function() {
		var store = this.createStore();
		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store),
			columns : this.createColumns()
		});
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);

		this.on('selectionchange', this.onSelectChange, this.onSelectChange.scope);
		this.on('itemdblclick', this.reportInfo, this);
		this.callParent(arguments);
	},	
	reportInfo : function(){
		var me = this;
		var record = me.getSelectionModel().getSelection()[0].raw;
		var reportInfo = Ext.create('VIP.reports.DepositInfo', {
			params : {
				record : record
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		
		reportInfo.show();
	},
	doSearch : function() {
		var me =this;
		var orderNumber = this.down('#orderNumber').getSubmitValue();
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		/*var userName = this.down('#userName').getSubmitValue();*/
		var userScreenName = this.down('#userScreenName').getSubmitValue();
		var qrString = this.down('#qrString').getSubmitValue();
		var shopId = this.down('#shopId').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			if (orderNumber) {
				params.orderNumber = orderNumber;
			} else {
				params.orderNumber = undefined;
			}
			if (startDate) {
				params.startDate = startDate;
			} else {
				params.startDate = undefined;
			}
	
			if (endDate) {
				params.endDate = endDate;
			} else {
				params.endDate = undefined;
			}
	
			/*if (userName != "") {
				params.userName = userName;
			} else {
				params.userName = undefined;
			}*/
			
			if (userScreenName != "") {
				params.userScreenName = userScreenName;
			} else {
				params.userScreenName = undefined;
			}
			if (qrString != "") {
				params.qrString = qrString;
			} else {
				params.qrString = undefined;
			}
			if (shopId != ""){
				params.shopId = shopId;
			}else{
				params.shopId = undefined;
			}
			me.down('#qrString').setValue();
			me.down('#orderNumber').setValue();
			/*me.down('#start_date').setValue();
			me.down('#end_date').setValue();
			me.down('#userName').setValue();
			me.down('#userScreenName').setValue();*/
			this.getStore().loadPage(1);
		}
	},
	refresh : function() {
		this.getStore().reload();
	}
});
Ext.define('VIP.reports.model.ConsumeHistory', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'userId',
		type : 'string'
	}, {
		name : 'userScreenName',
		type : 'string'
	}, {
		name : 'userName',
		type : 'string'
	}, {
		name : 'operatorName',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'orderNumber',
		type : 'string'
	}, {
		name : 'consumeSubject',
		type : 'string'
	}, {
		name : 'time',
		type : 'string'
	}, {
		name : 'consumptionAmount',
		type : 'string'
	}, {
		name : 'discount',
		type : 'string'
	}, {
		name : 'accountPayable',
		type : 'string'
	}, {
		name : 'cashPayment',
		type : 'string'
	}, {
		name : 'bankCardPaymant',
		type : 'string'
	}, {
		name : 'cardPayment',
		type : 'string'
	}, {
		name : 'changeAmount',
		type : 'string'
	}, {
		name : 'currentDeposit',
		type : 'string'
	}, {
		name : 'type',
		type : 'string'
	}, {
		name : 'notes',
		type : 'string'
	}, {
		name : 'shopState',
		type : 'string'
	} ]
});
Ext.define('VIP.reports.store.ConsumeHistory',{
	extend:  VIP.store.BaseStore ,
	                                                                     
	model: 'VIP.reports.model.ConsumeHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'ConsumeAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    }
});
Ext.define('VIP.reports.ConsumeGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.consumegrid' ],
	                                                  
	icon : 'images/consume_list.png',

	userId : null,
	createStore : function() {
		var store = Ext.create('VIP.reports.store.ConsumeHistory', {
			autoLoad : this.autoLoad != false
		});
		var params = store.getProxy().extraParams;
		if (!params) {
			params = {};
			store.getProxy().extraParams = params;
		}

		if (this.userId != null) {
			params.userId = this.userId;
		}
		return store;
	},
	createDockedItems : function(store) {
		var me = this;
		var topBars = [ {
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',
				hidden : !!this.userId,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '会员号',
					emptyText : '请扫描会员身份二维码',
					labelWidth : 40,
					width : 250,
					margin : '0 5 0 5',
					inputType : 'password',
					itemId : 'qrString',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '会员昵称',
					emptyText : '会员昵称',
					labelWidth : 60,
					width : 180,
					margin : '0 5 0 5',
					itemId : 'userScreenName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}/*, {
					xtype : 'textfield',
					fieldLabel : '会员姓名',
					emptyText : '会员姓名',
					labelWidth : 60,
					width : 180,
					margin : '0 5 0 5',
					itemId : 'userName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}*/]
			},
			{
				xtype : 'toolbar',
				dock : 'top',
				items : [{
					xtype : 'datefield',
					itemId : 'start_date',
					vtype : 'daterange',
					fieldLabel : '消费时间',
					emptyText : '开始时间',
					labelWidth : 60,
					maxValue:new Date(),
					endDateField : 'end_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'end_date',
					vtype : 'daterange',
					emptyText : '结束时间',
					maxValue: new Date(),
					startDateField : 'start_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '单号',
					labelWidth : 30,
					emptyText : '请扫描或输入消费单号二维码',
					itemId : 'orderNumber',
					width : 220,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'vcombo',
					fieldLabel : '店铺',
					labelWidth : 30,
					width: 200,
					margin : '0 5 0 10',
					emptyText : '选择店铺',
					itemId : 'shopId',
					value : window.operator.shopId+'',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption',												
							extraParams : {
								allowBlank : true,
								blankText : '全部'
							}
						};
					}
					
				},{
					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doSearch();
					}
				}, '->', /*{
					xtype : 'button',
					icon : 'images/excel-16.png',
					text : '导出'
				},*/ '-', {
					xtype : 'button',
					icon : 'images/print.png',
					text : '打印',
					itemId : 'print',
					disabled : true,
					handler : function() {
						var data = me.getSelectionModel().selected.getAt(0).data;
						me.doPrint(data.id);
					}
				} ]	
			}]
		}];

		var bottomBar = {
			dock : 'bottom',
			xtype : 'pagingtoolbar',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBars.concat(bottomBar);
	},
	createColumns : function() {
		var me = this;
		var columns = [ {
	        xtype: 'rownumberer',
	        width: 50,
	        align : 'center',
	        text:'序列',
	        sortable: false
		}, {
			text : '订单号',
			dataIndex : 'orderNumber',
			flex : 1
		}, {
			text : '内容',
			dataIndex : 'consumeSubject',
			flex : 1,
			sortable : false
		}];
		var names = [/*{
			text : '会员姓名',
			dataIndex : 'userName',
			flex : 1
		}, */{
			text : '会员昵称',
			dataIndex : 'userScreenName',
			flex : 1
		}];
		var column = [{
			text : '消费金额(元)',
			dataIndex : 'consumptionAmount',
			flex : 1
		},{
			text : '应付金额(元)',
			dataIndex : 'accountPayable',
			flex : 1
		}, {
			text : '折扣金额(元)',
			dataIndex : 'discount',
			flex : 1
		},{
			text : '卡支付(元)',
			dataIndex : 'cardPayment',
			flex : 1
		}, {
			text : '现金支付(元)',
			dataIndex : 'cashPayment',
			flex : 1
		}, {
			text : '找零(元)',
			dataIndex : 'changeAmount',
			flex : 1
		}, {
			text : '卡内余额(元)',
			dataIndex : 'currentDeposit',
			flex : 1
		}, {
			text : '消费时间',
			dataIndex : 'time',
			flex : 2
		}, {
			text : '消费店铺',
			dataIndex : 'shopName',
			flex : 1,
			renderer : function(value, metaData,record ) {
				var state = record.raw.shopState;
				if(state=='1'){
	/*				metaData.style = 'color:#0F0';*/
					return value;
				}else if(state=='0'){
					metaData.style = 'color:#00F';
					return value+"　【已冻结】";
				}else if(state=='-2'){
					metaData.style = 'color:#F00';
					return value+"　【已注销】";
				}else {
					return value;
				}
			}
		}, {
			text : '操作员',
			dataIndex : 'operatorName',
			flex : 1
		}];
		if(me.userId==null){
			return columns.concat(names).concat(column);
		}else{
			return columns.concat(column);
		}
	},
	onSelectChange : function(grid, selected, eOpts) {
		if (selected.length != 0) {
			this.down("#print").enable();
		} else {
			this.down("#print").setDisabled(true);
		}
	},
	doPrint : function(id) {
		Ext.create('VIP.common.PrintWindow', {
			title : '打印预览',
			modal : true,
			frame : true,
			url : 'print/consume.jsp?id=' + id
		}).show();

	},
	initComponent : function() {
		var store = this.createStore();
		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store),
			columns : this.createColumns()
		});
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.on('selectionchange', this.onSelectChange, this.onSelectChange.scope);
		this.on('itemdblclick', this.reportInfo, this);
		this.callParent(arguments);
	},
	refresh : function() {
		this.getStore().reload();
	},
	reportInfo : function(){
		var me = this;
		var record = me.getSelectionModel().getSelection()[0].raw;
		var reportInfo = Ext.create('VIP.reports.ConsumeInfo', {
			params : {
				record : record
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		
		reportInfo.show();
	},
	doSearch : function() {
		var me = this;
		var orderNumber = this.down('#orderNumber').getSubmitValue();
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
	/*	var userName = this.down('#userName').getSubmitValue();*/
		var userScreenName = this.down('#userScreenName').getSubmitValue();
		var qrString = this.down('#qrString').getSubmitValue();
		var shopId = this.down('#shopId').getSubmitValue();
		var form = this.down('vipform').getForm();
		var params = this.getStore().getProxy().extraParams;
		
		if (form.isValid()) {
			if (orderNumber) {
				params.orderNumber = orderNumber;
			} else { 		
				params.orderNumber = undefined;
			}
			if (startDate) {
				params.startDate = startDate;
			} else {
				params.startDate = undefined;
			}

			if (endDate) {
				params.endDate = endDate;
			} else {
				params.endDate = undefined;
			}

			/*if (userName != "") {
				params.userName = userName;
			} else {
				params.userName = undefined;
			}*/
			
			if (userScreenName != "") {
				params.userScreenName = userScreenName;
			} else {
				params.userScreenName = undefined;
			}
			if (qrString != "") {
				params.qrString = qrString;
			} else {
				params.qrString = undefined;
			}
			if (shopId != ""){
				params.shopId = shopId;
			}else{
				params.shopId = undefined;
			}
		
			me.down('#orderNumber').setValue();
			/*me.down('#start_date').setValue();
			me.down('#end_date').setValue();
			me.down('#userName').setValue();
			me.down('#userScreenName').setValue();*/
			me.down('#qrString').setValue();
			this.getStore().loadPage(1);
		}
		
	}
});
Ext.define('VIP.reports.model.WithdrawHistory', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'userId',
		type : 'string'
	}, {
		name : 'userScreenName',
		type : 'string'
	}, {
		name : 'userName',
		type : 'string'
	}, {
		name : 'operatorName',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'orderNumber',
		type : 'string'
	}, {
		name : 'amount',
		type : 'string'
	}, {
		name : 'time',
		type : 'string'
	}, {
		name : 'currentDeposit',
		type : 'string'
	}, {
		name : 'notes',
		type : 'string'
	}, {
		name : 'shopState',
		type : 'string'
	} ]
});
Ext.define('VIP.reports.WithdrawHistoryGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.withdrawhistorygrid' ],
	                                                   
	layout : 'fit',
	iconCls : 'icon-member-withdraw',
	icon : 'images/withdraw_list.png',
	userId : null,
	createStore : function() {
		var store = Ext.create('VIP.reports.store.WithdrawHistory', {
			autoLoad : this.autoLoad != false
		});
		var params = store.getProxy().extraParams;
		if (!params) {
			params = {};
			store.getProxy().extraParams = params;
		}
		
		if (this.userId != null) {			
			params.userId = this.userId;
		}
		return store;
	},
	createDockedItems : function(store) {
		var me = this;
		var topBars = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',
				hidden : !!this.userId,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '会员号',
					emptyText : '请扫描会员身份二维码',
					labelWidth : 40,
					width : 250,
					margin : '0 5 0 5',
					inputType : 'password',
					itemId : 'qrString',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '会员昵称',
					emptyText : '会员昵称',
					labelWidth : 60,
					width : 180,
					margin : '0 5 0 5',
					itemId : 'userScreenName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}/*, {
					xtype : 'textfield',
					fieldLabel : '会员姓名',
					emptyText : '会员姓名',
					labelWidth : 60,
					width : 180,
					margin : '0 5 0 5',
					itemId : 'userName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}*/]
			}, {
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					xtype : 'datefield',
					itemId : 'start_date',
					fieldLabel : '取款时间',
					emptyText : '开始时间',
					labelWidth : 60,
					vtype : 'daterange',
					endDateField : 'end_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'end_date',
					emptyText : '结束时间',
					vtype : 'daterange',
					startDateField : 'start_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '单号',
					labelWidth : 30,
					width : 220,
					emptyText : '请扫描或输入取款单号二维码',
					itemId : 'orderNumber',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'vcombo',
					fieldLabel : '店铺',
					labelWidth : 30,
					width: 200,
					margin : '0 5 0 10',
					emptyText : '选择店铺',
					itemId : 'shopId',
					value : window.operator.shopId+'',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption',												
							extraParams : {
								allowBlank : true,
								blankText : '全部'
							}
						};
					}
					
				},{

					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doSearch();
					}
				}, '->'/*, {
					xtype : 'button',
					icon : 'images/excel-16.png',
					text : '导出'
				}*/, '-', {
					xtype : 'button',
					icon : 'images/print.png',
					text : '打印',
					itemId : 'print',
					disabled : true,
					handler : function() {
						var data = me.getSelectionModel().selected.getAt(0).data;
						me.doPrint(data.id);
					}
				} ]
			}]
		}];

		var bottomBar = {
			dock : 'bottom',
			xtype : 'pagingtoolbar',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBars.concat(bottomBar);
	},

	createColumns : function() {
		var me = this;
		var columns = [{
	        xtype: 'rownumberer',
	        width: 50,
	        align : 'center',
	        text:'序列',
	        sortable: false
		},  {
			dataIndex : 'orderNumber',
			text : '取款单号',
			flex : 1
		}, {
			dataIndex : 'shopName',
			text : '取款店铺',
			flex : 1,
			renderer : function(value, metaData,record ) {
				var state = record.raw.shopState;
				if(state=='1'){
	/*				metaData.style = 'color:#0F0';*/
					return value;
				}else if(state=='0'){
					metaData.style = 'color:#00F';
					return value+"　【已冻结】";
				}else if(state=='-2'){
					metaData.style = 'color:#F00';
					return value+"　【已注销】";
				}else {
					return value;
				}
			}
		}];
		var names = [/*{
			dataIndex : 'userName',
			text : '会员姓名',
			flex : 1
		},*/ {
			dataIndex : 'userScreenName',
			text : '会员昵称',
			flex : 1
		}];
		var column = [{
			dataIndex : 'amount',
			text : '取款金额(元)',
			flex : 1
		}, {
			dataIndex : 'time',
			text : '取款时间',
			flex : 1
		},{
			text : '卡内余额(元)',
			dataIndex : 'currentDeposit',
			flex : 1	
		}, {
			dataIndex : 'operatorName',
			text : '操作员',
			flex : 1
		}];
		if(me.userId==null){
			return columns.concat(names).concat(column);
		}else{
			return columns.concat(column);
		}
	},

	initComponent : function() {
		var store = this.createStore();
		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store),
			columns : this.createColumns()
		});
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.on('selectionchange', this.onSelectChange, this.onSelectChange.scope);
		this.on('itemdblclick', this.reportInfo, this);
		this.callParent(arguments);
	},
	reportInfo : function(){
		var me = this;
		var record = me.getSelectionModel().getSelection()[0].raw;
		var reportInfo = Ext.create('VIP.reports.WithdrawInfo', {
			params : {
				record : record
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		
		reportInfo.show();
	},
	onSelectChange : function(grid, selected, eOpts) {
		if (selected.length != 0) {
			this.down("#print").enable();
		} else {
			this.down("#print").setDisabled(true);
		}
	},
	doPrint : function(id) {
		Ext.create('VIP.common.PrintWindow', {
			title : '打印预览',
			modal : true,
			frame : true,
			url : 'print/withdraw.jsp?id=' + id
		}).show();

	},
	doSearch : function() {
		var me = this;
		var orderNumber = this.down('#orderNumber').getSubmitValue();
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		/*var userName = this.down('#userName').getSubmitValue();*/
		var userScreenName = this.down('#userScreenName').getSubmitValue();
		var qrString = this.down('#qrString').getSubmitValue();
		var shopId = this.down('#shopId').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			if (orderNumber) {
				params.orderNumber = orderNumber;
			} else {
				params.orderNumber = undefined;
			}
			if (startDate) {
				params.startDate = startDate;
			} else {
				params.startDate = undefined;
			}

			if (endDate) {
				params.endDate = endDate;
			} else {
				params.endDate = undefined;
			}

			/*if (userName != "") {
				params.userName = userName;
			} else {
				params.userName = undefined;
			}*/
			
			if (userScreenName != "") {
				params.userScreenName = userScreenName;
			} else {
				params.userScreenName = undefined;
			}
			if (qrString != "") {
				params.qrString = qrString;
			} else {
				params.qrString = undefined;
			}
			if (shopId != ""){
				params.shopId = shopId;
			}else{
				params.shopId = undefined;
			}
			me.down('#orderNumber').setValue();
			/*me.down('#start_date').setValue();
			me.down('#end_date').setValue();
			me.down('#userName').setValue();
			me.down('#userScreenName').setValue();*/
			me.down('#qrString').setValue();
			this.getStore().loadPage(1);
		}
		
	},
	refresh : function() {
		this.getStore().reload();
	}
});
Ext.define('VIP.reports.model.OperationLog', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'time',
		type : 'string'
	}, {
		name : 'operatorName',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	} ]
});
Ext.define('VIP.reports.store.OperationLog',{
	extend:  VIP.store.BaseStore ,
	                                                                   
	model : 'VIP.reports.model.OperationLog',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'OperationLogAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.reports.OperationLogGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.operationloggrid' ],
	                                                
	icon : 'images/log_list.png',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        text:'序列',
        align : 'center',
        sortable: false
	}, {
		text : '时间',
		dataIndex : 'time',
		flex : 2
		
	}, {
		text : '操作员',
		dataIndex : 'operatorName',
		flex : 1
	}, {
		text : '店铺名称',
		dataIndex : 'shopName',
		flex : 1
	}, {
		text : '操作内容',
		dataIndex : 'description',
		flex : 5
	} ],
	createStore : function() {
		var store = Ext.create('VIP.reports.store.OperationLog');
		return store;
	},
	createDockedItems : function(store) {
		var me = this;
		var topBar = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [ {
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					xtype : 'datefield',
					fieldLabel : '操作时间',
					emptyText : '开始时间',
					labelWidth : 60,
					itemId : 'start_date',
					vtype : 'daterange',
					maxValue:new Date(),
					endDateField : 'end_date'
				},{
					xtype : 'label',
					margin : '0 5 0 5',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'end_date',
					emptyText : '结束时间',
					vtype : 'daterange',
					maxValue: new Date(),
					startDateField : 'start_date'
				}, {
					xtype : 'vcombo',
					fieldLabel : '店铺',
					labelWidth : 30,
					emptyText : '选择店铺',
					margin : '0 5 0 10',
					itemId : 'shopId',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption',
							extraParams : {
								allowBlank : true,
								blankText : '全部'
							}
						};
					},

					listeners : {
						change : {
							fn : function(field, key, option) {	
								var shopId = field.getValue();
								me.down('#operatorId').clearValue();
								me.updateCbo(shopId);
							},
							delay : 200
						}
					}
				
				},{
					xtype : 'vcombo',
					fieldLabel : '操作员',
					labelWidth : 50,
					emptyText : '选择操作员',
					margin : '0 5 0 10',
					itemId : 'operatorId',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'OperatorAction.listAsOption',
							extraParams : {
								allowBlank : true,
								blankText : '全部'
							}
						};
					}
				},{
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function(btn) {
						btn.up('operationloggrid').doSearch();
					}
				} ]
			}]
		}];

		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBar.concat(bottomBar);
	},
	initComponent : function() {
		var store = this.createStore();
		
		Ext.apply(this, {
			store : store,			
			dockedItems : this.createDockedItems(store)
		});
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.callParent(arguments);
	},
	updateCbo : function(shopId){
		var me = this;
		var param;
		if(shopId!=""&&shopId!=null){
			param = {"shopId":shopId, "page":1.0, "start":0.0, "limit":25.0};
		}else{
			param = {"allowBlank" : true,"blankText" : '全部', "page":1.0, "start":0.0, "limit":25.0};
		}
		OperatorAction.listAsOption(param,function(value){
			me.down("#operatorId").setOptions(value);
		});
	},
	doSearch : function() {
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		var shopId = this.down('#shopId').getSubmitValue();
		var operatorId = this.down('#operatorId').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			if(!params){
				params = {};
				this.getStore().getProxy().extraParams = params;
			}
			
			if(startDate){
				params.startDate = startDate;
			} else {
				params.startDate = undefined;
			}
			
			if(endDate){
				params.endDate = endDate;
			} else {
				params.endDate = undefined;
			}
			if(shopId){
				params.shopId = shopId;
			} else {
				params.shopId = undefined;
			}
			if(operatorId){
				params.operatorId = operatorId;
			} else {
				params.operatorId = undefined;
			}
			/*this.down('#start_date').setValue();
			this.down('#end_date').setValue();
			this.down('#shopId').setValue();
			this.down('#operatorId').setValue();*/
			this.getStore().loadPage(1);
		}
		
	}
});
Ext.define('VIP.reports.MemberGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.reportmembergrid' ],
	                                         
	icon : 'images/member_list.png',
	layout : 'fit',
	selType: 'checkboxmodel',
	columns : [ {
        xtype: 'rownumberer',
        text:'序列',
        align : 'center',
        width: 50,
        sortable: false
	}, {
		text : '会员昵称',
		dataIndex : 'userScreenName',
		flex : 2
	}, {
		text : '级别',
		dataIndex : 'vipCardTypeName',
		flex : 1
	} ,{
		text : '消费总额(元)',
		dataIndex : 'totalConsume',
		flex : 1
	},{
		text : '当前余额(元)',
		dataIndex : 'currentDeposit',
		flex : 1
	}],
	createStore : function() {
		var store = Ext.create('VIP.member.store.Member');
		return store;
	},
	createDockedItems : function(store) {
		var me = this;
		var topBars = [ {
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',			
				hidden : !!this.userId,
				defaults : {
					labelAlign : 'right'
				},
				items : [ {
					xtype : 'textfield',
					fieldLabel : '会员号',				
					emptyText : '请扫描会员身份二维码',
					labelWidth : 60,
					labeAlign : 'right',
					width : 250,			
					inputType : 'password',
					itemId : 'qrString',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '会员昵称',
					emptyText : '会员昵称',				
					labelWidth : 60,
					width : 180,
					itemId : 'userScreenName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}/*, {
					xtype : 'textfield',
					fieldLabel : '会员姓名',
					emptyText : '会员姓名',				
					labelWidth : 60,
					width : 180,
					itemId : 'userName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}*/ ]
			}, {
				xtype : 'toolbar',
				dock : 'top',	
				defaults : {
					hideTrigger : true,
					labelAlign : 'right'
				},
				items : [{
					xtype : 'label',
					text : '当前余额 ￥'
				},{
					xtype : 'numberfield',
					itemId : 'depositStart',
					vtype : 'numberrange',
					emptyText : '余额最小值',	
					maxNumber : 'depositEnd',
					decimalPrecision:2, 
					width : 80,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'numberfield',
					vtype :'numberrange',
					itemId : 'depositEnd',
					emptyText : '余额最大值',	
					minNumber : 'depositStart',
					decimalPrecision:2,
					width : 80,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype:'label',
					text:'元'
				},{
					xtype : 'label',
					text : '消费总额 ￥'
				},{
					xtype : 'numberfield',
					itemId : 'totalConsumeStart',
					minText:'不能小于0',
					minValue:0,
					emptyText : '消费最小值',	
					vtype : 'numberrange',
					decimalPrecision:2,
					maxNumber : 'totalConsumeEnd',
					width : 80,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'numberfield',
					itemId : 'totalConsumeEnd',
					decimalPrecision:2,
					emptyText : '消费最大值',	
					minText:'不能小于0',
					minValue:0,
					vtype : 'numberrange',
					minNumber : 'totalConsumeStart',
					width : 80,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype:'label',
					text:'元'
				},{
					xtype : 'vcombo',
					fieldLabel : '会员等级',
					labelWidth : 63,
					width : 183,
					itemId : 'membershipTypeId',
					value : '',
					emptyText : '选择等级',	
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'MembershipTypeAction.listAsOption',
							reader : {
								type : 'json',
								root : 'records'
							},
							extraParams : {
								allowBlank: true,
								blankText : '全部'
							}
						};
					}
					/*listeners : {
						change : {
							fn : function(field, key, option) {
								
									me.doQueryReport();
								
							},
							delay : 200
						}
					}*/
				},  {
					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doQueryReport();
					}
				}, '->', {
					xtype : 'button',
					text : '修改会员等级',
					disabled:true,
					itemId : 'change',
					icon : 'images/change_level-16.png',
					handler:function(){
						me.changeMemberType();
					}
				}/*,{
					xtype : 'button',
					icon : 'images/excel-16.png',
					text : '导出'
				}*/]
			}]
		}];

		var bottomBar = {
			dock : 'bottom',
			xtype : 'pagingtoolbar',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBars.concat(bottomBar);
	},

	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.callParent(arguments);
		this.on('selectionchange', this.resetButtonStatus, this);
	},
	
	changeMemberType: function(){
		var me = this;
		MemberAction.canChangeMembershipType(function(result){
			if(result.success){
				var records = me.getSelectionModel().getSelection();
				var userIds = [];
				var membershipTypeId = 0;
				var changeWindow =null;
				for(var i=0; i<records.length; i++){
					var record = records[i];
					var userId = record.raw.userId;
					userIds.push(userId);
					
				}
				if(userIds.length==1){
					membershipTypeId = records[0].raw.membershipTypeId;
					changeWindow = Ext.create('VIP.member.ChangeMemberType',{
						userIds : userIds,
						membershipTypeId : membershipTypeId,
						onSave : {
							fn : me.refresh,
							scope : me
		
						}
					});
				}else{
					changeWindow = Ext.create('VIP.member.ChangeMemberType',{
						userIds : userIds,
						onSave : {
							fn : me.refresh,
							scope : me
		
						}
					});
				}
				changeWindow.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
			
	}
	,
	resetButtonStatus : function(grid, selected){
		var me = this;
		if(selected.length>0){
			
			me.down('#change').setDisabled(false);
		}else{
			me.down('#change').setDisabled(true);
		}
		
	},
	doQueryReport : function() {
		var me = this;
		var qrString = this.down('#qrString').getSubmitValue();
		/*var userName = this.down('#userName').getSubmitValue();*/
		var userScreenName = this.down('#userScreenName').getSubmitValue();
		var depositStart = this.down('#depositStart').getSubmitValue();
		var depositEnd = this.down('#depositEnd').getSubmitValue();
		var totalConsumeStart = this.down('#totalConsumeStart').getSubmitValue();
		var totalConsumeEnd = this.down('#totalConsumeEnd').getSubmitValue();
		var membershipTypeId = this.down('#membershipTypeId').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();

		if (form.isValid()) {
			if (!params) {
				params = {};
				this.getStore().getProxy().extraParams = params;
			}
			if(depositStart<0 || depositEnd<0 || totalConsumeStart<0 ||totalConsumeEnd<0){
				return false;
			}
			if (qrString != "") {
				params.qrString = qrString;
			} else {
				params.qrString = undefined;
			}

			if (userScreenName != "") {
				params.accountName = userScreenName;
			} else {
				params.accountName = undefined;
			}

			/*if (userName != "") {
				params.userName = userName;
			} else {
				params.userName = undefined;
			}*/
			
			if (depositStart != "") {
				params.depositStart = depositStart;
			} else {
				params.depositStart = undefined;
			}
			if (depositEnd != "" /*&& depositEnd !=0*/) {
				params.depositEnd = depositEnd;
			} else {
				params.depositEnd = undefined;
			}
			
			if (totalConsumeStart != "") {
				params.totalConsumeStart = totalConsumeStart;
			} else {
				params.totalConsumeStart = undefined;
			}
			if (totalConsumeEnd != ""/* && totalConsumeEnd !=0*/) {
				params.totalConsumeEnd = totalConsumeEnd;
			} else {
				params.totalConsumeEnd = undefined;
			}
			if (membershipTypeId != "") {
				params.membershipTypeId = membershipTypeId;
			} else {
				params.membershipTypeId = undefined;
			}
			me.down('#qrString').setValue();
			/*me.down('#userName').setValue();
			me.down('#userScreenName').setValue();
			me.down('#depositStart').setValue();
			me.down('#depositEnd').setValue();
			me.down('#totalConsumeStart').setValue();
			me.down('#totalConsumeEnd').setValue();
			me.down('#membershipTypeId').setValue();*/
			this.getStore().loadPage(1);
		}
		
	},
	refresh : function() {
		this.getStore().reload();
	}
});
Ext.define('VIP.reports.model.IntegralHistory', {
	extend :  Ext.data.Model ,
	fields : []
});
Ext.define('VIP.reports.IntegralGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.integralgrid' ],
	requires : [],
	icon : 'images/Coin256.png',
	
	userId : null,
	createStore : function() {
		var store = Ext.create('VIP.reports.store.IntegralHistory', {
			autoLoad : this.autoLoad != false
		});
		var params = store.getProxy().extraParams;
		if (!params) {
			params = {};
			store.getProxy().extraParams = params;
		}
		
		if (this.userId != null) {			
			params.userId = this.userId;
		}
		return store;
	},
	

	createDockedItems : function(store) {
		var me = this;
		var topBars = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',
				hidden : !!this.userId,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '会员号',
					emptyText : '请扫描会员身份二维码',
					labelWidth : 40,
					width : 250,
					margin : '0 5 0 5',
					inputType : 'password',
					itemId : 'qrString',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '会员昵称',
					emptyText : '会员昵称',
					labelWidth : 60,
					width : 180,
					margin : '0 5 0 5',
					itemId : 'userScreenName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}/*, {
					xtype : 'textfield',
					fieldLabel : '会员姓名',
					emptyText : '会员姓名',
					labelWidth : 60,
					width : 180,
					margin : '0 5 0 5',
					itemId : 'userName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}*/]
			}, {
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					xtype : 'datefield',
					itemId : 'start_date',
					vtype : 'daterange',
					fieldLabel : '充值时间',
					emptyText : '开始时间',
					labelWidth : 60,
					maxValue : new Date(),
					endDateField : 'end_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'end_date',
					vtype : 'daterange',
					emptyText : '结束时间',
					maxValue : new Date(),
					startDateField : 'start_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '单号',
					labelWidth : 30,
					width : 220,
					emptyText : '请扫描或输入充值单号二维码',
					itemId : 'orderNumber',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				},  {
					xtype : 'vcombo',
					fieldLabel : '店铺',
					labelWidth : 30,
					width: 200,
					margin : '0 5 0 10',
					emptyText : '选择店铺',
					itemId : 'shopId',
					value : window.operator.shopId+'',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption',												
							extraParams : {
								allowBlank : true,
								blankText : '全部'
							}
						};
					}
					
				},{
					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doSearch();
					}
				}, '->',/* {
					xtype : 'button',
					icon : 'images/excel-16.png',
					text : '导出'
				},*/ '-', {
					xtype : 'button',
					icon : 'images/print.png',
					text : '打印',
					itemId : 'print',
					disabled : true,
					handler : function() {
						var data = me.getSelectionModel().selected.getAt(0).data;
						me.doPrint(data.id);
					}
				} ]
			}]
		}];

		var bottomBar = {
			dock : 'bottom',
			xtype : 'pagingtoolbar',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBars.concat(bottomBar);
	},
	onSelectChange : function(grid, selected, eOpts) {
		if (selected.length != 0) {
			this.down("#print").enable();
		} else {
			this.down("#print").setDisabled(true);
		}
	},
	doPrint : function(id) {
		Ext.create('VIP.common.PrintWindow', {
			title : '打印预览',
			modal : true,
			frame : true,
			url : 'print/deposit.jsp?id=' + id
		}).show();
	},

	createColumns : function() {
		var me = this;
		var columns = [{
	        xtype: 'rownumberer',
	        text:'序列',
	        align : 'center',
	        width: 50,
	        sortable: false
		},  {
			dataIndex : '',
			text : '兑换单号',
			flex : 1
		}];
		var names = [{
			dataIndex : '',
			text : '会员昵称',
			flex : 1
		}];
		var column = [{
			dataIndex : '',
			text : '兑换积分(分)',
			flex : 1
		}, {
			dataIndex : '',
			text : '获取金额(分)',
			flex : 1
		}, {
			dataIndex : '',
			text : '兑换时间',
			flex : 1
		}, {
			dataIndex : '',
			text : '剩余积分(分)',
			flex : 1
		}, {
			dataIndex : '',
			text : '操作人员',
			flex : 1
		}, {
			dataIndex : '',
			text : '兑换店铺',
			flex : 1,
			renderer : function(value, metaData,record ) {
				/*var state = record.raw.shopState;
				if(state=='1'){
					return value;
				}else if(state=='0'){
					metaData.style = 'color:#00F';
					return value+"　【已冻结】";
				}else if(state=='-2'){
					metaData.style = 'color:#F00';
					return value+"　【已注销】";
				}else {
					return value;
				}*/
			}
		}];
		if(me.userId==null){
			return columns.concat(names).concat(column);
		}else{
			return columns.concat(column);
		}
	},
	initComponent : function() {
		var store = this.createStore();
		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store),
			columns : this.createColumns()
		});
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);

		this.on('selectionchange', this.onSelectChange, this.onSelectChange.scope);
		this.on('itemdblclick', this.reportInfo, this);
		this.callParent(arguments);
	},	
	doSearch : function() {
		var me =this;
		var orderNumber = this.down('#orderNumber').getSubmitValue();
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		/*var userName = this.down('#userName').getSubmitValue();*/
		var userScreenName = this.down('#userScreenName').getSubmitValue();
		var qrString = this.down('#qrString').getSubmitValue();
		var shopId = this.down('#shopId').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			if (orderNumber) {
				params.orderNumber = orderNumber;
			} else {
				params.orderNumber = undefined;
			}
			if (startDate) {
				params.startDate = startDate;
			} else {
				params.startDate = undefined;
			}
	
			if (endDate) {
				params.endDate = endDate;
			} else {
				params.endDate = undefined;
			}
	
			/*if (userName != "") {
				params.userName = userName;
			} else {
				params.userName = undefined;
			}*/
			
			if (userScreenName != "") {
				params.userScreenName = userScreenName;
			} else {
				params.userScreenName = undefined;
			}
			if (qrString != "") {
				params.qrString = qrString;
			} else {
				params.qrString = undefined;
			}
			if (shopId != ""){
				params.shopId = shopId;
			}else{
				params.shopId = undefined;
			}
			me.down('#qrString').setValue();
			me.down('#orderNumber').setValue();
			/*me.down('#start_date').setValue();
			me.down('#end_date').setValue();
			me.down('#userName').setValue();
			me.down('#userScreenName').setValue();*/
			this.getStore().loadPage(1);
		}
	},
	refresh : function() {
		this.getStore().reload();
	}
});
Ext.define('VIP.west.Reports', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipwestreports' ],
	                                       
	                                       
	                                               
	                                            
	                                      
	                                       
	               
	title : '统计报表',
	collapsible : false,
	iconCls : 'west-statistics',
	defaults : {
		xtype : 'link'
	},
	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	createItems : function() {
		var me = this;
		var handler = function(link) {
			me.handleAction.call(me, link.text,link.itemId);
		};
		var items = [ {
			text : '充值明细报表',
			icon : 'images/deposit_list.png',
			itemId : 'depositReports',
			handler : handler
		}, {
			text : '消费明细报表',
			icon : 'images/consume_list.png',
			itemId : 'consumeReports',
			handler : handler
		}, {
			text : '取款明细报表',
			icon : 'images/withdraw_list.png',
			itemId : 'withdrawReports',
			handler : handler
		}, {
			text : '会员信息报表',
			icon : 'images/member_list.png',
			itemId : 'memberReports',
			handler : handler
		}, {
			text : '积分兑换报表',
			icon : 'images/Coin256.png',
			itemId : 'integral',
			handler : handler
		}, {
			text : '操作日志报表',
			icon : 'images/log_list.png',
			itemId : 'logReports',
			handler : handler
		} ];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},

	handleAction : function(action,itemId) {
		var me = this;
		vip.viewport.main.removeAll();
		
		/*var items = ['depositReports','consumeReports','withdrawReports','memberReports','logReports'];
		for(var i = 0;i<items.length;i++){
			me.down('#'+items[i]).removeCls('link-visited');
		}*/
		me.up().changeLink(itemId);
		if (action == '充值明细报表') {
			DepositAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'depositgrid',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '消费明细报表') {
			ConsumeAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'consumegrid',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		}else if (action == '取款明细报表') {
			WithdrawAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'withdrawhistorygrid',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '操作日志报表') {	
			OperationLogAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'operationloggrid',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '会员信息报表') {
			MemberAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'reportmembergrid',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '积分兑换报表'){
			vip.viewport.main.setContent({
				xtype : 'integralgrid',
				title : action
			});
		}
	}
});
Ext.define('VIP.sms.model.SMSTemplate',{
	extend:  Ext.data.Model ,
    fields: [
        {name: 'content',  type: 'string'},
        {name: 'type',   type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'id',  type: 'string'}
    ]
});
Ext.define('VIP.sms.store.SMSTemplate',{
	extend:  VIP.store.BaseStore ,
	                                                              
	model: 'VIP.sms.model.SMSTemplate',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'type',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'SMSTemplateAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.sms.AddStaticSMSContent', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.addstaticsmscontent' ],
	                                       
	layout : 'fit',
	width : 500,
	height : 200,
	title : '添加短信模板',
	modal : true,
	border : false,
	
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/ok-16.png',
			width : 90,
			handler : function(btn) {
				me.addTemplate();
			}
		}, {
			text : '取消',
			icon : 'images/cancel-16.png',
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
			items :[{
		        xtype: 'textfield',
		        name: 'name',
		        fieldLabel: '名称',
		        itemId:'name',
		        anchor    : '100% 20%',
		        allowBlank : false
		    },{
		        xtype     : 'textareafield',
		        grow      : true,
		        name      : 'content',
		        itemId:'content',
		        fieldLabel: '短信内容',
		        allowBlank : false,
		        anchor    : '100% 80%'
		    }]
		}];

		return items;
	},
	
	addTemplate:function(){
		var me=this;
		var form=me.down('vipform').getForm();
		if (form.isValid()) {
			var name=me.down('#name').getValue();
			var content=me.down('#content').getValue();
			SMSTemplateAction.add({
				name:name,
				content:content,
				type:'0'
			},function(actionResult){
				Ext.Msg.info(actionResult.message,function(){
					if(me.onSave){
						me.onSave.fn.call(me.onSave.scope);
					}
					me.down('vipform').getForm().reset();
				});
				
			});
		}
	},
	
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		
	}
});
Ext.define('VIP.sms.EditStaticSMSContent', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.editstaticsmscontent' ],
	                                       
	layout : 'fit',
	width : 500,
	height : 200,
	title : '编辑短信模板',
	modal : true,
	id:null,
	border : false,
	
	createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '保存',
			icon : 'images/ok-16.png',
			width : 90,
			handler : function(btn) {
				var form=me.down('vipform').getForm();
				if (form.isValid()) {
					var values=me.down('vipform').getValues();
					SMSTemplateAction.UpdateTemplate({
						id : me.id,
						type:'0',
						name:values['name'],
						content:values['content']
					},function(actionResult){
						if(me.onSave){
							me.onSave.fn.call(me.onSave.scope);
						}
						Ext.Msg.info(actionResult.message,function(){
							me.down('vipform').getForm().reset();
						});
					});
				}
			}
		}, {
			text : '取消',
			icon : 'images/cancel-16.png',
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
			items :[{
		        xtype: 'textfield',
		        name: 'name',
		        fieldLabel: '名称',
		        allowBlank : false,
		        anchor    : '100% 20%'
		    },{
		        xtype     : 'textareafield',
		        grow      : true,
		        name      : 'content',
		        fieldLabel: '短信内容',
		        allowBlank : false,
		        anchor    : '100% 80%'
		    }]
		}];

		return items;
	},
	
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		this.onLoad.fn.call(this.onLoad.scope);
	}
});
Ext.define('VIP.sms.StaticSmsContent', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.staticsmscontent' ],
	                                                                                                        
	layout : 'fit',
	isChose:null,
//	title : '短信内容管理',
	
	columns : [  {
		text : '名称 ',
		dataIndex : 'name',
		flex : 2
	},{
		text : '短信模板内容',
		dataIndex : 'content',
		flex : 6
	}],
	createStore : function() {
		var store = Ext.create('VIP.sms.store.SMSTemplate');
		var params = store.getProxy().extraParams;
		params.type = '0';
		return store;
	},
	createDockedItems : function(store) {
		var me=this;
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',			
			items : [ '->', {
				xtype : 'button',
				text : '添加',
				hidden :me.isChose==true,
				icon : 'images/add-16.png',
				width : 80,
				handler : function(btn) {
					Ext.create('VIP.sms.AddStaticSMSContent', {
						frame: true,
						onSave : {
							fn : function(){
								me.refresh();
							},
							scope : this
						}
					}).show();
				}
			}, '-', {
				xtype : 'button',
				text : '修改',
				icon : 'images/edit-16.png',
				width : 80,
				hidden :me.isChose==true,
				itemId : 'edit',
				disabled : true,
				handler : function(btn) {
					me.editStaticSMSConten();
				}
			},{
				xtype : 'button',
				text : '确定',
				icon : 'images/ok-16.png',
				width : 80,
				hidden :me.isChose!=true,
				itemId : 'ok',
				disabled : true,
				handler : function(btn) {
					me.choseContent();
				}
			}, '-', {
				xtype : 'button',
				text : '删除',
				icon : 'images/delete-16.png',
				width : 80,
				hidden :me.isChose==true,
				itemId : 'delete',
				disabled : true,
				handler : function(btn) {
					var records=me.getSelectionModel().selected;
					var id=records.get(0).data.id;
					Ext.Msg.confirm('确认', '确认要删除该短信模板（id='+id+'）吗?',
							function(r) {
								if (r == 'yes') {
									SMSTemplateAction.deleteTemplate({
										id : id
									},function(actionResult){
										Ext.Msg.info(actionResult.message);
										me.refresh();
									});
								}
					});
				}
			} ]
		};

		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"			
		};

		return [ topBar, bottomBar ];
	},

	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.callParent(arguments);
		this.on('selectionchange', this.resetButtonStatus, this);
		this.on('celldblclick', this.dodbClick, this);
	},
	resetButtonStatus : function(grid, selected){
		if(selected.length == 0){
			this.down('#edit').setDisabled(true);
			this.down('#delete').setDisabled(true);
			this.down('#ok').setDisabled(true);
		} else {
			this.down('#edit').setDisabled(false);
			this.down('#delete').setDisabled(false);
			this.down('#ok').setDisabled(false);
		}
	},
	dodbClick:function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		if(this.isChose){
			this.choseContent();
		}else{
			this.editStaticSMSConten();
		}
		
	},
	choseContent:function(){
		var me=this;
		var records=me.getSelectionModel().selected;
		var content=records.get(0).data.content;
		if(me.setContent){
			me.onClose.fn.call(me.onClose.scope);
			me.setContent.fn.call(me.setContent.scope, content);
		}
	},
	editStaticSMSConten:function(){
		var me=this;
		var records=me.getSelectionModel().selected;
		var id=records.get(0).data.id;
		var editsmscontent=Ext.create('VIP.sms.EditStaticSMSContent', {
			frame: true,
			id:id,
			onLoad : {
				fn : function(){
					SMSTemplateAction.getTemplate({
						id : id,
						type:'0'
					},function(actionResult){
						editsmscontent.down('vipform').getForm().setValues(actionResult.data);
					});
				},
				scope : this
			},
			onSave : {
				fn : function(){
					me.refresh();
				},
				scope : this
			}
		}).show();
	},
	refresh:function(){
		this.getStore().reload();
		this.down('#edit').setDisabled(true);
		this.down('#delete').setDisabled(true);
	}
});
Ext.define('VIP.sms.AutoSendTemplate',{
	extend :  Ext.form.Panel ,
	alias : [ 'widget.autosendtemplate' ],
	title:'自动发送模板',
	iniConsumeSMS:null,
	iniDepositSMS:null,
	consumeId:null,
	depositId:null,
	createItems : function(){
		var me = this;
		var items = [{
	        xtype:'fieldset',
	        title: '消费短信模板',
	        width:500,
	        defaultType: 'textfield',
	        defaults: {anchor: '100%'},
	        layout: 'anchor',
	        items :[{
	            xtype     : 'textareafield',
	            grow      : true,
	            name      : 'consumeContent',
	            itemId:'consumeContent',
	            anchor    : '100%',
	            disabled :true
	        },{
				xtype : 'panel',
				border : false,
				defaults : {
					xtype : 'button',
					width : 60,
					height : 30,
					margin : 10
				},
				layout : {
					type : 'hbox',
					align : 'middle ',
					pack : 'center'
				},
				width : 500,
				items : [ {
					xtype : 'button',
					text : '编辑',
					icon : 'images/ok-24.png',
					width : 100,
					scale : 'medium',
					handler : function(btn) {
						var consumeId=me.consumeId;
						var consumeSMS=Ext.create('VIP.sms.EditConsumeSMS', {
							frame: true,
							onLoad : {
								fn : function(){
									SMSTemplateAction.getTemplate({
										id : consumeId,
										type:'1'
									},function(actionResult){
										consumeSMS.down('vipform').getForm().setValues(actionResult.data);
									});
								},
								scope : me
							},
							onSave:{
								fn : function(){
									var values=consumeSMS.down('vipform').getValues();
									SMSTemplateAction.UpdateTemplate({
										id : consumeId,
										type:'1',
										name:'消费提醒',
										content:values['content']
									},function(actionResult){
										Ext.Msg.info(actionResult.message,function(){
											me.updateConsumeSMS();
										});
									});
								},
								scope : me
							}
						}).show();
					}
				}, {
					xtype : 'button',
					text : '重置',
					icon : 'images/undo-24.png',
					width : 100,
					scale : 'medium',
					handler : function(btn) {
						me.down('#consumeContent').setValue(me.iniConsumeSMS);
					}
				} ]
			}]
	    }, {
	        xtype:'fieldset',
	        title: '充值短信模板', 
	        layout:'anchor',
	        width:500,
	        items :[{
	            xtype     : 'textareafield',
	            grow      : true,
	            name      : 'depositContent',
	            itemId:'depositContent',
	            anchor    : '100%',
	            disabled :true
	        },{
				xtype : 'panel',
				border : false,
				defaults : {
					xtype : 'button',
					width : 60,
					height : 30,
					margin : 10
				},
				layout : {
					type : 'hbox',
					align : 'middle ',
					pack : 'center'
				},
				width : 500,
				items : [ {
					xtype : 'button',
					text : '编辑',
					icon : 'images/ok-24.png',
					width : 100,
					scale : 'medium',
					handler : function(btn) {
						var depositId=me.depositId;
						var depositSMS=Ext.create('VIP.sms.EditDepositSMS', {
							frame: true,
							onLoad : {
								fn : function(){
									SMSTemplateAction.getTemplate({
										id : depositId,
										type:'2'
									},function(actionResult){
										depositSMS.down('vipform').getForm().setValues(actionResult.data);
									});
								},
								scope : this
							},
							onSave:{
								fn : function(){
									var values=depositSMS.down('vipform').getValues();
									SMSTemplateAction.UpdateTemplate({
										id : depositId,
										type:'2',
										name:'充值提醒',
										content:values['content']
									},function(actionResult){
										Ext.Msg.info(actionResult.message,function(){
											me.updateDepositSMS();
										});
									});
								},
								scope : this
							}
						}).show();
					}
				}, {
					xtype : 'button',
					text : '重置',
					icon : 'images/undo-24.png',
					width : 100,
					scale : 'medium',
					handler : function(btn) {
						
						me.down('#depositContent').setValue(me.iniDepositSMS);		
					}
				} ]
			}]
	    }];
		return items;
	},	

	initComponent : function() {
		var me=this;
		this.iniConsumeSMS();
		this.iniDepositSMS();
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},
	iniConsumeSMS:function(){
		var me=this;
		SMSTemplateAction.getTemplate({
			type:'1'
		},function(actionResult){
			me.down('#consumeContent').setValue(actionResult.data.content);	
			me.iniConsumeSMS=actionResult.data.content;
			me.consumeId=actionResult.data.id;
		});
	},
	updateConsumeSMS:function(){
		var me=this;
		SMSTemplateAction.getTemplate({
			type:'1'
		},function(actionResult){
			me.down('#consumeContent').setValue(actionResult.data.content);			
		});
	},
    iniDepositSMS:function(){
    	var me=this;
		SMSTemplateAction.getTemplate({
			type:'2'
		},function(actionResult){
			me.down('#depositContent').setValue(actionResult.data.content);	
			me.iniDepositSMS=actionResult.data.content;
			me.depositId=actionResult.data.id;
		});
	},
	updateDepositSMS:function(){
    	var me=this;
		SMSTemplateAction.getTemplate({
			type:'2'
		},function(actionResult){
			me.down('#depositContent').setValue(actionResult.data.content);			
		});
	}
});
Ext.define('VIP.west.SMSManage', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipwestsmsmanage' ],
	                                                                      
	title : '短信管理',
	iconCls : 'west-smsmanage',
	defaults : {
		xtype : 'link'
	},
	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	createItems : function() {
		var me = this;
		var handler = function(link) {
			me.handleAction.call(me, link.text);
		};
		var items = [];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},

	handleAction : function(action) {

	}
});
Ext.define('VIP.message.AddCouponWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.addcouponwindow' ],
	requires : [],
	layout : 'fit',
	padding : 5,
	icon : 'images/promotion.png',
	title : '添加活动信息',
	modal : true,
	resizable:false,
	border : false,
	width : 462,
	height : 590,
	num : 1,
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '添加描述',
			handler : function(){
				me.addDescription();
			}
		},{
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				me.save();
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
			bodyPadding : 10,
			autoScroll: true,
			layout : {
				type : 'table',
				columns : 2
			},
			defaults : {
				labelWidth : 60,
				labelAlign : 'right'
			},
			items : [{
				xtype : 'textfield',
				fieldLabel : '标题',
				name : 'title',		
				itemId:'title',
				colspan : 2,
				width : 400,
				maxLength:10,
				maxLengthText:'不可超过10字符',
				allowBlank : false,
				vtype : 'stringblank',
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.down('#initDate').focus(true);
							}
						},
						delay : 200
					}
				}
			}, {
				xtype : 'datefield',
				fieldLabel : '开始日期',
				name : 'initDate',
				itemId : 'initDate',
				minValue : new Date(),
				allowBlank : false,
				value : new Date(),
				vtype : 'daterange',
				endDateField : 'expireDate',
				width : 200,
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.down('#expireDate').focus(true);
							}
						},
						delay : 200
					}
				}
			}, {
				xtype : 'datefield',
				itemId : 'expireDate',
				fieldLabel : '结束日期',
				name : 'expireDate',
				minValue : new Date(),
				vtype : 'daterange',
				startDateField : 'initDate',
				width : 195,
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.down('#content').focus(true);
							}
						},
						delay : 200
					}
				}
			},{
				xtype:'panel',
				itemId: 'description',
				border:false,
				colspan : 2,
				items:[]
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
			me.down('#title').focus(true);
			me.addDescription();
		}, 200);
	},
	
	choosePicture : function(){
		var picture = this;
		var finder = new CKFinder();
		finder.selectActionFunction = function( fileUrl, data ) {
			picture.setSrc(fileUrl);
		};
		finder.popup(720, 540);
		
	},
	addDescription : function(){
		var me =this;
		var description = Ext.create('Ext.form.Panel',{
			border:false,
			items:[{
				xtype:'fieldset',
				margin:'5 10',
				padding: '5 40',
				width:390,
				title:'描述'+me.num,
				items:[{
					xtype : 'image',
					name : 'picture',
					style : 'border:1px dashed #AAA;cursor:pointer',
					src: 'images/default_image.png',
					width : 300,
					height : 225,
					colspan : 2,
					listeners : {
						afterrender : function(image){
							image.getEl().on('click', me.choosePicture, image);
						}
					}
				}, {
					xtype : 'textareafield',				
					name : 'content',
					itemId : 'content',
					emptyText : '活动详情',
					width : 300,
					height : 100,
					maxLength:500,
					maxLengthText:'不可超过500字符',
					margin : '3 0 0 0',
					colspan : 2,
					listeners : {
						change : function(field, key){
							var length = field.getValue().length;
							var len = 500-length;
							if(len>0&&len!=500){
								field.nextSibling().setText("还可输入"+len+"个字符");
							}else if(len==0||len==500){
								field.nextSibling().setText("");
							}else{
								field.nextSibling().setText("已经超出"+(-len)+"个字符");
							}
						}
						
					}		
				},{
					xtype: 'label',
					margin:'0 100',
					colspan : 2,
					style : 'color:red',
					text:''
				},{
					xtype: 'button',
					width: 300,
					margin: '0 0 20 0',
					text: '删除本描述',
					handler: function(field){
						var panel = me.down('#description');
						if(panel.items.length>1){
							panel.remove(field.up().up());
						}else{
							Ext.Msg.error('至少添加一条描述');
						}
						
					}
				}]
			
			}]
		});
		me.num++;
		this.down('#description').add(description);
	},
	save : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		
		var pictureUrl = new Array();
		var pictures = this.query('[name=picture]');
		for(var i=0;i<pictures.length;i++){
			if(pictures[i].src.indexOf("default_image.png") >= 0 ){
				Ext.Msg.alert('提示','请添加'+pictures[i].up().title+'的图片');
				return;
			}
			if(pictures[i].src){
				pictureUrl[i] = window.location.protocol + '//' + window.location.host + pictures[i].src;
			}
		}
		
		
		if (form.isValid()) {
			var values = form.getValues();
			Ext.apply(values, {
				pictureUrl : pictureUrl
			});		
			
			MemberAction.publisCoupons(values, function(actionResult) {
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
});
Ext.define('VIP.message.CouponGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.coupongrid' ],
	                                             
	layout : 'fit',
	icon : 'images/promotion.png',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        text:'序列',
        align : 'center',
        sortable: false
	}, {
		text : '标题',
		dataIndex : 'title',
		flex : 2
	}, {
		text : '优惠开始时间',
		dataIndex : 'startDate',
		flex : 1
	}, {
		text : '优惠结束时间',
		dataIndex : 'endDate',
		flex : 1
	},{
		text : '创建时间',
		dataIndex : 'createTime',
		flex : 1
	} ],
	createStore : function() {
		var store = Ext.create('VIP.message.store.Coupon');
		return store;
	},
	createDockedItems : function(store) {
		var me = this;		
		var topBar = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',
				defaults : {
					xtype : 'textfield',
					labelAlign : 'right',
					labelWidth : 80
				},
				items : [ {
					xtype : 'datefield',
					fieldLabel:'开始时间',
					itemId : 'initDateFrom',
					vtype : 'daterange',
					endDateField : 'initDateTo'
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'initDateTo',
					vtype : 'daterange',
					startDateField : 'initDateFrom'
				},  {
					xtype : 'datefield',
					fieldLabel:'结束时间',
					itemId : 'expireDateFrom',
					vtype : 'daterange',
					endDateField : 'expireDateTo'
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'datefield',			
					itemId : 'expireDateTo',
					vtype : 'daterange',
					startDateField : 'expireDateFrom'
				}, {
					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doSearch();
					}
				}, '->', {
					xtype : 'button',
					text : '添加',
					icon : 'images/add.png',
					width : 80,
					handler : function(btn) {
						btn.up('coupongrid').addCoupon();
					}
				}, '-', {
					xtype : 'button',
					text : '修改',
					icon : 'images/edit.png',
					width : 80,
					itemId : 'edit',
					disabled : true,
					handler : function(btn) {
						btn.up('coupongrid').editCoupon();
					}
				}, {
					xtype : 'button',
					text : '删除',
					icon : 'images/delete.png',
					width : 80,
					itemId : 'delete',
					disabled : true,
					handler : function(btn) {
						btn.up('coupongrid').deleteCoupon();
					}
				} ]
			}]
		}];
		var bottomBar = {
			dock : 'bottom',
			xtype : 'pagingtoolbar',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBar.concat(bottomBar);
	},

	initComponent : function() {
		var store = this.createStore();		

		Ext.apply(this, {
			store : store,			
			dockedItems : this.createDockedItems(store)
		});
		this.on('selectionchange', this.onSelectChange, this.onSelectChange.scope);
		this.on('itemdblclick', this.editCoupon, this);
		this.callParent(arguments);
	},
	onSelectChange : function(grid, selected, eOpts) {
		if (selected.length != 0) {
			this.down("#edit").enable();
			this.down("#delete").enable();
		} else {
			this.down("#edit").disable();
			this.down("#delete").disable();
		}
	},
	doSearch : function() {
		var startDateFrom = this.down('#initDateFrom').getSubmitValue();
		var startDateTo = this.down('#initDateTo').getSubmitValue();
		var endDateFrom = this.down('#expireDateFrom').getSubmitValue();
		var endDateTo = this.down('#expireDateTo').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			if (!params) {
				params = {};
				this.getStore().getProxy().extraParams = params;
			}
			if (startDateFrom != "") {
				params.startDateFrom = startDateFrom;
			} else {
				params.startDateFrom = undefined;
			}
			if (startDateTo != "") {
				params.startDateTo = startDateTo;
			} else {
				params.startDateTo = undefined;
			}
			if (endDateFrom != "") {
				params.endDateFrom = endDateFrom;
			} else {
				params.endDateFrom = undefined;
			}
			if (endDateTo != "") {
				params.endDateTo = endDateTo;
			} else {
				params.endDateTo = undefined;
			}
	/*		this.down('#initDateFrom').setValue();
			this.down('#initDateTo').setValue();
			this.down('#expireDateFrom').setValue();
			this.down('#expireDateTo').setValue();*/
			this.getStore().loadPage(1);
		}
		
	},
	refresh : function() {
		this.getStore().reload();
	},
	
	addCoupon : function(){
		var me = this;
		MemberAction.canPublicVIPMessage(function(result){
			if(result.success){
				var win = Ext.create('VIP.message.AddCouponWindow', {
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				win.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	
	editCoupon : function(){
		var me = this;
		MemberAction.canEditVIPMessage(function(result){
			if(result.success){
				var record = me.getSelectionModel().getSelection()[0];
				var messageId = record.raw.id;
				
				var win = Ext.create('VIP.message.EditCouponWindow', {
					messageId : messageId,
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				win.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	
	deleteCoupon : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var title = record.raw.title;
		MemberAction.canEditVIPMessage(function(result){
			if(result.success){
				Ext.Msg.confirm('确认', '确认要删除信息 [' + title + '] 吗？', function(r) {
					if (r == 'yes') {
						var messageId = record.raw.id;
						MemberAction.deleteOffer(messageId, function(actionResult) {
							if (actionResult.success) {
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				}, this);
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	}
});
Ext.define('VIP.message.AddNewsWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.addnewswindow' ],
	requires : [],
	layout : 'fit',
	padding : 5,
	icon : 'images/promotion.png',
	title : '添加新闻动态',
	modal : true,
	resizable:false,
	border : false,
	width : 432,
	height : 560,
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				me.save();
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
			bodyPadding : 10,
			layout : {
				type : 'table',
				columns : 2
			},
			defaults : {
				labelWidth : 60,
				labelAlign : 'right'
			},
			items : [{
				xtype : 'textfield',
				fieldLabel : '标题',
				name : 'title',		
				itemId:'title',
				colspan : 2,
				width : 400,
				maxLength:10,
				maxLengthText:'不可超过10字符',
				allowBlank : false,
				vtype : 'stringblank',
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.down('#initDate').focus(true);
							}
						},
						delay : 200
					}
				}
			}, {
				xtype : 'image',
				name : 'picture',
				itemId : 'picture',
				style : 'border:1px dashed #AAA;cursor:pointer',
				width : 400,
				height : 300,
				colspan : 2,
				listeners : {
					afterrender : function(image){
						image.getEl().on('click', me.choosePicture, me);
					}
				}
			}, {
				xtype : 'textareafield',				
				name : 'content',
				itemId : 'content',
				emptyText : '活动详情',
				width : 400,
				height : 135,
				maxLength:500,
				maxLengthText:'不可超过500字符',
				margin : '3 0 0 0',
				colspan : 2,
				listeners : {
					change : function(field, key){
						var length = field.getValue().length;
						var len = 500-length;
						if(len>0&&len!=500){
							me.down('#lengthInfo').setText("还可输入"+len+"个字符");
						}else if(len==0||len==500){
							me.down('#lengthInfo').setText("");
						}else{
							me.down('#lengthInfo').setText("已经超出"+(-len)+"个字符");
						}
					}
					
				}		
			},{
				xtype: 'label',
				margin:'0 140',
				colspan : 2,
				style : 'color:red',
				itemId : 'lengthInfo',
				text:''
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
			me.down('#title').focus(true);
		}, 500);
	},
	
	choosePicture : function(){
		var picture = this.down('image[name=picture]');
		var finder = new CKFinder();
		finder.selectActionFunction = function( fileUrl, data ) {
			picture.setSrc(fileUrl);
		};
		finder.popup(720, 540);
		
	},
	
	save : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		
		var pictureUrl = '';
		
		if(this.down('[name=picture]').src){
			pictureUrl = window.location.protocol + '//' + window.location.host + this.down('[name=picture]').src;
		}
		
		if (form.isValid()) {
			var values = form.getValues();
			Ext.apply(values, {
				pictureUrl : pictureUrl
			});		
			
			MemberAction.publisVIPMessage(values, function(actionResult) {
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
});
Ext.define('VIP.message.NewsGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.newsgrid' ],
	                                           
	layout : 'fit',
	icon : 'images/promotion.png',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        text:'序列',
        align : 'center',
        sortable: false
	}, {
		text : '标题',
		dataIndex : 'title',
		flex : 2
	}, {
		text : '创建时间',
		dataIndex : 'createTime',
		flex : 1
	}],
	createStore : function() {
		var store = Ext.create('VIP.message.store.News');
		return store;
	},
	createDockedItems : function(store) {
		var me = this;		
		var topBar = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',
				defaults : {
					xtype : 'textfield',
					labelAlign : 'right',
					labelWidth : 80
				},
				items : ['->', {
					xtype : 'button',
					text : '添加',
					icon : 'images/add.png',
					width : 80,
					handler : function(btn) {
						btn.up('newsgrid').addNews();
					}
				}, '-', {
					xtype : 'button',
					text : '修改',
					icon : 'images/edit.png',
					width : 80,
					itemId : 'edit',
					disabled : true,
					handler : function(btn) {
						btn.up('newsgrid').editNews();
					}
				}, {
					xtype : 'button',
					text : '删除',
					icon : 'images/delete.png',
					width : 80,
					itemId : 'delete',
					disabled : true,
					handler : function(btn) {
						btn.up('newsgrid').deleteNews();
					}
				} ]
			}]
		}];
		var bottomBar = {
			dock : 'bottom',
			xtype : 'pagingtoolbar',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBar.concat(bottomBar);
	},

	initComponent : function() {
		var store = this.createStore();		

		Ext.apply(this, {
			store : store,			
			dockedItems : this.createDockedItems(store)
		});
		this.on('selectionchange', this.onSelectChange, this.onSelectChange.scope);
		this.on('itemdblclick', this.editNews, this);
		this.callParent(arguments);
	},
	onSelectChange : function(grid, selected, eOpts) {
		if (selected.length != 0) {
			this.down("#edit").enable();
			this.down("#delete").enable();
		} else {
			this.down("#edit").disable();
			this.down("#delete").disable();
		}
	},
	refresh : function() {
		this.getStore().reload();
	},
	
	addNews : function(){
		var me = this;
		MemberAction.canPublicVIPMessage(function(result){
			if(result.success){
				var win = Ext.create('VIP.message.AddNewsWindow', {
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				win.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	
	editNews : function(){
		var me = this;
		MemberAction.canEditVIPMessage(function(result){
			if(result.success){
				var record = me.getSelectionModel().getSelection()[0];
				var messageId = record.raw.id;
				
				var win = Ext.create('VIP.message.EditNewsWindow', {
					messageId : messageId,
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				win.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	
	deleteNews : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var title = record.raw.title;
		MemberAction.canEditVIPMessage(function(result){
			if(result.success){
				Ext.Msg.confirm('确认', '确认要删除信息 [' + title + '] 吗？', function(r) {
					if (r == 'yes') {
						var messageId = record.raw.id;
						MemberAction.deleteVIPMessage(messageId, function(actionResult) {
							if (actionResult.success) {
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				}, this);
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	}
});
Ext.define('VIP.west.Message', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipwestmessage' ],
	title : '信息提醒',
	                                                               
	iconCls : 'west-message',
	defaults : {
		xtype : 'link'
	},
	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	createItems : function() {
		var me = this;
		var handler = function(link) {
			me.handleAction.call(me, link.text,link.itemId);
		};
		var items = [ {
			text : '促销信息',
			icon : 'images/promotion.png',
			itemId : 'message',
			hidden : window.localStorage.getItem('allowPublishCoupons')=="false",
			handler : handler
		},{
			text : '新闻动态',
			icon : 'images/promotion.png',
			itemId : 'news',
			hidden : window.localStorage.getItem('allowPublishMessages')=="false",
			handler : handler
		} ];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},

	handleAction : function(action,itemId) {
		var me =this;
		vip.viewport.main.removeAll();
		me.up().changeLink(itemId);
		if (action == '促销信息') {
			
			MemberAction.canVIPMessageList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'coupongrid',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});	
			
		} else if (action == '新闻动态') {

			MemberAction.canVIPMessageList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'newsgrid',
						title : action
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});	
			
		}
	}
});
Ext.define('VIP.operator.model.Operator', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'operatorNumber',
		type : 'string'
	}, {
		name : 'accountName',
		type : 'string'
	}, {
		name : 'password',
		type : 'string'
	}, {
		name : 'idCardNumber',
		type : 'string'
	}, {
		name : 'sex',
		type : 'string'
	}, {
		name : 'birthday',
		type : 'string'
	}, {
		name : 'education',
		type : 'string'
	}, {
		name : 'address',
		type : 'string'
	}, {
		name : 'mobile',
		type : 'string'
	}, {
		name : 'shopId',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'lastSigninTime',
		type : 'string'
	}, {
		name : 'operatorRuleId',
		type : 'string'
	}, {
		name : 'operatorRuleName',
		type : 'string'
	}, {
		name : 'state',
		type : 'string'
	}, {
		name : 'notes',
		type : 'string'
	}]
});
Ext.define('VIP.operator.store.Operator',{
	extend:  VIP.store.BaseStore ,
	                                                                
	model : 'VIP.operator.model.Operator',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'OperatorAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.operator.AddOperatorWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.addoperatorwindow' ],
	                                       
	layout : 'fit',
	width : 640,
	icon : 'images/operator_management.png',
	height : 480,
	title : '添加操作员',
	modal : true,
	border : false,
	resizable:false,

	createButtons : function() {
		var me = this;

		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			itemId : 'saveBtn',
			width : 90,
			disabled : true,
			handler : function(btn) {
				me.saveOperator();
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
				anchor : '100% 80%',
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [{
					fieldLabel : '店铺',
					xtype : 'vcombo',
					name : 'shopId',
					allowBlank : false,
					colspan : 2,
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption'
						};
					},
					listeners : {
						change : {
							fn : function(field, key, option) {
								me.down('#name').focus(true);
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '姓名',
					name : 'name',
					itemId :'name',
					allowBlank : false,
					maxLength : '15',
					maxLengthText : '不可超过15位',
					vtype : 'stringblank',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#accountName').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '用户名',
					name : 'accountName',
					itemId : 'accountName',
					maxLength : '15',
					maxLengthText : '不可超过15位',
					vtype : 'stringblank',
					allowBlank : false,
					validFlag : true,
					validator : function() {
						return this.validFlag;
					},
					listeners : {
						blur : function(field) {
							var me = this;
							OperatorAction.getOperatorByAccountName(field.getValue(), function(actionResult) {
								me.validFlag = actionResult.success ? '此用户名已被占用！' : true;
								me.validate();
							});
						},
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#password').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '密码',
					name : 'password',
					itemId : 'password',
					inputType : 'password',
					allowBlank : false,
					vtype : 'password',
					initialPassField : 'passwordAg',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#passwordAg').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '确认密码',
					name : 'passwordAg',
					itemId : 'passwordAg',
					inputType : 'password',
					allowBlank : false,
					vtype : 'password',
					initialPassField : 'password',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#idCardNumber').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'radiogroup',
					fieldLabel : '会员性别',
					columns : 3,
					items : [ {
						boxLabel : '男',
						name : 'sex',
						checked : true,
						inputValue : 'M'
					}, {
						boxLabel : '女',
						name : 'sex',
						inputValue : 'F'
					}, {
						boxLabel : '未知',
						name : 'sex',
						inputValue : 'U'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '身份证号',
					name : 'idCardNumber',
					itemId : 'idCardNumber',
					allowBlank : false,
					regex:/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2013)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,
					regexText:'无效的身份证',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#mobile').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'datefield',
					fieldLabel : '生日',
					name : 'birthday',
					maxValue : new Date()
				}, {
					xtype : 'vcombo',
					fieldLabel : '教育程度',
					name : 'education',
					options : [ {
						text : '小学',
						value : '小学'
					}, {
						text : '初中',
						value : '初中'
					}, {
						text : '高中',
						value : '高中'
					}, {
						text : '大专',
						value : '大专'
					}, {
						text : '本科',
						value : '本科'
					}, {
						text : '硕士',
						value : '硕士'
					}, {
						text : '博士',
						value : '博士'
					}, {
						text : '其他',
						value : '其他'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '手机号',
					name : 'mobile',
					itemId : 'mobile',
					colspan : 2,
					allowBlank : false,
					regex:/^1[3|4|5|8][0-9]{9}$/,
					regexText:'无效的手机号码',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#address').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '地址',
					name : 'address',
					itemId : 'address',
					colspan : 2,
					maxLength : '30',
					maxLengthText : '不可超过30位',
					width : 550,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#notes').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textareafield',
					fieldLabel : '备注',
					name : 'notes',
					itemId : 'notes',
					maxLength : '140',
					maxLengthText : '不可超过140位',
					colspan : 2,
					width : 550
				}]
			}, {
				xtype : 'fieldset',
				title : '操作权限',
				anchor : '100% 20%',
				items :  {
					xtype : 'vcombo',
					name : 'operatorRuleId',
					fieldLabel : '角色',
					labelAlign : 'right',
					width : 275,
					allowBlank : false,
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'OperatorRuleAction.listAsOption'
						};
					},
					listeners : {
						change : function(field, newValue, oldValue) {
							me.down('#saveBtn').setDisabled(newValue == 1);
						}
					}
				} 
			} ]
		} ];

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

	saveOperator : function(btn) {
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			OperatorAction.addOperator(values, function(actionResult) {
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
});
Ext.define('VIP.operator.EditOperatorWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.editoperatorwindow' ],
	                                       
	layout : 'fit',
	width : 640,
	height : 480,
	icon : 'images/operator_management.png',
	title : '修改操作员',
	modal : true,
	border : false,
	resizable:false,
	accountName : null,
	
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			itemId : 'saveBtn',
			width : 90,
			handler : function(btn) {
				me.saveOperator();
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
				anchor : '100% 80%',
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [ {
					fieldLabel : '店铺',
					xtype : 'vcombo',
					colspan :2,
					itemId : 'shopId',
					name : 'shopId',
					allowBlank : false,
					value : this.params.actionResult['shopId'],
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption'
						};
					},
					listeners : {
						change : {
							fn : function(field, key, option) {
								me.down('#name').focus(true);
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '姓名',
					name : 'name',
					itemId :'name',
					maxLength : '15',
					value : this.params.actionResult['name'],
					maxLengthText : '不可超过15位',
					vtype : 'stringblank',
					allowBlank : false,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#accountName').focus(true);
								}
							},
							delay : 200
						}
					}
				},/* {
					xtype : 'textfield',
					fieldLabel : '操作员编码',
					name : 'operatorNumber',
					allowBlank : false
				}*/, {
					xtype : 'textfield',
					fieldLabel : '用户名',
					name : 'accountName',
					itemId : 'accountName',
					vtype : 'stringblank',

					value : this.params.actionResult['accountName'],
					maxLength : '15',
					maxLengthText : '不可超过15位',
					allowBlank : false,
					validFlag : true,
					validator : function() {
						return this.validFlag;
					},
					listeners : {
						blur : function(field) {
							var mes = this;
							if(field.isDirty()){
								if(me.accountName!=field.getValue()){
									OperatorAction.getOperatorByAccountName(field.getValue(), function(actionResult) {
										mes.validFlag = actionResult.success ? '此用户名已被占用！' : true;
										mes.validate();
									});
								}else{
									mes.validFlag = true;
									mes.validate();
								}
							}
						},
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#idCardNumber').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'radiogroup',
					fieldLabel : '会员性别',
					columns: 3,
					items : [ {
						boxLabel : '男',
						name : 'sex',
						checked : this.params.actionResult['sex']=='M',
						inputValue : 'M'
					}, {
						boxLabel : '女',
						name : 'sex',
						checked : this.params.actionResult['sex']=='F',
						inputValue : 'F'
					}, {
						boxLabel : '未知',
						name : 'sex',
						checked : this.params.actionResult['sex']=='U',
						inputValue : 'U'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '身份证号',
					name : 'idCardNumber',
					itemId : 'idCardNumber',
					allowBlank : false,
					value : this.params.actionResult['idCardNumber'],
					regex:/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2013)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,
					regexText:'无效的身份证',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#mobile').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'datefield',
					fieldLabel : '生日',
					name : 'birthday',
					value : this.params.actionResult['birthday'],
					maxValue : new Date()
				}, {
					xtype : 'vcombo',
					fieldLabel : '教育程度',
					name : 'education',
					value : this.params.actionResult['education'],
					options : [{
						text : '小学',
						value : '小学'
					}, {
						text : '初中',
						value : '初中'
					}, {
						text : '高中',
						value : '高中'
					}, {
						text : '大专',
						value : '大专'
					}, {
						text : '本科',
						value : '本科'
					}, {
						text : '硕士',
						value : '硕士'
					}, {
						text : '博士',
						value : '博士'
					}, {
						text : '其他',
						value : '其他'
					}]
				}, {
					xtype : 'textfield',
					fieldLabel : '手机号',
					name : 'mobile',
					itemId : 'mobile',
					colspan : 2,
					allowBlank : false,
					value : this.params.actionResult['mobile'],
					regex:/^1[3|4|5|8][0-9]{9}$/,
					regexText:'无效的手机号码',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#address').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '地址',
					name : 'address',
					itemId : 'address',
					maxLength : '30',
					maxLengthText : '不可超过30位',
					value : this.params.actionResult['address'],
					colspan : 2,
					width : 550,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#notes').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textareafield',
					fieldLabel : '备注',
					maxLength : '140',
					maxLengthText : '不可超过140位',
					name : 'notes',
					itemId : 'notes',
					value : this.params.actionResult['notes'],
					colspan : 2,
					width : 550
				}]					
			}, {
				xtype : 'fieldset',
				title : '操作权限',
				anchor : '100% 20%',
				layout : {
					type : 'table',
					columns : 2
				},
				items : [{
					xtype : 'vcombo',
					name : 'operatorRuleId',
					fieldLabel : '角色',
					labelAlign : 'right',
					width : 275,
					allowBlank : false,
					value : this.params.actionResult['operatorRuleId'],
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'OperatorRuleAction.listAsOption'
						};
					},
					listeners : {
						change : function(field, newValue, oldValue){
							me.down('#saveBtn').setDisabled(newValue == 1);
						}
					}
				},{
					fieldLabel : '状态',
					xtype : 'vcombo',
					name : 'state',
					labelAlign : 'right',
					itemId:'state',
					value : this.params.actionResult['state'],
					options : [ {
						text : '正常',
						value : 1
					}, {
						text : '冻结',
						value : 0
					}, {
						text : '注销',
						value : -2
					} ],
					allowBlank : false,
					listeners : {
						change : {
							fn : function(field, key, option) {
								var value = field.getValue();
								if(value=="-2"){
									Ext.Msg.info("注销无可逆性,请慎重操作！");			
								}
							},
							delay : 200
						}
					}
				} ]
			}]
		}];

		return items;
	},
	
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		/*this.load();*/
	},
	
	load : function(){
		var me = this;
		this.setLoading('读取中...');
		/*OperatorAction.getOperatorById(this.params.operatorId, function(actionResult){
			setTimeout(function(){
				me.down('vipform').getForm().setValues(actionResult.data);
				me.accountName=actionResult.data.accountName;
				me.setLoading(false);
			},500);
		});*/
		
	},
	
	saveOperator : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			OperatorAction.editOperator(Ext.apply({
				operatorId : this.params.operatorId
			}, values), function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('修改成功', function(){
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
});
Ext.define('VIP.operator.OperatorGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.operatorgrid' ],
	                                                                                                                  
	title : '',
	layout : 'fit',
	title : '操作员管理',
	icon : 'images/operator_management.png',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        sortable: false
	},{
		text : '姓名',
		dataIndex : 'name',
		flex : 1
	},/* {
		text : '操作员编号',
		dataIndex : 'operatorNumber'
	},*/ {
		text : '用户名',
		dataIndex : 'accountName',
		flex : 1
	}, {
		text : '所属店铺',
		dataIndex : 'shopName',
		flex : 2,
		renderer : function(value, metaData,record ) {
			var state = record.raw.shopState;
			if(state=='1'){
/*				metaData.style = 'color:#0F0';*/
				return value;
			}else if(state=='0'){
				metaData.style = 'color:#00F';
				return value+"　【已冻结】";
			}else{
				metaData.style = 'color:#F00';
				return value+"　【已注销】";
			}
		}
	}, {
		text : '性别',
		dataIndex : 'sex',
		renderer : function(value) {
			if (value == 'M') {
				return '男';
			} else if (value == 'F') {
				return '女';
			} else if (value == 'U') {
				return '未知';
			} else {
				return value;
			}
		}
	}, {
		text : '角色',
		dataIndex : 'operatorRuleName'
	}, {
		text : '最后登录时间',
		dataIndex : 'lastSigninTime',
		flex : 2
	}, {
		text : '状态',
		dataIndex : 'state',
		renderer : function(value, metaData) {
			if (value == '1') {
				metaData.style = 'color:#0f0';
				return '正常';
			} else if (value == 0) {
				metaData.style = 'color:#00f';
				return '冻结';
			} else if (value == '-1') {
				metaData.style = 'color:#C9C9C9';
				return '已过期';
			} else if (value == '-2') {
				metaData.style = 'color:#C9C9C9';
				return '已注销';
			} else {
				return value;
			}
		}
	} ],
	createStore : function() {
		var store = Ext.create('VIP.operator.store.Operator');
		return store;
	},
	createDockedItems : function(store) {
		var me = this;
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',			
			items : [ {
				xtype : 'textfield',
				fieldLabel : '姓名',
				labelWidth : 30,
				margin : '0 5 0 10',
				emptyText : '姓名',
				width: 100,
				itemId : 'name',
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.doSearch();
							}
						},
						delay : 200
					}
				}
			},{
				xtype : 'textfield',
				fieldLabel : '用户名',
				labelWidth : 50,
				margin : '0 5 0 10',
				emptyText : '用户名',
				width: 150,
				itemId : 'accountName',
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.doSearch();
							}
						},
						delay : 200
					}
				}
			}, {
				xtype : 'vcombo',
				fieldLabel : '店铺',
				labelWidth : 30,
				width: 200,
				margin : '0 5 0 10',
				emptyText : '选择店铺',
				itemId : 'shopId',
				getProxy : function() {
					return {
						type : 'direct',
						directFn : 'ShopAction.listAsOption',												
						extraParams : {
							allowBlank : true,
							blankText : '全部'
						}
					};
				}
			}, {
				xtype : 'vcombo',
				fieldLabel : '状态',
				labelWidth : 30,
				emptyText : '选择状态',
				width : 125,
				margin : '0 5 0 10',
				itemId : 'state',
				options : [{
					text : '全部',
					value : ''
				}, {
					text : '正常',
					value : '1'
				}, {
					text : '冻结',
					value : '0'
				}/*, {
					text : '已注销',
					value : '-2'
				}*/]
			}, {
				xtype : 'button',
				icon : 'images/search-16.png',
				text : '搜索',
				width : 70,
				handler : function(btn) {
					btn.up('operatorgrid').doSearch();
				}
			}, '->', '-', {
				xtype : 'button',
				text : '添加',
				icon : 'images/add.png',
				width : 80,
				handler : function(btn) {
					btn.up('operatorgrid').addOperator();
				}
			}, '-', {
				xtype : 'button',
				text : '修改',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorgrid').editOperator();
				}
			}, '-', {
				xtype : 'button',
				text : '注销',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorgrid').deleteOperator();
				}
			} ,'-', {
				xtype : 'button',
				text : '重置密码',
				icon : 'images/reset_password.png',
				width : 100,
				itemId : 'restore',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorgrid').restorePassword();
				}
			}]
		};

		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"			
		};

		return [ topBar, bottomBar ];
	},

	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.callParent(arguments);
		
		this.on('selectionchange', this.resetButtonStatus, this);
		this.on('itemdblclick', this.editOperator, this);
	},

	doSearch : function() {
		var name = this.down('#name').getValue();
		var shopId = this.down('#shopId').getValue();
		var accountName = this.down('#accountName').getValue();
		var state = this.down('#state').getValue();

		var params = this.getStore().getProxy().extraParams;

		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}
		
		params.start = 0;

		if (name != "") {
			params.name = name;
		} else {
			delete params.name;
		}
		if (accountName !=""){
			params.accountName = accountName;
		} else {
			delete params.accountName;
		}
		if (shopId != "") {
			params.shopId = shopId;
		} else {
			delete params.shopId;
		}
		
		if (state != "") {
			params.state = state;
		} else {
			delete params.state;
		}
		/*this.down('#name').setValue();
		this.down('#shopId').setValue();
		this.down('#state').setValue();
		this.down('#accountName').setValue();*/
		this.getStore().loadPage(1);
	},
	refresh : function() {
		this.getStore().reload();
	},
	
	resetButtonStatus : function(grid, selected){
		if(selected.length == 1){
			var record = this.getSelectionModel().getSelection()[0];
			var operatorId = record.raw.id;
			this.down('#restore').setDisabled(operatorId == 1);
			this.down('#edit').setDisabled(operatorId == 1);
			this.down('#delete').setDisabled(operatorId == 1);
		} else {
			this.down('#restore').setDisabled(true);
			this.down('#edit').setDisabled(true);
			this.down('#delete').setDisabled(true);
		}
	},
	
	addOperator : function(){
		var me = this;
		OperatorAction.canAddOperator(function(result){
			if(result.success){
				var addWindow = Ext.create('VIP.operator.AddOperatorWindow', {
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				
				addWindow.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});	
	},

	editOperator : function(){
		var me = this;
		OperatorAction.canEditOperator(function(result){
			if(result.success){
				var record = me.getSelectionModel().getSelection()[0];
				var operatorId = record.raw.id;
				
				if(operatorId != 1){
					OperatorAction.getOperatorById(operatorId, function(actionResult){
						var editWindow = Ext.create('VIP.operator.EditOperatorWindow', {
							params : {
								operatorId : operatorId,
								actionResult : actionResult.data
							},
							onSave : {
								fn : me.refresh,
								scope : me
							}
						});
						
						editWindow.show();
					});
					
				}
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	restorePassword: function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;
		OperatorAction.canRestorePassword(function(result){
			if(result.success){
				Ext.Msg.confirm('确认', '确认要重置操作员 [' + name + ']的密码吗？', function(r) {
					if (r == 'yes') {
						
						var operatorId = record.raw.id;
						
						OperatorAction.restorePassword(
							operatorId
						, function(actionResult) {
							if (actionResult.success) {
								Ext.Msg.info("重置成功");
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				}, this);
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	deleteOperator : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;
		OperatorAction.canRestorePassword(function(result){
			if(result.success){
				Ext.Msg.confirm('确认', '注销无可逆性,请慎重操作！确认要注销吗？', function(r) {
					if (r == 'yes') {
						
						var operatorId = record.raw.id;
						OperatorAction.deleteOperator(operatorId, function(actionResult) {
							if (actionResult.success) {
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				}, this);
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	}
});
Ext.define('VIP.shop.model.Shop', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'name',
		type : 'string'
	},{
		name : 'discountDescription',
		type : 'string'
	},{
		name : 'chargeWays',
		type : 'string'
	},{
		name : 'contactName',
		type : 'string'
	},{
		name : 'telephone',
		type : 'string'
	},{
		name : 'smsLimit',
		type : 'string'
	},{
		name : 'state',
		type : 'string'
	}]
});

Ext.define('VIP.shop.store.Shop',{
	extend:  VIP.store.BaseStore ,
	                                                        
	model : 'VIP.shop.model.Shop',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'ShopAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.shop.AddShopWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.addshopwindow' ],
	                                       
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
Ext.define('VIP.shop.EditShopWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.editshopwindow' ],
	                                       
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
Ext.define('VIP.shop.ShopGrid', {
	extend :  Ext.grid.Panel ,
	xtype : 'shopgrid',
	                                                             
			                            
	layout : 'fit',
	title : '连锁分店管理',
	icon : 'images/shop_management.png',
	columns : [  {
		        xtype: 'rownumberer',
		        width: 50,
		        align : 'center',
		        text:'序列',
		        sortable: false
	},/*{
		text : '店铺编号',
		dataIndex : 'id',
		flex : 1
	}, */{
		text : '店铺名称',
		dataIndex : 'name',
		flex : 2
	}, /*{
		text : '折扣说明',
		dataIndex : 'discountDescription',
		flex : 2
	},*/ {
		text : '收费方式',
		dataIndex : 'chargeWays',
		flex : 1
	}, {
		text : '联系人',
		dataIndex : 'contactName',
		flex : 1
	}, {
		text : '联系电话',
		dataIndex : 'telephone',
		flex : 2
	}/*, {
		text : '短信余量',
		dataIndex : 'smsLimit',
		flex : 1,
		renderer : function(value, metaData) {
			if (value == 'null') {
				return 0;
			}else{
				return value;
			}
		}
	}*/, {
		text : '状态',
		dataIndex : 'state',
		flex : 1,
		renderer : function(value, metaData) {
			if (value == 1) {
				metaData.style = 'color:#0f0';
				return '正常';
			} else if (value == 0) {
				metaData.style = 'color:#00f';
				return '冻结';
			} else if (value == -2) {
				metaData.style = 'color:#f00';
				return '注销';
			} else {
				return value;
			}
		}
	} ],

	createDockedItems : function(store) {
		var me = this;
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {
				xtype : 'vcombo',
				emptyText : '选择状态',
				fieldLabel : '状态',
				labelWidth : 30,
				width : 125,
				margin : '0 5 0 10',
				itemId : 'state',
				options : [ {
					text : '全部',
					value : ''
				}, {
					text : '正常',
					value : '1'
				}, {
					text : '冻结',
					value : '0'
				}]/*,
				listeners : {
					change : {
						fn : function(field, key, option) {
							me.doSearch();
						},
						delay : 200
					}
				}*/
			}, {
				xtype : 'button',
				icon : 'images/search-16.png',
				text : '搜索',
				width : 70,
				handler : function(btn) {
					btn.up('shopgrid').doSearch();
				}
			}, '->', '-', {
				xtype : 'button',
				icon : 'images/add.png',
				width : 80,
				text : '增加',
				handler : function(btn) {
					btn.up('shopgrid').addShop();
				}
			}, '-', {
				xtype : 'button',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				text : '修改',
				disabled : true,
				handler : function(btn) {
					btn.up('shopgrid').editShop();
				}
			}/*, '-', {
				xtype : 'button',
				icon : 'images/delete-16.png',
				width : 80,
				itemId : 'delete',
				text : '删除',
				disabled : true,
				handler : function(btn) {
					btn.up('shopgrid').deleteShop();
				}
			} */]
		};
		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return [ topBar, bottomBar ];
	},
	createStore : function() {
		var store = Ext.create('VIP.shop.store.Shop');
		return store;
	},
	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.callParent(arguments);
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.on('selectionchange', this.resetButtonStatus, this);
		this.on('itemdblclick', this.editShop, this);
	},
	doSearch : function() {		
		var state = this.down('#state').getValue();

		var params = this.getStore().getProxy().extraParams;

		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}		

		if (state != "") {
			params.state = state;
		} else {
			delete params.state;
		}
		/*this.down('#state').setValue();*/
		this.getStore().loadPage(1);
	},
	refresh : function() {
		this.getStore().reload();
	},
	resetButtonStatus : function(grid, selected) {
		if (selected.length == 1) {
			var record = this.getSelectionModel().getSelection()[0];
			this.down('#edit').setDisabled(false);/*
			this.down('#delete').setDisabled(false);*/
		}
	},

	addShop : function() {
		var me = this;
		ShopAction.canAddShop(function(result){
			if(result.success){
				var addWindow = Ext.create('VIP.shop.AddShopWindow', {
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});

				addWindow.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},

	editShop : function() {
		var me = this;
		ShopAction.canAddShop(function(result){
			if(result.success){
				var record = me.getSelectionModel().getSelection()[0];
				var shopId = record.data.id;

				var editWindow = Ext.create('VIP.shop.EditShopWindow', {
					params : {
						shopId : shopId
					},
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				editWindow.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	deleteShop : function() {
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;

		Ext.Msg.confirm('确认', '确认要删除店铺[' + name + '] 吗？', function(r) {
			if (r == 'yes') {

				var shopId = record.raw.id;

				ShopAction.deleteShop({
					shopId : shopId
				}, function(actionResult) {
					if (actionResult.success) {
						me.refresh();
					} else {
						Ext.Msg.error(actionResult.message);
					}
				});
			}
		}, this);
	}

});
Ext.define('VIP.security.model.OperatorRule', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'actions',
		type : 'string'
	}, {
		name : 'actionsStr',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}]
});
Ext.define('VIP.security.store.OperatorRule',{
	extend:  VIP.store.BaseStore ,
	                                                                    
	model : 'VIP.security.model.OperatorRule',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'OperatorRuleAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.security.OperatorRuleGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.operatorrulegrid' ],
	                                                 
	title : '',
	layout : 'fit',
	title : '管理员角色设置',
	icon : 'images/manage_role.png',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        sortable: false
	},{
		text : '名称',
		dataIndex : 'name',
		flex : 1
	}, {
		text : '权限',
		dataIndex : 'actionsStr',
		flex : 4
	}, {
		text : '描述',
		dataIndex : 'description',
		flex : 3
	} ],
	createStore : function() {
		var store = Ext.create('VIP.security.store.OperatorRule');
		return store;
	},
	createDockedItems : function(store) {
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',			
			items : [ '->', {
				xtype : 'button',
				text : '添加',
				icon : 'images/add.png',
				width : 80,
				handler : function(btn) {
					btn.up('operatorrulegrid').addRule();
				}
			}, '-', {
				xtype : 'button',
				text : '修改',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorrulegrid').editRule();
				}
			}, '-', {
				xtype : 'button',
				text : '删除',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorrulegrid').deleteRule();
				}
			} ]
		};

		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"			
		};

		return [ topBar, bottomBar ];
	},

	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.callParent(arguments);
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.on('selectionchange', this.resetButtonStatus, this);
		this.on('itemdblclick', this.editRule, this);
	},

	doSearch : function() {		

		var params = this.getStore().getProxy().extraParams;

		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}
		
		this.getStore().loadPage(1);
	},
	refresh : function() {
		this.getStore().reload();
	},
	
	resetButtonStatus : function(grid, selected){
		if(selected.length == 1){
			var record = this.getSelectionModel().getSelection()[0];
			var ruleId = record.raw.id;
			this.down('#edit').setDisabled(ruleId == 1);
			this.down('#delete').setDisabled(ruleId == 1);
		} else {
			this.down('#edit').setDisabled(false);
			this.down('#delete').setDisabled(false);
		}
	},
	
	addRule : function(){
		var me = this;
		OperatorRuleAction.canAddRule(function(result){
			if(result.success){
				var ruleWindow = Ext.create('VIP.security.OperatorRuleWindow', {
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				ruleWindow.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},

	editRule : function(){
		var me = this;
		OperatorRuleAction.canEditRule(function(result){
			if(result.success){
				var record = me.getSelectionModel().getSelection()[0];
				var ruleId = record.raw.id;
				
				if(ruleId != 1){
					var ruleWindow = Ext.create('VIP.security.OperatorRuleWindow', {
						params : {
							ruleId : ruleId
						},
						onSave : {
							fn : me.refresh,
							scope : me
						}
					});
					ruleWindow.show();
				}
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	
	deleteRule : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;
		OperatorRuleAction.canEditRule(function(result){
			if(result.success){
				Ext.Msg.confirm('确认', '确认要删除权限组 [' + name + '] 吗？', function(r) {
					if (r == 'yes') {
						var ruleId = record.raw.id;
						OperatorRuleAction.deleteRule({
							ruleId : ruleId
						}, function(actionResult) {
							if (actionResult.success) {
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				}, this);
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	}
});
Ext.define('VIP.system.model.MembershipType', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'vipCardTypeId',
		type : 'string'
	},{
		name : 'vipCardTypeName',
		type : 'string'
	},{
		name : 'moneyBackRate',
		type : 'string'
	},{
		name : 'discountRate',
		type : 'string'
	},{
		name : 'isDefault',
		type : 'boolean'
	},{
		name : 'pointRate',
		type : 'string'
	}]
});

Ext.define('VIP.system.store.MembershipType',{
	extend:  VIP.store.BaseStore ,
	                                                                    
	model : 'VIP.system.model.MembershipType',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'MembershipTypeAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.system.AddMembershipTypeWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.addmembershiptypewindow' ],
	                                       
	layout : 'fit',
	width : 640,
	height : 280,
	title : '添加会员类别',
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
				items : [{
					xtype : 'textfield',
					fieldLabel : '类别名称',
					name : 'membershipTypeName',
					itemId : 'membershipTypeName',
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
					value : 0,
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
					value : 0,
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
				} ]
			} ]
		} ];

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
			me.down('#membershipTypeName').focus(true);
		}, 500);
	},

	addListeners : function() {

	},

	saveMembershipType : function(btn) {
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			MembershipTypeAction.addMembershipType(values, function(actionResult) {
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
});
Ext.define('VIP.system.EditMembershipTypeWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.editmembershiptypewindow' ],
	                                       
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
Ext.define('VIP.member.ChangeMemberType', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.changemembertypeup' ],
	title : '更改会员等级',
	modal : true,
	resizable:false,
	frame : true,
	width : 400,
	height : 200,
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
				name : 'membershipTypeId',
				itemId : 'membershipTypeId',				
				getProxy : function() {
					return {
						type : 'direct',
						directFn : 'MembershipTypeAction.listAsOption'
					};
				},
				listeners : {
					change : {
						fn : function(field, newValue, oldValue) {
							MembershipTypeAction.getMembershipTypeById(newValue, function(result) {
								var data = result.data;
								me.down('#discountRate').setValue(data.discountRate + "%");
								me.down('#moneyBackRate').setValue(data.moneyBackRate + "%");
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
				name : 'discountRate',
				itemId : 'discountRate',
				fieldStyle : 'font-size:12pt; color:green;font-weight:bold;'
			}, {
				xtype : 'displayfield',
				fieldLabel : '返现百分比',
				name : 'moneyBackRate',
				itemId : 'moneyBackRate',
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
				var typeId = me.down('#membershipTypeId').getValue();
				if(typeId==null){
					Ext.Msg.error("请选择会员类型");
					return;
				}
				var param = {
					userIds : me.userIds,
					membershipTypeId : typeId
				};
				MemberAction.changeMembershipTypeForMembers(param, function(result) {
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
	}
});
Ext.define('VIP.system.MembershipTypeGrid', {
	extend :  Ext.grid.Panel ,
	xtype : 'membershiptypegrid',
	                                                                                                                                                           
	layout : 'fit',
	title : '会员等级维护',
	icon : 'images/level_management.png',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        sortable: false
	},{
		text : '类别名称',
		dataIndex : 'vipCardTypeName',
		flex : 2
	}, {
		text : '充值返现百分比',
		dataIndex : 'moneyBackRate',
		flex : 1,
		renderer : function(value, metaData) {
			return value+"%";
		}
	}, {
		text : '折扣百分比',
		dataIndex : 'discountRate',
		flex : 2,
		renderer : function(value, metaData) {
			return value+"%";
		}
	},{
		text : '积分百分比',
		dataIndex : 'pointRate',
		flex : 2,
		renderer : function(value, metaData) {
			return value+"%";
		}
	},{
		text : '是否为默认',
		dataIndex : 'isDefault',
		flex : 1,
		renderer : function(value, metaData) {
			if (value==true) {
				metaData.style = 'color:#00FF00';
				return "√";
			}else{
				return "";
			}
		}
	}],

	createDockedItems : function(store) {
		var me = this;
		
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',
			items : [ '->', {
				xtype : 'button',
				width : 100,
				icon:'images/update.png',
				itemId : 'default',
				text : '设为默认',
				disabled : true,
				handler : function(btn) {
					var membershipTypeName = me.getSelectionModel().getSelection()[0].raw.vipCardTypeName;
					
					me.defaultdMembershpType(membershipTypeName);

					
				}
			},'-',{
				xtype : 'button',
				icon : 'images/add.png',
				width : 80,
				text : '增加',
				handler : function(btn) {
					me.addMembershipType();
				}
			}, '-', {
				xtype : 'button',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				text : '修改',
				disabled : true,
				handler : function(btn) {
					me.editMembershipType();
				}
			}, '-', {
				xtype : 'button',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				text : '删除',
				disabled : true,
				handler : function(btn) {
					me.deleteMembershipType();
				}
			} ]
		};
		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return [ topBar, bottomBar ];
	},
	
	createStore : function() {
		var store = Ext.create('VIP.system.store.MembershipType');
		return store;
	},
	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.callParent(arguments);
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.on('selectionchange', this.resetButtonStatus, this);
		this.on('itemdblclick', this.editMembershipType, this);
	},
	doSearch : function() {
		var params = this.getStore().getProxy().extraParams;

		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}	
		this.getStore().loadPage(1);
	},
	refresh : function() {
		this.getStore().reload();
	},
	resetButtonStatus : function(grid, selected) {
		if (selected.length == 1) {
			var record = this.getSelectionModel().getSelection()[0].raw.isDefault;
			this.down('#edit').setDisabled(false);
			if(record=="false"){
				this.down('#delete').setDisabled(false);
				this.down('#default').setDisabled(false);
			}else{
				this.down('#delete').setDisabled(true);
				this.down('#default').setDisabled(true);
			}
			
		}
	},

	addMembershipType : function() {
		var me = this;
		MembershipTypeAction.canAddMembershipType(function(result){
			if(result.success){
				var addWindow = Ext.create('VIP.system.AddMembershipTypeWindow', {
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});

				addWindow.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},

	editMembershipType : function() {
		var me = this;
		MembershipTypeAction.canEditMembershipType(function(result){
			if(result.success){
				var record = me.getSelectionModel().getSelection()[0];
				var membershipTypeId = record.raw.vipCardTypeId;

				var editWindow = Ext.create('VIP.system.EditMembershipTypeWindow', {
					params : {
						membershipTypeId : membershipTypeId
					},
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				editWindow.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	defaultdMembershpType : function(membershipTypeName){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var vipCardTypeId = record.raw.vipCardTypeId;
		MembershipTypeAction.canDeleteMembershipType(function(result){
			if(result.success){
				Ext.Msg.confirm("提示","确认将【"+membershipTypeName+"】设为默认等级！",function(r){
					if(r=="yes"){
						MembershipTypeAction.setDefaultMembershipType(vipCardTypeId,function(actionResult){
							if (actionResult.success) {
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				});
			}else {
				Ext.Msg.error(result.message);
			}
		});
		
	},
	deleteMembershipType : function() {
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.vipCardTypeName;

		var membershipTypeId = record.raw.vipCardTypeId;
		MembershipTypeAction.canDeleteMembershipType(function(result){
			if(result.success){
				MembershipTypeAction.countAllUsersForMembershipType(membershipTypeId,function(result){
					var membershipNumber = result.data.memberNumber;
					if(membershipNumber>0){
						var deleteWindow = Ext.create('VIP.system.DeleteMembershipTypeWindow', {
							params : {
								membershipTypeId : membershipTypeId,
								membershipNumber : membershipNumber
							},
							onSave : {
								fn : me.refresh,
								scope : me
							}
						});
						deleteWindow.show();
					}else{
						Ext.Msg.confirm('确认', '确认要删除会员种类[' + name + '] 吗？', function(r) {
							if (r == 'yes') {
			
								MembershipTypeAction.deleteMembershipTypeById(membershipTypeId,null, function(actionResult) {
									if (actionResult.success) {
										me.refresh();
									} else {
										Ext.Msg.error(actionResult.message);
									}
								});
							}
						}, this);
					}
				});
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
		
	}
});
Ext.define('VIP.system.SystemSettings', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.systemsettings' ],
	requires : [ ],
	icon : 'images/system_management.png',
	title : '系统参数设置',
	defaults : {
	},
	createView : function() {
		var me = this;
		
		var items = [ {
			xtype : 'form',
			border : false,
			
			layout : {
				type : 'vbox',
				align : 'center',
				pack : 'center'
			},		
			items :[{
				xtype : 'fieldset',
				title : '积分兑现设置',
				width : '98%',
				margin : 5,
				items : [{
					xtype : 'numberfield',
					name : 'pointMoneyRate',
					itemId : 'pointMoneyRate',
					fieldLabel : '积分兑现百分比',
					margin : 10,
					value :0,
					maxValue : 100,
					minValue : 0
				}]
			},{
				xtype : 'button',
				text : '保存设置',
				width : 150,
				height : 40,
				handler : function(){
					Ext.Msg.alert("提示","保存设置");
				}
			}]
		}];
		return items;
	},

	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			items : this.createView()
		});
		this.callParent(arguments);
		
		this.load();
	},
	
	load : function(){
		var me = this;
		ConfigurationAction.getConfigur(function(actionResult){
			me.down('#pointMoneyRate').setValue(actionResult.data.pointMoneyRate);
		});
	},
	save : function(){
		var form = this.getForm();
		var me = this;
		if (form.isValid()) {
			var values = this.getValues();
			ConfigurationAction.setConfigur(values,function(actionResult){
				
			});
		}
		
	}
});
Ext.define('VIP.west.Configuration', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipwestconfiguration' ],
	                                                                                                                           
			                                                              
	title : '系统设置',
	iconCls : 'west-configuration',
	defaults : {
		xtype : 'link'
	},
	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	createItems : function() {
		var me = this;
		var handler = function(link) {
			me.handleAction.call(me, link.text,link.itemId);
		};
		var items = [ {
			text : '系统参数设置',
			icon : 'images/system_management.png',
			itemId : 'system',
			handler : handler
		}, {
			text : '连锁分店管理',
			icon : 'images/shop_management.png',
			itemId : 'shop',
			handler : handler
		}, {
			text : '操作员管理',
			icon : 'images/operator_management.png',
			itemId : 'operator',
			handler : handler
		}, {
			text : '管理员角色设置',
			itemId : 'manageRole',
			icon : 'images/manage_role.png',
			handler : handler
		}, {
			text : '会员等级维护',
			itemId : 'level',
			icon : 'images/level_management.png',
			handler : handler
		}];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},

	handleAction : function(action,itemId) {
		var me =this;
		vip.viewport.main.removeAll();
		me.up().changeLink(itemId);
		if(action == '系统参数设置'){
			vip.viewport.main.setContent({
				xtype : 'systemsettings'
			});
		}else if (action == '操作员管理') {
			OperatorAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'operatorgrid'
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '连锁分店管理') {
			ShopAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'shopgrid'
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '管理员角色设置') {
			OperatorRuleAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'operatorrulegrid'
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '会员等级维护') {
			MembershipTypeAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'membershiptypegrid'
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		}
	}
});
Ext.define('VIP.west.Main', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipwestmain' ],
	                                                                                                                                                                            
	id : 'west',
	region : 'west',
	split : true,
	width : 210,
	title : '功能列表',
	item : null,
	titleCollapse : true,
	collapsible : true,
	collapsed : false,
	layout: {
        type: 'accordion',
        hideCollapseTool : true,
        titleCollapse: true,
        animate: true,
        multi: false
    },
	defaults : {
		autoScroll : true
	},
	items : [{
		xtype : 'vipwestwelcome'
	}, {
		xtype : 'vipwestmembermanage'
	}, {
		xtype : 'vipwestreports'
	}, {
		xtype : 'vipwestmessage',
		hidden : window.localStorage.getItem('allowPublishCoupons')=="false" && window.localStorage.getItem('allowPublishMessages')=="false"
	}, {
		xtype : 'vipwestconfiguration'
	}],
	
	listeners : {
		render : function(panel){
			
		}
	},

	initComponent : function() {
		this.callParent(arguments);
	},
	
	changeLink : function(itemId){
		var me = this;
		if(me.item!=null){
			me.down('#'+me.item).removeCls('link-visited');
		}
		
		me.down('#'+itemId).addCls('link-visited');
		me.item = itemId;
		
		/*var items = ['welcome','deposit','consume','member','withdraw','depositReports','consumeReports','withdrawReports','memberReports','logReports'];
		for(var i = 0;i<items.length;i++){
			me.down('#'+items[i]).removeCls('link-visited');
		}*/
	}
});
Ext.define('VIP.Main', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipmain' ],
	requires : [],
	id : 'main',
	region : 'center',
	layout : 'card',
	defaults : {
		border : false,
		closable : true
	},
	items : [{
		xtype : 'welcomesummary'		
	}],

	initComponent : function() {
		this.callParent(arguments);
	},
	
	setContent : function(component){
		this.removeAll();
		this.add(component);
	}
});
Ext.define('VIP.Center', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipcenter' ],
	                                         
	id : 'main_center',
	region : 'center',
	layout : 'border',
	border : false,
	defaults : {
		
	},
	items : [{
		xtype : 'vipwestmain'
	}, {
		xtype : 'vipmain'
	}],

	initComponent : function() {
		this.callParent(arguments);
	}
});
Ext.define('VIP.operator.OperatorInfoWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.operatorinfowindow' ],
	                                       
	layout : 'fit',
	width : 640,
	height : 280,
	modal : true,
	resizable:false,
	border : false,
	icon : 'images/my_info.png',
	createButtons : function() {
		var me = this;

		var buttons = [ {
			text : '修改',
			icon : 'images/update.png',
			handler : function(btn) {
				me.updatePassword();
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			handler : function(btn) {
				me.close();
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
				anchor : '100% 50%',
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [ {
					xtype : 'displayfield',
					fieldLabel : '操作帐号',
					itemId : 'accountName'
				}, {
					xtype : 'displayfield',
					fieldLabel : '角色名称',
					itemId : 'ruleName'
				}, {
					xtype : 'displayfield',
					fieldLabel : '管理店铺',
					itemId : 'shopName'
				} ]

			}, {
				xtype : 'fieldset',
				title : '密码修改',
				anchor : '100% 50%',
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
					fieldLabel : '原始密码',
					inputType : 'password',
					allowBlank : false,
					itemId : 'originalPassword',
					colspan : 2,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#password').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '新密码',
					inputType : 'password',
					itemId : 'password',
					allowBlank : false,
					vtype : 'password',
					labelStyle : 'color:red',
					initialPassField : 'passwordAg',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#passwordAg').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '确认密码',
					itemId : 'passwordAg',
					inputType : 'password',
					allowBlank : false,
					vtype : 'password',
					initialPassField : 'password',
					labelStyle : 'color:red',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.updatePassword();
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
		var me = this;
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		this.load();
		setTimeout(function(){
			me.down('#originalPassword').focus(true);
		}, 500);
	},
	updatePassword : function() {
		var me = this;
		if(me.down('#originalPassword').getValue()==""){
			me.down('#originalPassword').markInvalid("原密码为空");
			return false;
		}
		if(me.down('#password').getValue()!=me.down('#passwordAg').getValue()){
			me.down('#password').markInvalid("二次密码不一致");
			me.down('#passwordAg').markInvalid("二次密码不一致");
			return false;
		}
		var operatorId = window.operator.operatorId + "";
		var originalPassword = me.down('#originalPassword').getValue();
		var newPassword = me.down('#password').getValue();
		if (operatorId != "" && originalPassword != "" && newPassword != "") {
			OperatorAction.changePassword(operatorId, originalPassword, newPassword, function(result) {
				if (result.success) {
					Ext.Msg.info('修改成功.', function() {
						me.close();
					});
				} else {
					Ext.Msg.error(result.message);
					/*Ext.Msg.error(result.message);*/
				}
			});
		} else {
			Ext.Msg.error("请输入正确的值.");
		}

	},
	load : function() {
		var me = this;
		me.down('#shopName').setValue(window.operator.shopName);
		me.down('#accountName').setValue(window.operator.accountName);
		me.down('#ruleName').setValue(window.operator.ruleName);
	}
});
Ext.define('VIP.TopBar', {
	extend :  Ext.toolbar.Toolbar ,
	alias : [ 'widget.viptopbar' ],
	                                               
	border : 'false',
	region : 'north',
	id : 'topbar',
	defaults : {
		scale : 'large',
		iconAlign : 'top'
	},
	layout : {
		overflowHandler : 'Menu'	
	},

	createTopBarItems : function() {
		var me = this;
		/*var setTheme = function(item){
			var theme = item.value;
			var expire = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30));
			Ext.util.Cookies.set('vip_theme', theme, expire, '/');
			
			window.location.reload();
		};
		var theme = 'classic';*/
		
		var topBarItems = [ {
			xtype : 'button',
			text : '消费',
			width : 80,
			icon : 'images/consume.png',
			handler : function(btn){
				var shoppingManage = vip.viewport.west.down('vipwestmembermanage');
				shoppingManage.expand();
				setTimeout(function(){
					shoppingManage.handleAction('消费','consume');
				}, 400);
			}
		}, '-', {
			xtype : 'button',
			text : '充值',
			width : 80,
			icon : 'images/deposit.png',
			handler : function(btn){
				var memberManage = vip.viewport.west.down('vipwestmembermanage');
				memberManage.expand();
				setTimeout(function(){
					memberManage.handleAction('充值','deposit');
				}, 400);
			}
		},  '-', {
			xtype : 'button',
			text : '会员档案',
			width : 80,
			icon : 'images/member_info.png',
			handler : function(btn){
				var memberManage = vip.viewport.west.down('vipwestmembermanage');
				memberManage.expand();
				setTimeout(function(){
					memberManage.handleAction('会员档案','member');
				}, 400);
			}
		}, '->', '-', {
			xtype : 'button',
			padding : '2 5 2 5',
			icon : 'images/manage.png',
			iconAlign : 'left',
			scale : 'medium',
			text : '你好  <span style="font-weight:bold">'+window.operator.operatorName+'</span> （'+window.operator.ruleName+'）',			
			menu : {
				xtype : 'menu',
				items : [ {
					text : '我的帐号',
					icon : 'images/my_info.png',
					handler:function(){
							me.showMyInfo();
					}
					
				}/*, {					
					text : '主题',
					icon : 'images/theme.png',
					menu : {
						items : [ {
							value : 'access',
							text : '高对比度',
							group: 'theme',
							checked : theme == 'access',
							hidden : true,
							handler : setTheme
						}, {
							value : 'classic',
							text : '经典',
							group: 'theme',
							checked : theme == 'classic',
							handler : setTheme
						}, {
							value : 'gray',
							text : '银灰',
							group: 'theme',
							checked : theme == 'gray',
							handler : setTheme
						}, {
							value : 'neptune',
							text : '星辰',
							group: 'theme',
							checked : theme == 'neptune',							
							handler : setTheme
						} ]
					}
				} */]
			}
		}, '-', {
			text : '退出',
			icon : 'images/sign_out.png',
			iconAlign : 'left',
			scale : 'medium',
			handler : function() {
				Ext.MessageBox.confirm('警告', '你确定你要退出吗？', function(btn) {
					if (btn == 'yes') {
						SignAction.signOut(function(actionResult){
							if(actionResult.success){
								window.location.reload(true);
							} else {
								
							}
						});
					}
				});
			}
		}];
		return topBarItems;
	},
	showMyInfo : function(){
		var operatorWindow = Ext.create('VIP.operator.OperatorInfoWindow', {
			title : window.operator.operatorName
		});
		operatorWindow.show();
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createTopBarItems()
		});
		this.callParent(arguments);
	}
});

Ext.define('VIP.Viewport', {
	extend :  Ext.Viewport ,
	alias : [ 'widget.vipviewport' ],
	                                        
	layout : 'border',
	
	initComponent : function() {
		this.callParent(arguments);		
	},

	items : [ {
		xtype : 'viptopbar'
	}, {
		xtype : 'vipcenter'
	}]
});

Ext.define('VIP.common.LoginWindow', {
	extend :  Ext.window.Window ,
	xtype : 'loginwindow',
    plain: true,  
    header: false,  
    border: false,  
    closable: false,  
    draggable: false,  
    frame:false,  
    resizable :false,  
	margin : 0,
	padding :0 ,
	width:420,
	
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'form',
			region : 'center',
			border: false,  
			layout : {
				type : 'vbox',
				align : 'left',
				pack : 'center'
			},	
			items : [ {
				xtype : 'panel',
				region : 'center',
				margin : '20 0 5 0',
				border: false,  
				
				layout : {
					type : 'hbox',
					align : 'left',
					pack : 'center'
				},	
				items : [{
					xtype:'label',
					text:'登录',
					margin : '0 5 5 70',
					style: {
						fontFamily: '微软雅黑',
						fontSize : '26px',
						color : '#434343'
			        }
				},{
					xtype:'label',
					text:'魔客会员营销管理系统',
					margin : '15 5 5 10',
					style: {
						fontSize :'13px',
						fontFamily: '微软雅黑',
						color : '#434343'
			        }
				}]
			},{
				border: false,
				xtype : 'box',
				width:'100%',
				html:'<div style="text-align:center;color:#666;">::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::</div>'
			},{
				xtype : 'panel',
				margin : '5 0 0 0',
				border: false,  
				layout : {
					type : 'hbox'
				},	
				items : [{
					xtype : 'label',
					text : '用户名:',
					margin : '30 0 0 50',
					style: {
						fontSize :'13px',
						fontFamily: '宋体',
						color : '#000'
			        }
				},{
					xtype : 'textfield',
					allowBlank : false,
					labelAlign :'left',
					name : 'accountName',
					itemId:'accountName',
					margin : '20 5 5 20',
					emptyText : '用户名',
					value : '',
					height : 35,
					width:250,
					selectOnFocus : true,
					listeners : {
						afterrender : {
							fn :  function(){
								this.focus();
							},
							delay : 500
						},
						specialKey : function(field, e) {
							if (e.keyCode == 13) {
								setTimeout(function(){
									me.down('#password').focus(true);
								}, 100);
							}
						}
					}
				}]
			},{
				xtype : 'panel',
				margin : '10 0 10 0',
				border: false,  
				layout : {
					type : 'hbox'
				},	
				items : [{
					xtype : 'label',
					text : '密　码:',
					margin : '20 0 0 50',
					style: {
						fontSize :'13px',
						fontFamily: '宋体',
						color : '#000'
			        }
				},{
					xtype : 'textfield',
					allowBlank : false,
					itemId : 'password',
					name : 'password',
					margin : '10 5 5 20',
					emptyText : '密　码',
					height : 35,
					inputType : 'password',
					value : '',
					width:250,
					selectOnFocus : true,
					listeners : {
						specialKey : function(field, e) {
							if (e.keyCode == 13) {
								me.signIn();
							}
						}
					}
				}]
			},{
				border: false,
				margin : '10 5 5 115',
				padding : '0 0 5 0',
				layout : {
					type : 'hbox',
					align : 'left',
					pack : 'center'
				},	
				items : [ {
					xtype : 'button',
					text : '<font color="#fff" style="font-size:14px;font-family:\'宋体\';">登录</font>',
					width: 250,
					margin :'0 5 0 0',
					style: {
						background: "#299816",
						color : '#fff'
			        },
					padding : '10 5',
					handler : function(btn) {
						me.signIn();
					}
				}/*,{
					xtype : 'button',
					text : '重置',
					margin :'0 0 0 5',
					width: 65,
					padding : 5,
					handler : function(btn) {
						var winform = btn.up('signinform');
						var form = winform.down('form').getForm();
						form.reset();
					}
				}*/]
			},{
				xtype : 'label',
				margin : '0 0 35 280',
				html : '<a href="admin/index.html" class="fontlink">Admin登录界面</a>'
			}]
		}];
	

		return items;
	},

	/*createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '登录',
			handler : function(btn) {
				me.signIn();
			}
		}, {
			text : '重置',
			handler : function(btn) {
				var winform = btn.up('signinform');
				var form = winform.down('form').getForm();
				form.reset();
			}
		} ];

		return buttons;
	},*/

	initComponent : function() {
		Ext.apply(this, {
/*			buttons : this.createButtons(),*/
			items : this.createView()
		});
		/*alert();*/
		this.callParent(arguments);
	},
	
	signIn : function(){
		var me = this;
		me.setLoading('登录中...');
		var form = me.down('form').getForm();
		var values = form.getValues();
		values.password = base64encode(values.password);
		if (form.isValid()) {
			
			OperatorAction.login(domainPrefix,values.accountName,values.password, function(actionResult) {
				me.setLoading(false);
				if (actionResult.success) {
					window.operator = actionResult.data.operator;
					window.contextPath = actionResult.data.contextPath;
					window.localStorage.setItem('allowPublishCoupons', actionResult.data.allowPublishCoupons);
					window.localStorage.setItem('allowPublishMessages', actionResult.data.allowPublishMessages);
					window.location.reload();
				} else {
					Ext.Msg.info(actionResult.message,function(){
						setTimeout(function(){
							me.down('#accountName').focus(true);
						}, 100);
					});
				}
			});
		} else {
			if (values.accountName == null || values.accountName == "") {
				Ext.Msg.info("请输入管理员帐号");
			} else if (values.password == null || values.password == "") {
				Ext.Msg.info("请输入管理员密码");
			}
			me.setLoading(false);
		}
	}
});
Ext.define('VIP.common.SignInViewport', {
	extend :  Ext.Viewport ,
	xtype : 'signinform',
	                                      
	layout : 'fit',
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'panel',
			border : false,
			width:'100%',
			layout : 'anchor',	
			items : [{
				xtype : 'box',
				height : '103px',
				anchor : '100%',
				html : '<div style="background-image: -moz-linear-gradient(top, #8fa1ff, #013879);background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #8fa1ff), color-stop(1, #013879));filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=#8fa1ff, endColorstr=#013879,GradientType=0 );background: -ms-linear-gradient(top, #8fa1ff 0%, #013879 100%);height:100%;"><img style="line-height:100%" src="images/login-picture.png "></div><div style="background-image: url(\'images/world-wallpaper.jpg\');background-repeat: repeat-x; height: 3px"></div>'
			},{
				xtype : 'box',
				anchor : '100% -193px',
				html : '<div style="position: absolute; z-index: 999; top:20%; left:20%"><p style="font-family:\'微软雅黑\';font-Size:26px;color:#434343">魔客会员管理系统</p><p style="font-family:\'微软雅黑\';font-Size:13px;color:#434343">魔客会员管理系统用科学的方法给您带来无限的效益</p></div><img style="width:100%;height:100%" src="images/world-wallpaper.jpg ">'
			},{
				xtype : 'box',
				height : '90px',
				anchor : '100%',
				html : '<div style="text-align: center;padding-top:20px;"><a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">产品主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">公司主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">关于我们</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">联系我们</a><br/><p>昆明泽天科技  &copy;2013 All Rights Reserved</p></div>'
			}]
			
		}];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});
		
		this.callParent(arguments);
		var loginWin = Ext.create('VIP.common.LoginWindow');
		loginWin.show();
		
		this.on('resize', function(viewport, newWidth, newHeight, oldWidth, oldHeight){
			if(newWidth<500){
				loginWin.setPosition(0, newHeight*0.2);
			}else {
				loginWin.setPosition(newWidth-500, newHeight*0.2);
			}
			
		}, this);
	}
	
});
Ext.define('VIP.member.store.MemberInfo',{
	extend:  VIP.store.BaseStore ,
	                                                            
	model : 'VIP.member.model.Member',
	sorters: [{
        property: 'lastUpdateTime',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'MemberAction.getMemberById',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.member.model.ConsumeSummary', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'year',
		type : 'string'
	}, {
		name : 'month',
		type : 'string'
	}, {
		name : 'yearMonth',
		type : 'string'
	}, {
		name : 'consumeTotal',
		type : 'number'
	}]
});
Ext.define('VIP.member.store.ConsumeSummary',{
	extend:  VIP.store.BaseStore ,
	                                                                    
	model : 'VIP.member.model.ConsumeSummary',
	sorters: [],
	proxy : {
		type : 'direct',
		directFn : 'MemberAction.getConsumeGroupByMonth',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: false
});
Ext.define('VIP.member.MemberConsumeSummaryChart', {
	extend :  Ext.chart.Chart ,
	alias : [ 'widget.memberconsumesummarychart' ],
	                                                 
	
	animate : true,
	shadow : true,
	axes : [ {
		type : 'Numeric',
		position : 'left',
		fields : [ 'consumeTotal' ],
		title : '消费金额',
		grid : true,
		minimum : 0
	}, {
		type : 'Category',
		position : 'bottom',
		fields : [ 'yearMonth' ],
		title : ''
	} ],
	series : [ {
		type : 'column',
		axis : 'left',
		highlight : true,
		tips : {
			trackMouse : true,
			width : 140,
			height : 28,
			renderer : function(storeItem, item) {
				this.setTitle(storeItem.get('yearMonth') + ': ' + storeItem.get('consumeTotal') + ' 元');
			}
		},
		label : {
			display : 'insideEnd',
			field : 'consumeTotal',
			orientation : 'horizental',
			color : '#333'
		},
		xField : 'yearMonth',
		yField : 'consumeTotal'
	} ],
	background : {
		gradient : {
			id : 'backgroundGradient',
			angle : 45,
			stops : {
				0 : {
					color : '#ffffff'
				},
				100 : {
					color : '#eaf1f8'
				}
			}
		}
	},
	initComponent : function() {
		this.store = Ext.create('VIP.member.store.ConsumeSummary', {

		});
		this.callParent(arguments);
	},

	load : function(userId) {
		if (userId) {
			this.userId = userId;
		}

		var endDate = new Date();

		var year = endDate.getFullYear() + '';
		var month = endDate.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		} else {
			month += '';
		}
		var format = 'Y年m月d日';
		var startDate = Ext.Date.parse(year - 1 + '年' + month + '月01日', format);

		this.store.getProxy().extraParams = {
			userId : this.userId,
			startDate : Ext.Date.format(startDate, format),
			endDate : Ext.Date.format(endDate, format)
		};
		this.store.load();
	}
});
Ext.define('VIP.member.Detail', {
	extend :  VIP.widget.form.Panel ,
	alias : [ 'widget.detail' ],
	                                                                                                                                            
	title : '基本信息',
	layout : 'fit',
	border : false,
	
	padding : '5 25 5 5',
	marking : null,
	createView : function() {
		var me = this;
		var items = [{
			xtype : 'container',
			layout : {
				type : 'vbox',
				align : 'center'
			},
			defaults : {				
				width:'100%'
			},
			items : [ {
				xtype : 'container',
				layout : {
					type : 'hbox',
					align : 'center'
				},
				defaults : {
					height : 330
				},
				items : [ {
					xtype : 'fieldset',
					border : false,
					width : '35%',
					margin : 5,
					layout : {
						type : 'table',
						columns :1
					},
					defaultType : 'displayfield',
					defaults : {
						labelAlign : 'right',
						width : 300,
						labelWidth : 110,
						padding : 1,
						labelStyle : 'font-size:5pt',
						fieldStyle : 'font-size:5pt;font-weight:bold;'
					},
					items : [ {
						name : 'userAccountName',
						fieldLabel : '会员Email'
					},{
						name : 'userScreenName',
						fieldLabel : '会员昵称'
					},  {
						xtype : 'fieldcontainer',
						fieldLabel : '会员余额',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : 'currentDeposit',
							fieldStyle : 'font-size:12pt; color:red;font-weight:bold;'
						}, {
							xtype : 'label',
							margin : '3 0 0 5',
							text : '元'
						} ]
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '总计消费',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : 'totalConsume',
							fieldStyle : 'font-size:12pt;font-weight:bold;'
						}, {
							xtype : 'label',
							margin : '3 0 0 5',
							text : '元'
						} ]
					}, {
						name : 'membershipTypeName',
						fieldLabel : '会员等级'
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '折扣百分比',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : 'discountRate',
							fieldStyle : 'font-size:12pt; color:green;font-weight:bold;'
						}, {
							xtype : 'label',
							margin : '3 0 0 5',
							text : '%'
						} ]
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '返现百分比',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : 'moneyBackRate',
							fieldStyle : 'font-size:12pt; color:#FF9912;font-weight:bold;'
						}, {
							xtype : 'label',
							margin : '3 0 0 5',
							text : '%'
						} ]
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '积分百分比',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : '',
							fieldStyle : 'font-size:12pt; color:#FF9912;font-weight:bold;'
						}, {
							xtype : 'label',
							margin : '3 0 0 5',
							text : '%'
						} ]
					} , {
						xtype : 'fieldcontainer',
						fieldLabel : '积分兑现百分比',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : '',
							fieldStyle : 'font-size:12pt; color:#FF9912;font-weight:bold;'
						}, {
							xtype : 'label',
							margin : '3 0 0 5',
							text : '%'
						} ]
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '总积分',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : '',
							fieldStyle : 'font-size:12pt; color:#FF9912;font-weight:bold;'
						}, {
							xtype : 'label',
							margin : '3 0 0 5',
							text : '分'
						} ]
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '剩余积分',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : '',
							fieldStyle : 'font-size:12pt; color:#FF9912;font-weight:bold;'
						}, {
							xtype : 'label',
							margin : '3 0 0 5',
							text : '分'
						} ]
					}]
				}, {
					xtype : 'container',
					itemId : 'chartcontainer',
					width : '65%',
					padding : '10 0 0 0',
					layout : 'fit',
					
					items : [ {
						xtype : 'memberconsumesummarychart'
					} ]
				} ]
			},{
				xtype : 'button',
				text : '更改会员等级',				
				icon : 'images/change_level.png',
				scale : 'large',				
				height : 60,
				padding : 10,
				cls : 'big-button',
				hidden : me.marking==null? true : false,
				handler : function() {
					me.changeMemberType();
				}
			}]		    
		} ];
		return items;
		
	},
	changeMemberType : function(){
		var me = this;
		if( me.resultData.membershipTypeId==null){
			return;
		}
		MemberAction.canChangeMembershipType(function(result){
			if(result.success){
				Ext.create('VIP.member.ChangeMemberType', {
					membershipTypeId : me.resultData.membershipTypeId,
					userIds : [me.resultData.userId],
					
					onSave : {
						fn : function(){
							me.load();
							if(me.onSave){
								me.onSave.fn.call(this.onSave.scope);
							}
						},
						scope : me
					}
				}).show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});
		this.callParent(arguments);
	},

	load : function(userId) {
		var me = this;

		if(userId){
			this.userId = userId;
		}

		MemberAction.getMemberById(this.userId, function(result) {
			if(result.success){
				if(!me.isDestroyed){
					var data = result.data;			
					me.resultData = data;
					me.getForm().setValues(data);
					me.down('memberconsumesummarychart').load(me.userId);
				}
			}else{
				Ext.Msg.error(result.message);
			}
		});
		if(me.onLoad){
			me.onLoad.fn.call(this.onLoad.scope);
		}
	}
});
Ext.define('VIP.member.DetailMain', {
	extend :  Ext.tab.Panel ,
	alias : [ 'widget.detailmain' ],
	                                                                                                                            
	tabPosition : 'bottom',
	icon : 'images/basic_info.png',
	userId : null,
	marking : null,
	
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'detail',
			userId : this.userId,
			icon : 'images/basic_info.png',
			marking : me.marking,
			onSave : me.onSave,
			onLoad : me.onLoad,
			listeners : {
				activate : {
					fn : function(detail){
						detail.load(me.userId);
					},
					single : true
				}
			}
		}, {
			xtype : 'depositgrid',
			title : '充值记录',			
			userId : this.userId,
			autoLoad : false,
			listeners : {
				activate : {
					fn : function(grid){
						grid.refresh();
					},
					single : true
				}
			}
		}, {
			xtype : 'withdrawhistorygrid',
			title : '取款记录',			
			userId : this.userId,
			autoLoad : false,
			listeners : {
				activate : {
					fn : function(grid){
						grid.refresh();
					},
					single : true
				}
			}
		}, {
			xtype : 'consumegrid',
			title : '消费记录',			
			userId : this.userId,
			autoLoad : false,
			listeners : {
				activate : {
					fn : function(grid){
						grid.refresh();
					},
					single : true
				}
			}
		} ];

		return items;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});

		this.callParent(arguments);		
	}
});
Ext.define('VIP.member.model.CashCouponManage', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'target_number',
		type : 'string'
	}, {
		name : 'content',
		type : 'int'
	}, {
		name : 'time',
		type : 'datetime'
	}, {
		name : 'operator_name',
		type : 'string'
	}, {
		name : 'shop_name',
		type : 'string'
	}, {
		name : 'phoneCount',
		type : 'int'
	}, {
		name : 'smsCount',
		type : 'int'
	} ]
});
Ext.define('VIP.member.model.ConsumerMember', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'target_number',
		type : 'string'
	}, {
		name : 'content',
		type : 'int'
	}, {
		name : 'time',
		type : 'datetime'
	}, {
		name : 'operator_name',
		type : 'string'
	}, {
		name : 'shop_name',
		type : 'string'
	}, {
		name : 'phoneCount',
		type : 'int'
	}, {
		name : 'smsCount',
		type : 'int'
	} ]
});
Ext.define('VIP.member.store.CashCouponManage',{
	extend:  VIP.store.BaseStore ,
	                                                                      
	model: 'VIP.member.model.CashCouponManage',
	proxy : {
		type : 'direct',
		directFn : 'DepositAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.member.store.ConsumerMember',{
	extend:  VIP.store.BaseStore ,
	                                                                    
	model: 'VIP.member.model.ConsumerMember',
	proxy : {
		type : 'direct',
		directFn : 'DepositAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.message.ChooseTemplate', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.choosetemplate' ],
	                                      
	layout : 'fit',
	title:'选择短信模板',
	width : 400,
	height : 400,
	buttonAlign : 'center',
	createView : function() {
		var me = this;

		var items = [{
			xtype:'staticsmscontent',
			isChose:true,
			setContent : me.setContent,
			onClose : {
				fn : function(){
					me.close();
				},
				scope : me
			}
		}];
		return items;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});
		this.callParent(arguments);
	}
});
Ext.define('VIP.message.EditCouponWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.editcouponwindow' ],
	                                       
	  
	icon : 'images/promotion.png',
	layout : 'fit',
	padding : 5,
	title : '修改活动信息',
	modal : true,
	border : false,
	resizable:false,
	width : 462,
	height : 590,
	num: 1,
	createButtons : function() {
		var me = this;
		
		var buttons = [{
			text : '添加描述',
			handler : function(){
				me.addDescription();
			}
		},{
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				me.save();
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
			bodyPadding : 10,
			autoScroll: true,
			layout : {
				type : 'table',
				columns : 2
			},
			defaults : {
				labelWidth : 60,
				labelAlign : 'right'
			},
			items : [{
				xtype : 'textfield',
				fieldLabel : '标题',
				name : 'title',		
				colspan : 2,
				width : 400,
				maxLength:10,
				maxLengthText:'不可超过10字符',
				vtype: 'stringblank',
				allowBlank : false,
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.down('#initDate').focus(true);
							}
						},
						delay : 200
					}
				}
			}, {
				xtype : 'datefield',
				fieldLabel : '开始日期',
				name : 'initDate',
				itemId : 'initDate',
				allowBlank : false,
				vtype : 'daterange',
				endDateField : 'expireDate',
				width : 195,
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.down('#expireDate').focus(true);
							}
						},
						delay : 200
					}
				}
			}, {
				xtype : 'datefield',
				fieldLabel : '结束日期',
				name : 'expireDate',
				itemId : 'expireDate',
				minValue : new Date(),
				vtype : 'daterange',
				startDateField : 'initDate',
				width : 195,
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.down('#content').focus(true);
							}
						},
						delay : 200
					}
				}
			},,{
				xtype:'panel',
				itemId: 'description',
				border:false,
				colspan : 2,
				items:[]
			}]
		}];

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
	
	load : function(messageId) {
		var me = this;

		if(messageId){
			this.messageId = messageId;
		}

		MemberAction.findOfferById(this.messageId, function(result) {			
			var data = result.data;			
			me.resultData = data;
			me.down('vipform').getForm().setValues({
				title : data.title,
				initDate : data.startDate,
				expireDate : data.endDate
				//content : data.content
			});
			var date = new Date();
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			if(me.down('#initDate').getValue().getTime()>=date.getTime()){
				me.down('#initDate').setMinValue(date);
				me.down('#initDate').setReadOnly(false);
			}else{
				me.down('#initDate').setMinValue(data.initDate);
				me.down('#initDate').setReadOnly(true);
			}
			if(data.content.lenth){
				for(var i=0;i<data.content.lenth;i++){
					me.addDescription(data.content, '../'+data.pictureUrl);
				}
			}else{
				me.addDescription(data.content, '../'+data.pictureUrl);
			}
			
		});
	},
	
	choosePicture : function(){
		var picture = this;
		var finder = new CKFinder();
		finder.selectActionFunction = function( fileUrl, data ) {
			picture.setSrc(fileUrl);
		};
		finder.popup(720, 540);
	},
	addDescription : function(content,pictureUrl,id){
		var me =this;
		if(pictureUrl==null){
			pictureUrl='images/default_image.png';
		}
		var description = Ext.create('Ext.form.Panel',{
			border:false,
			items:[{
				xtype:'fieldset',
				margin:'5 10',
				padding: '5 40',
				width:390,
				title:'描述'+me.num,
				items:[{
					xtype : 'hiddenfield',
					value : id
				},{
					xtype : 'image',
					name : 'picture',
					style : 'border:1px dashed #AAA;cursor:pointer',
					src: pictureUrl,
					width : 300,
					height : 225,
					colspan : 2,
					listeners : {
						afterrender : function(image){
							image.getEl().on('click', me.choosePicture, image);
						}
					}
				}, {
					xtype : 'textareafield',				
					name : 'content',
					itemId : 'content',
					emptyText : '活动详情',
					value : content,
					width : 300,
					height : 100,
					maxLength:500,
					maxLengthText:'不可超过500字符',
					margin : '3 0 0 0',
					colspan : 2,
					listeners : {
						change : function(field, key){
							var length = field.getValue().length;
							var len = 500-length;
							if(len>0&&len!=500){
								field.nextSibling().setText("还可输入"+len+"个字符");
							}else if(len==0||len==500){
								field.nextSibling().setText("");
							}else{
								field.nextSibling().setText("已经超出"+(-len)+"个字符");
							}
						}
						
					}		
				},{
					xtype: 'label',
					margin:'0 100',
					colspan : 2,
					style : 'color:red',
					text:''
				},{
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'button',
						width: 140,
						margin: '0 20 20 0',
						text: '删除本描述',
						handler: function(field){
							var panel = me.down('#description');
							if(panel.items.length>1){
								panel.remove(field.up().up());
							}else{
								Ext.Msg.error('至少添加一条描述');
							}
							
						}
					},{
						xtype: 'button',
						width: 140,
						margin: '0 0 20 0',
						text: '保存本描述',
						handler: function(field){
							var panel = me.down('#description');
							if(panel.items.length>1){
								panel.remove(field.up().up());
							}else{
								Ext.Msg.error('至少添加一条描述');
							}
							
						}
					}]
				}]
			
			}]
		});
		me.num++;
		this.down('#description').add(description);
	},
	save : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		var pictureUrl = new Array();
		var oldPictures = this.query('[name=picture]');
		for(var i=0;i<oldPictures.length;i++){
			if(oldPictures[i].src.indexOf("default_image.png") >= 0 ){
				Ext.Msg.alert('提示','请添加'+oldPictures[i].up().title+'的图片');
				return;
			}
			if(oldPictures[i].src && oldPictures[i].src.indexOf("http") == -1 ){
				pictureUrl[i] = window.location.protocol + '//' + window.location.host + oldPictures[i];	
			} else {
				pictureUrl[i] = oldPictures[i];
			}
		}
		
		
		if (form.isValid()) {
			var values = form.getValues();
			Ext.apply(values, {
				messageId : this.messageId,
				pictureUrl : pictureUrl
			});
			
			MemberAction.editOffer(values, function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('修改成功.', function(){
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
});
Ext.define('VIP.message.EditNewsWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.editnewswindow' ],
	                                       
	  
	icon : 'images/promotion.png',
	layout : 'fit',
	padding : 5,
	title : '修改活动信息',
	modal : true,
	border : false,
	resizable:false,
	width : 432,
	height : 560,
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				me.save();
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
			bodyPadding : 10,
			layout : {
				type : 'table',
				columns : 2
			},
			defaults : {
				labelWidth : 60,
				labelAlign : 'right'
			},
			items : [{
				xtype : 'textfield',
				fieldLabel : '标题',
				name : 'title',		
				colspan : 2,
				width : 400,
				maxLength:10,
				maxLengthText:'不可超过10字符',
				vtype: 'stringblank',
				allowBlank : false,
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.down('#initDate').focus(true);
							}
						},
						delay : 200
					}
				}
			}, {
				xtype : 'image',
				name : 'picture',
				style : 'border:1px dashed #AAA;cursor:pointer',
				width : 400,
				height : 300,
				colspan : 2,
				listeners : {
					afterrender : function(image){
						image.getEl().on('click', me.choosePicture, me);
					}
				}
			}, {
				xtype : 'textareafield',				
				name : 'content',
				itemId : 'content',
				emptyText : '活动详情',
				width : 400,
				height : 135,
				maxLength:500,
				maxLengthText:'不可超过500字符',
				margin : '3 0 0 0',
				colspan : 2,
				listeners : {
					change : function(field, key){
						var length = field.getValue().length;
						var len = 500-length;
						if(len>0&&len!=500){
							me.down('#lengthInfo').setText("还可输入"+len+"个字符");
						}else if(len==0||len==500){
							me.down('#lengthInfo').setText("");
						}else{
							me.down('#lengthInfo').setText("已经超出"+(-len)+"个字符");
						}
					}
					
				}		
			},{
				xtype: 'label',
				margin:'0 140',
				colspan : 2,
				style : 'color:red',
				itemId : 'lengthInfo',
				text:''
			}]
		}];

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
	
	load : function(messageId) {
		var me = this;

		if(messageId){
			this.messageId = messageId;
		}

		MemberAction.getVIPMessageById(this.messageId, function(result) {			
			var data = result.data;			
			me.resultData = data;
			me.down('vipform').getForm().setValues({
				title : data.title,
				content : data.content
			});
			var picture = me.down('image[name=picture]');
			picture.setSrc('../' + data.pictureUrl);
		});
	},
	
	choosePicture : function(){
		var picture = this.down('image[name=picture]');
		var finder = new CKFinder();
		finder.selectActionFunction = function( fileUrl, data ) {
			picture.setSrc(fileUrl);
		};
		finder.popup(720, 540);
	},
	
	save : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		var pictureUrl = '';
		var oldUrl = this.down('[name=picture]').src + '';
		if(oldUrl && oldUrl.indexOf("http") == -1 ){
			pictureUrl = window.location.protocol + '//' + window.location.host + oldUrl;	
		} else {
			pictureUrl = oldUrl;
		}
		
		if (form.isValid()) {
			var values = form.getValues();
			Ext.apply(values, {
				messageId : this.messageId,
				pictureUrl : pictureUrl
			});
			
			MemberAction.editVIPMessage(values, function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('修改成功.', function(){
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
});
Ext.define('VIP.message.SendMsgWin', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.sendmsgwin' ],
	layout : 'fit',
	width : 360,
	height : 400,
	tel : null,
	ids:null,
	buttonAlign : 'center',
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'form',
			frame : true,

			width : 400,
			layout : 'anchor',
			border : false,
			bodyPadding : 10,
			fieldDefaults : {
				labelAlign : 'top',
				labelWidth : 100,
				labelStyle : 'font-weight:bold'
			},
			defaults : {
				anchor : '100%',
				margins : '0 0 10 0'
			},
			items : [ {
				xtype : 'textareafield',
				fieldLabel : '手机号码',
				allowBlank : false,
				disabled : true,
				height : 60,
				value:me.tel
			}, {
				xtype : 'textareafield',
				fieldLabel : '短信内容',
				labelAlign : 'top',
				name:'content',
				itemId:'content',
				height : 240,
				margin : '0',
				allowBlank : false
			} ]
		} ];
		return items;
	},
	createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '选择模板',
			scale : 'medium',
			itemId : 'choose',
			handler : function(btn) {
				Ext.create('VIP.message.ChooseTemplate', {
					modal:true,
					frame: true,
					setContent : {
						fn : function(content){
							me.down('#content').setValue(me.down('#content').getValue()+content);
						},
						scope : this
					}
				}).show();
			}
		},{
			text : '发送',
			icon : 'images/printer-22.png',
			scale : 'medium',
			itemId : 'send',
//			disabled : true,
			handler : function(btn) {
				me.sendMsg(btn);
			}
		}, {
			text : '关闭',
			icon : 'images/cancel-22.png',
			scale : 'medium',
			itemId : 'close',
//			disabled : true,
			handler : function(btn) {
				me.close();
			}
		} ];
		return buttons;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
	},

	sendMsg : function(btn) {
		var me=this;
		var values=me.down('form').getValues();
		var content=values["content"];
		btn.disable();
		SMSMessageAction.broadCastingMessage({
			tel : me.tel,
			content:content,
			ids:me.ids
		}, function(actionResult) {
			if (actionResult.success) {
				Ext.Msg.info("发送成功");
				me.down('form').getForm().reset();
			}
		});
		btn.enable();
	}
});
Ext.define('VIP.message.model.Coupon', {
	extend :  Ext.data.Model ,
	fields : [{
		name : 'id',
		type : 'string'
	}, {
		name : 'title',
		type : 'string'
	}, {
		name : 'endDate',
		type : 'string'
	}, {
		name : 'startDate',
		type : 'string'
	}, {
		name : 'content',
		type : 'string'
	} ,{
		name :'createTime',
		type : 'string'
	}]
});
Ext.define('VIP.message.model.News', {
	extend :  Ext.data.Model ,
	fields : [{
		name : 'id',
		type : 'string'
	}, {
		name : 'title',
		type : 'string'
	}, {
		name : 'content',
		type : 'string'
	} ,{
		name :'createTime',
		type : 'string'
	}]
});
Ext.define('VIP.message.store.Coupon',{
	extend:  VIP.store.BaseStore ,
	                                                             
	model : 'VIP.message.model.Coupon',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'createTime',
        direction: 'DESC'
    }],
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'MemberAction.listCoupons',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.message.store.News',{
	extend:  VIP.store.BaseStore ,
	                                                           
	model : 'VIP.message.model.News',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'createTime',
        direction: 'DESC'
    }],
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'MemberAction.listVIPMessage',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.reports.ConsumeInfo', {
	extend :  Ext.window.Window ,
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
				itemId : 'orderNumber',
				colspan : 2
			}, {
				xtype : 'displayfield',
				fieldLabel : '会员Email',
				itemId : 'userName'
			}, {
				xtype : 'displayfield',
				fieldLabel : '会员昵称',
				itemId : 'userScreenName'
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
		me.down("#orderNumber").setValue(this.params.record.orderNumber);
		me.down("#shopName").setValue(this.params.record.shopName);
		me.down("#time").setValue(this.params.record.time);
		me.down("#userName").setValue(this.params.record.userName);
		me.down("#userScreenName").setValue(this.params.record.userScreenName);
		me.down("#consumptionAmount").setValue(this.params.record.consumptionAmount);
	}
});
Ext.define('VIP.reports.DepositInfo', {
	extend :  Ext.window.Window ,
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
				itemId : 'orderNumber',
				colspan : 2
			}, {
				xtype : 'displayfield',
				fieldLabel : '会员Email',
				itemId : 'userName'
			}, {
				xtype : 'displayfield',
				fieldLabel : '会员昵称',
				itemId : 'userScreenName'
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
		
		me.down("#userScreenName").setValue(this.params.record.userScreenName);
		me.down("#userName").setValue(this.params.record.userName);
		me.down("#operatorName").setValue(this.params.record.operatorName);
		me.down("#shopName").setValue(this.params.record.shopName);
		me.down("#orderNumber").setValue(this.params.record.orderNumber);
		me.down("#realAmount").setValue(this.params.record.realAmount);
		me.down("#rewardAmount").setValue(this.params.record.rewardAmount);
		me.down("#time").setValue(this.params.record.time);
		me.down("#currentDeposit").setValue(this.params.record.currentDeposit);
		me.down("#notes").setValue(this.params.record.notes);
	}
});
Ext.define('VIP.reports.WithdrawInfo', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.withdrawinfo' ],
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
				fieldLabel : '取款单号',
				itemId : 'orderNumber',
				colspan : 2
			}, {
				xtype : 'displayfield',
				fieldLabel : '会员Email',
				itemId : 'userName'
			}, {
				xtype : 'displayfield',
				fieldLabel : '会员昵称',
				itemId : 'userScreenName'
			}, {
				xtype : 'displayfield',
				fieldLabel : '取款金额',
				itemId : 'amount'
			}, {
				xtype : 'displayfield',
				fieldLabel : '取款时间',
				itemId : 'time'
			}, {
				xtype : 'displayfield',
				fieldLabel : '卡内余额',
				itemId : 'currentDeposit'
			}, {
				xtype : 'displayfield',
				fieldLabel : '取款时间',
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
				fieldLabel : '取款备注',
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

		me.down("#userScreenName").setValue(this.params.record.userScreenName);
		me.down("#userName").setValue(this.params.record.userName);
		me.down("#operatorName").setValue(this.params.record.operatorName);
		me.down("#shopName").setValue(this.params.record.shopName);
		me.down("#orderNumber").setValue(this.params.record.orderNumber);
		me.down("#amount").setValue(this.params.record.amount);
		me.down("#time").setValue(this.params.record.time);
		me.down("#currentDeposit").setValue(this.params.record.currentDeposit);
		me.down("#notes").setValue(this.params.record.notes);
	}
});
Ext.define('VIP.reports.model.MemberInfo', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'userId',
		type : 'string'
	}, {
		name : 'userName',
		type : 'string'
	}, {
		name : 'cardTypeName',
		type : 'string'
	}, {
		name : 'operatorName',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'quickShoppingDiscountRatePercent',
		type : 'string'
	}, {
		name : 'currentDeposit',
		type : 'string'
	}, {
		name : 'arrears',
		type : 'string'
	}, {
		name : 'lastConsumeDate',
		type : 'string'
	}, {
		name : 'mobile',
		type : 'string'
	}, {
		name : 'birthday',
		type : 'string'
	}, {
		name : 'sex',
		type : 'string'
	}, {
		name : 'password',
		type : 'string'
	}, {
		name : 'sendsDate',
		type : 'string'
	}, {
		name : 'expireDate',
		type : 'string'
	}, {
		name : 'credentialType',
		type : 'string'
	}, {
		name : 'credentialId',
		type : 'string'
	}, {
		name : 'introducerCardId',
		type : 'string'
	}, {
		name : 'telephone',
		type : 'string'
	}, {
		name : 'email',
		type : 'string'
	}, {
		name : 'address',
		type : 'string'
	}, {
		name : 'organization',
		type : 'string'
	}, {
		name : 'notes',
		type : 'string'
	}, {
		name : 'lastUpdateTime',
		type : 'string'
	}, {
		name : 'state',
		type : 'string'
	}]
});
Ext.define('VIP.reports.store.DepositHistory',{
	extend:  VIP.store.BaseStore ,
	                                                                     
	model: 'VIP.reports.model.DepositHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'DepositAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    }
});
Ext.define('VIP.reports.store.IntegralHistory',{
	extend:  VIP.store.BaseStore ,
	                                                                      
	model: 'VIP.reports.model.IntegralHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'DepositAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    }
});
Ext.define('VIP.reports.store.WithdrawHistory',{
	extend:  VIP.store.BaseStore ,
	                                                                      
	model : 'VIP.reports.model.WithdrawHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'WithdrawAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    }
});
Ext.define('VIP.search.MemberGrid', {
	extend :  VIP.member.MemberGrid ,
	alias : [ 'widget.searchmembergrid' ],
	
	initComponent : function() {
		this.on('itemdblclick', this.onRecordSelect.fn, this.onRecordSelect.scope);
		this.on('selectionchange', this.onSelectChange.fn, this.onSelectChange.scope);
		
		this.callParent(arguments);
	},
	doQuery : function(values) {
		var params = this.getStore().getProxy().extraParams;
		var me = this;
		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}
		
		if (values.userId != "") {
			params.userId = values.userId;
		} else {
			params.userId = undefined;
		}
		if (values.userScreenName != "") {
			params.accountName = values.userScreenName;
		} else {
			params.accountName = undefined;
		}		
		if(values.telephone != ""){
			params.telephone = values.telephone;
		} else {
			params.telephone = undefined;
		}
		/*me.up().down("#userScreenName").setValue("");
		me.up().down("#telephone").setValue("");*/
		this.getStore().loadPage(1);
	}
});
Ext.define('VIP.search.MemberInfo', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.searchmemberinfo' ],
	                                       
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
				height : 120,
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
					items : [ {
						fieldLabel : '会员昵称',
						emptyText : '会员昵称',
						name : 'userScreenName',
						itemId : 'userScreenName',
						listeners : {
							specialKey : {
								fn : function(field, key, option) {
									if (key.keyCode == 13) {
										var panel = this.up("searchmemberinfo");
										var grid = panel.down('searchmembergrid');
										var form = panel.down('form').getForm();
										var values = form.getValues();
										grid.getSelectionModel().deselectAll();
										grid.doQuery(values);

									}
								},
								delay : 200
							}
						}
					}, {
						fieldLabel : '会员手机号',
						emptyText : '会员手机号',
						name : 'telephone',
						itemId : 'telephone',
						regex : /^1[3|4|5|8][0-9]{9}$/,
						regexText : '无效的手机号码',
						listeners : {
							specialKey : {
								fn : function(field, key, option) {
									if (key.keyCode == 13) {
										var panel = this.up("searchmemberinfo");
										var grid = panel.down('searchmembergrid');
										var form = panel.down('form').getForm();
										var values = form.getValues();
										grid.getSelectionModel().deselectAll();
										grid.doQuery(values);

									}
								},
								delay : 200
							}
						}
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
				height : 280,
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
			me.down('#userScreenName').focus(true);
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

		win.onRecordSelect.fn.call(win.onRecordSelect.scope, data.userId, false);
		win.close();
	},
	onSelectChange : function(grid, selected, eOpts) {
		var win = this.ownerCt;
		if (selected.length != 0) {
			this.userId = selected[0].data.userId;
			win.down('#search').setDisabled(false);
		}

	},
	onPasswordSelect : function() {
		/*var grid = this.down('searchmembergrid');*/
		/*var form = this.down('form').getForm();
		var values = form.getValues();*/
		/*grid.getSelectionModel().deselectAll();
		grid.doQuery(values);*/
		var win = this.ownerCt;
		var me = this;
		value = this.down("#qrString").getValue();
		MemberAction.getMemberByQRString(value, function(result) {
			if (result.success) {
				var data = result.data;
				win.onRecordSelect.fn.call(win.onRecordSelect.scope, data._id, !data.type, value);
				win.close();
			} else {
				Ext.Msg.error(result.message, function() {
					me.down('#qrString').setValue();
					me.focus();
				});
			}
		});
		/*MemberAction.getMemberByQRString(value, function(result) {
			if(result.success){
				var data = result.data;
				this.userId = data.userId;
				if(userId!=null&&userId!=""){
					win.onRecordSelect.fn.call(win.onRecordSelect.scope, this.userId,true);
					win.close();
				}
			}else{
				Ext.Msg.error("二维码不正确！",function(){
					me.down('#qrString').setValue();
					me.focus();
				});
				
			}
		});	*/
	},
	doSelect : function() {
		var win = this.ownerCt;
		win.onRecordSelect.fn.call(win.onRecordSelect.scope, this.userId, false);
		win.close();
	}
});
Ext.define('VIP.search.SearchMember', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.serchmember' ],
	                                       
	title : '会员查询',
	modal : true,
	frame : true,
	resizable:false,
	width : 500,
	height : 160,
	y:120,
	icon : 'images/search-16.png',
	layout : 'fit',
	createView : function() {
		var me = this;
		var items = [ {
			xtype : 'searchmemberinfo',
			border : false
		} ];
		return items;
	},
	createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '选择',
			icon : 'images/update.png',			
			itemId : 'search',
			disabled : true,
			handler : function(btn) {
				var memberInfo = me.down('searchmemberinfo');
				memberInfo.doSelect(btn);
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			handler : function(btn) {
				me.destroy();
			}
		}];
		return buttons;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
	}
});
Ext.define('VIP.security.OperatorRuleWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.operatorrulewindow' ],
	                                       
	layout : 'fit',
	width : 680,
	height : 540,
	title : '',
	icon : 'images/manage_role.png',
	modal : true,
	border : false,	
	resizable:false,
	params : {},
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				if(me.params.ruleId != undefined){
					me.saveRule();
				} else {
					me.addRule();
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
				anchor : '100% 30%',				
				defaults : {
					width : 500,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 1
				},
				items : [ {
					xtype : 'textfield',
					fieldLabel : '名称',
					name : 'name',
					itemId:'name',
					vtype : 'stringblank',
					maxLength : '15',
					maxLengthText : '不可超过15位',
					allowBlank : false,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#description').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textarea',
					fieldLabel : '描述',
					name : 'description',
					itemId : 'description',
					maxLength : '140',
					maxLengthText : '不可超过140位',
					allowBlank : false
				}]					
			}, {
				xtype : 'fieldset',
				title : '操作权限',
				itemId : 'actions_fieldset',				
				autoScroll : true,				
				anchor : '100% 70%',
				padding : '5 10 10 40',
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				fieldDefaults : {
					labelWidth : 100
				},
				items : [{
					xtype : 'checkbox',
					boxLabel : '全选',
					listeners : {
						change : {
							fn : this.selectAll,
							scope : this
						}
					}
				}]
			}]
		}];

		return items;
	},
	
	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			title : this.params.ruleId? '修改权限组' : '添加权限组',
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		
		this.load();
		setTimeout(function(){
			me.down('#name').focus(true);
		}, 500);
	},

	load : function(){
		var me = this;
		
		OperatorRuleAction.listAllActions({
			
		}, function(dataStore){
			me.actions = dataStore.records;
			me.fillActions();
		});		
	},
	
	fillActions : function(){
		var me = this;
		var actions_fieldset = this.down('#actions_fieldset');		
		
		actions_fieldset.suspendLayout = true;
		for(var i=0; i<this.actions.length; i++){
			var r = this.actions[i];			

			var checkboxGroup = actions_fieldset.down('checkboxgroup[fieldLabel=' + r.category + ']');
			
			if(!checkboxGroup){
				checkboxGroup = Ext.create('Ext.form.CheckboxGroup', {
					fieldLabel : r.category,
					columns : 3,
					vertical : true,
					margin : '5 20 20 0',
					labelStyle : 'font-weight:bold',
					style : {
						borderBottom : '1px solid gray'
					}
				});
				actions_fieldset.add(checkboxGroup);
			}
			
			checkboxGroup.add({
				name : 'actions',
				inputValue : r.id,
				boxLabel : r.name
			});			
		}
		actions_fieldset.suspendLayout = false;
		actions_fieldset.doLayout();
		
		if(this.params.ruleId){
			OperatorRuleAction.get({
				ruleId : this.params.ruleId
			}, function(actionResult) {
				if (actionResult.success) {
					var data = actionResult.data;
					me.down('vipform').getForm().setValues({
						name : data.name,
						actions : data.actions.split(','),
						description : data.description
					});					
				} else {
					Ext.Msg.error(actionResult.message);
				}
			});
		}
	},
	
	selectAll : function(checkbox, value){
		var actions = this.query('checkbox[name=actions]');
		
		for(var i=0; i<actions.length; i++){
			actions[i].setValue(value == true);
		}		
	},
	
	addRule : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			OperatorRuleAction.addRule(Ext.apply({
				
			}, values), function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('添加成功', function(){
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
	},
	
	saveRule : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			OperatorRuleAction.editRule(Ext.apply({
				ruleId : this.params.ruleId
			}, values), function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('修改成功', function(){
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
});
Ext.define('VIP.sms.EditConsumeSMS', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.editconsumesms' ],
	                                       
	layout : 'fit',
	width : 640,
	height : 400,
	title : '消费短信模板',
	modal : true,
	border : false,
	
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/ok-16.png',
			width : 90,
			handler : function(btn) {
				me.onSave.fn.call(me.onSave.scope);
			}
		}, {
			text : '取消',
			icon : 'images/cancel-16.png',
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
				anchor : '100% 75%',
				defaults : {
					columnWidth: 0.25,
					margin : '5 5 5 5'
				},
				layout:'column',
				items : [{
			        xtype: 'label',
			        text: '字段编码'
			    },{
			        xtype: 'label',
			        text: '代表内容'
			    },{
			        xtype: 'label',
			        text: '字段编码'
			    },{
			        xtype: 'label',
			        text: '代表内容'
			    },{
			        xtype: 'label',
			        text: '[$orderNumber$]'
			    },{
			        xtype: 'label',
			        text: '订单号'
			    },{
			        xtype: 'label',
			        text: '[$userId$]'
			    },{
			        xtype: 'label',
			        text: '卡号'
			    },{
			        xtype: 'label',
			        text: '[$userName$]'
			    },{
			        xtype: 'label',
			        text: '会员姓名'
			    },{
			        xtype: 'label',
			        text: '[$consumeSubject$]'
			    },{
			        xtype: 'label',
			        text: '消费内容'
			    },{
			        xtype: 'label',
			        text: '[$time$]'
			    },{
			        xtype: 'label',
			        text: '时间'
			    },{
			        xtype: 'label',
			        text: '[$accountPayable$]'
			    },{
			        xtype: 'label',
			        text: '应付金额'
			    },{
			        xtype: 'label',
			        text: '[$point$]'
			    },{
			        xtype: 'label',
			        text: '获得积分'
			    },{
			        xtype: 'label',
			        text: '[$cashPayment$]'
			    },{
			        xtype: 'label',
			        text: '现金支付'
			    },{
			        xtype: 'label',
			        text: '[$bankCardPaymant$]'
			    },{
			        xtype: 'label',
			        text: '银行卡支付'
			    },{
			        xtype: 'label',
			        text: '[$cardPayment$]'
			    },{
			        xtype: 'label',
			        text: '会员卡支付'
			    },{
			        xtype: 'label',
			        text: '[$totalPayment$]'
			    },{
			        xtype: 'label',
			        text: '总支付'
			    },{
			        xtype: 'label',
			        text: '[$changeAmount$]'
			    },{
			        xtype: 'label',
			        text: '找零'
			    },{
			        xtype: 'label',
			        text: '[$currentDeposit$]'
			    },{
			        xtype: 'label',
			        text: '当前余额'
			    },{
			        xtype: 'label',
			        text: '[$operatorName$]'
			    },{
			        xtype: 'label',
			        text: '操作员'
			    },{
			        xtype: 'label',
			        text: '[$shopName$]'
			    },{
			        xtype: 'label',
			        text: '消费店铺'
			    }]
			},{
				xtype:'form',
				anchor : '100% 25%',
				layout:'anchor',
				items:[{
		            xtype     : 'textareafield',
		            grow      : true,
		            name      : 'content',
		            allowBlank : false,
		            anchor : '100% 100%'
		        }]
			}]
		}];

		return items;
	},
	
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		this.onLoad.fn.call(this.onLoad.scope);
	}
});
Ext.define('VIP.sms.EditDepositSMS', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.editdepositsms' ],
	                                       
	layout : 'fit',
	width : 640,
	height : 400,
	title : '充值短信模板',
	modal : true,
	border : false,
	
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/ok-16.png',
			width : 90,
			handler : function(btn) {
				me.onSave.fn.call(me.onSave.scope);
			}
		}, {
			text : '取消',
			icon : 'images/cancel-16.png',
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
				anchor : '100% 75%',
				defaults : {
					columnWidth: 0.25,
					margin : '5 5 5 5'
				},
				layout:'column',
				items : [{
			        xtype: 'label',
			        text: '字段编码'
			    },{
			        xtype: 'label',
			        text: '代表内容'
			    },{
			        xtype: 'label',
			        text: '字段编码'
			    },{
			        xtype: 'label',
			        text: '代表内容'
			    },{
			        xtype: 'label',
			        text: '[$userId$]'
			    },{
			        xtype: 'label',
			        text: '卡号'
			    },{
			        xtype: 'label',
			        text: '[$userName$]'
			    },{
			        xtype: 'label',
			        text: '会员姓名'
			    },{
			        xtype: 'label',
			        text: '[$realAmount$]'
			    },{
			        xtype: 'label',
			        text: '充值金额'
			    },{
			        xtype: 'label',
			        text: '[$time$]'
			    },{
			        xtype: 'label',
			        text: '时间'
			    },{
			        xtype: 'label',
			        text: '[$rewardAmount$]'
			    },{
			        xtype: 'label',
			        text: '赠送金额'
			    },{
			        xtype: 'label',
			        text: '剩余积分'
			    },{
			        xtype: 'label',
			        text: '[$currentDeposit$]'
			    },{
			        xtype: 'label',
			        text: '当前余额'
			    },{
			        xtype: 'label',
			        text: '[$operatorName$]'
			    },{
			        xtype: 'label',
			        text: '操作员'
			    },{
			        xtype: 'label',
			        text: '[$shopName$]'
			    },{
			        xtype: 'label',
			        text: '消费店铺'
			    }]
			},{
				xtype:'form',
				anchor : '100% 25%',
				layout:'anchor',
				items:[{
		            xtype     : 'textareafield',
		            grow      : true,
		            name      : 'content',
		            allowBlank : false,
		            anchor : '100% 100%'
		        }]
			}]
		}];

		return items;
	},
	
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		this.onLoad.fn.call(this.onLoad.scope);
	}
});
Ext.define('VIP.sms.model.MessageHistory',{
	extend:  Ext.data.Model ,
    fields: [
        {name: 'targetNumber',  type: 'string'},
        {name: 'content',   type: 'string'},
        {name: 'time', type: 'string'},
        {name: 'operatorName', type: 'string'},
        {name: 'shopName', type: 'string'}
    ]
});
Ext.define('VIP.sms.store.MessageHistory',{
	extend:  VIP.store.BaseStore ,
	                                                                 
	model: 'VIP.sms.model.MessageHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'MessageAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.system.DeleteMembershipTypeWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.deletemembershiptypewindow' ],
	                                       
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
