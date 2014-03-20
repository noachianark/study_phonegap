Ext.define('VIP.reports.store.ConsumeHistory',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.reports.model.ConsumeHistory'],
	model: 'VIP.reports.model.ConsumeHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'TransactionAction.findConsumeHistories',
		reader : {
			type : 'json',
			root : 'records'
		}
    }
});