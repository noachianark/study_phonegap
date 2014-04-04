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
        	buffer:'imagesbuffer'
        },
        control:{
        	buffer:{
        		initialize:'initAction'
        	},
            "imagesbuffer #nextBtn":{
                tap:'nextAction'
            }
        }
    },

    initAction:function(){
        //this.getBuffer().down('#addmore').on('tap',this.popActionSheet);
    	var me = this;
        //console.log(this.getBuffer().down('dataview').getStore());
        //Ext.getStore('Images').load();
        //this.getBuffer().down('dataview').getStore().load();
    },
    nextAction:function(nextBtn){
        console.log("xxxxx");
        var panel = Ext.create('widget.infopanel');
        this.getNavi().push([panel]);
    }
});