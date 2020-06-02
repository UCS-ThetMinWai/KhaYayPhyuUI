import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceNewDialogComponent } from './price-new-dialog.component';

describe('PriceNewDialogComponent', () => {
  let component: PriceNewDialogComponent;
  let fixture: ComponentFixture<PriceNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
