import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Purchase} from '../domain/purchase';
import {map} from 'rxjs/operators';
import {BaseService} from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient: HttpClient) { }

  public search() {
    return this.httpClient.get<Purchase[]>(this.getBaseUrl() + '/');
  }

  public save(purchase: Purchase) {
    return this.httpClient.post(this.getBaseUrl() + '/', purchase);
  }

  public searchWithPurchase() {
    return this.httpClient.get<Purchase[]>(this.getBaseUrl() + '/').pipe(map(xs => {
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
    return this.httpClient.get<Purchase[]>(this.getBaseUrl() + '/' + id).pipe(map(ys => {
      if (ys.length <= 0 ){
        return null;
      }
      return Purchase.createPurchase(ys);
    }));
  }

  public getBaseUrl() {
    return BaseService.BASE_URL + 'purchase';
  }
}
