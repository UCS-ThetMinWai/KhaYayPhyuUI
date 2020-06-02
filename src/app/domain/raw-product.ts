export class RawProduct {
  public id: number;
  public boId: string;
  public status: string;
  public productName: string;
  public productType: string;

  public static createRawProduct(json: any){
    const rawProduct = new RawProduct();
    rawProduct.id = json.id;
    rawProduct.boId = json.boId;
    rawProduct.status = json.status;
    rawProduct.productName = json.productName;
    rawProduct.productType = json.productType;
    return rawProduct;
  }
}
