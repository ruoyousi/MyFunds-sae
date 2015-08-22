var $messages = {
    NetworkError:"无法连接网络或服务故障！",
    SelectOptionsText:"选择",
    SelectCompanyInfo:"请选择基金公司！",
    SelectProductInfo:"请选择基金产品！",
    InputQuantityInfo:"请填写正确的持有份额！",
    InputPrincipalInfo:"请填写正确的本金！",
    AddFundInfo:"请添加您的基金份额，至多可以存储10种不同基金产品。",
    FundListIsFullInfo:"至多可以存储10种不同基金产品。",
    FundValueTipInfo:"净值日期: {0}, 上日净值: {1}, 日增长率: {2}"
};

var $controller = new function() {
    var thisObject = this;
    var msgbox;
    var waitbox;    
    var fundListTable;
    var elSelectCompany;
    var elSelectProduct;
    var txtQuantity;
    var txtPrincipal;

    this.init = function() {
        elSelectCompany = $("selectCompany");
        elSelectProduct = $("selectProduct");
        txtQuantity = $("inputQuantity");
        txtPrincipal = $("inputPrincipal");
        fundListTable = new FundListTable();
        msgbox = new MsgBox("msgbox-div");
        waitbox = new WaitBox("waitbox-div");

        this.onRefreshAll();
    }

    this.onToggleView = function() {
        msgbox.hide();
        HtmlUtil.toggle($('content-view'));
        HtmlUtil.toggle($('form-view'));
        if ($('form-view').style.display == "") {
            queryAllCompany();
        }
        if (($('content-view').style.display == "") && $datastore.isEmpty()){
            msgbox.show($messages.AddFundInfo);
        }
    }
    
    function queryAllCompany () {
        if (!HtmlUtil.isEmptySelect(elSelectCompany)) return;
        waitbox.show();
        
        $service.requestAllCompany(function(companyData) {
              waitbox.hide();
              if (!companyData) {
                msgbox.show($messages.NetworkError);
                return;
              }
              HtmlUtil.addSelectItem(elSelectCompany, $messages.SelectOptionsText, "-1");
              for (var i = 0; i < companyData.length ; i++) {
                   HtmlUtil.addSelectItem(elSelectCompany, companyData[i].CompanyName, companyData[i].CompanyId);
                }
          });
        
        elSelectCompany.onchange = function() {
            var companyId = parseInt(HtmlUtil.getSelectItemValue(elSelectCompany));
            if(companyId < 0)return;
            waitbox.show();
            $service.requestProductsOfCompany(companyId, function(productData) {
                waitbox.hide();
                if (!productData) {
                  msgbox.show($messages.NetworkError);
                  return;
                }
                HtmlUtil.clearSelectItems(elSelectProduct);
                HtmlUtil.addSelectItem(elSelectProduct, $messages.SelectOptionsText, "-1");
                for (var i = 0; i < productData.length ; i++) {
                  HtmlUtil.addSelectItem(elSelectProduct,productData[i].ProductName, productData[i].ProductId);
                }
          });
        }
    }
    
    this.onAddFund = function() {
        var companyId = HtmlUtil.getSelectItemValue(elSelectCompany,-1);
        if (companyId <0) {
            msgbox.show($messages.SelectCompanyInfo,2000);
            return;
        }
        var productId = HtmlUtil.getSelectItemValue(elSelectProduct,-1);
        if (productId <0) {
            msgbox.show($messages.SelectProductInfo,2000);
            return;
        }
        var quantity = txtQuantity.value;
        if(!MathUtil.checkNumeric(quantity)) {
            msgbox.show($messages.InputQuantityInfo,2000);
            return;
        }
        var principal = txtPrincipal.value;
        if(!MathUtil.checkNumeric(principal)) {
            msgbox.show($messages.InputPrincipalInfo,2000);
            return;
        }
        if ($datastore.isFull()) {
             msgbox.show($messages.FundListIsFullInfo,2000);
            return;
        }
        
        this.onToggleView();
        var term = {ProductId:productId, Quantity:parseInt(quantity, 10),Principal:parseInt(principal, 10)};
        $service.requestFundValue(term, function(fundData) {
            $datastore.addUserFund(fundData);
            thisObject.onRefreshAll();
        });
    }
    
    function refreshFundTable() {
        msgbox.hide();
        fundListTable.clearRows();
        var terms = $datastore.getUserFundList();
        for (var i = 0; i < terms.length ; i++) {
              fundListTable.addRow(terms[i]);
        }
        if (terms.length == 0){
            msgbox.show($messages.AddFundInfo);
        }
    }
    
    this.onRefreshAll = function() {
        var terms = $datastore.loadUserFundList();
        if(terms.length==0) {
        	refreshFundTable();
        	return;
        }
        $service.requestFundValues(terms, function(fundData) {
          $datastore.setUserFundList(fundData);
          refreshFundTable();
        });
    }
    
    this.onRemoveFund = function(productId) {
        $datastore.removeUserFund(productId);
        refreshFundTable();
    }
}

function FundListTable () {
    var theTable = $("table-fundlist");
    
    function sumTotalMoney() {
      var tBody = theTable.tBodies[0];
      var sumTotal = 0;
      var sumPrincipal = 0;
      
      for(var i = 0; i < tBody.rows.length; i++) {
        sumTotal += parseFloat(tBody.rows[i].cells[3].innerHTML);
        sumPrincipal += parseFloat(tBody.rows[i].cells[4].innerHTML);
      }
      
      theTable.tFoot.rows[0].cells[3].innerHTML = sumTotal;
      theTable.tFoot.rows[0].cells[4].innerHTML = sumPrincipal;
      theTable.tFoot.rows[0].cells[5].innerHTML = MathUtil.rate(sumTotal, sumPrincipal) + "%";
    }
    
    this.clearRows = function() {
      var tBody = theTable.tBodies[0];
      for(var i = tBody.rows.length; i > 0; i--) {
        tBody.deleteRow(i - 1);
      }
      sumTotalMoney();
    }
    
    this.addRow = function(dataObject) {
        var tBody = theTable.tBodies[0];
        var newRow = tBody.insertRow(-1);
        newRow.className = ((newRow.rowIndex % 2) == 0) ? "even" : "odd";
        newRow.insertCell(-1);
        newRow.insertCell(-1);
        newRow.insertCell(-1);
        newRow.insertCell(-1);
        newRow.insertCell(-1);
        newRow.insertCell(-1);
        newRow.insertCell(-1);
        
        newRow.cells[0].innerHTML = dataObject.ProductName;
        newRow.cells[1].innerHTML = dataObject.Value;
        newRow.cells[1].className = "right";
        newRow.cells[2].innerHTML = dataObject.Quantity;
        newRow.cells[2].className = "right";
        newRow.cells[3].innerHTML = Math.round(dataObject.Value * dataObject.Quantity);
        newRow.cells[3].className = "right";
        newRow.cells[4].innerHTML = dataObject.Principal;
        newRow.cells[4].className = "right";
        newRow.cells[5].innerHTML = MathUtil.rateString(dataObject.Value * dataObject.Quantity, dataObject.Principal);
        newRow.cells[5].className = "right";
        newRow.cells[6].innerHTML = "<a href='javascript:$controller.onRemoveFund(\"" +dataObject.ProductId + "\");'><img border='0' src='/assets/img/btn_remove.png' title='删除基金'></img></a>";
        
        if (dataObject.LastValue > 0) {
            newRow.cells[0].title = StringUtil.format($messages.FundValueTipInfo, 
                dataObject.TheDate, dataObject.LastValue, 
                MathUtil.rateString(dataObject.Value,dataObject.LastValue));
        }
        sumTotalMoney();
    }
}

window.onload = function () {
    /*$datastore.clearAll();
    $datastore.addUserFund({ProductId:"002011",ProductName:"华夏红利",TheDate:"2011-08-25",Value:1.854,
        LastValue:1.816,Accumulation:4.177,EarningRate:2.09,Dividend:0.0,CompanyId:23,Quantity:1000,Principal:1200});*/
    $controller.init();
}
window.onunload = function() {
}