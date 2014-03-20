Ext.define('VIP.card.store.Card',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.card.model.Card'],
	model : 'VIP.card.model.Card',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'CardTypeAction.findCardTypes',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});