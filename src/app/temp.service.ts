import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): string[] {
    return ['test1', 'test2'];
  }

  public getMain() {
    return this.httpClient.get('http://localhost:8080/khayayphyu-application/saleOrder/boId/SALEORDER00000001');
  }

  public get(path: string) {
    return this.httpClient.get(path);
  }

}
