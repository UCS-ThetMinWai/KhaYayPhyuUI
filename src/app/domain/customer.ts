export class Customer {
  public id: number;
  public boId: string;
  public name: string;
  public status: string;
  public phoneNumber: string;
  public age: number;
  public address: string;

  public static createCustomer(customerJson: any) {
    return Object.assign(new Customer(), customerJson)
  }

}
