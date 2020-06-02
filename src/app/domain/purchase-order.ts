export class PurchaseOrder {
  public id: number;
  public boId: string;
  public status: string;
  public date: Date;
  public quantity: number;
  public weight: number;

  public static createPurchaseOrder(json: any) {
    const purchaseOrder = new PurchaseOrder();
    purchaseOrder.id = json.id;
    purchaseOrder.boId = json.boId;
    purchaseOrder.status = json.status;
    purchaseOrder.date = new Date(json.data);
    purchaseOrder.quantity = json.quantity;
    purchaseOrder.weight = json.weight;
    return purchaseOrder;
  }
}
