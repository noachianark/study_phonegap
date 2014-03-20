Ext.define('VIP.member.PortionExchange', {
	extend : 'Ext.form.Panel',
	alias : [ 'widget.portionexchange' ],
	requires : [ 'VIP.common.PrintWindow', 'VIP.member.DetailMain' ],
	icon : 'images/Coin256.png',
	vipCardId : null,
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
		            itemId : 'moneyform',
					width : 300,
					height : 260,
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
							name : 'points',
							itemId : 'points',	
							width : 100,
							fieldStyle : fieldStyle + ';color:red',
							allowBlank : false,
							mouseWheelEnabled: false, 
							value : 0,
							minValue : 100,
							step : 100,
							maxValue : 100000,
							minText : '至少兑换100积分',
							maxText  : '超出现有积分',
							validFlag : true,
							validator : function() {
								return this.validFlag;
							},
							negativeText : "最小值为0,最大值为100000",
							listeners : {
								change : {
									fn : function(field, key, option) {	
										var value = field.getValue();
										if(value%100!=0){
											this.validFlag = '积分必须为100的倍数';
											this.validate(false);
											me.down('#money').setValue(0);
										}else{
											this.validFlag = true;
											this.validate(true);
											var deposit = value*me.pointToMoneyRate/100;
											me.down('#money').setValue(deposit);
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
							name : 'money',
							itemId : 'money',
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
								me.exchangeSave('money');
							}
						}]
					} ]
		        },{
		            title: '积分兑换商品',
		            xtype: 'form',
		            itemId : 'productform',
					width : 300,
					height : 240,
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
							name : 'points',
							itemId : 'points',	
							width : 100,
							fieldStyle : fieldStyle + ';color:red',
							allowBlank : false,
							mouseWheelEnabled: false, 
							value : 0,
							minValue : 0,
							maxValue : 100000,
							minText : '至少兑换100积分',
							maxText  : '超出现有积分',
							negativeText : "最小值为0,最大值为100000",
							listeners : {
								change : {
									fn : function(field, key, option) {	
										if (field.getValue() == null || field.getValue() == 0 || field.getValue()=="e") {
											me.down('#deposit').setValue(0);
											me.down('#subPoint').setValue(0);
										} else {
											var payable = parseFloat(field.getValue()) * (parseFloat(me.moneyBackRate)) / 100;
											me.down('#deposit').setValue(payable);
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
							name : 'product',
							itemId : 'product',
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
			me.point = data.point;
			me.add(me.createView());
			me.down('#moneyform').down('#points').setMaxValue(me.point);
			me.down('#productform').down('#points').setMaxValue(me.point);
			me.pointToMoneyRate = data.pointToMoneyRate;
			
			
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

	exchangeSave : function(type) {
		var me = this;
		if(type=='money'){
			var form = this.down('#moneyform').getForm();
			
			if (form.isValid()) {
				var values = form.getValues();
				Ext.apply(values,{
					vipCardId : me.vipCardId
				});
				TransactionAction.exchangePoint(values,function(actionResult){
					if(actionResult.success){
						Ext.Msg.info('兑换成功',function(){
							me.close();
						});
					}else{
						Ext.Msg.error(actionResult.message);
					}
				});
			}
		}
		
	},

});