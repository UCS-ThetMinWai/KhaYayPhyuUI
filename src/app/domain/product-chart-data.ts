import {Product} from './product';
// import moment = require("moment");
import * as moment from 'moment';
import {start} from 'repl';

export class ProductChartData {
  public chartOption: any = {scaleShowVerticalLines: false, responsive: true};
  public dataset: any = [];
  public chartLabel: string[] = [];

  private yearlyDataByDay: any = {};

  private yearlyPurchaseByDate: any = {};

  constructor(private product: Product) {
    this.updateChartLabel();
    this.updateDataset();
  }

  private initializeData() {
    const year = new Date().getFullYear();
    let startDate = moment(year + '-1-1');
    let endDate = moment((year + 1) + '-1-1');
    while (startDate.isBefore(endDate)) {
      const key = this.formatMomentKey(startDate);
      this.yearlyDataByDay[key] = 0;
      startDate = startDate.add(1, 'day');
      this.chartLabel.push(key);
    }
  }

  private updateChartLabel() {
    const year = new Date().getFullYear();
    let startDate = moment(year + '-1-1');
    const endDate = moment((year + 1) + '-1-1');
    while (startDate.isBefore(endDate)) {
      const key = this.formatMomentKey(startDate);
      this.chartLabel.push(startDate.format('MMMM'));
      startDate = startDate.add(1, 'month');
    }
  }

  private updateDataset() {
    // this.calculateSaleData();
    this.calculatePurchaseData();
  }

  private calculateSaleData() {
    this.populateSalePriceToYearlyData();
    const monthlySalePurchase = this.extractPriceToArray();
    this.dataset[0] = {
      data: monthlySalePurchase,
      label: 'Sale Amount',
      borderWidth: 1,
      backgroundColor: 'rgba(0,0,0,0.0)'
    };
  }

  private calculatePurchaseData() {
    this.populatePurchasePriceToYearlyData();
    const monthlyAveragePurchase = this.extractPurchasePriceToArray(); // this.dataset[0].data;
    this.dataset[1] = {
      data: monthlyAveragePurchase,
      label: 'Purchase Amount',
      borderWidth: 1,
      borderCapStyle: 'square',
      backgroundColor: 'rgba(0,0,0,0.0)'
    };
  }

  private populateSalePriceToYearlyData() {
    this.product.salePriceHistory.forEach(salePrice => {
      const key = moment(salePrice.date);
      this.yearlyPurchaseByDate[this.formatMomentKey(key)] = salePrice.amount;
    });
    this.yearlyPurchaseByDate[this.formatMomentKey(moment(this.product.salePrice.date))] = this.product.salePrice.amount;
  }

  private populatePurchasePriceToYearlyData() {
    this.product.purchasePriceHistory.forEach(purchasePrice => {
      const key = moment(purchasePrice.date);
      this.yearlyPurchaseByDate[this.formatMomentKey(key)] = purchasePrice.amount;
    });
    this.yearlyPurchaseByDate[this.formatMomentKey(moment(this.product.purchasePrice.date))] = this.product.purchasePrice.amount;
  }

  private extractPriceToArray() {
    const datas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const totalDay = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const year = new Date().getFullYear();
    let startDate = moment(year + '-1-1');
    let endDate = moment((year + 1) + '-1-1');

    let amount = this.yearlyDataByDay['1-1-' + year] || 0;
    while (startDate.isBefore(endDate)) {
      const month = startDate.get('month');
      let saleAmount = this.yearlyDataByDay[this.formatMomentKey(startDate)];
      if (!saleAmount) {
        saleAmount = amount;
      } else {
        amount = saleAmount;
      }
      datas[month] = saleAmount + datas[month];
      totalDay[month]++;
      startDate = startDate.add(1, 'day');
    }
    return this.monthlyAverage(datas, totalDay);
  }

  private extractPurchasePriceToArray() {
    const datas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const totalDay = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const year = new Date().getFullYear();
    let startDate = moment(year + '-1-1');
    let endDate = moment((year + 1) + '-1-1');

    let amount = this.yearlyDataByDay['1-1-' + year] || 0;
    while (startDate.isBefore(endDate)) {
      const month = startDate.get('month');
      let purchaseAmount = this.yearlyPurchaseByDate[this.formatMomentKey(startDate)];
      if (!purchaseAmount) {
        purchaseAmount = amount;
      } else {
        amount = purchaseAmount;
      }
      datas[month] = purchaseAmount + datas[month];
      totalDay[month]++;
      startDate = startDate.add(1, 'day');
    }
    return this.monthlyAverage(datas, totalDay);
  }

  private monthlyAverage(datas: number[], totalDay: number[]) {
    const monthlyAverage = [];
    for (let i = 0; i < datas.length; i++) {
      monthlyAverage[i] = datas[i] / totalDay[i];
    }
    return monthlyAverage;
  }

  private formatMomentKey(momentDate) {
    return momentDate.format('DD-MM-YY');
  }
}
