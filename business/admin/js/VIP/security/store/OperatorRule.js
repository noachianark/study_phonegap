Ext.define('VIP.security.store.OperatorRule',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.security.model.OperatorRule'],
	model : 'VIP.security.model.OperatorRule',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'OperatorRuleAction.findOperatorRules',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});