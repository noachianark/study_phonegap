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
						layout:'vbox',
						items:[						
							{
								//xtype:'img',
								itemId:'image',
								tpl:'<img src={src} style="width:100%;">'
							},
							{
								xtype:'textareafield',
								itemId:'content',
								placeHolder:'描述内容',
								value:'',
								clearIcon:false,
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
						xtype:'button',
						itemId:'deleteBtn',
						text:'删除',
						width:"50%",
		                style:{
		                    'background':'rgba(255,255,255,0.25)',
		                    'border':'1px solid rgba(255,255,255,1)'
		                },
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
					}					
				]
			}
		]
    },
    updateRecord:function(record){
    	if(record){
    		this.down('#image').setData({src:record.get('url')});
	    	//this.down('#image').setSrc(record.get('url'));
	    	this.down('#deleteBtn').setData({id:record.get('id')});
	    	this.down('#content').setValue(record.get('description'));
	    	this.down('#content').setData({id:record.get('id')});
    	}
    }
});