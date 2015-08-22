var $localStorage = supports_html5_storage() ? localStorage : {
	"removeItem": function(k) {
		CookieUtil.erase(k);
	},
	"getItem": function(k) {
		return CookieUtil.get(k, null);
	},
	"setItem": function(k,v) {
		CookieUtil.set(k, v);
	}
};

var $datastore = new function() {
    var theData = [];
    var ItemName = "myfunds.fundlist";
    
    this.clearAll = function() {
        theData = [];
        $localStorage.removeItem(ItemName);
    }    
    this.getUserFundList = function() {
        return theData;
    }
    this.setUserFundList = function(fundData) {
        theData = fundData;
    }
    this.loadUserFundList = function() {
        var terms = eval($localStorage.getItem(ItemName) || "[]");
        if (terms.length > 0) {
            theData = terms;
        }
        return theData;
    }    
  function saveUserFundList() {
     var s=new StringBuffer();
     s.append("[");
     for (var i = 0; i < theData.length ; i++) {
          if(i>0) s.append(",");
          s.append("{");
          s.appendJsonText("ProductId",theData[i].ProductId);
          s.append(",").appendJsonText("ProductName",theData[i].ProductName);
          s.append(",").appendJsonText("TheDate",theData[i].TheDate);
          s.append(",").appendJsonNumeric("Value",theData[i].Value);
          s.append(",").appendJsonNumeric("LastValue",theData[i].LastValue);
          s.append(",").appendJsonNumeric("Accumulation",theData[i].Accumulation);
          s.append(",").appendJsonNumeric("Dividend",theData[i].Dividend);
          s.append(",").appendJsonNumeric("Quantity",theData[i].Quantity);
          s.append(",").appendJsonNumeric("Principal",theData[i].Principal);
          s.append("}");
      }
      s.append("]");
      $localStorage.setItem(ItemName, s.toString());
  }  
  this.updateUserFund = function(f) {
        for (var i = 0; i < theData.length ; i++) {
          if (theData[i].ProductId == f.ProductId) {
             theData[i] = f;
          }
      }
    }    
  this.isEmpty=function(){
    return (theData.length == 0);   
  }
  this.isFull=function(){
    return (theData.length>= 10);   
  }
  this.addUserFund = function(f) {
        if (this.isFull()) return;
        var exsits = false;
        for (var i = 0; i < theData.length ; i++) {
          if (theData[i].ProductId == f.ProductId) {
             theData[i].Quantity += f.Quantity;
             theData[i].Principal += f.Principal;
             exsits = true;
          }
      }
      if (!exsits) {
          theData.push(f);
      }    
      saveUserFundList();
    }    
    this.removeUserFund = function(productId) {
      for (var i = 0; i < theData.length ; i++) {
          if (theData[i].ProductId == productId) {
              theData.splice(i,1);
              saveUserFundList();
              break;
          }
      }
    }    
};