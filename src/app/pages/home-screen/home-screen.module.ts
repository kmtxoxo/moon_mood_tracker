import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoodBoxComponent } from '../../components/mood-box/mood-box.component';
import { HomeScreenComponent } from './home-screen.component';
import { MoonCarouselComponent } from '../../components/moon-carousel/moon-carousel.component';
import { DailyPhraseComponent } from '../../components/daily-phrase/daily-phrase.component';



@NgModule({
  declarations: [HomeScreenComponent],
  imports: [
    CommonModule,
    MoodBoxComponent,
    MoonCarouselComponent,
    DailyPhraseComponent
  ],
  exports: [HomeScreenComponent]
})
export class HomeScreenModule { }
