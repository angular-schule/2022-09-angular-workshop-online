import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, timer, Observable } from 'rxjs';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.es.randomError().pipe(
      // retry(5)
      /*retry({
        count: 5,
        // delay: () => timer(2000)
        delay: 2000
      })*/
      catchError(err => {
        // 1. weiterwerfen
        // throw 'BÖSER FEHLER!'; // throw new Error()

        // 2. ersetzen durch normales Element
        // return of('Nichts passiert!');

        // 3. verschlucken
        // return of();
        // return new Observable();
        return EMPTY;
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}
