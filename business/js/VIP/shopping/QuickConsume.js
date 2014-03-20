Ext.define('VIP.shopping.QuickConsume', {
	extend : 'VIP.widget.form.Panel',
	alias : [ 'widget.quickconsume' ],
	requires : [ 'VIP.widget.form.Panel', 'VIP.member.store.Member', 'VIP.common.PrintWindow', 'VIP.member.DetailMain'
	],
	vipCardId : null,
	discountPercent : null,
	deposit : null,
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
						allowExponential : false,
						listeners : {
							change : {
								fn : function(field, key, option) {
									var value = parseFloat(field.getValue());
									if(value!=""&&value!=null&&value!=0){
										var payable = value*(me.numSub(100, parseFloat(me.discountPercent)))/100;
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
									if(value>0){
										me.down("#point").setValue(parseInt(me.numDiv(me.numMul(value, me.pointPercent),100)));
									}else{
										me.down("#point").setValue(0);
									}
									if(me.type==false||me.type==null){
										me.down("#cashPayment").setValue(value);
										me.down("#cashPayment").clearInvalid();
										me.down("#cashPayment").setMinValue(value);
										me.down("#change").setValue(0);
									}else{
										var deposit = parseFloat(me.deposit);
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
						allowExponential : false,
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
						allowExponential : false,
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
											var deposit = parseFloat(me.deposit);
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
						xtype : 'numberfield',					
						itemId : 'point',
						name : 'point',
						allowBlank : false,
						allowDecimals : false,
						allowExponential : false,
						fieldStyle : fieldStyle + ';color:green',
						width : 100,		
						maxValue : 100000,
						minValue : 0,
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
			userId : this.vipCardId
		} ];

		return items;
	},

	onConsume : function() {
		var form = this.getForm();
		var me = this;
		if (form.isValid()) {
			if (me.down("#accountPayable").getValue() > 0) {
				var vipCardId = me.vipCardId;
				var qrString = me.qrString;
				var accountPayable = me.down("#accountPayable").getValue();
				var consumeSubject = me.down("#consumeSubject").getValue();
				var memberPayment = me.down("#memberPayment").getValue();
				var cashPayment = me.down("#cashPayment").getValue();
				var discount = me.down("#discount").getValue();
				var consumptionAmount = me.down("#consumptionAmount").getValue();
				var point = me.down('#point').getValue();
				var notes = me.down("#notes").getValue();
				var changeAmount = me.down('#change').getValue();
	
				var params = {
					vipCardId : vipCardId,
					accountPayable : accountPayable + '',
					consumeSubject : consumeSubject,
					discount : discount+'',
					cardPayment : memberPayment + '',
					cashPayment : cashPayment + '',
					consumptionAmount : consumptionAmount + '',
					reveivedPoints : point+'',
					shopId : window.account.shopId,
					changeAmount : changeAmount+'',
					notes : notes
				};
				var change = me.down("#change").getValue();
				if(change>=0){
					Ext.Msg.confirm('确认', '确认 要消费 [' + accountPayable + '] 元 卡支付 [' + memberPayment + '] 元 现金支付 ['
							+ cashPayment + ']', function(r) {
						if (r == 'yes') {
							if(me.type){
								Ext.apply(params,{
									userQrString : qrString
								});
								TransactionAction.consumeFromDeposit(params,function(result){
									if(result.success){
										Ext.Msg.info('消费成功.', function() {
											me.doPrint(result.data.id);
											me.close();
										});
									}else{
										Ext.Msg.error(result.message);	
									}
								});
							}else{
								TransactionAction.consume(params,function(result){
									if(result.success){
										Ext.Msg.info('消费成功.', function() {
											me.doPrint(result.data.id);
											me.close();
										});
									}else{
										Ext.Msg.error(result.message);	
									}
								});
							}
								/*ConsumeAction.add(vipCardId,params, function(result) {
									if(result.success){
										Ext.Msg.info('消费成功.', function() {
											me.doPrint(result.data.id);
											me.load(me.vipCardId);
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
	load : function(vipCardId,type,qrString) {
		var me = this;
		if (vipCardId) {
			this.vipCardId = vipCardId;
		}
		me.removeAll(true);
		me.type=type;
		me.qrString = qrString;
		BVipCardAction.getVipCardById(me.vipCardId, function(result) {
			var data = result.data;
			me.discountPercent = data.discountPercent;
			me.deposit = data.deposit;
			me.pointPercent = data.pointPercent;
			me.userAccountName=data.userAccountName;
			me.add(me.createView());
			me.addListeners();
			
			me.down('#consumptionAmount').focus(true, 100);
			if(type==true){
				me.down('#memberPayment').setReadOnly(false);
			}
		});	
			
		
	},
	memberSearch : function() {
		var me = this;
		Ext.create('VIP.search.SearchMember', {
			onRecordSelect : {
				fn : function(vipCardId,type,qrString) {
					me.load(vipCardId,type,qrString);
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
	},
	numMul : function (arg1,arg2) { 
	   var m=0,s1=arg1.toString(),s2=arg2.toString(); 
	   try{m+=s1.split(".")[1].length;}catch(e){} 
	   try{m+=s2.split(".")[1].length;}catch(e){} 
	   return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m); 
	} ,
	numDiv : function (arg1,arg2){ 
		var me =this;
		var t1=0,t2=0,r1,r2; 
		try{t1=arg1.toString().split(".")[1].length;}catch(e){} 
		try{t2=arg2.toString().split(".")[1].length;}catch(e){} 
		with(Math){ 
			r1=Number(arg1.toString().replace(".",""));
			r2=Number(arg2.toString().replace(".",""));
			return me.numMul((r1/r2),pow(10,t2-t1)); 
		} 
   } 

});