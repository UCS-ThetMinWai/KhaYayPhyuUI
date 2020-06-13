import {Price} from './price';

export class Product {
  public boId: string;
  public id: number;
  public status: string;
  public productName: string;
  public peckagingDate: Date;
  public peckagingType: string;
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
    const product = new Product();
    product.id = productJson.id;
    product.boId = productJson.boId;
    product.status = productJson.status;
    product.productName = productJson.productName;
    product.peckagingDate = new Date(productJson.peckagingDate);
    product.peckagingType = productJson.peckagingType;
    product.currentPrice = Product.createPrice(productJson.currentPrice);
    return product;
  }

  public constructor() {
    this.currentPrice = new Price();
  }

}
