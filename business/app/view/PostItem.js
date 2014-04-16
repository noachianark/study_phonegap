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
                xtype:'container',
                layout:{
                    type:'vbox'
                },
                items:[
                    {
                        xtype:'container',
                        layout:{
                            type:'hbox'
                        },
                        items:[
                            {
                                flex:1,
                                xtype:'label',
                                itemId:'title',
                                cls:'item-title'
                            },
                            {
                                xtype:'button',
                                iconCls:'icon-pencil',
                                itemId:'button',
                                style:{
                                    'background':'rgba(255,255,255,0)',
                                    'border':'1px solid rgba(255,255,255,0)',
                                    'color':'#fff'
                                },
                                listeners:{
                                    tap:{
                                        fn:function(btn){
                                            btn.disable();
                                            this.up('streamlist').fireEvent("onUpdateData", btn.getData(),btn);
                                        }
                                    }
                                }
                            }                            

                        ]
                    },
                    {
                        xtype:'label',
                        itemId:'content',
                        cls:'item-content'
                    }
                ]
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
        var data = record.raw;
        if(!data){
            console.log("我操");
            console.log(record);
        }
        if(record.get('publishDate')){
            data.type = 'news';
            me.down('#button').setData(data);
            me.down('#date').setHtml(record.get('publishDate'));
        }else{
            data.type = "coupons";
            me.down('#button').setData(data);            
            me.down('#date').setHtml('<div style="float:left;">'+record.get('love')+'人觉得赞</div>有效期：'+record.get('startDate')+'~'+record.get('endDate'));
        }
		me.down('#title').setHtml(record.get('title'));
		me.down('#img').setSrc(basePath + record.get('pictureUrl')+"?_dc="+new Date());
		me.down('#content').setHtml(record.get('content'));
	}

});