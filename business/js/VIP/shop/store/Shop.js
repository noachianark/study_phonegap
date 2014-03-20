Ext.define('VIP.shop.store.Shop',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.shop.model.Shop'],
	model : 'VIP.shop.model.Shop',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'ShopAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});