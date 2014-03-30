/**
 * @class Business.controller.Wizard
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.Wizard', {
    extend: 'Ext.app.Controller',
    requires: [
        
    ],

    config: {
        refs:{
        	buffer:'imagesbuffer',
        	addMore:'imagesbuffer #addmore',
        	cancel:'imagesbuffer #cancel'
        },
        control:{
        	buffer:{
        		initialize:'initAction'
        	},
        	addMore:{
        		tap:'takePicture'
        	},
        	cancel:{
        		tap:'cancelAction'
        	}
        }
    },

    initAction:function(){
    	var me = this;
    	this.getBuffer().store = Ext.create("Ext.data.Store",{
    		fields:['src'],
    		listeners:{
    			updaterecord:{
    				fn:me.updaterecord,
    				scope:this
    			},
    			addrecords:{
    				fn:me.addrecords,
    				scope:this
    			},
    			refresh:{
    				fn:me.refresh,
    				scope:this
    			}
    		}
    	});

    	console.log("initAction");
    },

    updaterecord:function( self, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts ){
    	
    },

    addrecords:function( store, records, eOpts ){
    	var me = this;
    	if(store.getCount() > 0){
			this.getBuffer().down('container').removeAll();
			store.each(function(item, index, length){
	    		var img = Ext.create('widget.imageitem',{src:item.get('src')});
	    		me.getBuffer().down('container').add(img);
			},this);
			if(store.getCount() < 8){
				this.getBuffer().down('container').add(me.getBuffer().addmore);
			}
    	}    	
    },

    takePicture:function(){
		this.getBuffer().store.add({src:'http://i0.wp.com/s.ma.tt/files/2014/03/nophone.png?zoom=1.5&resize=100%2C100'});    	
    },

    refresh:function( self, data, eOpts ){
    	console.log("refresh store");
    }
});