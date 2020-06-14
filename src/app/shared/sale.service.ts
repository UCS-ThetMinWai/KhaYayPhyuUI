import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sale} from '../domain/sale';
import {map} from 'rxjs/operators';
import {BaseService} from "./BaseService";

@Injectable({
  providedIn: 'root'
})
export class SaleService extends BaseService {

  private saleMapOperator = map((jsonArr: any[]) => this.parseList(jsonArr));

  constructor(private httpClient: HttpClient) {
    super();
  }

  public save(sale: Sale) {
    sale.saleOrderList.forEach(saleOrder => {
      saleOrder.product.currentPrice = null;
      saleOrder.product.packagingDate = null;
    });
    return this.httpClient.post(this.getBase(), sale);
  }

  public search() {
    return this.httpClient.get(this.getBase()).pipe(this.saleMapOperator);
  }

  public searchWithSale() {
    return this.httpClient.get<Sale[]>('http://localhost:8080/khayayphyu-application/sale/').pipe(this.saleMapOperator);
  }

  public byId(id) {
    return this.httpClient.get<Sale[]>(this.getBase() + "/" + id).pipe(map(ys => {
      if (ys.length <= 0) {
        return null;
      }
      return Sale.createSale(ys);
    }));
  }

  private parseList(jsonArr: any[]): Sale[] {
    const list: Sale[] = [];
    jsonArr.forEach(json => list.push(this.parse(json)));
    return list;
  }

  private parse(json: any) {
    return Sale.createSale(json);
  }

  private getBase() {
    return BaseService.BASE_URL + "sale"
  }
}
