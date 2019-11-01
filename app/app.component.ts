import { Component } from '@angular/core';
import { Stock, Earning } from '././model/stock';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  stock: Stock = {
    symbol: 'AAPL',
  };
  alphaVantageApi = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=';
  alphaVantageApiKey = '&apikey=465JO6UCJK0WGK3D';

  iexApi = 'https://api.iextrading.com/1.0/stock/';

  constructor(private http:HttpClient) {
    this.getWeeklyStockData('SILV');
  }

  getWeeklyStockData(symbol:string) {
    this.http.get(this.alphaVantageApi + symbol + this.alphaVantageApiKey).subscribe(data => {
      console.log(data["Weekly Time Series"]);
    });
  }

  getEarnings(symbol:string) {
    this.stock.symbol = symbol;
    // Make the HTTP request:
    this.http.get(this.iexApi + symbol + '/earnings').subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
      this.stock.earnings = data['earnings'];
      this.calculateEPSChange();
    });
  }
  
  calculateEPSChange() {
    if (!this.stock.earnings)
      return;
    
    for (var i = 0; i < this.stock.earnings.length; i++) {
      if (i == 0)
        continue;
        
      var current = this.stock.earnings[i].actualEPS;
      var previous = this.stock.earnings[i-1].actualEPS;
      
      if (current && previous)
      {
        this.stock.earnings[i-1].actualEPSChange = (previous - current) / previous;
      }
    }
  }
}
