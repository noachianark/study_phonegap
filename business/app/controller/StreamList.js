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
    	'Ext.ActionSheet',
    	'Business.view.InfoWizards.UpdateContent',
    	'Business.view.InfoWizards.ImageCarousel'
    ],
    config: {
        refs:{
        	list:'streamlist',
        	postBtn:'main #postBtn',
        	navi:'main',
        	updatepanel:"updatecontent",
        	imagecarousel:"imagecarousel"
        },
        control:{
        	postBtn:{
        		tap:'popActionSheet'
        	},
        	list:{
        		initialize:"initAction",
        		onUpdateData:"onUpdateInfo"

        	},
        	updatepanel:{
        		onDeleteInfo:'onDeleteInfo',
        		updateSuccess:'updateSuccess',
        		onFindById:"onFindById"
        	},
        	imagecarousel:{
        		onUpdateComplish:"onUpdateComplish",
        		onDeleteItem:"onDeleteItem",
        		onUpdateItem:"onUpdateItem",
        		onAddnNewPic:"onAddnNewPic"
        	}
        }
    },

    initAction:function(){
    	var me = this;
    	me.getList().down('#coupons').getStore().load();
    	me.getList().down('#news').getStore().load();
    },

    popPictureSheet:function(type){
    	var me = this;
    	var picSheet = Ext.Viewport.down('#picsheet');
    	if(!picSheet){
    		picSheet = Ext.create('Ext.ActionSheet',{
    			itemId:'picsheet',
    			items:[
    				{
    					cls:'title',
    					text:"选择图片来源"
    				},
			        {
			        	itemId:'newsBtn',
			            text: '拍照',
			            cls:'middle',
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
			        	itemId:'couponBtn',
			            text: '从相册中选择',
			            cls:'bottom',
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
			            cls:'cancel',
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
			    		text:'选择资讯类型',
			    		cls:'title'
			    	},
			        {
			        	itemId:'newsBtn',
			            text: '发布新闻',
			            cls:'middle',
			            listeners:{
			            	tap:{
			            		fn:me.newsAction,
			            		scope:me
			            	}
			            }
			        },
			        {
			        	itemId:'couponBtn',
			            text: '发布优惠',
			            cls:'bottom',
			            listeners:{
			            	tap:{
			            		fn:me.couponAction,
			            		scope:me
			            	}
			            }
			        },
			        {
			            text: '取消',
			            cls:'cancel',
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
		var me = this;
        navigator.camera.getPicture( 
            function(imageData){
				var img = {url:"data:image/jpeg;base64,"+imageData,description:''};
				me.postInfomation(type,img);
            }, 
            function(message){
                Ext.Msg.alert('信息',message);
            },
            {
                quality: 50,
                destinationType:Camera.DestinationType.DATA_URL,
                sourceType:Camera.PictureSourceType.CAMERA,
                encodingType:Camera.EncodingType.JPEG,
                targetWidth:500,
                targetHeight:255
            }
        );


		//get the picture.
		// var img = {url:'http://i0.wp.com/s.ma.tt/files/2014/03/nophone.png?zoom=1.5&resize=100%2C100'};
		// this.postInfomation(type,img);
	},

	takeGallery:function(type){
		var me = this;
		var actionSheet = Ext.Viewport.down('#picsheet');
		if(actionSheet){
			actionSheet.hide();
		}
        navigator.camera.getPicture( 
            function(imageData){
				var img = {url:"data:image/jpeg;base64,"+imageData,description:''};
				me.postInfomation(type,img);
            }, 
            function(message){
                Ext.Msg.alert('信息',message);
            },
            {
                quality: 50,
                destinationType:Camera.DestinationType.DATA_URL,
                sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType:Camera.EncodingType.JPEG,
                targetWidth:500,
                targetHeight:255
            }
        );		
		// var img = {url:'http://i0.wp.com/s.ma.tt/files/2014/03/nophone.png?zoom=1.5&resize=100%2C100'};
		// this.postInfomation(type,img);
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
			wizard = Ext.create('widget.imagesbuffer',{data:{type:'news'},title:'发布新闻信息'});
		}else{
			wizard = Ext.create('widget.imagesbuffer',{data:{type:'coupon'},title:'发布优惠信息'});
		}

		Ext.getStore('Images').add(image);
		
		this.getNavi().push([wizard]);
	},

	onUpdateInfo:function(data,btn){
		var panel = null
		if(data.type=="news"){
			panel = Ext.create("widget.updatecontent",{
				title:'修改新闻资讯',
				data:data
			});
		}else{
			panel = Ext.create("widget.updatecontent",{
				title:'修改优惠资讯',
				data:data
			});
		}
		
		this.getNavi().push([panel]);
		//panel.setData();
		btn.enable();
	},
	onDeleteInfo:function(selector){
        this.getNavi().pop(1);
        this.getList().down(selector).getStore().removeAll();
        this.getList().down(selector).getStore().loadPage(1);
        if(selector == "#news"){
            this.getList().down('tabpanel').setActiveItem(1);
        }else{
            this.getList().down('tabpanel').setActiveItem(0);
        }
	},
	updateSuccess:function(selector){
        this.getList().down(selector).getStore().removeAll();
        this.getList().down(selector).getStore().loadPage(1);
	},
	onFindById:function(data,panel){
		var panel = Ext.create('widget.imagecarousel',{
			title:'编辑图片',
			data:data
		});
		this.getNavi().push([panel]);
	},

	onDeleteItem:function(data,component){
		var me = this;
		function resultHandler(actionResult){
			if(actionResult.success){
				me.getImagecarousel().down('carousel').remove(component);
			}else{
				Ext.Msg.alert(actionResult.message);
			}
		}
		if(data.type=="news"){
			PMessageAction.deleteNewsPictures(data.id,resultHandler);
		}else{
			PMessageAction.deleteCouponPictures(data.id,resultHandler);
		}

	},

	onUpdateComplish:function(){
		this.getNavi().pop(2);
	},

	onUpdateItem:function(params){
		var content = null;
		if(params.content.indexOf('http')==-1){
			content = params.content;
		}
		function resultHandler (actionResult) {
			if(actionResult.success){
				Ext.Msg.alert('信息','更新成功');
			}else{
				Ext.Msg.alert('信息',actionResult.message);
			}
		}
		if(params.type == 'news'){
			PMessageAction.updateNewsPicturesByByte(params.id,content,params.description,resultHandler);
		}else{
			PMessageAction.updateCouponPicturesByByte(params.id,content,params.description,resultHandler);
		}
	},

	addNewPic:function(data,img){
		var me = this;
		function resultHandler(actionResult){
			if(actionResult.success){
				//console.log("注意有ID啦阿啦啦啦啦啦啦啦啦啦啦");
				//console.log(actionResult.data.id);
				var d = {
					id:actionResult.data.id,
					description:data.description,
					content:img
				};
				me.getImagecarousel().addNewItems(d);
			}else{
				Ext.Msg.alert('提示',actionResult.message);
			}
		}
		if(data.type=="news"){
			PMessageAction.addNewsPicturesByByte(data.id,img,data.description,resultHandler);
		}else{
			PMessageAction.addCouponPicturesByByte(data.id,img,data.description,resultHandler);
		}
	},

	onAddnNewPic:function(data,panel){
    	var me = this;

    	function addNewPicFromCamera(){
			var actionSheet = Ext.Viewport.down('actionsheet');
			if(actionSheet){
				actionSheet.hide();
			}
	        navigator.camera.getPicture( 
	            function(imageData){
					me.addNewPic(data,"data:image/jpeg;base64,"+imageData);
	            }, 
	            function(message){
	                Ext.Msg.alert('信息',message);
	            },
	            {
	                quality: 50,
	                destinationType:Camera.DestinationType.DATA_URL,
	                sourceType:Camera.PictureSourceType.CAMERA,
	                encodingType:Camera.EncodingType.JPEG,
	                targetWidth:500,
	                targetHeight:255
	            }
	        );				
		}

    	function addNewPicFromGallery(){
			var actionSheet = Ext.Viewport.down('actionsheet');
			if(actionSheet){
				actionSheet.hide();
			}
	        navigator.camera.getPicture( 
	            function(imageData){
					me.addNewPic(data,"data:image/jpeg;base64,"+imageData);
	            },
	            function(message){
	                Ext.Msg.alert('信息',message);
	            },
	            {
	                quality: 50,
	                destinationType:Camera.DestinationType.DATA_URL,
	                sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
	                encodingType:Camera.EncodingType.JPEG,
	                targetWidth:500,
	                targetHeight:255
	            }
	        );	
		}


		var actionSheet = Ext.Viewport.down('actionsheet');
		if(!actionSheet){
			actionSheet = Ext.create('Ext.ActionSheet', {
				itemId:'actionsheet',
			    items: [
			    	{
			    		text:'选择资讯类型',
			    		cls:'title'

			    	},
			        {
			        	itemId:'newsBtn',
			            text: '拍照',
			            cls:'middle',
			            listeners:{
			            	tap:{
			            		fn:addNewPicFromCamera,
			            		scope:me
			            	}
			            }
			        },
			        {
			        	itemId:'couponBtn',
			            text: '从相册中选择',
			            cls:'bottom',
			            listeners:{
			            	tap:{
			            		fn:addNewPicFromGallery,
			            		scope:me
			            	}
			            }
			        },
			        {
			            text: '取消',
			            cls:'cancel',
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
	}
});