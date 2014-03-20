Ext.define('Option', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'text',
		type : 'string'
	}, {
		name : 'value',
		type : 'string'
	} ]
});

Ext.define('VIP.widget.field.ComboBox', {
	extend : 'Ext.form.field.ComboBox',
	alias : [ 'widget.vcombo' ],
	forceSelection : true,
	editable : false,
	queryMode : 'local',
	displayField : 'text',
	valueField : 'value',
	triggerAction : 'all',
	
	initComponent : function() {
		var me = this;
		
		this.addEvents(	          
			'optionsready'
		);
		if (me.options) {
			me.store = Ext.create('Ext.data.Store', {
				fields : [ 'text', 'value' ],
				data : me.options
			});
			
			me.fireEvent('optionsready', me);
		} else {
			me.store = Ext.create('Ext.data.Store', {
				model : 'Option',
				proxy : me.getProxy(),
				autoLoad : true
			});
			
			me.store.on('load', function(){
				if(me.originalValue != undefined && me.originalValue != ''){
					me.setValue(me.originalValue);
				} else if (me.allowBlank === false && me.store.getTotalCount() > 0){
//					me.setValue(me.store.first());
				}
				me.fireEvent('optionsready', me);
			}, me, {
				delay: 200
			});
			
			if(!me.isDisabled()){
				me.store.on('beforeload', function(){
					this.setDisabled(true);
				}, me);
				
				me.store.on('load', function(){
					this.setDisabled(false);
				}, me);
			}
		}		
		
		this.callParent();
	},	

	refresh : function() {
		if (!this.store.isLoading()) {
			this.store.setProxy(this.getProxy());
			this.store.load();
		}
	},
		
	setOptions : function(options){
		this.store.loadData(options, false);
	},
	
	getText : function(){
		var index = this.store.findExact('value', this.getValue()); 
        if (index != -1){
            var record = this.store.getAt(index).data; 
            return record.text; 
        }
	}
});