/**
 * @class Business.controller.MainPanel
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.MainPanel', {
    extend: 'Ext.app.Controller',
    requires:[
        'Business.view.UserProfile'
    ],
    config: {
     	refs:{
     		mainpanel:"mainpanel",
            navi:"main"
     	},
     	control:{
     		mainpanel:{
     			initialize:'initAction',
                activeitemchange:'onActiveitemchange'
     		}
     	}
    },

    initAction:function(){
        var me = this;

        this.getMainpanel().getTabBar().getAt(0).setFlex(1);
        //this.getMainpanel().getTabBar().getAt(1).setFlex(1);
        this.getMainpanel().getTabBar().getAt(2).setFlex(1);

        this.getMainpanel().getTabBar().getAt(1).addCls("scanBtn");
        this.getMainpanel().addBeforeListener('activeitemchange', function(container, newItem, oldItem, opts){
            if(newItem.getItemId() == "scan"){
                me.scanAction();
                return false;
            }

        });
    },

    onActiveitemchange:function( container, value, oldValue, eOpts ){
        this.getNavi().getNavigationBar().rightBox.removeAll();
        this.getMainpanel().setNavBar(this.getNavi(),value);
    },

    scanAction:function(){
        //开启相机并扫描，返回结果后转至showUserProfile。
        this.showUserProfile();
    },

    showUserProfile:function(){
        //获取到用户信息。
        this.getNavi().push([{xtype:'userprofile'}]);
    }
});