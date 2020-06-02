import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderBaseComponent } from './purchase-order-base.component';

describe('PurchaseOrderBaseComponent', () => {
  let component: PurchaseOrderBaseComponent;
  let fixture: ComponentFixture<PurchaseOrderBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
