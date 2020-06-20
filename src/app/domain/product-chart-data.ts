import {Product} from './product';
import * as moment from 'moment';
import {start} from "repl";

export class ProductChartData {
  public chartOption: any = {scaleShowVerticalLines: false, responsive: true};
  public dataset: any = [];
  public chartLabel: string[] = [];

  public dateGenerator = function* (start, end) {
    end = moment(end).add(1, 'day');
    while (start.isBefore(end)) {
      yield start;
      start = start.add(1, 'day');
    }
  }

  constructor(private product: Product) {
    this.generateLabel();
    this.updateDataset()
  }

  private initializeData() {
    const year = new Date().getFullYear();
    let startDate = moment(year + '-1-1');
    let endDate = moment((year + 1) + '-1-1');
    while (startDate.isBefore(endDate)) {
      const key = this.formatMomentKey(startDate);
      startDate = startDate.add(1, 'day');
      this.chartLabel.push(key);
    }
  }

  private generateLabel() {
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
    this.calculateSaleData();
    this.calculatePurchaseData();
  }

  private calculateSaleData() {
    const saleMap = this.generateSaleMap();
    const monthlySale = this.extractPriceToArray(saleMap);
    this.dataset[0] = {
      data: monthlySale,
      label: 'Sale Amount',
      borderWidth: 1,
      backgroundColor: 'rgba(0,0,0,0.0)'
    };
  }

  private calculatePurchaseData() {
    const purchaseMap  = this.generatePurchaseMap();
    const monthlyAveragePurchase = this.extractPriceToArray(purchaseMap);
    this.dataset[1] = {
      data: monthlyAveragePurchase,
      label: 'Purchase Amount',
      borderWidth: 1,
      borderCapStyle: 'square',
      backgroundColor: 'rgba(0,0,0,0.0)'
    };
  }

  private generatePurchaseMap() {
    const purchaseMap = {};
    this.product.purchasePriceHistory.forEach(price => {
      const key = moment(price.date);
      purchaseMap[this.formatMomentKey(key)] = price.amount;
    })
    purchaseMap[this.formatMomentKey(moment(this.product.purchasePrice.date))] = this.product.purchasePrice.amount;
    console.log(purchaseMap)
    return purchaseMap;
  }

  private generateSaleMap() {
    const map = {};
    this.product.salePriceHistory.forEach(salePrice => {
      const key = moment(salePrice.date);
      map[this.formatMomentKey(key)] = salePrice.amount;
    });
    map[this.formatMomentKey(moment(this.product.salePrice.date))] = this.product.salePrice.amount;
    return map;
  }

  private extractPriceToArray(map) {
    const datas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const totalDay = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const year = new Date().getFullYear();
    let startDate = moment(year + '-1-1');
    let endDate = moment((year + 1) + '-1-1');

    let amount = map['1-1-' + year] || 0;
    for (const date of this.dateGenerator(startDate, endDate)) {
      const month = date.get('month');
      let saleAmount = map[this.formatMomentKey(date)];
      if (!saleAmount) {
        saleAmount = amount;
      } else {
        amount = saleAmount;
      }
      datas[month] = saleAmount + datas[month];
      totalDay[month]++;
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
