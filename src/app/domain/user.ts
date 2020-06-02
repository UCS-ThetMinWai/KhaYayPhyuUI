export class User {
  public boId: string;
  public id: number;
  public age: number;
  public status: string;
  public name: string;
  public address: string;
  public phoneNumber: number;
  public role: string;

  public static create(json: any) {
    const user = new User();
    user.boId = json.boId;
    user.id = json.id;
    user.status = json.status;
    user.age = json.age;
    user.phoneNumber = json.phoneNumber;
    user.name = json.name;
    user.address = json.address;
    user.role = json.role;
    return user;
  }
}
