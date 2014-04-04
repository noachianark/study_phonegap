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
                margin:10
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
                                    me.takeCamera();
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
                                fn:me.takeGallery,
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

    takeCamera:function(){
        var actionSheet = Ext.Viewport.down('#picsheet');
        if(actionSheet){
            actionSheet.hide();
        }               
        Ext.getStore('Images').add({
            src:'http://i0.wp.com/s.ma.tt/files/2014/03/nophone.png?zoom=1.5&resize=100%2C100'
        });            
    },

    takeGallery:function(){
        var actionSheet = Ext.Viewport.down('#picsheet');
        if(actionSheet){
            actionSheet.hide();
        }       
        Ext.getStore('Images').add({
            src:'http://i0.wp.com/s.ma.tt/files/2014/03/nophone.png?zoom=1.5&resize=100%2C100'
        });     
    }

});