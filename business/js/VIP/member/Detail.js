Ext.define('VIP.member.Detail', {
	extend : 'VIP.widget.form.Panel',
	alias : [ 'widget.detail' ],
	requires : [ 'VIP.widget.form.Panel', 'VIP.member.store.MemberInfo', 'VIP.member.MemberConsumeSummaryChart','VIP.member.ChangeMemberType' ],
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
						labelStyle : 'font-size:12pt',
						fieldStyle : 'font-size:12pt;font-weight:bold;'
					},
					items : [ {
						name : 'userEmail',
						fieldLabel : 'Email'
					},{
						name : 'userTelephone',
						fieldLabel : '会员电话'
					},{
						name : 'userName',
						fieldLabel : '会员昵称'
					},  {
						xtype : 'fieldcontainer',
						fieldLabel : '会员余额',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : 'deposit',
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
						name : 'cardType',
						fieldLabel : '会员等级'
					}, {
						xtype : 'fieldcontainer',
						fieldLabel : '折扣百分比',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : 'discountPercent',
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
							name : 'depositMoneyBackPercent',
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
							name : 'pointPercent',
							fieldStyle : 'font-size:12pt; color:#FF9912;font-weight:bold;'
						}, {
							xtype : 'label',
							margin : '3 0 0 5',
							text : '%'
						} ]
					} ,  {
						xtype : 'fieldcontainer',
						fieldLabel : '总积分',
						layout : {
							type : 'hbox'
						},
						items : [ {
							xtype : 'displayfield',
							name : 'totalPoint',
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
							name : 'point',
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
		if( me.resultData.id==null){
			return;
		}
		for(var i = 0 ; i<window.account.actionCodes.length;i++){
			if(window.account.actionCodes[i]=="MemberType_View"){
				Ext.create('VIP.member.ChangeMemberType', {
					cardTypeId : me.resultData.cardTypeId,
					userIds : [me.resultData.id],
					
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
			}
		}
		
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

		BVipCardAction.getVipCardById(this.userId, function(result) {
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