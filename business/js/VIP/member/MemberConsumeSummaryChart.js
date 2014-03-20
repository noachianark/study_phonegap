Ext.define('VIP.member.MemberConsumeSummaryChart', {
	extend : 'Ext.chart.Chart',
	alias : [ 'widget.memberconsumesummarychart' ],
	requires : [ 'VIP.member.store.ConsumeSummary' ],
	
	animate : true,
	shadow : true,
	axes : [ {
		type : 'Numeric',
		position : 'left',
		fields : [ 'consumeTotal' ],
		title : '消费金额',
		grid : true,
		minimum : 0
	}, {
		type : 'Category',
		position : 'bottom',
		fields : [ 'yearMonth' ],
		title : ''
	} ],
	series : [ {
		type : 'column',
		axis : 'left',
		highlight : true,
		tips : {
			trackMouse : true,
			width : 140,
			height : 28,
			renderer : function(storeItem, item) {
				this.setTitle(storeItem.get('yearMonth') + ': ' + storeItem.get('consumeTotal') + ' 元');
			}
		},
		label : {
			display : 'insideEnd',
			field : 'consumeTotal',
			orientation : 'horizental',
			color : '#333'
		},
		xField : 'yearMonth',
		yField : 'consumeTotal'
	} ],
	background : {
		gradient : {
			id : 'backgroundGradient',
			angle : 45,
			stops : {
				0 : {
					color : '#ffffff'
				},
				100 : {
					color : '#eaf1f8'
				}
			}
		}
	},
	initComponent : function() {
		this.store = Ext.create('VIP.member.store.ConsumeSummary', {

		});
		this.callParent(arguments);
	},

	load : function(vipCardId) {
		if (vipCardId) {
			this.vipCardId = vipCardId;
		}

		var endDate = new Date();

		var year = endDate.getFullYear() + '';
		var month = endDate.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		} else {
			month += '';
		}
		var format = 'Y年m月d日';
		var startDate = Ext.Date.parse(year - 1 + '年' + month + '月01日', format);

		this.store.getProxy().extraParams = {
			vipCardId : this.vipCardId,
			startDate : Ext.Date.format(startDate, format),
			endDate : Ext.Date.format(endDate, format)
		};
		this.store.load();
	}
});