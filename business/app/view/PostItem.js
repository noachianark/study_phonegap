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
        publishDate:{
        	cls:'item-publish-date'
        },
        content:{
        	cls:'item-content'
        },
        pictureUrl:{
        	cls:'item-picture',
        	xtype:'img',
        	width:60,
        	height:60
        },

        dataMap: {
            getTitle: {
                setHtml: 'title'
            },

            getPublishDate: {
                setHtml: 'publishDate'
            },

            getContent: {
                setHtml: 'content'
            },
            getPictureUrl:{
            	setSrc:'pictureUrl'
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

	applyPictureUrl: function(config) {
		return Ext.factory(config, Ext.Component, this.getPictureUrl());
	},

	updatePictureUrl: function(newTitle, oldTitle) {
		if (newTitle) {
			this.add(newTitle);
		}

		if (oldTitle) {
			this.remove(oldTitle);
		}
	},

	applyPublishDate: function(config) {
		return Ext.factory(config, Ext.Component, this.getPublishDate());
	},

	updatePublishDate: function(newTime, oldTime) {
		if (newTime) {
			this.add(newTime);
		}

		if (oldTime) {
			this.remove(oldTime);
		}
	},

	applyContent: function(config) {
		return Ext.factory(config, Ext.Component, this.getContent());
	},

	updateContent: function(newDescription, oldDescription) {
		if (newDescription) {
			this.add(newDescription);
		}

		if (oldDescription) {
			this.remove(oldDescription);
		}
	}

});