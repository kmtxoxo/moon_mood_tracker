import { Component, OnInit } from '@angular/core';
import { Star } from './models/star.model';
import { MoonFx } from './models/moon.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'moon_mood_tracker';
  number_stars: number = window.outerWidth / 15;
  stars: Array<Star> = [];
  moonCycle: Array<MoonFx> = [];
  todaysDate = new Date();
  ngOnInit(): void {
    this.generateStars();
    console.log(this.number_stars, window.outerHeight, window.outerWidth);
  }
  generateStars() {
    for (let i = 0; i <= this.number_stars; i++) {
      let star: Star = {
        starId: i,
        color: i % 2 == 0 ? 'yellow' : 'white',
        positionX: Math.floor(Math.random() * (window.outerWidth - 1 + 1)) + 1,
        positionY: Math.floor(Math.random() * (window.outerHeight - 1 + 1)) + 1,
        twinkle: i % 3 == 0 ? true : false,
        twinkleDelay: i % 2 == 0 ? 3000 : 5000,
      };

      this.stars.push(star);
    }
  }


}
