Ext.define('VIP.reports.store.OperationLog',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.reports.model.OperationLog'],
	model : 'VIP.reports.model.OperationLog',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'BusinessLogAction.findOperatorLogs',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});