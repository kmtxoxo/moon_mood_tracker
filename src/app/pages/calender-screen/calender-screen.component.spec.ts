import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderScreenComponent } from './calender-screen.component';

describe('CalenderScreenComponent', () => {
  let component: CalenderScreenComponent;
  let fixture: ComponentFixture<CalenderScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalenderScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalenderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
