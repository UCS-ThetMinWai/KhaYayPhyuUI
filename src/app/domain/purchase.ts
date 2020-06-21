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
    json.customer = Customer.createCustomer(json.customer);
    json.purchaseOrderList = PurchaseOrder.createPurchaseOrderList(json.purchaseOrderList);
    return Object.assign(new Purchase(), json);
  }

  public totalBalance() {
    return this.total - this.payAmount;
  }

  public updateTotal() {
    this.total = this.purchaseOrderList.map(po => po.price * po.quantity).reduce((a, b) => a + b);
  }

  public removePurchaseOrder(index) {
    this.purchaseOrderList.splice(index, 1);
  }

  get liveTotal() {
   //  console.log("here" + this.purchaseOrderList.map(po => po.price * po.quantity).reduce((a,b) => a + b));
    return this.purchaseOrderList.map(po => po.price * po.quantity).reduce((a,b) => a + b);
  }
}
