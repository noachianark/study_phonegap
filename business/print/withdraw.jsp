<%@page import="com.zetian.vipmonk.VIPEngine"%>
<%@ page language="java"
	import="org.json.*,
				java.util.*,
				org.hibernate.*,
				org.apache.commons.codec.binary.Base64,
				sun.misc.BASE64Encoder,
				com.zetian.vipmonk.SessionBean,
				com.zetian.vipmonk.service.result.ObjectResult,
				com.zetian.vipmonk.util.qrbarcode.QRImageGenerator,				
				com.zetian.vipmonk.service.ServiceFactory,				
				com.zetian.vipmonk.util.DateTimeUtil,
				com.zetian.vipmonk.model.orm.*"
	pageEncoding="UTF-8"%><%
	
	SessionBean sessionBean = (SessionBean)request.getSession().getAttribute("sessionBean");
	String id = request.getParameter("id").toString().trim();
	WithdrawHistory withdraw = ServiceFactory.getWithdrawHistoryService(sessionBean.getLoginInfo()).getWithdrawHistoryById(id);
		
	QRImageGenerator qrGenerator = new QRImageGenerator();
	byte[] pngbit = qrGenerator.encode(withdraw.getTransactionNumber(), 480, 480);
	BASE64Encoder encoder = new BASE64Encoder();
	String base64Str = encoder.encode(pngbit);
	String businessName = withdraw.getBusiness().getName();
%>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
	* {
		font-family: "微软雅黑";
		font-size: 10px;
		margin: 0px;
		padding: 0px;
	}
	tr{
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.td1{
		text-align: right;
		width: 60px;
	}
	.td2{
		text-align: left;
	}
	.td{
		text-align: center;
	}
</style>

</head>
<body>
	<table cellspacing=6>
		<tr>
			<td colspan="2" style="font-size: 14pt" class="td"><%=businessName %></td>
		</tr>
		<tr>
			<td colspan="2" class="td"><hr></td>
		</tr>
		<tr>
			<td class="td" colspan="2" align="center">单号二维码</td>
		</tr>
		<tr>
			<td class="td" colspan="2" align="center"><img width="80" height="80" class="card-detail-main-picture-barcode" src="data:image/png;base64,<%=base64Str%>" /></td>
		</tr>
		<tr>
			<td class="td1">会员姓名：</td>
			<td class="td2"><%=withdraw.getUser().getName()%></td>
		</tr>
		<tr>
			<td class="td1">取款金额：</td>
			<td class="td2"><%=withdraw.getAmount()%> 元</td>
		</tr>
		<tr>
			<td class="td1">卡内余额：</td>
			<td class="td2"><%=withdraw.getCurrentDeposit()%> 元</td>
		</tr>
		<tr>
			<td class="td1">取款时间：</td>
			<td class="td2"><%=DateTimeUtil.formatDateTime(withdraw.getTime())%></td>
		</tr>
		<tr>
			<td class="td1">操作人员：</td>
			<td class="td2"><%=withdraw.getOperator().getName() %></td>
		</tr>
		<tr>
			<td class="td1">取款店铺：</td>
			<td class="td2"><%=withdraw.getShop().getName() %></td>
		</tr>
		<tr>
			<td colspan="2" class="td"><hr></td>
		</tr>
		<tr>
			<td colspan="2" class="td">感谢您的取款，欢迎下次光临</td>
		</tr>
	</table>
</body>

</html>