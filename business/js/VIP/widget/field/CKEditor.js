Ext.define('VIP.widget.field.CKEditor', {
    extend:'Ext.form.field.TextArea',
    alias: ['widget.ckeditorfield'],    
    requires: [],    
    ckfinderOpts : {    				
    	filebrowserBrowseUrl : contextPath + 'ckfinder/ckfinder.html',
    	filebrowserImageBrowseUrl : contextPath + 'ckfinder/ckfinder.html?type=Images',
    	filebrowserFlashBrowseUrl : contextPath + 'ckfinder/ckfinder.html?type=Flash',
    	filebrowserUploadUrl : contextPath + 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Files',
    	filebrowserImageUploadUrl : contextPath + 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Images',
    	filebrowserFlashUploadUrl : contextPath + 'ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Flash',
    	filebrowserWindowWidth : '720',
     	filebrowserWindowHeight : '560'
    },
    listeners : {
    	afterrender : function(textarea){
    		if(typeof CKEDITOR != 'undefined'){
    			CKEDITOR.config.height = textarea.getHeight();    			
    			var domId = textarea.inputEl.dom.id;
    			CKEDITOR.replace(domId, this.ckfinderOpts);
    			textarea.ckeditor = CKEDITOR.instances[domId];    			
    		}			 
    	},
    	destroy: function(textarea){
    		textarea.ckeditor.destroy();
    	}
    }
});