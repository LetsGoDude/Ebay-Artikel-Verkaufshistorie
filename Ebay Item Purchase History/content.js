// content.js
// Beispiel: Extrahieren der Artikelnummer aus der URL und Hinzufügen des Buttons

var buyBoxCTAElements = document.getElementsByClassName("x-buybox__price-section");

// Überprüfen, ob mindestens ein Element mit der Klasse gefunden wurde
if (buyBoxCTAElements.length > 0) {
  var buyBoxCTAElement = buyBoxCTAElements[0]; // Verwenden Sie das erste gefundene Element

  // Extrahiere die Artikelnummer aus der aktuellen URL
  var url = window.location.href;
  var itemNumberStartIndex = url.indexOf("/itm/") + 5; // Index nach "/itm/"
  var itemNumberEndIndex = url.indexOf("?", itemNumberStartIndex);
  var itemNumber = url.substring(itemNumberStartIndex, itemNumberEndIndex);

  var historyButton = document.createElement("button");
  historyButton.innerHTML = "History";
  historyButton.classList.add("historyButton"); // Fügen Sie eine Klasse zum Button hinzu

  // Fügen Sie den History-Button unter dem gefundenen Element hinzu
  buyBoxCTAElement.appendChild(historyButton);

  // Fügen Sie einige Stile hinzu, um den Button dem eBay-Stil anzupassen
  historyButton.style.padding = "10px 60px"; // Längerer und höherer Button
  historyButton.style.backgroundColor = "#007BFF";
  historyButton.style.marginTop = "8px"
  historyButton.style.color = "#FFFFFF";
  historyButton.style.border = "2px solid #0056b3";
  historyButton.style.borderRadius = "20px"; // Stärker abgerundete Kanten
  historyButton.style.cursor = "pointer";

  // Erstellen Sie die URL mit der Artikelnummer und fügen Sie einen Event-Listener zum Button hinzu
  var purchaseHistoryURL = "https://www.ebay.de/bin/purchaseHistory?item=" + itemNumber;
  historyButton.addEventListener("click", function () {
    window.open(purchaseHistoryURL, '_blank'); // Öffnen Sie die URL in einem neuen Tab
  });
}
