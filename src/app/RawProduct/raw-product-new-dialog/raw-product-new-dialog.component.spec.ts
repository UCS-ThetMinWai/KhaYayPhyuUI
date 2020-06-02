import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawProductNewDialogComponent } from './raw-product-new-dialog.component';

describe('RawProductNewDialogComponent', () => {
  let component: RawProductNewDialogComponent;
  let fixture: ComponentFixture<RawProductNewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawProductNewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawProductNewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
