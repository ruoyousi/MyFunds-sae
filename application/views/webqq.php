<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="keywords" content="MyFunds,我的基金" />
<meta name="description" content="个人基金列表管理" />
<meta name="robots" content="index,follow" />
<title>我的基金</title>
<link href="assets/styles.css" rel="stylesheet" type="text/css"></link>
</head>
<body>
<div class="main-page">
  <div class="header">
	  <div class="fl"><a target="_blank" href="http://myfunds.sinaapp.com"><img border="0" src="assets/img/logo_title.png" title="我的基金"></img></a></div>
	  <div id="waitbox-div" class="fr" style="display:none;padding:4px;"><img border="0" src="assets/img/loading.gif" title="装载数据中..."></img></div>
	  <div class="clear"></div>
  </div>
  <div class="main-content">
    <div id="msgbox-div" style="display:none" class="msgbox"></div>
		<div id="form-view" style="display:none">
			<div class="buttons left">
			  	<a class="linkbutton linkbutton-back" href="javascript:$controller.onToggleView();" title="返回基金列表">返回</a>
			</div>
			<table class="table-form" border="0" cellpadding="0" cellspacing="0">
					<tbody>
					<tr>
						<th style="width:150px" class="right">基金公司</th>
						<td>
							<select id="selectCompany" style="width:280px"></select>
						</td>
					</tr>
					<tr>
						<th class="right">基金产品</th>
						<td>
							<select id="selectProduct" style="width:280px"></select>
						</td>
					</tr>
					<tr>
						<th class="right">份额</th>
						<td>
							<input id="inputQuantity" class="textbox" size="12" length="12" value="1000"></input>
						</td>
					</tr>
					<tr>
						<th class="right">本金</th>
						<td>
							<input id="inputPrincipal" class="textbox" size="12" length="12" value="1000"></input>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td>
							<a class="linkbutton linkbutton-finish" href="javascript:$controller.onAddFund();">完成</a>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div id="content-view">
		  <div class="buttons right">
		  	<a class="linkbutton linkbutton-add" href="javascript:$controller.onToggleView();" title="添加基金份额">添加</a>
		  	<a class="linkbutton linkbutton-refresh" href="javascript:$controller.onRefreshAll();" title="刷新基金列表">刷新</a>
		  </div>
		  <table id="table-fundlist" class="table-list" border="0" cellpadding="0" cellspacing="0">
		    <thead><tr>
		    <th class="left">基金产品</th>
		    <th class="right">净值</th>
		    <th class="right">份额</th>
		    <th class="right">现值</th>
		    <th class="right">本金</th>
		    <th class="right">收益率</th>
		    <th></th>
		    </tr></thead>
		    <tbody></tbody>
		    <tfoot><tr>
		    <td></td>
		    <td></td>
		    <td></td>
		    <th class="right">0.00</td>
		    <th class="right">0.00</td>
		    <th class="right">0.00%</td>
		    <td></td>
		    </tr></tfoot>
		  </table>
		</div>
  </div>
  <div class="footer">
	  <div class="links">
          <span>&copy;2010</span>
          <span></span>
          <a href="mailto:ruoyousi@gmail.com?subject=feedback" title="反馈意见">ruoyousi</a>
	  </div>
	  <div class="announce">
	      <img border="0" src="assets/img/warning.gif"></img>
	      <span title="免责声明"><strong>免责声明</strong>：本应用致力于简洁、客观、准确、及时地向您传递资讯信息，但不保证信息的及时、准确以及完整。投资者据此操作，风险自担。相关信息，投资者应以中国证券监督管理委员会所指定的信息披露机构所公告的信息为准。本应用利用浏览器Cookie临时存储基金列表，可能会丢失，并不存储在服务器上。</span>
	  </div>
	</div>
</div>
<script type="text/javascript" src="assets/web/util.js"></script>
<script type="text/javascript" src="assets/web/datastore.js"></script>
<script type="text/javascript" src="assets/web/service.js"></script>
<script type="text/javascript" src="assets/web/controller.js"></script>
<script type="text/javascript" src="http://web.qstatic.com/jsapi/alloy.api.js"></script>
</body>
</html>