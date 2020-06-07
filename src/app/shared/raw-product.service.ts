import { Injectable } from '@angular/core';
import {Purchase} from '../domain/purchase';
import {HttpClient} from '@angular/common/http';
import {RawProduct} from '../domain/raw-product';

@Injectable({
  providedIn: 'root'
})
export class RawProductService {

  constructor(private httpClient: HttpClient) { }

  public save(rawProduct: RawProduct) {
    return this.httpClient.post('http://localhost:8080/khayayphyu-application/rawProduct/', rawProduct);
  }

}
