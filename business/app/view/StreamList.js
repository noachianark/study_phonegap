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
				store: {
				    fields: ['title','time','description'],
				    data: [
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},				        
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
						{title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},				        
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'},
				        {title: 'Forest',time:'03/28/2014',description:'chachacha'},
				        {title: 'Cowper',time:'03/28/2014',description:'chachacha'},
				        {title: 'Everett',time:'03/28/2014',description:'chachacha'},
				        {title: 'University',time:'03/28/2014',description:'chachacha'}				        
				    ]
				}     		
			}
        ]

    }
});