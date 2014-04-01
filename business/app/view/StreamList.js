/**
 * @class Business.view.StreamList
 * @extends Ext.List
 * Description
 */
Ext.define('Business.view.StreamList', {
    extend: 'Ext.Container',
    alias:"widget.streamlist",
    requires:[
    	'Business.view.PostItem',
    	'Business.plugin.DataViewPaging'
    ],
    config: {
    	cls:'stream-list',
		fullscreen: true,
		autoDestroy:true,
		layout: {
		    type: 'fit',
		    pack: 'center'
		},
        items:[
	   //      {
	   //          xtype : 'toolbar',
	   //          docked: 'top',
	   //          title: '已发布的资讯及优惠',
				// items: [
				// 	{
				// 		xtype:"spacer"
				// 	},
				//     {
				//         xtype: 'button',
				//         ui: 'add',
				//         iconCls:"home",
				//         itemId:'postBtn'                    
				//     }
				// ]	            
	   //      },
			{
				xtype:"dataview",
				defaultType:"postitem",
				useComponents: true,
				cls:"itemlist",
				loadingText:"loading...",
				store:'Stream',
				infinite:true,
				plugins:[
			        {
			            //xclass:'Ext.plugin.ListPaging',
			            xclass: 'Business.plugin.DataViewPaging',
			            autoPaging: true,
			            // These override the text; use CSS for styling
			            noMoreRecordsText:'已到底部',
			            loadMoreText :''
			        }
			    ]
			}
        ]

    }
});