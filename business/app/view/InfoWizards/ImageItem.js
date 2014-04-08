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
				layout:'vbox',
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
								itemId:'content',
								placeHolder:'描述内容',
								value:'',
								flex:1,
								listeners:{
									change:{
										fn:function(self, newValue, oldValue, eOpts ){
											var id = this.getData().id;
											if(id){
												var store = Ext.getStore('Images');
												var record = store.getById(id);
												if(record){
													record.set('description',newValue);
													store.sync();													
												}
											}
										}
									}
								}
								
							}
						]
					},
					{
						xtype:'container',
						layout:'hbox',
						items:[
							{
								xtype:'button',
								itemId:'deleteBtn',
								text:'删除',
								listeners:{
									tap:{
										fn:function(btn){
											//console.log(this.getData());
											var id = this.getData().id;
											if(id){
												var store = Ext.getStore('Images');
												var record = store.getById(id);
												store.remove(record);
												store.sync();
											}
										}
									}
								}
							},
							{
								xtype:'button',
								itemId:'saveBtn',
								text:'保存'
							}
						]
					}
				]
			}
		]
    },
    updateRecord:function(record){
    	if(record){
	    	this.down('#image').setSrc(record.get('url'));
	    	this.down('#deleteBtn').setData({id:record.get('id')});
	    	this.down('#content').setValue(record.get('description'));
	    	this.down('#content').setData({id:record.get('id')});
    	}
    }
});