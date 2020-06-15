import {Product} from './product';

export class PurchaseOrder {
  public id: number = 0;
  public boId: string = '-1';
  public status: string = 'OPEN';
  public packagingType: string = '';
  public quantity: number = 0;
  public weight: number = 0;
  public amount: number = 0;
  public product: Product;

  public static createSaleOrder(json: any) {
    json.product = Product.createProduct(json.product);
    return Object.assign(new PurchaseOrder(), json);
  }

  public static createSaleOrderList(jsonArr: any[]) {
    const list: PurchaseOrder[] = [];
    jsonArr.forEach(json => list.push(PurchaseOrder.createSaleOrder(json)));
    return list;
  }

  public updateAmount() {
    this.amount = this.quantity * (this.product ? this.product.currentSalePrice.saleAmount : 0);
  }

  public constructor() {
    this.id = 0;
    this.product = new Product();
  }

  public updateTotal(quantity) {
    if (this.product == null || this.product.currentSalePrice == null)
      return;
    this.quantity = quantity;
    this.amount = this.quantity * this.product.currentSalePrice.saleAmount;
  }

  public calculateTotal() {
    if (!this.quantity || !this.product)
      return 0;
    return this.quantity * this.product.currentSalePrice.saleAmount;
  }

  get total() {
    return this.amount;
  }

  public toString() {
    return "Sale Order" + this.id;
  }

}
