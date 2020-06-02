import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Purchase} from '../domain/purchase';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient: HttpClient) { }

  public search() {
    return this.httpClient.get<Purchase[]>('http://localhost:8080/khayayphyu-application/purchase/');
  }

  public save(purchase: Purchase) {
    return this.httpClient.post('http://localhost:8080/khayayphyu-application/purchase/', purchase);
  }

  public searchWithPurchase() {
    return this.httpClient.get<Purchase[]>('http://localhost:8080/khayayphyu-application/purchase/').pipe(map(xs => {
      const purchaseList = [];
      for (const x of xs) {
        if (x.boId != null) {
          purchaseList.push(Purchase.createPurchase(x));
        }
      }
      return purchaseList;
    }));
  }

  public byId(id) {
    return this.httpClient.get<Purchase[]>('http://localhost:8080/khayayphyu-application/purchase/' + id).pipe(map(ys =>{
      if (ys.length <= 0 ){
        return null;
      }
      return Purchase.createPurchase(ys);
    }));
  }
}
