/**
 * @class Business.view.InfoWizards.InfoPanel
 * @extends Ext.Panel
 * Description
 */
Ext.define('Business.view.InfoWizards.InfoPanel', {
    extend: 'Ext.Panel',
    alias:'widget.infopanel',
    requires: [
        
    ],

    config: {
    	layout:{
    		type:'vbox'
    	},
    	title:'发布',
        items:[
	        {
	        	itemId:'container',
	        	xtype:'container',
	        	flex:1,
	        	margin:10,
	        	items:[
			        {
			        	xtype:'textfield',
			        	name:'title',
			        	itemId:'title',
			        	placeHolder:'请填写标题',
			        	margin:10
			        },
			        {
			        	xtype:'textareafield',
			        	name:'content',
			        	itemId:'content',
			        	placeHolder:'请填写描述',
			        	margin:10
			        },
			        {
			        	xtype:'container',
			        	itemId:'timerange',
			        	items:[
					        {
					        	xtype:'label',
					        	html:'开始时间'
					        },
							{
							    xtype: 'textfield',
							    name:'date',
							    component: {type: 'date'},
							    margin:10
							},
							{
								xtype:'label',
								html:'结束时间'
							},
							{
							    xtype: 'textfield',
							    name:'date',
							    component: {type: 'date'},
							    margin:10
							}
			        	]
			        }

	        	]
	        },

        	{
        		xtype:'button',
        		text:'发布信息',
        		itemId:'publish',
        		margin:10
        	}
        ]
    },
    setNavBar:function(navi,panel){

    },
    getFormData:function(){
    	
    },
    initialize:function(){
    	if(this.type=="news"){
    		this.down("#container").remove(this.down('#timerange'),true);
    	}
    }
});