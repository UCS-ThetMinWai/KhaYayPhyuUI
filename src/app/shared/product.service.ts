import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../domain/product';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
    product.rawProduct = product.rawProduct;
    return this.httpClient.post('http://localhost:8080/khayayphyu-application/product/', product);
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
    return this.httpClient.get<Product[]>('http://localhost:8080/khayayphyu-application/product/' + id).pipe(map(ys => {
      if (ys.length <= 0) {
        return null;
      }
      return Product.create(ys);
    }));
  }

}
