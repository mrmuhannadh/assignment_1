class DataStore {
  constructor() {
    this.stockCollection = [];
    this.stocksByExchange = {};
  }

  getStocks(exchange) {
    return this.stocksByExchange[exchange] || [];
  }

  addStocks(stock) {
    this.stockCollection.push(stock);

    if(!this.stocksByExchange[stock.exchange]) {
        this.stocksByExchange[stock.exchange] = []
    }

    this.stocksByExchange[stock.exchange].push(stock)
  }
}
