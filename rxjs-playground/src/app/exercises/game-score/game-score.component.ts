import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, of } from 'rxjs';

@Component({
  selector: 'rxw-game-score',
  templateUrl: './game-score.component.html',
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore?: number;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den aktuellen Punktestand zu ermitteln ...
     */

    /******************************/

    // [1,2,3,4,5].reduce((acc, item) => acc + item) // 15

    /* // so bitte nicht:
    this.currentScore = 0;
    this.score$.subscribe(punkt => {
      this.currentScore += punkt;
    });*/

    this.score$.pipe(
      scan((acc, item) => acc + item, 0)
    ).subscribe(e => {
      this.currentScore = e;
    });


    /******************************/


    // Exkurs Redux
    of(
      'SETCITYLEIPZIG', // { type: 'SET CITY', data: 'Leipzig' }
      'SETNAMEF',
      'SETFRANG',
      'SETCITYBERLIN',
      'SETCITYHAMBURG'
    ).pipe(
      scan((acc, msg) => {
        switch (msg) {
          case 'SETCITYLEIPZIG': return { ...acc, city: 'Leipzig' };
          case 'SETNAMEF': return { ...acc, name: 'Ferdinand' };
          case 'SETFRANG': return { ...acc, framework: 'Angular' };
          case 'SETCITYBERLIN': return { ...acc, city: 'Berlin' };
          case 'SETCITYZUR': return { ...acc, city: 'Zürich' };
          default: return acc;
        }
      }, { lang: 'DE' })
    ).subscribe(e => console.log(e));


    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
