/**
 * @class Business.view.StreamList
 * @extends Ext.List
 * Description
 */
Ext.define('Business.view.StreamList', {
    extend: 'Ext.Container',
    alias:"widget.streamlist",
    requires:[
    	'Business.view.PostItem'
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
				autoScroll:true,
				autoLoad:true,
				loadingText:"loading...",
				store:'Stream',
				infinite: true,
				plugins:[
					// {
		   //              ptype: 'pullrefresh',
		   //              refreshFn: function(callback, plugin) {
		   //                  console.log( 'me1' );
		   //                  if (navigator.geolocation) {
		   //                      navigator.geolocation.getCurrentPosition(function(position) {
		   //                          console.log( 'me2' );
		   //                          Rad.stores.games.getProxy().extraParams.lat  = position.coords.latitude;
		   //                          Rad.stores.games.getProxy().extraParams.long  = position.coords.longitude;  
		   //                          var store = plugin.list.getStore();
		   //                          store.load(function(records, operation, success) {
		   //                              callback.call(plugin);
		   //                              console.log( 'me3' );
		   //                          });
		   //                      }); 
		   //                  }
		   //              }
		   //          },
			        {
			            xclass:'Ext.plugin.ListPaging',
			            autoPaging: true,
			            // These override the text; use CSS for styling
			            loadMoreText: '加载更多...'
			        }
			    ]
			}
        ]

    }
});