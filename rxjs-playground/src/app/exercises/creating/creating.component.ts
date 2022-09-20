import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer, tap } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('A', 'B', 'C')
    // from([1,2,3,4,5,6])
    // interval(1000) // ---0---1---2---3---4---5--- ...
    // timer(2000) // ------0|
    // timer(2000, 1000) // ------0---1---2---3---4---5--- ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      tap(e => console.log(e)),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });

    // Finnische Notation $ (André Staltz)
    const myOf$ = new Observable(sub => {
      sub.next('A');
      sub.next('B');
      sub.next('C');
      sub.complete();
    })


    /******************************/

    function producer(o: Subscriber<number>) {
      const result = Math.random();
      o.next(result);
      o.next(5);
      o.next(6);

      setTimeout(() => o.next(20), 2000);
      setTimeout(() => o.next(30), 4000);
      setTimeout(() => o.complete(), 5000);
      setTimeout(() => o.next(1000), 6000); // niemals sichtbar
    }

    const observer: Observer<number> = {
      next: (data) => console.log(data),
      error: (err) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    // producer(observer);

    const myObservable$ = new Observable(producer);
    // myObservable$.subscribe(observer);


    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
