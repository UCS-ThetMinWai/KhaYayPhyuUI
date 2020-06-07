import {SaleOrder} from './sale-order';
import {Customer} from './customer';

export class Sale {
  public id: number;
  public boId: string;
  public status: string;
  public payAmount: number;
  public total: number;
  public saleDate: Date;
  public saleOrderList: SaleOrder[];
  public customer: Customer;

  public static createSaleOrder(json: any) {
    const saleOrder = new SaleOrder();
    saleOrder.id = json.id;
    saleOrder.boId = json.boId;
    saleOrder.status = json.status;
    saleOrder.peckagingType = json.peckagingType;
    saleOrder.quantity = json.quantity;
    saleOrder.weight = json.weight;
    saleOrder.product = SaleOrder.createProduct(json.product);
    return saleOrder;
  }

  public static createCustomer(json: any) {
    const customer = new Customer();
    customer.id = json.id;
    customer.boId = json.boId;
    customer.name = json.name;
    customer.age = json.age;
    customer.status = json.status;
    customer.phoneNumber = json.phoneNumber;
    customer.address = json.address;
    return customer;
  }

  public static createSale(json: any) {
    const sale = new Sale();
    sale.id = json.id;
    sale.boId = json.boId;
    sale.status = json.status;
    sale.saleDate = json.saleDate;
    sale.payAmount = json.payAmount;
    sale.total = json.total;
    sale.customer = Sale.createCustomer(sale);
    sale.saleOrderList = [];
    // Sale.createSaleOrder(sale);
    return sale;
  }

  public constructor() {
    this.saleOrderList = [];
  }

  public totalBalance() {
    return this.total - this.payAmount;
  }

  public updateTotal() {
    this.total = 0;
    this.saleOrderList.forEach(saleOrder => this.total += saleOrder.product.currentPrice.saleAmount * saleOrder.quantity);
  }
}
