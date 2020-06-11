import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../domain/user';
import {Customer} from '../domain/customer';
import {BaseService} from './BaseService';
import {userError} from '@angular/compiler-cli/src/transformers/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public search() {
    return this.httpClient.get(this.getBaseURL());
  }

  public searchWithUser() {
    return this.httpClient.get<User[]>(this.getBaseURL() + '/').pipe(map(xs => {
      const userList = [];
      for (const x of xs) {
        userList.push(User.create(x));
      }
      return userList;
    }));
  }

  public delete(user) {
    const observable = new Observable(obs => {
      this.httpClient.delete(this.getBaseURL() + '/' + user.boId).subscribe(result => {
        obs.next(true);
      });
    });

    return observable;
  }

  public save(user: User) {
    return this.httpClient.post(this.getBaseURL() + '/', user);
  }

  public byId(id) {
    return this.httpClient.get<User>(this.getBaseURL() + '/' + id).pipe(map(ys => {
      if (ys == null) {
        return null;
      }
      return User.create(ys);
    }));
  }

  public byName(name) {
    return this.httpClient.get<User[]>(this.getBaseURL(), {params: {name: name}}).pipe(map(ys => {
      const userList = [];
      ys.forEach(x => userList.push(User.create(x)));
      return userList;
    }));
  }

  private getBaseURL() {
    return BaseService.BASE_URL + 'user';
  }
}
