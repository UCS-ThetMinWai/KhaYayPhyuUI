import {Price} from './price';

export class Product {
  public boId: string;
  public id: number;
  public status: string;
  public productName: string;
  public packagingDate: Date;
  public packagingType: string;
  public currentPrice: Price;

  public static createPrice(json: any) {
    const price = new Price();
    if (json == null) {
      return price;
    }
    price.id = json.id;
    price.boId = json.boId;
    price.status = json.status;
    price.buyAmount = json.buyAmount;
    price.date = new Date(json.data);
    price.saleAmount = json.saleAmount;
    price.discount = json.discount;
    return price;
  }

  public static createProduct(productJson: any) {
    productJson = productJson || {}
    productJson.packagingDate = productJson ? new Date() : new Date(productJson.packagingDate);
    return Object.assign(new Product(), productJson);
  }

  public constructor() {
    this.currentPrice = new Price();
  }

}
