import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  // Input: Daten fließen von der Elternkomponente in das Property herein
  @Input() book?: Book;

  constructor() {}

  ngOnInit(): void {
  }

}
