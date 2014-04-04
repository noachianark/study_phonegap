/**
 * @class Business.view.Profile
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.Profile', {
    extend: 'Ext.Container',
    alias:'widget.profile',
    requires: [
        
    ],

    config: {
        cls:'business-profile',
        fullscreen:true,
        layout:'vbox',
        items:[
        	{
        		xtype:'container',
        		layout:'hbox',
        		cls:'business-profile',
        		items:[
        			{
						cls:'business-logo-inner',
        				html:'<span class="business-logo"></span>'
        			},
        			{
        				xtype:'container',
        				layout:{
        					type:'vbox'
        				},
        				flex:1,
        				items:[
        					{
        						flex:1,
        						xtype:'container',
        						cls:'business-profile-info',
        						layout:{
        							type:'hbox',
        							pack:'center',
        							align:'center'
        						},
        						defaults:{
        							xtype:'component',
        							margin:5
        						},
        						items:[
        							
        						]
        					}
        				]
        			}
        		]
        	}
        ]
    }
});