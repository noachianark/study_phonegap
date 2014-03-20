Ext.define('VIP.member.MemberWithdraw', {
	extend : 'Ext.form.Panel',
	alias : [ 'widget.memberwithdraw', 'VIP.member.DetailMain' ],
	vipCardId : null,
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
						maxValue : me.deposit,
						listeners : {
							change : {
								fn :function(field, key, option) {
									if (parseFloat(field.getValue()) > parseFloat(me.deposit)) {
										Ext.Msg.error("余额不足", function() {
											field.setValue(me.deposit);
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
			userId : this.vipCardId
		} ];

		return items;
	},
	
	load : function(vipCardId) {
		var me = this;
		if (vipCardId) {
			this.vipCardId = vipCardId;
		}

		me.removeAll(true);		
		BVipCardAction.getVipCardById(me.vipCardId, function(result) {
			var data = result.data;
			me.deposit = data.deposit;
			me.add(me.createView());
			
			me.down('#amount').focus(true, 100);
		});
	
		
	},
	
	withdrawSave : function() {
		var form = this.getForm();
		var me = this;
		if (form.isValid()) {
			var values = this.getValues();
			Ext.apply(values,{
				vipCardId : me.vipCardId,
				shopId : window.account.shopId
			});
			if (values.amount == 0) {
				Ext.Msg.error("请输入取款金额", function() {
					me.down('#amount').focus(true, 100);
				});
			} else {

				Ext.Msg.confirm('确认', '确认要 取现 [' + values['amount'] + '] 元吗?', function(r) {
					if (r == 'yes') {
						TransactionAction.withdraw(values, function(result) {

							if (result.success) {
								Ext.Msg.info('取款成功.', function() {
									me.doPrint(result.data.id);
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
				fn : function(vipCardId) {
					me.load(vipCardId);
				}
			}
		}).show();
	},
	initComponent : function() {
		this.callParent(arguments);
		this.memberSearch();
	}
});