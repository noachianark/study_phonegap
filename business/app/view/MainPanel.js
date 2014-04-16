/**
 * @class Business.controller.MainPanel
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.view.MainPanel', {    
	extend: 'Ext.TabPanel',
    require: [
        "Business.view.SreamList",
        'Business.view.Profile'
    ],
    alias: "widget.mainpanel",

    config: {
        cls:"mainpanel",
        autoDestroy:true,
        fullscreen: true,
        tabBarPosition: 'bottom',
        title:"已发送资讯",
        items:[
            {
                xtype:"streamlist",
                title:"",
                label:"已发送资讯",
                iconCls:"icon-newspaper"
            },
            {
                title:'',
                itemId:"scan",
                iconCls:"icon-qrcode"
            },
            {
                xtype:"profile",
                title:"我",
                label:"商家资料",
                iconCls:"icon-home"
            }
        ]
    },

    postBtn:{
        xtype:'button',
        text:'发布',
        style:'color:#fff;',
        align:'right',
        itemId:'postBtn'
    },

    quitBtn:{
        xtype:'button',
        text:'注销',
        style:'color:#fff;',
        align:'right',
        itemId:'quitBtn',
        listeners:{
            tap:function(){
                Ext.Msg.confirm('确认', '确认要退出程序吗？', function(r) {
                    if (r == 'yes') {
                        setTimeout(function() {             
                            navigator.app.exitApp();
                        }, 200);
                    }
                });
            }
        }
    },

    //for every component view which has deal with navbar
    setNavBar:function(navi,panel){
        // navi.getNavigationBar().rightBox.removeAll();
        // navi.getNavigationBar().leftBox.removeAll();
        if(panel){
            if(panel.isXType('streamlist')){
                navi.getNavigationBar().add(this.postBtn);
                navi.getNavigationBar().setTitle("已发布资讯");
            }else{
                navi.getNavigationBar().add(this.quitBtn);
                navi.getNavigationBar().setTitle("商家信息");
            }
            //navi.getNavigationBar().setTitle(panel.label);
            return;
        }
        //navi.getNavigationBar().setTitle(this.getActiveItem().label);

        if(this.getActiveItem().isXType('streamlist')){
            navi.getNavigationBar().add(this.postBtn);
        }else{
            navi.getNavigationBar().add(this.quitBtn);
        }

    }
});