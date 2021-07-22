
var currentDocB64 = '';

function getBase64Certificate() {
  MiniApplet.selectCertificate('SHA1withRSA', showCertCallback, showErrorCallback);
}

function showCertCallback(_certificate) {
  sessionStorage.setItem("b64Certificate", _certificate);
}

function showErrorCallback(_errorType, _errorMessage) {
  console.log(_errorType);
  console.log(_errorMessage);
}

function signDocumentByCertificate(document) {
  currentDocB64 = document;
  MiniApplet.setStickySignatory(true);
  MiniApplet.selectCertificate(null, signDocument, showErrorCallback);
}

function signDocument(certificate) {
  MiniApplet.sign(currentDocB64, 'SHA1withRSA', 'Adobe PDF', null, getSignedDocument, showErrorCallback);
}

function getSignedDocument(document, certificate) {
  window.appUtilsReference.zone.run(() => {
    window.appUtilsReference.component.documentSigned = document;
  });
}
