// content.js
// Fügt einen "Price history"-Button unter dem "In den Warenkorb" Button hinzu, mit lokalisiertem Text

(function() {
  // Übersetzungsmapping mit korrekter Groß- und Kleinschreibung
  const translations = {
    // Englisch
    "ebay.com": "Price history",
    "ebay.co.uk": "Price history",
    "ebay.com.au": "Price history",
    "ebay.ca": "Price history",
    "ebay.com.sg": "Price history",
    "ebay.in": "Price history",
    "ebay.ph": "Price history",
    "ebay.my": "Price history",

    // Deutsch
    "ebay.de": "Preisverlauf",
    "ebay.at": "Preisverlauf",
    "ebay.ch": "Preisverlauf",

    // Französisch
    "ebay.fr": "Historique des prix",
    "ebay.be": "Historique des prix",
    "ebay.lu": "Historique des prix",

    // Italienisch
    "ebay.it": "Storico prezzi",

    // Spanisch
    "ebay.es": "Historial de precios",
    "ebay.com.mx": "Historial de precios",
    "ebay.com.ar": "Historial de precios",
    "ebay.com.br": "Histórico de preços",

    // Niederländisch
    "ebay.nl": "Prijsgeschiedenis",

    // Polnisch
    "ebay.pl": "Historia cen",

    // Chinesisch (Hongkong)
    "ebay.com.hk": "價格歷史",

    // Thailändisch
    "ebay.co.th": "ประวัติราคา",

    // Japanisch
    "ebay.co.jp": "価格履歴",

    // Koreanisch
    "ebay.co.kr": "가격 이력",

    // Russisch
    "ebay.ru": "История цен",

    // Weitere Sprachen und Domains können hier hinzugefügt werden
  };

  // Funktion zur Ermittlung des lokalisierten Button-Texts
  const getLocalizedText = (hostname) => {
    // Spezialfälle für Länder mit mehr als einer TLD (z.B. ebay.co.jp)
    const specialCases = {
      "ebay.com.br": "ebay.com.br",
      "ebay.co.jp": "ebay.co.jp",
      "ebay.co.kr": "ebay.co.kr",
      "ebay.ru": "ebay.ru",
      // Weitere Spezialfälle können hier hinzugefügt werden
    };

    let mainDomain = "";

    if (specialCases[hostname]) {
      mainDomain = specialCases[hostname];
    } else {
      // Extrahiere die Hauptdomain ohne Subdomains
      const domainParts = hostname.split('.');
      if (domainParts.length >= 2) {
        mainDomain = domainParts.slice(-2).join('.'); // z.B. ebay.de, ebay.com.br
      } else {
        mainDomain = hostname;
      }
    }

    return translations[mainDomain] || "Price history"; // Fallback zu "Price history" falls keine Übersetzung gefunden
  };

  // Funktion zur Initialisierung
  const init = () => {
    try {
      // Suche nach dem <ul> mit der Klasse "x-buybox-cta mar-t-20 x-buybox-cta--evo-colors"
      const buyBoxCTAList = document.querySelector('ul.x-buybox-cta.mar-t-20.x-buybox-cta--evo-colors');

      if (!buyBoxCTAList) {
        console.warn("Die <ul> mit Klasse 'x-buybox-cta mar-t-20 x-buybox-cta--evo-colors' wurde nicht gefunden.");
        return;
      }

      // Überprüfe, ob der "Price history"-Button bereits existiert
      const existingHistoryButton = buyBoxCTAList.querySelector('.historyButton');
      if (existingHistoryButton) {
        console.log("Der 'Price history'-Button existiert bereits.");
        return; // Button existiert bereits, nichts tun
      }

      // Extrahiere die Artikelnummer aus der aktuellen URL
      const url = new URL(window.location.href);
      const pathname = url.pathname;
      const itemNumberMatch = pathname.match(/\/itm\/([^/?]+)/);
      const itemNumber = itemNumberMatch ? itemNumberMatch[1] : null;

      if (!itemNumber) {
        console.warn("Artikelnummer konnte nicht aus der URL extrahiert werden.");
        return;
      }

      // Extrahiere die aktuelle Domain aus der URL
      const currentDomain = url.hostname;

      // Bestimme den lokalisierten Button-Text
      const buttonText = getLocalizedText(currentDomain);

      // Erstelle die purchaseHistoryURL dynamisch basierend auf der aktuellen Domain
      const purchaseHistoryURL = `https://${currentDomain}/bin/purchaseHistory?item=${itemNumber}`;

      // Erstelle den "Price history"-Button als <a> Element
      const historyLink = document.createElement("a");
      historyLink.href = purchaseHistoryURL;
      historyLink.target = "_blank";
      historyLink.rel = "noopener noreferrer";
      historyLink.setAttribute("aria-label", buttonText); // Optional: Lokalisierung des aria-labels

      // Füge eBay's Button-Klassen hinzu, um das gleiche Design zu erhalten
      historyLink.classList.add(
        "ux-call-to-action",
        "fake-btn",
        "fake-btn--fluid",
        "fake-btn--large",
        "fake-btn--secondary",
        "historyButton"
      );

      // Erstelle die innere Struktur der eBay-Buttons
      const cellSpan = document.createElement("span");
      cellSpan.classList.add("ux-call-to-action__cell");

      const textSpan = document.createElement("span");
      textSpan.classList.add("ux-call-to-action__text");
      textSpan.textContent = buttonText; // Setze den lokalisierten Text

      cellSpan.appendChild(textSpan);
      historyLink.appendChild(cellSpan);

      // Erstelle das <li> Element
      const historyListItem = document.createElement("li");
      const historyDiv = document.createElement("div");
      historyDiv.classList.add("vim", "x-history-action", "overlay-placeholder", "history-modalloading"); // Angepasste Klassen, falls nötig

      historyDiv.appendChild(historyLink);
      historyListItem.appendChild(historyDiv);

      // Füge den "Price history"-Button als neues <li> zum <ul> hinzu
      buyBoxCTAList.appendChild(historyListItem);
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Price history-Buttons:", error);
    }
  };

  // Funktion, um den "Price history"-Button zu initialisieren und zu beobachten
  const observeDOM = () => {
    // Initiale Versuche, den Button hinzuzufügen
    init();

    // Setze einen MutationObserver, um auf Änderungen im DOM zu reagieren (z.B. bei dynamischem Laden)
    const observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.type === "childList" || mutation.type === "subtree") {
          init();
        }
      }
    });

    // Beobachte das gesamte Dokument nach Änderungen
    observer.observe(document.body, { childList: true, subtree: true });
  };

  // Überprüfen, ob das DOM bereits geladen ist
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeDOM);
  } else {
    observeDOM();
  }
})();
