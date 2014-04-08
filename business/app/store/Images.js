/**
 * @class Business.store.Images
 * @extends Ext.data.Store
 * Description
 */
Ext.define('Business.store.Images', {
    extend: 'Ext.data.Store',
    config: {
        fields:['url','description'],
        listeners:{
			beforeload:{
				fn:function(store, records, isSuccessful){

				}
			}
		},
		proxy:'memory'
    }
});