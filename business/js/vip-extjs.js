Ext.Msg.error = function(message, callback, scope) {
	this.show({
		title : '错误',
		msg : message,
		buttons : Ext.Msg.OK,
		icon : this.ERROR,
		callback : callback,
		scope : scope,
		fn : function(id,msg){
			if(message=="超时，请重新登录。"){
				window.location.reload();
			}
		}
	});
	
};

Ext.Msg.info = function(message, callback, scope) {
	this.show({
		title : '提示',
		msg : message,
		buttons : Ext.Msg.OK,
		icon : this.INFO,
		callback : callback,
		scope : scope
	});
};