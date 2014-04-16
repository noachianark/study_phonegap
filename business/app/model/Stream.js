/**
 * @class Business.model.Stream
 * @extends extendsClass
 * Description
 */
Ext.define('Business.model.Stream', {
    extend: 'Ext.data.Model',

    config: {
        fields:[
        	{name:'title',type:'string'},
        	{name:'publishDate',type:'string'},
        	{name:'content',type:'string'},
        	{name:'pictureUrl',type:'string'},
        	{name:'love',type:'string'}
        ]
    }
});