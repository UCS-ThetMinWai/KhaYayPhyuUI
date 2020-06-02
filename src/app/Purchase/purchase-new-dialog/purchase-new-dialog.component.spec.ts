import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseNewDialogComponent } from './purchase-new-dialog.component';

describe('PurchaseNewDialogComponent', () => {
  let component: PurchaseNewDialogComponent;
  let fixture: ComponentFixture<PurchaseNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
