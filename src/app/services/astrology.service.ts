import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface DailyPhrase {
daily: string

}


@Injectable({
  providedIn: 'root'
})
export class AstrologyService {
  private rapidApiKey = 'f26ff6dfaemsh2f997798027ed79p1de5ddjsn24886fe1d09b';
  private rapidApiHost = 'horoscope-astrology.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  public getDailyPhrase(): Observable<DailyPhrase> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.rapidApiKey,
      'X-RapidAPI-Host': this.rapidApiHost
    });

    return this.http.get<DailyPhrase>('https://horoscope-astrology.p.rapidapi.com/dailyphrase', { headers });
  }
}
   


