import {Price} from './price';
import {PurchasePrice} from './purchase-price';
import {Purchase} from './purchase';
import {Item} from './item';

export class Product {
  public boId: string;
  public id: number;
  public status: string;
  public productName: string;
  public packagingDate: Date;
  public packagingType: string;
  public salePrice: Price;
  public purchasePrice: PurchasePrice;
  public salePriceHistory: Price[] = [];
  public purchasePriceHistory: PurchasePrice[] = [];

  public itemList: Item[] = [];

  public dataset: any = [
    {data: [], label: 'Series A', borderWidth: 1},
    {data: [4500, 3500, 4000, 6200, 86, 27, 90], label: 'Series B', borderWidth: 1}];

  public chartLabel = [];

  static createProduct(productJson: any) {
    productJson = productJson || {};
    productJson.packagingDate = productJson ? new Date() : new Date(productJson.packagingDate);
    productJson.salePrice = Price.createPrice(productJson.salePrice);
    productJson.itemList = Item.createList(productJson.itemList || []);

    const salePriceHistory = [];
    for (const temp of productJson.salePriceHistory || []) {
      salePriceHistory.push(Price.createPrice(temp));
    }
    productJson.salePriceHistory = salePriceHistory;
    productJson.salePrice = Price.createPrice(productJson.salePrice);

    const purchasePriceHistory = [];
    for (const temp of productJson.purchasePriceHistory || []) {
      purchasePriceHistory.push(PurchasePrice.createPurchasePrice(temp));
    }
    productJson.purchasePriceHistory = purchasePriceHistory;
    productJson.purchasePrice = PurchasePrice.createPurchasePrice(productJson.purchasePrice);
    const product = Object.assign(new Product(), productJson);

    return product;
  }

  public constructor() {
    this.salePrice = new Price();
    this.purchasePrice = new PurchasePrice();
    this.itemList = [];
  }


  private updateChartLabel() {
    const labels = [];
    for (const price of this.salePriceHistory) {
      labels.push(price.date);
    }
    this.chartLabel = labels;
  }

  private updateData() {
    const saleAmounts = [];
    for (const price of this.salePriceHistory) {
      saleAmounts.push(price.amount);
    }
    this.dataset[0].data = saleAmounts;
  }

  private updatePurchaseData() {
    const purchaseAmount = [];
    for (const price of this.purchasePriceHistory) {
      purchaseAmount.push(price.amount);
    }
    this.dataset[0].data = purchaseAmount;
  }

  public isSame(product) {
    console.log(this.id, product.id, this.id === product.id);
    return this.id === product.id;
  }

  public isNotSame(product) {
    return !this.isSame(product);
  }

}
