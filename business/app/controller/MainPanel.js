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
        //根据用户ID调用store,返回数据后，调用user profile页面。
        var me = this;
        var store = Ext.create("Business.store.User");
        store.load({
            scope:this,
            callback: function(records, operation, success){
                if (success) {
                    me.showUserProfile(records);
                } else {
                    console.log('error');
                }                
            }
        });

        
    },

    showUserProfile:function(records){
        //获取到用户信息。
        var profile = Ext.create("Business.view.UserProfile");
        profile.setData(records[0]);
        profile.setTitle(records[0].get('username'));
        this.getNavi().push([profile]);
    }
});