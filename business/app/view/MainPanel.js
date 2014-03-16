/**
 * @class Business.controller.MainPanel
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.view.MainPanel', {    
	extend: 'Ext.TabPanel',
    require: [
        "Business.view.SreamList"
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
                html:"Second Tab",
                title:"我",
                label:"商家资料",
                iconCls:"icon-home"
            }
        ]
    },

    postBtn:{
        xtype:'button',
        text:'',
        iconCls:"icon-pencil",
        align:'right',
        itemId:'postBtn'
    },

    quitBtn:{
        xtype:'button',
        text:'',
        iconCls:"icon-switch",
        align:'right',
        itemId:'quitBtn'
    },

    //for every component view which has deal with navbar
    setNavBar:function(navi,panel){
        if(panel){

            if(panel.isXType('streamlist')){
                navi.getNavigationBar().add(this.postBtn);
            }else{
                navi.getNavigationBar().add(this.quitBtn);
            }
            navi.getNavigationBar().setTitle(panel.label);
            return;
        }

        navi.getNavigationBar().setTitle(this.getActiveItem().label);
        if(this.getActiveItem().isXType('streamlist')){
            navi.getNavigationBar().add(this.postBtn);
        }else{
            navi.getNavigationBar().add(this.quitBtn);
        }

    }
});