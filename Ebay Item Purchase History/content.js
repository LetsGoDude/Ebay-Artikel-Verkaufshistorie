// content.js
// Fügt einen "Price history"-Button unter dem "In den Warenkorb" Button hinzu, mit lokalisiertem Text

(function () {
  // Übersetzungsmapping für verschiedene eBay-Domains
  const translations = {
    "ebay.com": "Price history",
    "ebay.co.uk": "Price history",
    "ebay.com.au": "Price history",
    "ebay.ca": "Price history",
    "ebay.de": "Preisverlauf",
    "ebay.fr": "Historique des prix",
    "ebay.it": "Storico prezzi",
    "ebay.es": "Historial de precios",
    "ebay.nl": "Prijsgeschiedenis",
    "ebay.pl": "Historia cen",
    "ebay.com.br": "Histórico de preços",
    "ebay.co.jp": "価格履歴",
    "ebay.ru": "История цен",
    // Weitere Domains können hinzugefügt werden
  };

  // Funktion zur Ermittlung des lokalisierten Textes
  const getLocalizedText = (hostname) => {
    const mainDomain = hostname.split('.').slice(-2).join('.');
    return translations[mainDomain] || "Price history";
  };

  // Funktion zur Initialisierung des Buttons
  const addPriceHistoryButton = () => {
    const buyBoxCTAList = document.querySelector('ul.x-buybox-cta.mar-t-20.x-buybox-cta--evo-colors');
    if (!buyBoxCTAList) return;

    // Überprüfen, ob der Button bereits existiert
    if (buyBoxCTAList.querySelector('.historyButton')) return;

    const url = new URL(window.location.href);
    const itemNumber = url.pathname.match(/\/itm\/([^/?]+)/)?.[1];
    if (!itemNumber) return;

    const localizedText = getLocalizedText(url.hostname);
    const purchaseHistoryURL = `https://${url.hostname}/bin/purchaseHistory?item=${itemNumber}`;

    // Erstellen des Buttons
    const historyLink = document.createElement("a");
    historyLink.href = purchaseHistoryURL;
    historyLink.target = "_blank";
    historyLink.rel = "noopener noreferrer";
    historyLink.classList.add(
      "ux-call-to-action",
      "fake-btn",
      "fake-btn--fluid",
      "fake-btn--large",
      "fake-btn--secondary",
      "historyButton"
    );

    const buttonContent = document.createElement('span');
    buttonContent.className = 'ux-call-to-action__cell';
    
    const buttonText = document.createElement('span');
    buttonText.className = 'ux-call-to-action__text';
    buttonText.textContent = localizedText; // Verwende textContent für reinen Text
    
    buttonContent.appendChild(buttonText);
    historyLink.appendChild(buttonContent);

    // Button in die Struktur einfügen
    const historyListItem = document.createElement("li");
    const historyDiv = document.createElement("div");
    historyDiv.classList.add("vim", "x-history-action", "overlay-placeholder");
    historyDiv.appendChild(historyLink);
    historyListItem.appendChild(historyDiv);
    buyBoxCTAList.appendChild(historyListItem);
  };

  // MutationObserver einrichten, um dynamisches Laden zu unterstützen
  const observeDOM = () => {
    addPriceHistoryButton();

    const observer = new MutationObserver(() => addPriceHistoryButton());
    observer.observe(document.body, { childList: true, subtree: true });
  };

  // Starten, wenn das DOM geladen ist
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeDOM);
  } else {
    observeDOM();
  }
})();