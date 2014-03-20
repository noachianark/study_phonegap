Ext.define('VIP.message.store.News',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.message.model.News'],
	model : 'VIP.message.model.News',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'publishTime',
        direction: 'DESC'
    }],
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'MessageAction.findNews',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});