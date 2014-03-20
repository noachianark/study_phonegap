Ext.define('VIP.operator.store.Operator',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.operator.model.Operator'],
	model : 'VIP.operator.model.Operator',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'OperatorAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});