export class PurchasePrice {
  public id: number;
  public boId: string;
  public status: string;
  public date: Date;
  public amount: number;

  constructor() {
    this.date = new Date()
  }

  public static createPurchasePrice(json: any) {
    return Object.assign(new PurchasePrice(), json);
  }
}
