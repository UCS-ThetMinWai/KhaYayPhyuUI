import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderNewDialogComponent } from './sale-order-new-dialog.component';

describe('SaleOrderNewDialogComponent', () => {
  let component: SaleOrderNewDialogComponent;
  let fixture: ComponentFixture<SaleOrderNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleOrderNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrderNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
