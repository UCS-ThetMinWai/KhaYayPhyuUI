import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sale} from '../domain/sale';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private httpClient: HttpClient) {}

  public save(sale: Sale) {
    return this.httpClient.post('http://localhost:8080/khayayphyu-application/sale/', sale);
  }

  public search() {
    return this.httpClient.get('http://localhost:8080/khayayphyu-application/sale/');
  }

  public searchWithSale() {
    return this.httpClient.get<Sale[]>('http://localhost:8080/khayayphyu-application/sale/').pipe(map(xs => {
      const saleList = [];
      for (const x of xs) {
        if (x.boId != null) {
          saleList.push(Sale.createSale(x));
        }
      }
      return saleList;
    }));
  }

  public byId(id) {
    return this.httpClient.get<Sale[]>('http://localhost:8080/khayayphyu-application/sale/' + id).pipe(map( ys => {
      if (ys.length <= 0) {
        return null;
      }
      return Sale.createSale(ys);
    }));
  }
}
