import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MoonService } from '../../services/moon.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-moon-carousel',
  standalone: true,
  imports: [CommonModule, MatButton, MatIcon],
  templateUrl: './moon-carousel.component.html',
  styleUrl: './moon-carousel.component.scss',
})
export class MoonCarouselComponent implements AfterViewInit {
  today = new Date();
  selectedDay = new Date();
  yesterday = new Date();
  tomorrow = new Date();
  moonInfo:
    | {
        synodicAge: string;
        julianDate: string;
        phaseAngle: string;
        distance: string;
        illumination: string;
      }
    | undefined;

  @ViewChild('mycanvas') set content(content: ElementRef) {
    console.log('block three', content);
    this.canvasToday = content.nativeElement;
    if (this.canvasToday) {
      //this.moonService.initCanvas(this.canvas);
      this.moonService.changeDate(this.selectedDay, this.canvasToday);
      this.moonInfo = this.moonService.getMoonInformations();
    }
  }

  @ViewChild('mycanvas_tomorrow') set contentT(contentT: ElementRef) {
    console.log('block three', contentT);
    this.canvasT = contentT.nativeElement;
    if (this.canvasT) {
      this.moonService.changeDate(this.tomorrow, this.canvasT);
      this.moonInfo = this.moonService.getMoonInformations();
    }
  }

  @ViewChild('mycanvas_yesterday') set contentY(contentY: ElementRef) {
    console.log('block three', contentY);
    this.canvasY = contentY.nativeElement;
    if (this.canvasY) {
      this.moonService.changeDate(this.yesterday, this.canvasY);
      this.moonInfo = this.moonService.getMoonInformations();
    }
  }
  canvasToday: HTMLCanvasElement | undefined;
  canvasT: HTMLCanvasElement | undefined;
  canvasY: HTMLCanvasElement | undefined;

  constructor(private readonly moonService: MoonService) {}

  ngAfterViewInit(): void {
    //this.moonService.changeDate(this.selectedDay);
    setTimeout(() => {
      this.setDay('today');
      this.setDay('prev');
      this.setDay('next');
    }, 200);
  }

  setDay(action: 'next' | 'prev' | 'today'): void {
    let newDate: Date = new Date();

    switch (action) {
      case 'next':
        newDate.setDate(this.selectedDay.getDate() + 1);
        this.tomorrow = newDate;
        if (this.canvasT) this.moonService.changeDate(newDate, this.canvasT);
        break;
      case 'today':
        newDate = new Date();
        this.selectedDay = newDate;
        if (this.canvasToday)
          this.moonService.changeDate(newDate, this.canvasToday);
        break;
      case 'prev':
        newDate.setDate(this.selectedDay.getDate() - 1);
        this.yesterday = newDate;
        if (this.canvasY) this.moonService.changeDate(newDate, this.canvasY);
        break;
      default:
        newDate = new Date();
        break;
    }

    this.moonInfo = this.moonService.getMoonInformations();
  }

  printF() {
    console.log('yesterday: ', this.yesterday);
    console.log('tomorrow: ', this.tomorrow);
  }
}
