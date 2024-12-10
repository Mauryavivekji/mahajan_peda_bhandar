
var form = document.getElementById('sheetdb_form');
form.addEventListener("submit", e => {
e.preventDefault();
fetch(form.action, {
  method : "POST",
  body: new FormData(document.getElementById("sheetdb_form")),
}).then(
  response => response.json()
).then((html) => {
// you can put any JS code here
window.open('./THANKS/thanks.html', '_blank');

});
});
