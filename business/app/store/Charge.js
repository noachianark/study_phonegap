/**
 * @class Business.store.Charge
 * @extends Ext.data.Store
 * Description
 */
Ext.define('Business.store.Charge', {
    extend: 'Ext.data.Store',

    config: {
    	fields:['success'],
        data:[
        	{
        		success:true
        	}
        ],
        proxy:'memory'
    }
});