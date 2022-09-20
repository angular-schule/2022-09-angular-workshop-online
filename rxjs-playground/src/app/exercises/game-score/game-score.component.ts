import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce } from 'rxjs';

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

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
