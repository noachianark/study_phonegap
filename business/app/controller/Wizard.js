/**
 * @class Business.controller.Wizard
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.Wizard', {
    extend: 'Ext.app.Controller',
    alias:'widget.wizard',
    requires: [
        'Business.view.InfoWizards.InfoPanel'
    ],

    config: {
        refs:{
            navi:'main',
        	buffer:'imagesbuffer',
            publish:"infopanel",
            publishAction:'infopanel #publish'
        },
        control:{
        	buffer:{
        		initialize:'initAction',
                destroy:'destroyed'
        	},
            "imagesbuffer #nextBtn":{
                tap:'nextAction'
            },
            publish:{

            },
            publishAction:'publishAction'
        }
    },

    initAction:function(){
        //this.getBuffer().down('#addmore').on('tap',this.popActionSheet);
    	var me = this;
        //console.log(this.getBuffer().down('dataview').getStore());
        //Ext.getStore('Images').load();
        //this.getBuffer().down('dataview').getStore().load();
    },

    destroyed:function(){
        var store = Ext.getStore('Images');
        store.removeAll();
        store.sync();
    },

    nextAction:function(nextBtn){
        var store = Ext.getStore('Images');
        console.log('Zxzxzxczx');
        console.log(store.getAllCount());
        if(store.getAllCount() > 0 ){
            var panel = Ext.create('widget.infopanel');
            this.getNavi().push([panel]);            
        }else{
            Ext.Msg.alert('信息','您还没有添加任何图片信息');
        }

    },

    publishAction:function(btn){
        console.log('publish！');
        var records = Ext.getStore('Images').load();
        console.log(records);
    }
});