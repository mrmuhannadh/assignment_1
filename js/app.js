$(document).ready(function () {
  const dataStore = new DataStore();

  const stockData = [
    { exchange: "TDWL", symbols: ["1010", "1020", "1090", "2040", "1040"] },
    { exchange: "DFM", symbols: ["EMAAR", "DFM", "DIB", "SHUAA", "UPP"] },
  ];

  function getRandomValues() {
    return parseFloat((Math.random() * 100).toFixed(2));
  }

  stockData.forEach((item) => {
    item.symbols.forEach((symbol) => {
      let stock = new Stock(
        symbol,
        item.exchange,
        getRandomValues(),
        getRandomValues(),
        getRandomValues(),
        getRandomValues(),
        getRandomValues(),
        getRandomValues(),
        new Date()
      );

      dataStore.addStocks(stock);
    });
  });

  function populateTable(exchange) {
    let stocks;
    let tableBody = $("#stockTableBody");
    tableBody.empty();

    if (exchange === "ALL") {
      stocks = dataStore.getAllStocks();
    } else {
      stocks = dataStore.getStocks(exchange);
    }

    stocks.forEach((stock) => {
      let row = `<tr>
            <td>${stock.symbol}</td>
            <td>${stock.open}</td>
            <td>${stock.high}</td>
            <td>${stock.low}</td>
            <td>${stock.close}</td>
            <td>${stock.bid}</td>
            <td>${stock.ask}</td>
            <td>${stock.tradeDate.toLocaleString()}</td>
        </tr>`;

      tableBody.append(row);
    });
  }

  populateTable("ALL");

  $("#exchange").change(function () {
    let selectedValue = $(this).val();

    populateTable(selectedValue);
  });

  function updateStockValues() {
    stockData.forEach((item) => {
      item.symbols.forEach((symbol) => {
        let stock = dataStore.stocksByExchange[item.exchange].find(
          (s) => s.symbol === symbol
        );

        if (stock) {
          stock.updateValues(
            getRandomValues(),
            getRandomValues(),
            getRandomValues(),
            getRandomValues(),
            getRandomValues(),
            getRandomValues(),
            new Date()
          );
        }
      });
    });

    populateTable($("#exchange").val());

    setTimeout(updateStockValues, 5000);
  }

  setTimeout(updateStockValues, 5000);
});

// console.log("Stock collection", dataStore);
// console.log("Stock By Ex", dataStore.stocksByExchange);
