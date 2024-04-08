import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonCarouselComponent } from './moon-carousel.component';

describe('MoonCarouselComponent', () => {
  let component: MoonCarouselComponent;
  let fixture: ComponentFixture<MoonCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoonCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
