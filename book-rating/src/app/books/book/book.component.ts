import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

  // Input: Daten fließen von der Elternkomponente in das Property herein
  @Input() book?: Book;

  // Output: Daten fließen von hier zur Elternkomponente
  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  constructor() {
  }

  ngOnInit(): void {
    console.log('BOOK COMPONENT', this.book?.isbn);
  }

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }

  log() {
    // console.log('CD', Date.now())
  }
}
