import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawProductBaseComponent } from './raw-product-base.component';

describe('RawProductBaseComponent', () => {
  let component: RawProductBaseComponent;
  let fixture: ComponentFixture<RawProductBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawProductBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawProductBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
