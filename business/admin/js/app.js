var vip = {};

document.write('<script type="text/javascript" src="../js/vip-extjs.js"></script>');
document.write('<script type="text/javascript" src="../../dependency/extjs/locale/ext-lang-zh_CN.js"></script>');
document.write('<script type="text/javascript" src="../js/vtypes.js"></script>');
document.write('<script type="text/javascript" src="js/global.js"></script>');

var paramsString = window.location.search.substr(1),
paramsArray = paramsString.split("&"),
params = {},
i;
for (i = 0; i < paramsArray.length; i++) {
var tmpArray = paramsArray[i].split("=");
params[tmpArray[0]] = tmpArray[1];
}
var domainPrefix = params['__domain'];

if(domainPrefix == undefined){
	alert('请指定商家.');
} else {
	Ext.Loader.setConfig({
		enabled : true,
		disableCaching : true,
		paths : {
			'VIP' : 'js/VIP',
			'Ext.ux' : '../../dependency/extjs/ux'
		}
	});
}
Ext.onReady(function() {
	Ext.tip.QuickTipManager.init();	
	Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
	
	Ext.Msg.show({
		title: "魔客会员-admin",
		draggable: false,
		width:300,
        msg: "Loading ...",
        wait: true,
        progress:true,
        cls:'red',
        waitConfig: {
        	interval: 10,
			increment: 140
		}
    });
	Ext.getDoc().on("contextmenu", function(e) {
		e.stopEvent();
	});
	BusinessAdminAction.getLoginInfos(function(actionResult){
		Ext.MessageBox.hide(); 
		if(actionResult.data!=null&&actionResult.data.loginType=="b"){
			window.account = actionResult.data;
			vip.viewport = Ext.create('VIP.Viewport');
			vip.viewport.main = vip.viewport.down('vipmain');
		}else{
			BBusinessAction.findBusinessAdminByDomain(domainPrefix,function(actionResult){
				if(actionResult.success){
					vip.logo = actionResult.data.loginPath;
					vip.viewport = Ext.create('VIP.common.SignInViewport').show();
				}else{
					Ext.Msg.error("没有该商家");
				}
			});
			
		}
		
	});
});