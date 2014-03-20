Ext.define('VIP.security.OperatorRuleWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.operatorrulewindow' ],
	requires : [ 'VIP.widget.form.Panel' ],
	layout : 'fit',
	width : 680,
	height : 540,
	title : '',
	modal : true,
	border : false,	
	resizable:false,
	closable: false,  
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
		OperatorRuleAction.findActions(function(dataStore){
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
			OperatorRuleAction.findOperatorRuleById(this.params.ruleId, function(actionResult) {
				if (actionResult.success) {
					var data = actionResult.data;
					var actions =  new Array(); actionResult.data.length
					for(var i = 0 ; i<data.actions.length;i++){
						actions[i] = data.actions[i].id;
					}
					me.down('vipform').getForm().setValues({
						name : data.name,
						actions : actions,
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
			values.actions = Ext.encode(values.actions);
			OperatorRuleAction.addOperatorRule(Ext.apply({
				businessId : window.account.businessId
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
			values.actions = Ext.encode(values.actions);
			OperatorRuleAction.updateOperatorRule(Ext.apply({
				id : this.params.ruleId
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