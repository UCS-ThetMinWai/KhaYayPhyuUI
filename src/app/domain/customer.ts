export class Customer {
  public id: number;
  public boId: string;
  public name: string;
  public status: string;
  public phoneNumber: string;
  public age: number;
  public address: string;

  public static createCustomer(customerJson: any) {
    const customer = new Customer();
    if (customerJson == null) {
      return customer;
    }
    customer.id = customerJson.id;
    customer.boId = customerJson.boId;
    customer.name = customerJson.name;
    customer.phoneNumber = customerJson.phoneNumber;
    customer.address = customerJson.address;
    customer.status = customerJson.status;
    customer.age = customerJson.age;
    return customer;
  }

}
