Ext.define('VIP.message.AddNewsWindow', {
	extend : 'Ext.window.Window',
	alias : [ 'widget.addnewswindow' ],
	requires : [],
	layout : 'fit',
	padding : 5,
	icon : 'images/promotion.png',
	title : '添加活动信息',
	modal : true,
	resizable:false,
	border : false,
	width : 462,
	height : 590,
	num : 1,
	createButtons : function() {
		var me = this;
		
		var buttons = [{
			text : '添加描述',
			handler : function(){
				me.addDescription();
			}
		},{
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				me.save();
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
			xtype : 'vipform',
			autoScroll: true,
			bodyPadding : 10,
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
				itemId:'title',
				colspan : 2,
				width : 400,
				maxLength:10,
				maxLengthText:'不可超过10字符',
				allowBlank : false,
				vtype : 'stringblank',
				listeners : {
					specialKey : {
						fn : function(field, key, option) {
							if (key.keyCode == 13) {
								me.down('#initDate').focus(true);
							}
						},
						delay : 200
					}
				}
			},{
				xtype : 'textareafield',				
				name : 'content',
				itemId : 'content',
				emptyText : '活动详情',
				colspan : 2,
				width : 390,
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
				margin:'0 150',
				colspan : 2,
				style : 'color:red',
				text:'　'
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
		var me = this;
		Ext.apply(this, {
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);	
		setTimeout(function(){
			me.down('#title').focus(true);
			me.addDescription();
		}, 200);
	},
	
	choosePicture : function(){
		var picture = this;
		var finder = new CKFinder();
		finder.selectActionFunction = function( fileUrl, data ) {
			picture.setSrc(fileUrl);
		};
		finder.popup(720, 540);
		
	},
	addDescription : function(){
		var me =this;
		var description = Ext.create('Ext.form.Panel',{
			border:false,
			items:[{
				xtype:'fieldset',
				margin:'5 10',
				padding: '5 40',
				width:390,
				title:'描述'+me.num,
				items:[{
					xtype : 'image',
					name : 'picture',
					style : 'border:1px dashed #AAA;cursor:pointer',
					src: 'images/default_image.png',
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
					name : 'description',
					itemId : 'description',
					emptyText : '新闻详情',
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
					xtype: 'button',
					width: 300,
					margin: '0 0 20 0',
					text: '删除本描述',
					handler: function(field){
						var panel = me.down('#description');
						if(panel.items.length>1){
							Ext.MessageBox.confirm('警告', '你确定删除该描述中的图片及内容吗？', function(btn) {
								if (btn == 'yes') {
									panel.remove(field.up('form'));
								}
							});
						}else{
							Ext.Msg.error('至少添加一条描述');
						}
						
					}
				}]
			
			}]
		});
		me.num++;
		this.down('#description').add(description);
	},
	save : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		
		var pictures = new Array();
		var picture = this.query('[name=picture]');
		var descriptions = this.query('[name=description]');
		for(var i=0;i<picture.length;i++){
			if(picture[i].src.indexOf("default_image.png") >= 0 ){
				Ext.Msg.alert('提示','请添加'+picture[i].up().title+'的详情');
				return;
			}
			if(picture[i].src){
				var p = {};
				p.url =  picture[i].src;
				p.description = descriptions[i].value;
				pictures[i] = p;
			}
		}
		
		if (form.isValid()) {
			var values = form.getValues();
			values.description = undefined;	
			Ext.apply(values, {
				pictures : pictures,
				businessId : window.account.businessId
			});		
			
			MessageAction.publisNews(values, function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('添加成功.', function(){
						if(me.onSave){
							me.onSave.fn.call(me.onSave.scope);
						}
						me.destroy();
					});
				} else {
					Ext.Msg.error(actionResult.message);
				}
			});
		}
	}
});