export class Purchase {
  public id: number;
  public boId: string;
  public status: string;
  public purchaseDate: Date;
  public payAmount: number;
  public total: number;

  public static createPurchase(json: any) {
    const purchase = new Purchase();
    purchase.id = json.id;
    purchase.boId = json.boId;
    purchase.status = json.status;
    purchase.purchaseDate = new Date(json.purchaseDate);
    purchase.payAmount = json.payAmount;
    purchase.total = json.total;
    return purchase;
  }

  public totalBalance() {
    return this.total - this.payAmount;
  }
}
