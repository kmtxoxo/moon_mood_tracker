import { Component, OnInit } from '@angular/core';
import { AstrologyService } from '../../services/astrology.service';
import { CommonModule } from '@angular/common';
export interface DailyPhrase {
  daily: string
  
  }


@Component({
  selector: 'app-daily-phrase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-phrase.component.html',
  styleUrl: './daily-phrase.component.scss'

  
})
export class DailyPhraseComponent implements OnInit {
  dailyPhrase: DailyPhrase | undefined;
constructor(private astrologyService : AstrologyService){}
 

ngOnInit(): void {
  //this.fetchDailyPhrase();
  this.dailyPhrase = { daily: "The greatest glory in living lies not in never falling, but in rising every time we fall." };
}

fetchDailyPhrase(): void {
  this.astrologyService.getDailyPhrase().subscribe({
    next: (v) => {this.dailyPhrase = v, console.log(v)} ,
    error: (e) => console.error(e)
})
};




}

