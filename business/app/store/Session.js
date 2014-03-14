/**
 * @class Business.store.Session
 * @extends extendsClass
 * Description
 */
Ext.define('Business.store.Session', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Business.model.Session',
        autoLoad: true,
          
        proxy: {
         type: 'localstorage',
         id  : 'userinfo'
        }
    }
});