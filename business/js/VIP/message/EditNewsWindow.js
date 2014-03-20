Ext.define('VIP.message.EditNewsWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.editnewswindow' ],
	requires : ['VIP.widget.field.CKEditor'
	],
	icon : 'images/promotion.png',
	layout : 'fit',
	padding : 5,
	title : '修改活动信息',
	modal : true,
	border : false,
	resizable:false,
	width : 462,
	height : 590,
	num: 1,
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '添加描述',
			handler : function(){
				me.addDescription();
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			width : 90,
			handler : function(btn) {
				me.destroy();
			}
		} ];

		return buttons;
	},

	createView : function() {
		var me = this;

		var items = [{
			xtype : 'panel',
			bodyPadding : 10,
			autoScroll: true,
			layout : {
				type : 'table',
				columns : 2
			},
			defaults : {
				labelWidth : 60,
				labelAlign : 'right'
			},
			items : [{
				xtype : 'vipform',
				colspan : 2,
				border :false,
				items : [{
					xtype : 'fieldset',
					title : '基本信息',
					colspan : 2,
					height : 200,
					layout : {
						type : 'table',
						columns : 2
					},
					defaults : {
						labelWidth : 60,
						labelAlign : 'right'
					},
					items : [{
						xtype : 'textfield',
						fieldLabel : '标题',
						name : 'title',		
						colspan : 2,
						width : 380,
						maxLength:10,
						maxLengthText:'不可超过10字符',
						vtype: 'stringblank',
						allowBlank : false
					},{
						xtype : 'textareafield',				
						name : 'content',
						itemId : 'content',
						emptyText : '活动详情',
						colspan : 2,
						width : 370,
						padding : '0 0 0 10',
						height : 100,
						maxLength:500,
						maxLengthText:'不可超过500字符',
						margin : '3 0 0 0',
						colspan : 2,
						listeners : {
							change : function(field, key){
								var length = field.getValue().length;
								var len = 500-length;
								if(len>0&&len!=500){
									field.nextSibling().setText("还可输入"+len+"个字符");
								}else if(len==0||len==500){
									field.nextSibling().setText("　");
								}else{
									field.nextSibling().setText("已经超出"+(-len)+"个字符");
								}
							}
							
						}		
					},{
						xtype: 'label',
						margin:'0 135',
						colspan : 2,
						style : 'color:red',
						text:'　'
					}, {
						xtype : 'container',
						colspan : 2,
						layout : {
							type : 'vbox',
							align : 'center'
						},
						items : [{
							xtype : 'button',
							width : 180,
							text : '保存基本信息',
							handler : function(){
								me.save();
							}
						}]
					}]
				}]
			},{
				xtype:'panel',
				itemId: 'description',
				border:false,
				colspan : 2,
				items:[]
			}]
		}];

		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		
		this.load();
	},
	
	load : function(messageId) {
		var me = this;

		if(messageId){
			this.messageId = messageId;
		}

		MessageAction.findNewsById(this.messageId, function(result) {			
			var data = result.data;			
			me.resultData = data;
			me.down('vipform').getForm().setValues({
				title : data.title,
				content : data.content
			});
			
			
			if(data.pictures.length>0){
				for(var i=0;i<data.pictures.length;i++){
					me.addDescription(data.pictures[i].description, basePath+data.pictures[i].url,data.pictures[i].pictureId);
				}
			}else{
				me.addDescription();
			}
			
		});
	},
	
	choosePicture : function(){
		var picture = this;
		var finder = new CKFinder();
		finder.selectActionFunction = function( fileUrl, data ) {
			picture.setSrc(fileUrl);
		};
		finder.popup(720, 540);
	},
	addDescription : function(content,pictureUrl,id){
		var me =this;
		if(pictureUrl==null){
			pictureUrl='images/default_image.png';
		}
		var description = Ext.create('Ext.form.Panel',{
			border:false,
			items:[{
				xtype:'fieldset',
				margin:'5 0',
				padding: '5 45',
				width:400,
				title:'描述'+me.num,
				items:[{
					xtype : 'hiddenfield',
					name : 'id',
					value : id
				},{
					xtype : 'image',
					name : 'picture',
					style : 'border:1px dashed #AAA;cursor:pointer',
					src: pictureUrl,
					width : 300,
					height : 225,
					colspan : 2,
					listeners : {
						afterrender : function(image){
							image.getEl().on('click', me.choosePicture, image);
						}
					}
				}, {
					xtype : 'textareafield',				
					name : 'content',
					itemId : 'content',
					emptyText : '活动详情',
					value : content,
					width : 300,
					height : 100,
					maxLength:500,
					maxLengthText:'不可超过500字符',
					margin : '3 0 0 0',
					colspan : 2,
					listeners : {
						change : function(field, key){
							var length = field.getValue().length;
							var len = 500-length;
							if(len>0&&len!=500){
								field.nextSibling().setText("还可输入"+len+"个字符");
							}else if(len==0||len==500){
								field.nextSibling().setText("　");
							}else{
								field.nextSibling().setText("已经超出"+(-len)+"个字符");
							}
						}
						
					}		
				},{
					xtype: 'label',
					margin:'0 100',
					colspan : 2,
					style : 'color:red',
					text:'　'
				},{
					xtype: 'container',
					layout: 'hbox',
					items: [{
						xtype: 'button',
						width: 140,
						margin: '0 20 20 0',
						text: '删除本描述',
						handler: function(field){
							var panel = me.down('#description');
							if(panel.items.length>1){
								var form = field.up('form');
								var values = form.getForm().getValues();
								if(values.id!=null&&values.id!=""){
									Ext.MessageBox.confirm('警告', '你确定删除该描述中的图片及内容吗？', function(btn) {
										if (btn == 'yes') {
											MessageAction.deleteNewsPictures(values.id,function(actionResult){
												if(actionResult.success){
													Ext.Msg.info('删除成功',function(){
														field.up('form').destroy();
													});
												}else{
													Ext.Msg.error(actionResult.message);
												}
											});
										}
									});
								}else{
									field.up('form').destroy();
								}
								
								
							}else{
								Ext.Msg.error('至少添加一条描述');
							}
							
						}
					},{
						xtype: 'button',
						width: 140,
						margin: '0 0 20 0',
						text: '保存本描述',
						handler: function(field){
							var form = field.up('form');
							var values = form.getForm().getValues();
							var url = form.query('[name=picture]')[0].src;
							if(values.id!=null&&values.id!=""){
								MessageAction.updateNewsPictures(values.id,url,values.content,function(actionResult){
									if(actionResult.success){
										Ext.Msg.info('修改成功');
									}else{
										Ext.Msg.error(actionResult.message);
									}
								});
							}else{
								if(url.indexOf("default_image.png") >= 0 ){
									Ext.Msg.alert('提示','请添加该描述的详情');
									return null;
								}
								MessageAction.addNewsPictures(me.messageId,url,values.content,function(actionResult){
									if(actionResult.success){
										Ext.Msg.info('添加成功');
									}else{
										Ext.Msg.error(actionResult.message);
									}
								});
							}
						}
					}]
				}]
			
			}]
		});
		me.num++;
		this.down('#description').add(description);
	},
	
	save : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			var values = form.getValues();
			Ext.apply(values, {
				id : this.messageId
			});
			
			MessageAction.editNews(values, function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('修改成功.', function(){
						if(me.onSave){
							me.onSave.fn.call(me.onSave.scope);
						}
					});
				} else {
					Ext.Msg.error(actionResult.message);
				}
			});
		}
	}
});