<!DOCTYPE html> 
<html> 
  <head> 
  <title>我的基金</title> 
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
  <meta http-equiv="Cache-Control" content="max-age=0" />
  <meta http-equiv="Cache-Control" content="no-cache" />
  <meta http-equiv="expires" content="0" />
  <meta http-equiv="Expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta name="keywords" content="ruoyousi,MyFunds,关注基金净值和投资组合" />
  <meta name="description" content="关注基金净值和投资组合，提供开放式基金每日基金净值，涨幅排行和比较，个人基金列表管理，投资收益计算" />
  <meta name="robots" content="index,follow" />
  <link rel="stylesheet" href="/assets/jquerymobile/jquery.mobile-1.1.1.min.css"></link>
  <script type="text/javascript" src="/assets/jquery/jquery-1.6.4.min.js"></script>
  <script type="text/javascript">
    $( document ).bind( "mobileinit", function(){
      $.mobile.page.prototype.options.degradeInputs.date = 'text';
      $.mobile.listview.prototype.options.filterPlaceholder = '过滤 ...';
    }); 
  </script>
  <script type="text/javascript" src="/assets/jquerymobile/jquery.mobile-1.1.1.min.js"></script>
  <script type="text/javascript" src="/assets/wap/util.js"></script>
  <script type="text/javascript" src="/assets/web/datastore.js"></script>
  <script type="text/javascript" src="/assets/web/service.js"></script>
</head> 
<body> 

<div data-role="page" data-url="home" data-theme="b" id="home-page">

  <div data-role="header" data-url="home" data-position="fixed">
     <a href="/wap"  rel="external" data-icon="refresh">刷新</a>
    <h1>我的基金</h1>
     <a href="#addUserFund"data-icon="plus">添加</a>
  </div><!-- /header -->

  <div data-role="content" id=""> 
    <ul data-role="listview" data-inset="true" data-theme="c" id="lv_userFund">              
    </ul>
  </div><!-- /content -->

  <div data-role="footer" data-position="fixed">
    <div data-role="navbar">
      <ul>
        <li><a href="#about" data-icon="info" data-iconpos="top">关于</a></li>
      </ul>
    </div><!-- /navbar -->
  </div><!-- /footer -->

</div><!-- /page -->

<div data-role="page" data-url="addUserFund" data-theme="b" id="addUserFund-page">
  <div data-role="header" data-position="fixed">
    <a href="#home" data-icon="arrow-l">我的基金</a>
    <h1>添加基金</h1>
  </div><!-- /header -->
  
  <div data-role="content">
            <div data-role="fieldcontain">
                <label for="select-company" class="select">基金公司</label>
                <select name="company" id="select-company" data-native-menu="false" data-theme="c">
                </select>
            </div>
            <div data-role="fieldcontain">
                <label for="select-product" class="select">基金产品</label>
                <select name="product" id="select-product" data-native-menu="false" data-theme="c">
                </select>
            </div>
            <div data-role="fieldcontain">
	           <label for="textbox-quantity">份额</label>
	           <input type="number" name="quantity" id="textbox-quantity" min="0" max="1000000" value="1000" data-theme="c" />
			</div>
			<div data-role="fieldcontain">
	           <label for="textbox-principal">本金</label>
	           <input type="number" name="principal" id="textbox-principal" min="0" max="1000000" value="1000" data-theme="c" />
			</div>
			<a href="#" id="btn-addUserFund" data-role="button" data-icon="check" data-iconpos="top">完成</a> 
    </div>
  
</div><!-- /page -->

<div data-role="page" data-rel="dialog" data-url="msgbox" data-theme="b" id="msgbox-dialog">
	 <div data-role="content"> 
	     <p class="msgbox-info"></p>	 
	 </div><!-- /content -->
</div><!-- /page -->
	
<div data-role="page" data-url="about" data-theme="b" id="home-page">

  <div data-role="header">
    <a href="#home" data-icon="arrow-l">返回</a>
    <h1>关于</h1>
  </div><!-- /header -->

  <div data-role="content"> 
      <h3>我的基金</h3>
      <p>关注基金数据和投资组合</p>
      <p>免责声明：本网站致力于简洁、客观、准确、及时地向您传递资讯信息，但不保证信息的及时、准确以及完整。投资者据此操作，风险自担。相关信息，投资者应以中国证券监督管理委员会所指定的信息披露机构所公告的信息为准。本应用利用浏览器Cookie临时存储基金列表，可能会丢失，并不存储在服务器上。</p>
      <p>&copy; 2011 ruoyousi.com</p>
  </div><!-- /content -->

</div><!-- /page -->

<script type="text/javascript" src="/assets/wap/controller.js"></script>


<div id="footer">
</div>

</body>
</html>