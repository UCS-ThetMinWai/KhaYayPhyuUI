import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNewDialogComponent } from './customer-new-dialog.component';

describe('CustomerNewDialogComponent', () => {
  let component: CustomerNewDialogComponent;
  let fixture: ComponentFixture<CustomerNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
