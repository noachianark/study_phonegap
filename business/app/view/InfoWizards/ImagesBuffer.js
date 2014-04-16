/**
 * @class Business.view.ImagesBuffer
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.InfoWizards.ImagesBuffer', {
    extend: 'Ext.Panel',
    alias:'widget.imagesbuffer',
    requires: [
        'Business.view.InfoWizards.ImageItem'
    ],
    config: {

        cls:"image-buffer",
        autoDestroy:true,
        fullscreen:true,
        title:"发布",
        layout:{
            type:'vbox'
        },
        items:[
        	{
                flex:1,
                itemId:'image-list',
                cls:'image-area',
                defaultType:'imageitem',
                useComponents: true,
        		xtype:'dataview',
                margin:10,
                store:'Images'
        	},
            {
                xtype:'button',
                itemId:'nextBtn',
                text:'下一步',
                margin:10,
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                }
            }
        ]
    },

    setNavBar:function(navi,panel){
        //navi.getNavigationBar().leftBox.query('button')[0].hide();
        var me = this;
        var btn = Ext.create('Ext.Button',{
            xtype:"button",
            text:"添加",
            align:'right',
            itemId:'addmore',
            action:'add',
            listeners:{
                tap:function(){
                    me.popActionSheet();
                },
                scope:me
            }
        });
    	navi.getNavigationBar().add(btn);
        //navi.getNavigationBar().add(this.cancelBtn);
    },
    
    popActionSheet:function(btn){
        var me = this;
        var picSheet = Ext.Viewport.down('#picsheet');
        if(!picSheet){
            picSheet = Ext.create('Ext.ActionSheet',{
                itemId:'picsheet',
                items:[
                    {
                        text:"选择图片来源",
                        cls:'title'
                    },
                    {
                        itemId:'newsBtn',
                        text: '拍照',
                        cls:'middle',
                        listeners:{
                            tap:{
                                fn:function(){
                                    me.takeCamera();
                                },
                                scope:me
                            }
                        }
                    },
                    {
                        cls:'bottom',
                        itemId:'couponBtn',
                        text: '从手机相册中选择',
                        listeners:{
                            tap:{
                                fn:me.takeGallery,
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

    takeCamera:function(){
        var actionSheet = Ext.Viewport.down('#picsheet');
        if(actionSheet){
            actionSheet.hide();
        }

        navigator.camera.getPicture( 
            function(imageData){
                Ext.getStore('Images').add({
                    url:"data:image/jpeg;base64,"+imageData,
                    description:''
                });
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



    },

    takeGallery:function(){
        var actionSheet = Ext.Viewport.down('#picsheet');
        if(actionSheet){
            actionSheet.hide();
        }

        navigator.camera.getPicture( 
            function(imageData){
                Ext.getStore('Images').add({
                    url:"data:image/jpeg;base64,"+imageData,
                    description:''
                });
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

});