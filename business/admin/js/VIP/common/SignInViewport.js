Ext.define('VIP.common.SignInViewport', {
	extend : 'Ext.Viewport',
	xtype : 'signinform',
	requires : ['VIP.common.LoginWindow'],
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
				height : '85px',
				anchor : '100%',
				html : '<div style="height:100%;background:#dfdfdf"><div style="height:5px;background:#444"></div><img style="height:100%" src="'+basePath+vip.logo+'"></div>'
			},{
				xtype : 'box',
				anchor : '100% -175px',
				html : '<div style="position: absolute; z-index: 999; top:20%; left:20%"><p style="font-family:\'微软雅黑\';font-Size:24px;color:#fff;">便捷的使用体验，强大的会员管理</p></div><img style="width:100%;height:100%" src="images/world-wallpaper.jpg ">'
			},{
				xtype : 'box',
				height : '90px',
				anchor : '100%',
				html : '<div style="text-align: center;padding-top:20px;height:100%;background:#fff"><a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">产品主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">公司主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">关于我们</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">联系我们</a><br/><p>昆明泽天科技  &copy;2013 All Rights Reserved</p></div>'
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