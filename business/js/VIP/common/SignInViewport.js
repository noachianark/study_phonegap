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
				height : '103px',
				anchor : '100%',
				html : '<div style="background-image: -moz-linear-gradient(top, #8fa1ff, #013879);background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #8fa1ff), color-stop(1, #013879));filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=#8fa1ff, endColorstr=#013879,GradientType=0 );background: -ms-linear-gradient(top, #8fa1ff 0%, #013879 100%);height:100%;"><img style="line-height:100%" src="'+basePath+vip.logo+'"></div><div style="background-image: url(\'images/world-wallpaper.jpg\');background-repeat: repeat-x; height: 3px"></div>'
			},{
				xtype : 'box',
				anchor : '100% -193px',
				html : '<div style="position: absolute; z-index: 999; top:20%; left:20%"><p style="font-family:\'微软雅黑\';font-Size:26px;color:#434343">魔客会员管理系统</p><p style="font-family:\'微软雅黑\';font-Size:13px;color:#434343">魔客会员管理系统用科学的方法给您带来无限的效益</p></div><img style="width:100%;height:100%" src="images/world-wallpaper.jpg ">'
			},{
				xtype : 'box',
				height : '90px',
				anchor : '100%',
				html : '<div style="text-align: center;padding-top:20px;"><a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">产品主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">公司主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">关于我们</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">联系我们</a><br/><p>昆明泽天科技  &copy;2013 All Rights Reserved</p></div>'
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