import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceBaseComponent } from './price-base.component';

describe('PriceBaseComponent', () => {
  let component: PriceBaseComponent;
  let fixture: ComponentFixture<PriceBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
