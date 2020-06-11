import {Customer} from './customer';
import {Product} from './product';

export class SaleOrder {
  public id: number;
  public boId: string;
  public status: string;
  public peckagingType: string;
  public quantity: number;
  public weight: number;
  public amount: number;
  public product: Product;

  public static createSaleOrder(json: any) {
    const saleOrder = new SaleOrder();
    saleOrder.id = json.id;
    saleOrder.boId = json.boId;
    saleOrder.status = json.status;
    saleOrder.peckagingType = json.peckagingType;
    saleOrder.quantity = json.quantity;
    saleOrder.weight = json.weight;
    saleOrder.amount = json.amount;
    saleOrder.product = SaleOrder.createProduct(json.product);
    return saleOrder;
  }

  public static createProduct(productJson: any) {
    const product = new Product();
    product.id = productJson.id;
    product.boId = productJson.boId;
    product.status = productJson.status;
    product.productName = productJson.productName;
    product.peckagingDate = new Date(productJson.peckagingDate);
    product.peckagingType = productJson.peckagingType;
    product.rawProduct = Product.createRawProduct(productJson.rawProduct);
    return product;
  }

  public updateAmount() {
    this.amount = this.quantity * (this.product ? this.product.currentPrice.saleAmount : 0);
  }
}
