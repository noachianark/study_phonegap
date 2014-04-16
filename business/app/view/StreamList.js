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
    	fullscreen:true,
    	cls:'stream-list',
		autoDestroy:true,
		layout: {
		    type: 'vbox'
		},
        items:[
        	{
                xtype:'tabpanel',
                tabBarPosition:'top',
                flex:1,
                items:[
					{
						title:'优惠',
						xtype:"dataview",
						itemId:'coupons',
						defaultType:"postitem",
						useComponents: true,
						cls:"itemlist",
						loadingText:"读取中...",
						store:'Coupon',
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
					},
					{
						title:'新闻',
						itemId:'news',
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
     //    	{
     //    		cls:'coupon-list',
     //    		xtype:'panel',
     //    		title: '优惠',
     //    		items:[
					// // {

					// // 	xtype:"dataview",
					// // 	defaultType:"postitem",
					// // 	useComponents: true,
					// // 	cls:"itemlist",
					// // 	loadingText:"读取中...",
					// // 	store:'Coupon',
					// // 	infinite:true,
					// // 	plugins:[
					// //         {
					// //             //xclass:'Ext.plugin.ListPaging',
					// //             xclass: 'Business.plugin.DataViewPaging',
					// //             autoPaging: true,
					// //             // These override the text; use CSS for styling
					// //             noMoreRecordsText:'已到底部',
					// //             loadMoreText :''
					// //         }
					// //     ]
					// // }
					// {
					// 	html:'asdasdasdasd'
					// }
     //    		]
     //    	},
     //    	{
     //    		cls:'news-list',
     //    		title:'新闻',
     //    		xtype:'panel',
     //    		items:[
					// // {

					// // 	xtype:"dataview",
					// // 	defaultType:"postitem",
					// // 	useComponents: true,
					// // 	cls:"itemlist",
					// // 	loadingText:"loading...",
					// // 	store:'Stream',
					// // 	infinite:true,
					// // 	plugins:[
					// //         {
					// //             //xclass:'Ext.plugin.ListPaging',
					// //             xclass: 'Business.plugin.DataViewPaging',
					// //             autoPaging: true,
					// //             // These override the text; use CSS for styling
					// //             noMoreRecordsText:'已到底部',
					// //             loadMoreText :''
					// //         }
					// //     ]
					// // }
					// {
					// 	html:'asdasdasdasdxxxx'
					// }
     //    		]
     //    	}

        ]

    }
});