export class Price {
  public id: number;
  public boId: string;
  public status: string;
  public buyAmount: number;
  public date: Date;
  public discount: number;
  public saleAmount: number;

  public static createPrice(json: any) {
    const price = new Price();
    price.id = json.id;
    price.boId = json.boId;
    price.status = json.status;
    price.buyAmount = json.buyAmount;
    price.date = new Date(json.data);
    price.saleAmount = json.saleAmount;
    price.discount = json.discount;
    return price;
  }
}
