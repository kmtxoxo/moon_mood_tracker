import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodBoxComponent } from './mood-box.component';

describe('MoodBoxComponent', () => {
  let component: MoodBoxComponent;
  let fixture: ComponentFixture<MoodBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoodBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
