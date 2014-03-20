Ext.define('VIP.store.BaseStore',{
	extend: 'Ext.data.Store',
	requires:['Ext.data.Store'],	
	
	constructor: function(config) {
		this.callParent([config]);
		
		this.on('load', function(){
			var rawData = this.getProxy().getReader().rawData;
			if(rawData.message){
				Ext.MessageBox.show({
					title : rawData.success? '信息' : '错误',
					msg : rawData.message,
					buttons : Ext.MessageBox.OK,
					icon : rawData.success? Ext.MessageBox.INFO : Ext.MessageBox.ERROR,
					fn : function(id,msg){
						if(rawData.errorType==0){
							document.location.href="http://localhost:8080/vipmonk/business/index.html";
						}
					}
				});
			}
		}, this);
	}
});