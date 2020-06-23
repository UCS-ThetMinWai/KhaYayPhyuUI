import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseService} from './BaseService';
import {Product} from '../domain/product';
import {Customer} from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  static jsonToProduct = map(json => {
    return Object.assign(new Product(), json);
  });

  constructor(private httpClient: HttpClient) {
  }

  public search() {
    return this.httpClient.get<Product[]>(this.getBaseURL()).pipe(map(xs => {
      const productList = [];
      for (const x of xs) {
        productList.push(Product.createProduct(x));
      }
      return productList;
    }));
  }

  public save(product: Product) {
    return this.httpClient.post<boolean>(this.getBaseURL() + '/', product);
  }

  public searchWithProduct() {
    return this.getAll();
  }

  public getAll() {
    return this.httpClient.get<Product[]>(this.getBaseURL()).pipe(map(xs => {
      const productList = [];
      for (const x of xs) {
        productList.push(Product.createProduct(x));
      }
      return productList;
    }));
  }

  public byId(id) {
    return this.httpClient.get<Product[]>(this.getBaseURL() + '/' + id).pipe(map(ys => {
      if (ys.length < 0) {
        return null;
      }
      return Product.createProduct(ys);
    }));
  }

  public delete(product) {
    const observable = new Observable(obs => {
      this.httpClient.delete(this.getBaseURL() + '/' + product.boId).subscribe(result => {
        obs.next(true);
      });
    });

    return observable;
  }

  public byName(name) {
    return this.httpClient.get<Product[]>(this.getBaseURL()).pipe(map(ys => {
      const productList = [];
      console.log(ys);
      ys.forEach(x => productList.push(Product.createProduct(x)));
      return productList;
    }));
  }

  public updateSalePrice(product: Product, amount: number) {
    return this.httpClient.put<Product>(this.getBaseURL() + "/sale/" + product.boId + "/" + amount, "").pipe(ProductService.jsonToProduct);
  }

  private getBaseURL() {
    return BaseService.BASE_URL + 'product';
  }

}
