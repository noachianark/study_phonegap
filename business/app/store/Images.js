/**
 * @class Business.store.Images
 * @extends Ext.data.Store
 * Description
 */
Ext.define('Business.store.Images', {
    extend: 'Ext.data.Store',
    config: {
        fields:['src'],
        listeners:{
			beforeload:{
				fn:function(store, records, isSuccessful){
					console.log("before image load");
										
				}
			}
		},
		proxy:'memory'
    }
});