
// Submit form to SheetDB
var form = document.getElementById('sheetdb_form');
form.addEventListener("submit", e => {
  e.preventDefault();
  fetch(form.action, {
    method: "POST",
    body: new FormData(document.getElementById("sheetdb_form")),
  }).then(
    response => response.json()
  ).then((html) => {
    window.open('./payment/index.html', '_blank');
     // Clear the form fields after successful submission
     form.reset();
  });
});


