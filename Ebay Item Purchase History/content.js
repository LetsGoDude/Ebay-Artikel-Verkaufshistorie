// content.js
// Beispiel: Extrahieren der Artikelnummer aus der URL und Hinzufügen des Buttons

var buyBoxCTAElements = document.getElementsByClassName("vim vi-evo-row-gap");

// Überprüfen, ob mindestens ein Element mit der Klasse gefunden wurde
if (buyBoxCTAElements.length > 0) {
  var buyBoxCTAElement = buyBoxCTAElements[0]; // Verwenden Sie das erste gefundene Element

  // Extrahiere die Artikelnummer aus der aktuellen URL
  var url = window.location.href;
  var itemNumberStartIndex = url.indexOf("/itm/") + 5; // Index nach "/itm/"
  var itemNumberEndIndex = url.indexOf("?", itemNumberStartIndex);
  
    // Wenn "?" nicht gefunden wurde, extrahiere die Artikelnummer bis zum Ende der URL
  if (itemNumberEndIndex === -1) {
    itemNumberEndIndex = url.length;
  }
  
  var itemNumber = url.substring(itemNumberStartIndex, itemNumberEndIndex);
  
  // Extrahiere die aktuelle Domain aus der URL
  var currentDomain = window.location.hostname;  // Gibt z.B. "www.ebay.de" zurück

  // Erstelle die purchaseHistoryURL dynamisch basierend auf der aktuellen Domain
  var purchaseHistoryURL = "https://" + currentDomain + "/bin/purchaseHistory?item=" + itemNumber;

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

  // Fügen Sie einen Event-Listener zum Button hinzu, um die URL in einem neuen Tab zu öffnen
  historyButton.addEventListener("click", function () {
    window.open(purchaseHistoryURL, '_blank'); // Öffnen Sie die URL in einem neuen Tab
  });
}
