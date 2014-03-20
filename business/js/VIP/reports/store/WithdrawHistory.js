Ext.define('VIP.reports.store.WithdrawHistory',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.reports.model.WithdrawHistory'],
	model : 'VIP.reports.model.WithdrawHistory',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'TransactionAction.findWithdrawHistories',
		reader : {
			type : 'json',
			root : 'records'
		}
    }
});