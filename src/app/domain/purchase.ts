import {PurchaseOrder} from './purchase-order';
import {Customer} from './customer';

export class Purchase {
  public id: number;
  public boId: string;
  public status: string;
  public purchaseDate: Date;
  public payAmount: number;
  public total: number;
  public customer: Customer;
  public purchaseOrderList: PurchaseOrder[] = [];

  public constructor() {
    this.purchaseDate = new Date();
    this.customer = new Customer();
    this.purchaseOrderList = [];
  }

  public static createPurchase(json: any) {
    const purchase = new Purchase();
    purchase.id = json.id;
    purchase.boId = json.boId;
    purchase.status = json.status;
    purchase.purchaseDate = new Date(json.purchaseDate);
    purchase.payAmount = json.payAmount;
    purchase.total = json.total;
    return purchase;
  }

  public totalBalance() {
    return this.total - this.payAmount;
  }

  public updateTotal() {
    this.total = 0;
    this.purchaseOrderList.forEach(saleOrder => this.total += saleOrder.product ? saleOrder.calculateTotal() : 0);
  }

  public removePurchaseOrder(index) {
    this.purchaseOrderList.splice(index, 1);
  }

  get liveTotal() {
    this.updateTotal();
    return this.total;
  }
}
