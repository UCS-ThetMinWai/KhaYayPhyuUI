export class Customer {
  public id: number;
  public boId: string;
  public name: string;
  public age: number;
  public address: string;
  public status;
  public phoneNumber;

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

}
