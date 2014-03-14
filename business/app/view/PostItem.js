/**
 * @class Business.view.PostItem
 * @extends Ext.dataview.component.DataItem
 * Description
 */
Ext.define('Business.view.PostItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias:"widget.postitem",
    config: {
    	flex:1,
    	width:'auto',
    	cls:"post-item",

    	layout:"vbox",

    	title: {
            cls: 'item-title'
        },
        time:{
        	cls:'item-time'
        },
        description:{
        	cls:'item-description'
        },

        dataMap: {
            getTitle: {
                setHtml: 'title'
            },

            getTime: {
                setHtml: 'time'
            },

            getDescription: {
                setHtml: 'description'
            }
        }
    },

	applyTitle: function(config) {
		return Ext.factory(config, Ext.Component, this.getTitle());
	},

	updateTitle: function(newTitle, oldTitle) {
		if (newTitle) {
			this.add(newTitle);
		}

		if (oldTitle) {
			this.remove(oldTitle);
		}
	},

	applyTime: function(config) {
		return Ext.factory(config, Ext.Component, this.getTime());
	},

	updateTime: function(newTime, oldTime) {
		if (newTime) {
			this.add(newTime);
		}

		if (oldTime) {
			this.remove(oldTime);
		}
	},

	applyDescription: function(config) {
		return Ext.factory(config, Ext.Component, this.getDescription());
	},

	updateDescription: function(newDescription, oldDescription) {
		if (newDescription) {
			this.add(newDescription);
		}

		if (oldDescription) {
			this.remove(oldDescription);
		}
	}

});