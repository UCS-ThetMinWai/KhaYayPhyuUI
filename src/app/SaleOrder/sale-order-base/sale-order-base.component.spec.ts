import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderBaseComponent } from './sale-order-base.component';

describe('SaleOrderBaseComponent', () => {
  let component: SaleOrderBaseComponent;
  let fixture: ComponentFixture<SaleOrderBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleOrderBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrderBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
