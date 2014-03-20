Ext.define('VIP.member.MemberDeposit', {
	extend : 'Ext.form.Panel',
	alias : [ 'widget.memberdeposit' ],
	requires : [ 'VIP.common.PrintWindow', 'VIP.member.DetailMain' ],
	icon : 'images/deposit-16.png',
	vipCardId : null,
	depositMoneyBackPercent :null,
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
										var payable = parseFloat(field.getValue()) * (parseFloat(me.depositMoneyBackPercent)) / 100;
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
			userId : this.vipCardId
		}];

		return items;
	},
	load : function(vipCardId) {
		var me = this;
		if(vipCardId){
			this.vipCardId = vipCardId;
		}
		
		this.removeAll(true);
		BVipCardAction.getVipCardById(me.vipCardId, function(result) {
			var data = result.data;
			me.depositMoneyBackPercent = data.depositMoneyBackPercent;
			me.add(me.createView());
			
		});
		
	},
	memberSearch : function() {
		var me = this;
		Ext.create('VIP.search.SearchMember', {
			onRecordSelect : {
				fn : function(vipCardId) {
					me.load(vipCardId);					
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
			Ext.apply(values,{
				shopId : window.account.shopId,
				vipCardId : me.vipCardId
			});
			if (values.realAmount == 0) {
				Ext.Msg.error("请输入充值金额", function() {
					me.down('#realAmount').focus(true, 100);
				});
			} else {
				Ext.Msg.confirm('确认', '确认要存入 [' + values['realAmount'] + '] 元 并 赠送 ['+values['rewardAmount']+']元 吗?', function(r) {
					if (r == 'yes') {
						TransactionAction.deposit(values, function(result) {
							if (result.success) {
								Ext.Msg.info('充值成功.', function() {
									me.doPrint(result.data.id);
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