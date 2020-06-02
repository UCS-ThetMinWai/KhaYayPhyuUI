import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderNewDialogComponent } from './purchase-order-new-dialog.component';

describe('PurchaseOrderNewDialogComponent', () => {
  let component: PurchaseOrderNewDialogComponent;
  let fixture: ComponentFixture<PurchaseOrderNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
