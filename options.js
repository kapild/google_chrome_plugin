function setPoiUrl(mouseEvent) {
  if (window.localStorage == null) {
    alert('Local storage is required for changing providers');
    return;
  }
  if (document.getElementById('poiUrl').value) {
    alert('Setting  URL: '  + document.getElementById('poiUrl').value);   
    window.localStorage.poiUrl = document.getElementById('poiUrl').value;
  } else {
    alert('Enter a valid debug URL.');   
    window.localStorage.poiUrl = '';
  }
}

function main() {
  if (window.localStorage == null) {
    alert('LocalStorage must be enabled for changing options.');
    document.getElementById('poiUrl').disabled = true;
    return;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  main();
  document.querySelector('#savePoiUrl').addEventListener('click', setPoiUrl); 
});
