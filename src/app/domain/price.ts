export class Price {
  public id: number;
  public boId: string;
  public status: string;
  public date: Date = new Date();
  public discount: number;
  public amount: number;

  constructor() {
    this.date = new Date();
  }


  public static createPrice(json: any) {
    return Object.assign(new Price(), json);
  }
}
