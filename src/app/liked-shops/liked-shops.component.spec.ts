import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedShopsComponent } from './liked-shops.component';

describe('LikedShopsComponent', () => {
  let component: LikedShopsComponent;
  let fixture: ComponentFixture<LikedShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
