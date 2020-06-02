import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../domain/user';
import {Product} from '../domain/product';
import {Customer} from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public search() {
    return this.httpClient.get('http://localhost:8080/khayayphyu-application/user/');
  }

  public searchWithUser() {
    return this.httpClient.get<User[]>('http://localhost:8080/khayayphyu-application/user/').pipe(map(xs => {
      const userList = [];
      for (const x of xs) {
        userList.push(User.create(x));
      }
      return userList;
    }));
  }

  public save(user: User) {
    return this.httpClient.post('http://localhost:8080/khayayphyu-application/user/', user);
  }

  public byId(id) {
    return this.httpClient.get<User[]>('http://localhost:8080/khayayphyu-application/user/' + id).pipe(map(ys => {
      if (ys.length <= 0) {
        return null;
      }
      return User.create(ys);
    }));
  }

  public byName(name) {
    return this.httpClient.get<User[]>('http://localhost:8080/khayayphyu-application/user/search/' + name).pipe(map(ys => {
      const userList = [];
      ys.forEach(x => userList.push(User.create(x)));
      return userList;
    }));
  }
}
