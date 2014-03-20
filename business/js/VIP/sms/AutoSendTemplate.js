Ext.define('VIP.sms.AutoSendTemplate',{
	extend : 'Ext.form.Panel',
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