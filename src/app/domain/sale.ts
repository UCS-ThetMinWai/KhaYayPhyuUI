import {SaleOrder} from './sale-order';
import {Customer} from './customer';

export class Sale {
  public id: number;
  public boId: string;
  public status: string;
  public payAmount: number;
  public total: number;
  public saleDate: Date;
  public saleOrderList: SaleOrder[] = [];
  public customer: Customer;

  public static createSale(json: any) {
    json.customer = Customer.createCustomer(json);
    json.saleOrderList = SaleOrder.createSaleOrderList(json.saleOrderList || []);
    return Object.assign(new Sale(), json);
  }

  public constructor() {
    this.saleOrderList = [];
    this.customer = new Customer();
    this.saleDate = new Date();
  }

  public totalBalance() {
    return this.total - this.payAmount;
  }

  public updateTotal() {
    this.total = 0;
    this.saleOrderList.forEach(saleOrder => this.total += saleOrder.product ? saleOrder.calculateTotal() : 0);
  }

  public removeSaleOrder(index) {
    this.saleOrderList.splice(index, 1);
  }

  get liveTotal() {
    this.updateTotal();
    return this.total;
  }
}
