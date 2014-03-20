Ext.define('VIP.TopBar', {
	extend : 'Ext.toolbar.Toolbar',
	alias : [ 'widget.viptopbar' ],
	requires : ['VIP.operator.OperatorInfoWindow'],
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
			text : '你好  <span style="font-weight:bold">'+window.account.name+'</span>',			
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
						OperatorAction.logout(function(actionResult){
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
			title : window.account.name
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
