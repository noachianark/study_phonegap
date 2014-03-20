Ext.define('VIP.reports.store.DepositHistory',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.reports.model.DepositHistory'],
	model: 'VIP.reports.model.DepositHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'TransactionAction.findDepositHistories',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: false
});