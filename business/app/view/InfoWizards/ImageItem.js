/**
 * @class Business.view.InfoWizards.ImageItem
 * @extends Ext.Component
 * Description
 */
Ext.define('Business.view.InfoWizards.ImageItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias:'widget.imageitem',

    config: {
    	flex:1,
    	width:'auto',
    	layout:'vbox',
    	margin:10,
		items:[
			{
				xtype:'container',
				layout:'hbox',
				items:[
					{
						xtype:'img',
						itemId:'image',
						width:'30vw',
						height:'30vw'						
					},
					{
						xtype:'textareafield',
						placeHolder:'描述内容',
						flex:1,
						height:'100%'
					}
				]
			}
		]
    },
    updateRecord:function(record){
    	console.log('update image item');
    	this.down('#image').setSrc(record.get('src'));
    }
});