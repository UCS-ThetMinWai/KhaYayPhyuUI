import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleBaseComponent } from './sale-base.component';

describe('SaleBaseComponent', () => {
  let component: SaleBaseComponent;
  let fixture: ComponentFixture<SaleBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
