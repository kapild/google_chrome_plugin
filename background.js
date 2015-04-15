function customPoiUrl() {
  return window.localStorage == null || window.localStorage.poiUrl == null
    ? ''
    : window.localStorage.poiUrl;
}

function getJsonFromLink(betReqLink) {
    var postUrl = betReqLink;
    // Set up an asynchronous AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('GET', postUrl, false);
    // Set correct header for form data
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Handle request state change events
    xhr.onreadystatechange = function() {
        // If the request completed
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          executeGetPoiDebug(xhr.responseText);
        } else {
        // Show what went wrong
          alert(xhr.statusText);
        }
      }
    };
    // Send the request and set status
    xhr.send({});
}

function executeGetPoiDebug(jsonRequest) {
    var poiUrlSaved = customPoiUrl();  
    if (poiUrlSaved == '' || poiUrlSaved.indexOf('http') != 0) {
      alert('External url is not set. Set it in the Options of the extension.')
      return;
    }
    var poiUrlList = poiUrlSaved.split(',');
    encodeRequest = window.btoa(unescape(encodeURIComponent(jsonRequest )));
    for (var i = 0; i < poiUrlList.length; i++) {
      action_url = poiUrlList[i] + '/endpoint?jsonp=jsonp0&message=' + encodeRequest;
      chrome.tabs.create({ url: action_url });      
    }
}

chrome.runtime.onConnect.addListener(function(port) {
  var tab = port.sender.tab;
  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
      getJsonFromLink(info.html);
  });
});

// Called when the user clicks on the browser action icon.
// the following 2 URLs works

// http://rd12d02ls-searchdev0020.geo.apple.com:7160/poi_debug?jsonp=jsonp0&message=base64(json)
chrome.browserAction.onClicked.addListener(function(tab) {
  if (tab.url.indexOf('pattern1') > 0 ||
      tab.url.indexOf('pattern2') > 0) {
    chrome.tabs.executeScript(null, {file: 'poiDebug.js'});
  }
});
