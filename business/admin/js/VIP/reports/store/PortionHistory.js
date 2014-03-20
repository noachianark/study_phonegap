Ext.define('VIP.reports.store.PortionHistory',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.reports.model.PortionHistory'],
	model: 'VIP.reports.model.PortionHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'TransactionAction.findPointHistories',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: false
});