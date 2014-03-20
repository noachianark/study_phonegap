Ext.define('VIP.widget.form.Panel', {
	extend : 'Ext.form.Panel',
	alias : [ 'widget.vipform' ],
	requires : [ 'VIP.widget.field.ComboBox', 'VIP.widget.field.CKEditor' ],

	initComponent : function() {
		this.callParent(arguments);
	},

	bindEnterKeyEvent : function() {
		var specialKeyListener = function(field, key) {
			var fields = this.getForm().getFields().items;
			var index = fields.indexOf(field);
			if (key.keyCode == 13) {
				index++;
				var next = fields[index];

				while (next.readOnly || next.isDisabled() || !next.focus) {
					index++;
					next = fields[index];
				}

				next.focus(true, 100);
			}
		};

		var fields = this.getForm().getFields().items;

		for ( var i = 0; i < fields.length; i++) {
			var f = fields[i];
			if (f.readOnly || f.isDisabled() || f.xtype == 'radio' || f.xtype == 'textarea') {
				continue;
			} else {
				f.on('specialKey', specialKeyListener, this);
			}
		}
	}
});