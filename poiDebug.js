function findBetLink(links) {
  for(var i = 0; i < links.length; i++) {
    if (findFirstRequest(links[i].href) != '') {
      return links[i].href;
    }
  }
}

function findFirstRequest(link) {
  return link.indexOf('req.json') > 0 ? link : '';
}

var additionalInfo = {
  'title': document.title,
  'html' : findBetLink(document.links)
};

chrome.runtime.connect().postMessage(additionalInfo);
