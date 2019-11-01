export class Earning {
  actualEPS: number;
  consensusEPS:	number;
  estimatedEPS:	number;
  announceTime:	string;
  numberOfEstimates:	number;
  EPSSurpriseDollar:	number;
  EPSReportDate:	string;
  fiscalPeriod:	string;
  fiscalEndDate:	string;
  actualEPSChange: number
}

export class Stock {
  symbol: string;
  earnings: Earning[];
}

export interface WeeklyStock {
  
}