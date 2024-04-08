import { Injectable } from '@angular/core';
import { MoonFx } from '../models/moon.model';

@Injectable({
  providedIn: 'root',
})
export class MoonService {
  moonPhase: {
    moonFx: MoonFx;
    currentTime: number;
  } = {
    moonFx: new MoonFx(),
    currentTime: new Date().getTime(),
  };


  constructor() {}



  private drawMoon(canvas: HTMLCanvasElement) {
    var ctx = canvas.getContext('2d') ?? undefined,
     height = Number.parseFloat(canvas?.getAttribute('height') ?? '0'),
      width = Number.parseFloat(canvas?.getAttribute('width') ?? '0'),
      cx = (width ?? 0) / 2,
      cy = (height ?? 0) / 2,
      illuminationRatio = this.moonPhase.moonFx.getIlluminatedRatio(),
      phaseAngle = this.moonPhase.moonFx.getPhaseAngle();
    var img = new Image();
    img.src = "assets/moonPhase_background.png";
    console.log(height, width);
    ctx?.beginPath();
    ctx?.drawImage(img, 0, 1, height, width);
    ctx?.closePath();

    // draw limb
    var points: Array<Array<Array<number>>> = [[], []];
      
    for (var a = 0; a < 180; a++) {
      var angle = this.moonPhase.moonFx._deg2rad(a - 90),
        x1 = Math.ceil(Math.cos(angle) * cx),
        y1 = Math.ceil(Math.sin(angle) * cy),
        moonWidth = x1 * 2,
        x2 = Math.floor(moonWidth * illuminationRatio);

      if (phaseAngle < 180) {
        x1 = cx - x1;
        x2 = x1 + (moonWidth - x2);
      } else {
        // waning
        x1 = cx + x1;
        x2 = x1 - (moonWidth - x2);
      }

      var y2 = cy + y1,
        p1 = [x1, y2],
        p2 = [x2, y2];

      points[0].push(p1);
      points[1].push(p2);
    }

    var newPoints = points[0].concat(points[1].reverse());
    ctx?.beginPath();
    if (ctx) ctx.fillStyle = 'rgba(0,0,0,0.95)';
    for (var n in newPoints) {
      var p = newPoints[n];
      if (n === '0') {
        ctx?.moveTo(p[0], p[1]);
      } else {
        ctx?.lineTo(p[0], p[1]);
      }
    }
    ctx?.fill();
    ctx?.closePath();
  }

  public changeDate(date: Date, canvas: HTMLCanvasElement): void {
    this.moonPhase.moonFx.setDate(date);


    this.drawMoon(canvas);
  }

  public getMoonInformations(): {
    synodicAge: string;
    julianDate: string;
    phaseAngle: string;
    distance: string;
    illumination: string;
  } {
    return this.moonPhase.moonFx.moonInformations;
  }
  // DOM ready

  //MoonPhase.DrawMoon.init();
  //MoonPhase.Navigation.init();
  //MoonPhase.DrawFavicon.init();
  //MoonPhase.LoadData.init();
}
