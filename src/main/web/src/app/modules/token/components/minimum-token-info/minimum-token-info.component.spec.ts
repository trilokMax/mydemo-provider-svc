import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumTokenInfoComponent } from './minimum-token-info.component';

describe('MinimumTokenInfoComponent', () => {
  let component: MinimumTokenInfoComponent;
  let fixture: ComponentFixture<MinimumTokenInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimumTokenInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimumTokenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
