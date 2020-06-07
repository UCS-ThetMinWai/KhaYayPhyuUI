import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../domain/product';
import {observable, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseService} from "./BaseService";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  public search() {
    return this.httpClient.get<Product[]>('http://localhost:8080/khayayphyu-application/product/').pipe(map(xs => {
      const productList = [];
      for (const x of xs) {
        productList.push(Product.create(x));
      }
      return productList;
    }));
  }

  public save(product: Product) {
    console.log(product)
    return this.httpClient.post(this.getBaseURL(), product);
  }

  public searchWithProduct() {
    return this.httpClient.get<Product[]>('http://localhost:8080/khayayphyu-application/product/').pipe(map(xs => {
      const productList = [];
      for (const x of xs) {
        productList.push(Product.create(x));
      }
      return productList;
    }));
  }

  public byId(id) {
    return this.httpClient.get<Product[]>(this.getBaseURL() + id).pipe(map(ys => {
      if (ys.length <= 0) {
        return null;
      }
      return Product.create(ys);
    }));
  }

  public delete(product) {
    const observable = new Observable(obs => {
      this.httpClient.delete(this.getBaseURL() + product.boId).subscribe(result => {
        obs.next(true);
      })
    });

    return observable;
  }

  private getBaseURL() {
    return BaseService.BASE_URL + "product/"
  }

}
