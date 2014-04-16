/**
 * @class Business.view.InfoWizards.ImageCarousel
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.InfoWizards.ImageCarousel', {
    extend: 'Ext.Container',
    alias:'widget.imagecarousel',
    requires: [
        
    ],

    config: {
        cls:'image-carousel',
        layout:{
        	type:'vbox'
        },
    	items:[
            {
            	flex:1,
                xtype:'carousel',
                title:'店铺图集',
                itemId:'pictures',
                margin:10
            },
            {
                xtype:'button',
                text:'添加图片信息',
                margin:10,
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                },
                listeners:{
                    tap:{
                        fn:function(btn){
                            btn.up("imagecarousel").fireEvent("onAddnNewPic",btn.up("imagecarousel").getData(),this);
                        }
                    }
                }
            }
    	]
    },
    initialize:function(){
        console.log("初始化图片集");
        var me = this;
        var items = [];
        Ext.each(this.getData().pictures,function(picture){
            if(!picture.url){
                return;
            }
            items.push({
                xtype:'panel',
                scrollable : {
                    direction     : 'vertical',
                    directionLock : true
                },
                layout:{
                    type:'vbox'
                },
                items:[
                    {
                        flex:1,
                        xtype:'img',
                        src:basePath+picture.url+"?_dc="+new Date(),
                        itemId:'source',
                        margin:10,
                        listeners:{
                            tap:function(self){
                                me.retakePicSource(self);
                            }
                        }                        
                    },
                    {

                        xtype:'textareafield',
                        clearIcon:false,
                        placeHolder:'图片描述信息',
                        itemId:'content',
                        value:picture.description,
                        margin:10
                    },
                    {
                        layout:"hbox",
                        items:[
                            {
                                flex:1,
                                xtype:'button',
                                text:'修改保存',
                                margin:10,
                                data:{
                                    id:picture.pictureId
                                },
                                style:{
                                    'background':'rgba(255,255,255,0.25)',
                                    'border':'1px solid rgba(255,255,255,1)'
                                },
                                listeners:{
                                    tap:{
                                        fn:function(btn){
                                            console.log("修改啦！");
                                            var params= {
                                                id:btn.getData().id,
                                                type:me.getData().type,
                                                content:btn.up('panel').down('img').getSrc(),
                                                description:btn.up('panel').down('textareafield').getValue()
                                            }
                                            me.fireEvent("onUpdateItem",params);
                                        },
                                        scope:me
                                    }
                                }
                            },
                            {
                                flex:1,
                                xtype:'button',
                                text:'删除该项',
                                margin:10,
                                style:{
                                    'background':'rgba(255,255,255,0.25)',
                                    'border':'1px solid rgba(255,255,255,1)'
                                },
                                listeners:{
                                    tap:{
                                        fn:function(btn){
                                            me.fireEvent("onDeleteItem",{
                                                id:picture.pictureId,
                                                type:me.getData().type
                                            },btn.up("panel"));
                                        },
                                        scope:me
                                    }
                                }
                            }
                        ]
                    }

                ]
            });
        });

        me.down("#pictures").setItems(items);
    },

    addNewItems:function(data){
        //Ext.Msg.alert("调用了！");
        var me = this;
        this.down("carousel").add(
            {
                xtype:'panel',
                scrollable : {
                    direction     : 'vertical',
                    directionLock : true
                },
                layout:{
                    type:'vbox'
                },
                items:[
                    {
                        flex:1,
                        xtype:'img',
                        src:data.content,
                        itemId:'source',
                        margin:10
                    },
                    {

                        xtype:'textareafield',
                        clearIcon:false,
                        placeHolder:'图片描述信息',
                        itemId:'content',
                        value:data.description,
                        margin:10
                    },
                    {
                        layout:"hbox",
                        items:[
                            {
                                flex:1,
                                xtype:'button',
                                text:'修改保存',
                                margin:10,
                                style:{
                                    'background':'rgba(255,255,255,0.25)',
                                    'border':'1px solid rgba(255,255,255,1)'
                                },
                                listeners:{
                                    tap:{
                                        fn:function(btn){
                                            console.log("修改啦！");
                                            data.type = me.getData().type;
                                            me.fireEvent("onUpdateItem",data,me);
                                        },
                                        scope:me
                                    }
                                }
                            },
                            {
                                flex:1,
                                xtype:'button',
                                text:'删除该项',
                                margin:10,
                                style:{
                                    'background':'rgba(255,255,255,0.25)',
                                    'border':'1px solid rgba(255,255,255,1)'
                                },
                                listeners:{
                                    tap:{
                                        fn:function(btn){
                                            me.fireEvent("onDeleteItem",{
                                                id:picture.pictureId,
                                                type:me.getData().type
                                            },btn.up("panel"));
                                        },
                                        scope:me
                                    }
                                }
                            }
                        ]
                    }

                ]
            }

        );

        this.down("carousel").setActiveItem(999);
        console.log("lalallalalaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.dir(this.down("carousel"));
    },



    retakePicSource:function(imageComponent){
        var me = this;

        function addNewPicFromCamera(){
            var actionSheet = Ext.Viewport.down('actionsheet');
            if(actionSheet){
                actionSheet.hide();
            }
            navigator.camera.getPicture( 
                function(imageData){
                    imageComponent.setSrc("data:image/jpeg;base64,"+imageData);
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
                    imageComponent.setSrc("data:image/jpeg;base64,"+imageData);
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
    },



    setNavBar:function(navi,panel){
        var me = this;
        var btn = Ext.create('Ext.Button',{
            xtype:"button",
            text:"完成",
            align:'right',
            itemId:'showPics',
            action:'add',
            listeners:{
                tap:function(btn){
                    me.fireEvent('onUpdateComplish',me);
                },
                scope:me
            }
        });
        navi.getNavigationBar().add(btn);
    }
});