import { TestBed } from '@angular/core/testing';

import { RawProductService } from './raw-product.service';

describe('RawProductService', () => {
  let service: RawProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
