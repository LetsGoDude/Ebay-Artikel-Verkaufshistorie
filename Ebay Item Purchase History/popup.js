document.addEventListener("DOMContentLoaded", function () {
  var historyButton = document.getElementById("historyButton");

  historyButton.addEventListener("click", function () {
    // Hier die URL zur Anzeige der Bestellhistorie einfügen
    var historyUrl = "https://example.com/order-history";
    browser.tabs.create({ url: historyUrl });
  });
});
