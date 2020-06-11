import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BaseService} from './BaseService';
import {Observable} from 'rxjs';
import {Customer} from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {
  }

  public search() {
    return this.httpClient.get(this.getBaseURL() + '/');
  }

  public searchWithCustomer() {
    return this.httpClient.get<Customer[]>(this.getBaseURL() + '/').pipe(map(xs => {
      const customerList = [];
      for (const x of xs) {
        customerList.push(Customer.createCustomer(x));
      }
      return customerList;
    }));
  }

  public save(customer: Customer) {
    return this.httpClient.post(this.getBaseURL() + '/', customer);
  }

  public byId(boId) {
    return this.httpClient.get<Customer>(this.getBaseURL() + '/' + boId).pipe(map(ys => {
      if (ys == null) {
        return null;
      }
      return Customer.createCustomer(ys);
    }));
  }

  public delete(customer) {
    const observable = new Observable(obs => {
      this.httpClient.delete(this.getBaseURL() + customer.boId).subscribe(result => {
        obs.next(true);
      });
    });

    return observable;
  }

  public byName(name) {
    return this.httpClient.get<Customer[]>(this.getBaseURL() + '/' + name).pipe(map(ys => {
      const customerList = [];
      console.log(ys);
      ys.forEach(x => customerList.push(Customer.createCustomer(x)));
      return customerList;
    }));
  }

  public getBaseURL() {
    return BaseService.BASE_URL + 'customer';
  }
}
