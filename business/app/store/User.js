/**
 * @class Business.store.User
 * @extends Ext.data.Store
 * Description
 */
Ext.define('Business.store.User', {
    extend : 'Business.store.BaseStore',
    requires : [
    	'Business.model.User'
    ],
    config : {
        model : 'Business.model.User',
		autoLoad : false,
		clearOnPageLoad: false,
		proxy : {
			enablePagingParams:false,
			type : 'direct',
			directFn : PVipCardAction.getVipCardIdByQrString,
			//directFn : PMessageAction.findNews,
			reader : {
				type : 'json',
				rootProperty : 'records'
			}
		}
    }
});