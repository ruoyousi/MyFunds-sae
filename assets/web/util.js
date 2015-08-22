function $(id){
    return document.getElementById(id);
}

var AjaxUtil = new function() {
    this.getJsonObject =  function (url, callback) {
    function ajaxBindCallback(){
      if (ajaxRequest.readyState == 4) {
          if (ajaxRequest.status == 200) {
            if (ajaxCallback){
                ajaxCallback(eval("(" + ajaxRequest.responseText + ")"));
            } else {
                //alert('no callback defined');
            }
          } else {
            //alert("There was a problem retrieving the xml data:\n" + ajaxRequest.status + ":\t" + ajaxRequest.statusText + "\n" + ajaxRequest.responseText);
            if (ajaxCallback){
                ajaxCallback(null);
            }
          }
      }
    }

    var ajaxRequest = null;
    var ajaxCallback = callback;

    if (window.XMLHttpRequest) {
      ajaxRequest = new XMLHttpRequest();
      ajaxRequest.onreadystatechange = ajaxBindCallback;
      ajaxRequest.open("GET", url, true);
      ajaxRequest.send(null);
    } else if (window.ActiveXObject) {
      ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
      if (ajaxRequest) {
      ajaxRequest.onreadystatechange = ajaxBindCallback;
      ajaxRequest.open("GET", url, true);
      ajaxRequest.send();
      }
    }
  }
};

var CookieUtil = {
  set: function(name, value, daysToExpire) {
    var expire = '';
    if(!daysToExpire) daysToExpire = 365;
    var d = new Date();
    d.setTime(d.getTime() + (86400000 * parseFloat(daysToExpire)));
    expire = 'expires=' + d.toGMTString();
    var path = "path=/"
    var cookieValue = escape(name) + '=' + escape(value || '') + '; ' + path + '; ' + expire + ';';
    return document.cookie = cookieValue;
  },
  get: function(name,value) {
    var cookie = document.cookie.match(new RegExp('(^|;)\\s*' + escape(name) + '=([^;\\s]+)'));
    return (cookie ? unescape(cookie[2]) : (value||""));
  },
  erase: function(name) {
    var cookie = CookieUtil.get(name) || true;
    CookieUtil.set(name, '', -1);
    return cookie;
  },
  accept: function() {
    if (typeof navigator.cookieEnabled == 'boolean') {
      return navigator.cookieEnabled;
    }
    Cookie.set('_test', '1');
    return (CookieUtil.erase('_test') === '1');
  },
  exists: function(cookieName) {
    var cookieValue = CookieUtil.get(cookieName);
    if(!cookieValue) return false;
    return cookieValue.toString() != "";
  }
};

var MathUtil = new function(){
    this.rate = function(a, b){
      if (b == 0) return 0;
      return Math.round((a - b) * 10000 / b, 2) / 100;
    }
    this.rateString = function(a, b){
      return this.rate(a,b) + "%";
    }
    this.checkNumeric = function(s){
    	var re = /^[1-9][0-9]{1,7}$/ig;
        return re.test(s);
    }
};

var StringUtil = {
    format: function() {
    args = arguments;
        return args[0].replace(/\{(\d)\}/g, function($a,$b) {
            return args[parseInt($b)+1];
        });
    }
}

var HtmlUtil = new function(){
    this.toggle = function(e) {
        e.style.display = (e.style.display == "none") ? "" : "none";
    }
    this.isEmptySelect = function(e) {
      return e.options.length == 0;
    }
    this.clearSelectItems = function(e) {
      var options = e.options;
      for(var i=options.length-1;i>=0;i--){
         options.remove(i);
      }
    }
    this.getSelectItemValue = function(e, val) {
        if (e.selectedIndex < 0) return val||null;
        return e.options[e.selectedIndex].value;
    }
    this.addSelectItem = function(e,txt,val){
        e.options.add(new Option(txt, val));
    }
};

function StringBuffer(){
  var buf = [];
    this.append = function(s) {
        buf.push(s);
        return this;
    }
    this.appendJsonText = function(n,v) {
        return this.append(n).append(":\"").append(v).append("\"");
    }
    this.appendJsonNumeric = function(n,v) {
        return this.append(n).append(":").append(v);
    }
    this.toString = function() {
        return buf.join("");
    }
}

function MsgBox(divId){
    this.hide = function() {
        $(divId).style.display="none";
    }
    this.show = function (info,timeout){
        if (!info) {
           this.hide();
        }
        else {
            $(divId).innerHTML="<span class='msgbox-icon'></span>"+info;
            $(divId).style.display="";
            if(timeout && (timeout>=1000) && (timeout<=30000)) {
                setTimeout("$('" + divId + "').style.display='none'", timeout);
            }
        }
    }
}

function WaitBox(divId){
    this.hide = function() {
       $(divId).style.display="none";
    }
    this.show = function (){
       $(divId).style.display="";
    }
}

function supports_html5_storage() {
  try { 
   return ('localStorage' in window) && (window['localStorage'] !== null);
  } catch (e) { 
   return false; 
  }
}
