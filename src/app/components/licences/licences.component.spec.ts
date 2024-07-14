import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencesComponent } from './licences.component';

describe('LicencesComponent', () => {
  let component: LicencesComponent;
  let fixture: ComponentFixture<LicencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicencesComponent]
    });
    fixture = TestBed.createComponent(LicencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
