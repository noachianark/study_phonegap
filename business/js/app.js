var vip = {};

document.write('<script type="text/javascript" src="js/vip-extjs.js"></script>');
document.write('<script type="text/javascript" src="js/vtypes.js"></script>');
document.write('<script type="text/javascript" src="../dependency/extjs/locale/ext-lang-zh_CN.js"></script>');
document.write('<script type="text/javascript" src="../ckeditor/ckeditor.js"></script>');
document.write('<script type="text/javascript" src="../ckfinder/ckfinder.js"></script>');
document.write('<script type="text/javascript" src="js/global.js"></script>');
/*var int = window.location.href.indexOf("localhost");*/
if(!window.location.href.indexOf("localhost") > 0){
	document.write('<script type="text/javascript" src="js/vipmonk-all.js"></script>');	
}

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
			'Ext.ux' : 'dependency/extjs/ux'
		}
	});

	Ext.onReady(function() {
		CKEDITOR.on( 'instanceCreated', function( event ) {
			var editor = event.editor;
			editor.on( 'configLoaded', function() {
				editor.config.baseFloatZIndex = 20000;
			});
		});
		
	    Ext.tip.QuickTipManager.init();	
		
		Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
		
		Ext.getBody().mask('页面加载中...');	
		
		OperatorAction.getLoginInfos(function(actionResult){
			Ext.getBody().unmask();	
			if(actionResult.data!=null&&actionResult.data.loginType=="o"){
				window.account = actionResult.data;
				window.contextPath = actionResult.data.contextPath;
				loadUI();
			} else {
				BBusinessAction.findBusinessAdminByDomain(domainPrefix,function(actionResult){
					if(actionResult.success){
						vip.logo = actionResult.data.loginPath;
						vip.signViewport = Ext.create('VIP.common.SignInViewport').show();
					}else{
						Ext.Msg.error("没有该商家");
					}
				});
				
			}
			
		});
		
	});
}

function loadUI(){
	vip.viewport = Ext.create('VIP.Viewport');
	vip.viewport.west = vip.viewport.down('vipwestmain');
	vip.viewport.center = vip.viewport.down('vipcenter');
	vip.viewport.main = vip.viewport.down('vipmain');	
}