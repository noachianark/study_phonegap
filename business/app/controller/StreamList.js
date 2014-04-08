/**
 * @class Business.controller.StreamList
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.StreamList', {
    extend: 'Ext.app.Controller',
    requires:[
    	'Business.view.InfoWizards.ImagesBuffer',
    	'Business.view.InfoWizards.ImageItem',
    	'Ext.ActionSheet'
    ],
    config: {
        refs:{
        	list:'streamlist',
        	postBtn:'main #postBtn',
        	navi:'main'
        },
        control:{
        	postBtn:{
        		tap:'popActionSheet'
        	},
        	list:{
        		initialize:"initAction"
        	}
        }
    },

    initAction:function(){
    	this.getList().down('dataview').getStore().load();
    },

    popPictureSheet:function(type){
    	var me = this;
    	var picSheet = Ext.Viewport.down('#picsheet');
    	if(!picSheet){
    		picSheet = Ext.create('Ext.ActionSheet',{
    			itemId:'picsheet',
    			items:[
    				{
    					xtype:'component',
    					html:"<p style='text-align:center';>选择图片来源</p>"
    				},
			        {
			        	iconCls:'icon-camera',
			        	itemId:'newsBtn',
			            text: '拍照',
			            listeners:{
			            	tap:{
			            		fn:function(){
			            			me.takeCamera(type);
			            		},
			            		scope:me
			            	}
			            }
			        },
			        {
			        	iconCls:'icon-image',
			        	itemId:'couponBtn',
			            text: '从手机相册中选择',
			            listeners:{
			            	tap:{
			            		fn:function(){
			            			me.takeGallery(type);	
			            		},
			            		scope:me
			            	}
			            }
			        },
			        {
			            text: '取消',
			            iconCls:'icon-close',
			            listeners:{
			            	tap:{
			            		fn:function(){
			            			picSheet.hide();
			            		}
			            	}
			            }
			        }
    			]
    		});

			picSheet.on({
				delay:200,
				hiddenchange : function(sheet, hidden) {
					if (hidden) {
						sheet.destroy();
					}
				}				
			});
			Ext.Viewport.add(picSheet);
			picSheet.show();    		
    	}
    },

    popActionSheet:function(){
    	var me = this;
		var actionSheet = Ext.Viewport.down('actionsheet');
		if(!actionSheet){
			actionSheet = Ext.create('Ext.ActionSheet', {
				itemId:'actionsheet',
			    items: [
				    {
				    	xtype:'component',
				    	html:"<p style='text-align:center;'>选择资讯类型</p><br>"
				    },
			        {
			        	iconCls:'icon-newspaper',
			        	itemId:'newsBtn',
			            text: '发布新闻',
			            listeners:{
			            	tap:{
			            		fn:me.newsAction,
			            		scope:me
			            	}
			            }
			        },
			        {
			        	iconCls:'icon-image',
			        	itemId:'couponBtn',
			            text: '发布优惠',
			            listeners:{
			            	tap:{
			            		fn:me.couponAction,
			            		scope:me
			            	}
			            }
			        },
			        {
			            text: '取消',
			            iconCls:'icon-close',
			            listeners:{
			            	tap:{
			            		fn:function(){
			            			actionSheet.hide();
			            		}
			            	}
			            }
			        }
			    ]
			});
			actionSheet.on({
				delay:200,
				hiddenchange : function(sheet, hidden) {
					if (hidden) {
						sheet.destroy();
					}
				}				
			});
			Ext.Viewport.add(actionSheet);
			actionSheet.show();
		}
	},

	takeCamera:function(type){
		var actionSheet = Ext.Viewport.down('#picsheet');
		if(actionSheet){
			actionSheet.hide();
		}		
		//get the picture.
		var img = {url:'http://i0.wp.com/s.ma.tt/files/2014/03/nophone.png?zoom=1.5&resize=100%2C100'};
		this.postInfomation(type,img);
	},

	takeGallery:function(type){
		var actionSheet = Ext.Viewport.down('#picsheet');
		if(actionSheet){
			actionSheet.hide();
		}			
		var img = {url:'http://i0.wp.com/s.ma.tt/files/2014/03/nophone.png?zoom=1.5&resize=100%2C100'};
		this.postInfomation(type,img);
	},

	newsAction:function(){

		var actionSheet = Ext.Viewport.down('actionsheet');
		if(actionSheet){
			actionSheet.hide();
		}

		this.popPictureSheet("news");

	},

	couponAction:function(){
		var actionSheet = Ext.Viewport.down('actionsheet');
		if(actionSheet){
			actionSheet.hide();
		}

		this.popPictureSheet("coupon");

	},

	postInfomation:function(type,image){
		var wizard = null;
		if(type=="news"){
			wizard = Ext.create('widget.imagesbuffer',{type:'news',title:'发布新闻信息'});
		}else{
			wizard = Ext.create('widget.imagesbuffer',{type:'coupon',title:'发布优惠信息'});
		}

		Ext.getStore('Images').add(image);
		
		this.getNavi().push([wizard]);
	}
});