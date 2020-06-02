import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../domain/customer';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient: HttpClient) { }

  public search() {
    return this.httpClient.get("http://localhost:8080/khayayphyu-application/customer/");
  }
  public searchWithCustomer() {
    return this.httpClient.get<Customer[]>('http://localhost:8080/khayayphyu-application/customer/').pipe(map( xs => {
      const customerList = [];
      for (const x of xs) {
            customerList.push(Customer.createCustomer(x));
      }
      return customerList;
    }));
  }

  public save(customer: Customer) {
    return this.httpClient.post('http://localhost:8080/khayayphyu-application/customer/', customer);
  }

  public byId(id) {
    return this.httpClient.get<Customer[]>('http://localhost:8080/khayayphyu-application/customer/' + id).pipe(map(ys => {
      if (ys.length <= 0) {
        return null;
      }
      return Customer.createCustomer(ys);
    }));
  }
  public byName(name) {
    return this.httpClient.get<Customer[]>('http://localhost:8080/khayayphyu-application/customer/search/' + name).pipe(map(ys => {
      const customerList = [];
      ys.forEach(x => customerList.push(Customer.createCustomer(x)));
      return customerList;
    }));
  }
}
