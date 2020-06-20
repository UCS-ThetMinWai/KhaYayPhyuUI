export class Price {
  public id: number;
  public boId: string;
  public status: string;
  public date: Date;
  public discount: number;
  public amount: number;

  public static createPrice(json: any) {
    return Object.assign(new Price(), json);
  }
}
