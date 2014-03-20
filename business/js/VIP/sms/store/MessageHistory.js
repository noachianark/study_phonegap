Ext.define('VIP.sms.store.MessageHistory',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.sms.model.MessageHistory'],
	model: 'VIP.sms.model.MessageHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'MessageAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});