<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="keywords" content="ruoyousi,MyFunds,关注基金净值和投资组合" />
<meta name="description" content="关注基金数据和投资组合，提供开放式基金每日基金净值，涨幅排行和比较，个人基金列表管理，投资收益计算" />
<meta name="robots" content="index,follow" />
<title>欢迎访问我的基金网站！</title>
<style type="text/css">
<!--
.title {
  font-size: 1.5em;
}
.subtitle {
  font-size: 1.1em;
  color:#404040;
}
.desc {
  font-family: "Arial", "Helvetica", "sans-serif";
  font-size: 0.8em;
  color:#404040;
}
.main-page {
  margin:0 auto;
  width:530px;
}
.header {
  border-bottom:1px solid #ccc;
}
.main-content {
  margin:20px auto;
}
.footer {
  border-top:1px solid #ccc;
  text-align:center;
  font-size: 0.8em;
}
.linkbuttons {
	margin:10px 0;
}
.linkbuttons A{
	padding:5px;
	text-decoration:none;
	font-weight:none;
	color:black;
}
.linkbuttons A.active{
	font-weight:bold;
	color:blue;
}
-->
</style>
</head>

<body bgcolor="#FEFEFE">
<div class="main-page">
  <div class="header">
  <table width="600px" border="0" cellpadding="0" cellspacing="0">
     <tr>
      <td rowspan="2" style="width:100px" align="center"><a href="http://myfunds.sinaapp.com"><img border="0" src="/assets/img/logo.png"></img></a></td>
      <td class="title">我的基金</td>
     </tr>
     <tr>
      <td class="subtitle">关注基金数据和投资组合</td>
     </tr>
  </table>
  </div>

  <div class="main-content">
      <div class="linkbuttons">
      <a id="web-link" class="active" href="javascript:void(0)">WEB网站</a>
      <a id="android-link" href="javascript:void(0)">Android应用</a>
      </div>
      <div id="web-screenshot">
      <a target="_blank" href="/wap"><img border="0" src="/assets/img/web-screenshot.jpg" title="点击进入网站"></img></a>
      <p class="desc">适合智能手机和平板电脑网页浏览器，管理持有基金列表，历史净值。</p>
      </div>
      <div id="android-screenshot" style="display:none">
      <a target="_blank" href="android/myfunds.apk"><img border="0" src="/assets/img/android-screenshot.jpg" title="点击下载应用"></img></a>
      <p class="desc">适合Android1.6+手机，管理持有基金列表。</p>
      </div>
  </div>
  
  <div class="footer">
      <span>&copy;2010 ruoyousi</span>
      <span>&nbsp;-&nbsp;</span>
      <a href="mailto:ruoyousi@gmail.com?subject=feedback">反馈意见</a>
  </div>
     
</div>
<script type="text/javascript">
<!--
function $(id){return document.getElementById(id);}
var views = [ $("web-screenshot"),$("android-screenshot")];
var links =  [ $("web-link"), $("android-link")];
function changeView(activeViewId, activeLinkId) {
	for(var i=0;i<views.length;i++) {
		views[i].style.display = ((views[i].id == activeViewId) ? "" : "none");
	}
	for(var i=0;i<links.length;i++) {
		links[i].className = ((links[i].id == activeLinkId) ? "active" : "");
	}	
}
$("web-link").onclick = function() {changeView("web-screenshot", "web-link");}
$("android-link").onclick = function() {changeView("android-screenshot", "android-link");}
-->
</script>
</body>
</html>