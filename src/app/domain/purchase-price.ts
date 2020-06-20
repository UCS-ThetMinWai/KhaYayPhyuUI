import {Purchase} from './purchase';

export class PurchasePrice {
  public id: number;
  public boId: string;
  public status: string;
  public date: Date;
  public discount: number;
  public amount: number;

  public static createPurchasePrice(json: any) {
    return Object.assign(new PurchasePrice(), json);
  }
}
