var $messages = {
    NetworkError:"无法连接网络或服务故障！",
    SelectOptionsText:"选择",
    SelectCompanyInfo:"请选择基金公司！",
    SelectProductInfo:"请选择基金产品！",
    InputQuantityInfo:"请填写正确的持有份额！",
    InputPrincipalInfo:"请填写正确的本金！",
    AddFundInfo:"请添加您的基金份额，至多可以存储10种不同基金产品。",
    FundListIsFullInfo:"至多可以存储10种不同基金产品。"
};

var $controller = new function() {
    var thisObject = this;
    var msgbox;
    var waitbox;

  function formatFundItem(f) {
	  return StringUtil.format('<li data-role="list-divider"><h1>{0} {1}</h1><span class="ui-li-count" onclick="javascript:$controller.onRemoveFund(\'{0}\');">删除</span></li>'+
	  '<li>' +
	  '<img src="/assets/img/ic_menu_value.png" />',  f.ProductId,  f.ProductName) +
	  
	  StringUtil.format('<h1>份额：{0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本金：{1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 现值：{2}</h1>' +
	  '<h3><strong>{3}：{4}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{5}：{6}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{7}%<strong></h3>' +
	  '<h3 class="ui-li-aside"><strong>{8}</strong>%</h3>',
	  f.Quantity, f.Principal, Math.round(f.Value * f.Quantity), 
	  f.TheDate, f.Value, '上一日', f.LastValue, 
	  MathUtil.rate(f.Value,f.LastValue),
	  MathUtil.rate(f.Value * f.Quantity, f.Principal)) +
	  '</li>';  
  }
      
    this.init = function() {
	     msgbox = new MsgBox("#msgbox-dialog");
	     waitbox= new WaitBox;
    	 this.onRefreshAll();
    }
    
   function refreshFundListView() {
   	     var fundList = $datastore.loadUserFundList();
		  for (var i = 0; i < fundList.length ; i++) {
		        $('#lv_userFund').append(formatFundItem(fundList[i]));
		   }
   }
    
   this.onRefreshAll = function(){
   	      $('#lv_userFund').empty();
   	      refreshFundListView();
		  $("#lv_userFund").listview("refresh");
   }
   
   this.onRemoveFund = function(productId) {
        $datastore.removeUserFund(productId);
        this.onRefreshAll();
    }

   this.loadAllCompany = function () {
        if (!$("#select-company").isEmptySelect()) return;
        waitbox.show();
        
        $service.requestAllCompany(function(companyData) {
              waitbox.hide();
              if (!companyData) {
                  msgbox.show($messages.NetworkError);
                  return;
              }
              for (var i = 0; i < companyData.length ; i++) {
                    $("#select-company").addSelectItem(companyData[i].CompanyName, companyData[i].CompanyId);
               }
               $("#select-company").selectmenu("refresh"); 
               
               $("#select-company").change();
          });
        
        function loadProductsOfCompany(companyId) {
            if(companyId < 0)return;
            waitbox.show();
            $service.requestProductsOfCompany(companyId, function(productData) {
                waitbox.hide();
                if (!productData) {
                  msgbox.show($messages.NetworkError);
                  return;
                }
                $("#select-product").empty();
                for (var i = 0; i < productData.length ; i++) {
                  $("#select-product").addSelectItem(productData[i].ProductName, productData[i].ProductId);
                }
                $("#select-product").selectmenu("refresh");
          });
        }
 
         $("#select-company").live('change', function() {
				loadProductsOfCompany(parseInt($(this).val()));
			});
			
			$("#btn-addUserFund").live('click', function() {
				 var companyId =  $("#select-company").val() || -1;
		        if (companyId <0) {
		            msgbox.show($messages.SelectCompanyInfo);
		            return;
		        }
		        var productId = $("#select-product").val() || -1;
		        if (productId <0) {
		            msgbox.show($messages.SelectProductInfo);
		            return;
		        }
		        var quantity = $("#textbox-quantity").val();
		        if(!MathUtil.checkNumeric(quantity)) {
		            msgbox.show($messages.InputQuantityInfo + "\n" + quantity);
		            return;
		        }
		        var principal = $("#textbox-principal").val();
		        if(!MathUtil.checkNumeric(principal)) {
		            msgbox.show($messages.InputPrincipalInfo);
		            return;
		        }
		        if ($datastore.isFull()) {
		             msgbox.show($messages.FundListIsFullInfo);
		            return;
		        }

       	       $.mobile.changePage("#home");

		        var term = {ProductId:productId, Quantity:parseInt(quantity, 10),Principal:parseInt(principal, 10)};
		        $service.requestFundValue(term, function(fundData) {
		                  $datastore.addUserFund(fundData);
		            thisObject.onRefreshAll();
		        });
			});
   }
}

$(document).ready(function () {
    /*$datastore.clearAll();
    $datastore.addUserFund({ProductId:"002011",ProductName:"华夏红利",TheDate:"2011-08-25",Value:1.854,
        LastValue:1.816,Accumulation:4.177,EarningRate:2.09,Dividend:0.0,CompanyId:23,Quantity:1000,Principal:1200});*/
	$controller.init();
	
	$('#addUserFund-page').live('pagebeforecreate',function(event){
  		 $controller.loadAllCompany();
	});	
});