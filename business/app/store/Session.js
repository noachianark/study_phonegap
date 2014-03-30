/**
 * @class Business.store.Session
 * @extends extendsClass
 * Description
 */
Ext.define('Business.store.Session', {
    extend: 'Ext.data.Store',

    config: {
    	storeId:'session',
        model: 'Business.model.Session',
        autoLoad: true,
          
        proxy: {
         type: 'localstorage',
         id  : 'loginuser'
        }
    }
});