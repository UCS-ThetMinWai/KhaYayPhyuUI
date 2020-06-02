import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleNewDialogComponent } from './sale-new-dialog.component';

describe('SaleNewDialogComponent', () => {
  let component: SaleNewDialogComponent;
  let fixture: ComponentFixture<SaleNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
