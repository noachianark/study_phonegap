Ext.define('VIP.west.Main', {
	extend: 'Ext.panel.Panel',
	alias: [ 'widget.vipwestmain' ],
	requires: ['VIP.shop.ShopGrid','VIP.security.OperatorRuleGrid','VIP.operator.OperatorGrid','VIP.admin.AdminGrid','VIP.card.CardGrid','VIP.reports.Reports','VIP.setting.Settings'],
	region: 'west',
	layout : 'fit',
	split: true,
	width: 250,
	minWidth: 250,
	maxWidth: 450,
	collapsible : true,
	titleCollapse : true,
	flag : true,
	bodyStyle: 'background:#222',
	
	items : [{
		xtype : 'panel',
		layout : 'anchor',	
		itemId : 'westPanel',
		border : false,
		bodyStyle: 'background:#222',
		items : [{
			xtype: 'box',
			height : "70px",
			html:'<div class="west-div" id="west-admin"><div class="west-font"><img class="west-img" src="images/admin.png" />Admin管理</div></div>'
		},{
			xtype: 'box',
			height : "70px",
			html:'<div class="west-div" id="west-shop"><div class="west-font"><img class="west-img" src="images/shop.png" />店铺管理</div></div>'
		},{
			xtype: 'box',
			height : "70px",
			html:'<div class="west-div" id="west-operatorRule"><div class="west-font"><img class="west-img" src="images/key.png" />权限管理</div></div>'
		},{
			xtype: 'box',
			height : "70px",
			html:'<div class="west-div" id="west-operator"><div class="west-font"><img class="west-img" src="images/user.png" />操作员管理</div></div>'
		},{
			xtype: 'box',
			height : "70px",
			html:'<div class="west-div" id="west-card"><div class="west-font"><img class="west-img" src="images/card.png" />会员卡管理</div></div>'
		},{
			xtype: 'box',
			height : "70px",
			html:'<div class="west-div" id="west-reports"><div class="west-font"><img class="west-img" src="images/reports.png" />报表管理</div></div>'
		},{
			xtype: 'box',
			height : "70px",
			html:'<div class="west-div" id="west-settings"><div class="west-font"><img class="west-img" src="images/setting.png" />设置管理</div></div>'
		},{
			xtype : 'box',
			anchor : '100% -590px',
			style: 'background:#222'
		},{
			xtype: 'box',
			height : "70px",
			html:'<div class="west-div" id="west-exit"><div class="west-font"><img class="west-img" src="images/exit.png" /> 退　出 </div></div>'
	
		}]
	}],

	listeners : {
		beforeexpand : function(){
			this.setTitle(null);
		},
		collapse : function(){
			this.setTitle('功能菜单');
		}
	},

	initComponent : function() {
		var me =this;
		
		this.callParent(arguments);
		
		setTimeout(function(){
			me.attachEvents();
		},50);
		
	},
	attachEvents : function() {
		var me = this;
		var admin = Ext.get('west-admin');
		var operator = Ext.get('west-operator');
		var operatorRule = Ext.get('west-operatorRule');
		var shop = Ext.get('west-shop');
		var card = Ext.get('west-card');
		var reports = Ext.get('west-reports');
		var settings = Ext.get('west-settings');
		var exit = Ext.get('west-exit');
		//var west = Ext.get('west');
		admin.on('click', function(e,t){
			if(me.flag){
				me.flag = false;
				vip.viewport.main.setContent({
					xtype : 'admingrid',
					closable :false
				});
				setTimeout(function(){
					me.flag = true;
				},400);
			}
		},this);
		operator.on('click', function(){
			if(me.flag){
				me.flag = false;
				vip.viewport.main.setContent({
					xtype : 'operatorgrid',
					closable :false
				});
				setTimeout(function(){
					me.flag = true;
				},400);
			}
		},this);
		operatorRule.on('click', function(){
			if(me.flag){
				me.flag = false;
				vip.viewport.main.setContent({
					xtype : 'operatorrulegrid',
					closable :false
				});
				setTimeout(function(){
					me.flag = true;
				},400);
			}
		},this);
		shop.on('click', function(){
			if(me.flag){
				me.flag = false;
				vip.viewport.main.setContent({
					xtype : 'shopgrid',
					closable :false
				});
				setTimeout(function(){
					me.flag = true;
				},400);
			}
		},this);
		card.on('click', function(){
			if(me.flag){
				me.flag = false;
				vip.viewport.main.setContent({
					xtype : 'cardgrid',
					closable :false
				});
				setTimeout(function(){
					me.flag = true;
				},400);
			}
		},this);
		reports.on('click', function(){
			if(me.flag){
				me.flag = false;
				vip.viewport.main.setContent({
					xtype : 'reports',
					closable :false
				});
				setTimeout(function(){
					me.flag = true;
				},400);
			}
		},this);
		settings.on('click', function(){
			if(me.flag){
				me.flag = false;
				vip.viewport.main.setContent({
					xtype : 'settings',
					closable :false
				});
				setTimeout(function(){
					me.flag = true;
				},400);
			}
		},this);
		exit.on('click', function(){
			Ext.MessageBox.confirm('警告', '你确定你要退出吗？', function(btn) {
				if (btn == 'yes') {
					BusinessAdminAction.logout(function(actionResult){
						if(actionResult.success){
							window.location.reload(true);
						} else {
							
						}
					});
				}
			});
		},this);
	}
});