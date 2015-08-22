var $service = new function() {
    this.requestAllCompany = function(fnLoaded) {
      var url = "/data/companies";
      AjaxUtil.getJsonObject(url, fnLoaded);
    }
    this.requestProductsOfCompany = function(companyId,fnLoaded) {
      var url = "/data/companies/" + companyId + "/products";
      AjaxUtil.getJsonObject(url, fnLoaded);
    }
    this.requestFundValue = function (fund,fnLoaded) {
      var url = "/data/products/" + fund.ProductId + "/value";
      AjaxUtil.getJsonObject(url, function (fundData) {
        if ((fundData != null) && (fundData.ProductId != null)) {
           fundData["Quantity"] = fund.Quantity;
           fundData["Principal"] = fund.Principal;
        }
        if (fnLoaded) fnLoaded(fundData);
      });
    }
    this.requestFundValues = function (funds,fnLoaded) {
      var productIds = [];
      for (var i = 0; i < funds.length ; i++) {
        productIds.push(funds[i].ProductId);
      }
      var url = "/data/products/" + productIds.join("-") + "/values";
      AjaxUtil.getJsonObject(url, function (fundData) {
        if (fundData != null) {
           for (var i = 0; i < fundData.length ; i++) {
              fundData[i].Quantity = 0;
              fundData[i].Principal = 0;
              for (var j = 0; j < funds.length ; j++) {
                if(fundData[i].ProductId == funds[j].ProductId) {
                    fundData[i].Quantity = funds[j].Quantity;
                    fundData[i].Principal = funds[j].Principal;
                }
              }
           }           
        }
        if (fnLoaded) fnLoaded(fundData);
      });
    }
}