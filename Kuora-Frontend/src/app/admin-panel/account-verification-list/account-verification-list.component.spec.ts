import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountVerificationListComponent } from './account-verification-list.component';

describe('AccountVerificationListComponent', () => {
  let component: AccountVerificationListComponent;
  let fixture: ComponentFixture<AccountVerificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountVerificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountVerificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
