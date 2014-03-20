Ext.define('VIP.widget.Link', {
	extend : 'Ext.Component',
	alias : [ 'widget.link' ],
	requires : [],
	height : 30,
	padding : '6 20 6 20',	
	baseCls : 'x-link',
	initComponent : function() {
		if(this.icon){
			this.html = '<img src="'+this.icon+'"><span>' + this.text + '</span>';
		} else {
			this.html = '<span>' + this.text + '</span>';
		}		
		
		this.callParent(arguments);
		
		this.on('render', function(){
			this.getEl().on('mouseover', function(){
				this.addCls('x-boundlist-item-over');
			}, this);
			
			this.getEl().on('mouseout', function(){
				this.removeCls('x-boundlist-item-over');
			}, this);
			
			if(this.handler){
				this.getEl().on('click', function(){
					this.handler.call(this, this);
				}, this);
			}
		}, this);
	}
});