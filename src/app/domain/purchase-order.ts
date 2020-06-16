import {Product} from './product';
import {Purchase} from './purchase';

export class PurchaseOrder {
  public id: number = 0;
  public boId: string = '-1';
  public status: string = 'OPEN';
  public quantity: number = 0;
  public weight: number = 0.0;
  public amount: number = 0;
  public product: Product;

  public constructor() {
    this.id = 0;
    this.product = new Product();
  }

  public static createPurchaseOrder(json: any) {
    json.product = Product.createProduct(json.product);
    return Object.assign(new PurchaseOrder(), json);
  }

  public updateAmount() {
    this.amount = this.weight * (this.product ? this.product.currentBuyPrice.amount : 0);
  }

  public updateTotal(quantity) {
    if (this.product == null || this.product.currentBuyPrice == null)
      return;
    this.quantity = quantity;
    this.amount = this.quantity * this.product.currentBuyPrice.amount;
  }

  public calculateTotal() {
    if (!this.quantity || !this.product) {
      return 0;
    }
    return this.weight * this.product.currentBuyPrice.amount;
  }

  get total() {
    return this.amount;
  }

  public toString() {
    return 'Sale Order' + this.id;
  }
}
