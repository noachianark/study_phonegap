/**
 * @class Business.view.PostItem
 * @extends Ext.dataview.component.DataItem
 * Description
 */
Ext.define('Business.view.PostItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias:"widget.postitem",
    config: {
    	flex:1,
    	width:'auto',
    	cls:"post-item",

    	layout:"vbox",

    	items:[
    		{
    			xtype:'label',
    			itemId:'title',
    			cls:'item-title'
    		},
    		{
    			xtype:'label',
    			itemId:'content',
    			cls:'item-content'
    		},    		
    		{
    			xtype:'img',
    			itemId:'img',
    			cls:'item-picture'
    		},
    		{
    			xtype:'label',
    			itemId:'date',
    			cls:'item-publish-date',
    			style:{
    				'text-align':'right'
    			}
    		}
    	]
    },

	updateRecord:function(record){
		var me = this;
		me.down('#title').setHtml(record.get('title'));
		me.down('#date').setHtml(record.get('publishDate'));
		me.down('#img').setSrc(basePath + record.get('pictureUrl'));
		me.down('#content').setHtml(record.get('content'));
	}

});