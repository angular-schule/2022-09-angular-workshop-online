import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


class BookC {
  rating = 1;
  constructor(public isbn: string, public title: string) {}

  rateUp() {
    this.rating++;
  }
}

const myBookC = new BookC('123', 'Angular');


////////////

interface BookI {
  isbn: string;
  title: string;
  rating: number;
}

function rateUp(book: BookI): BookI {
  book.rating++;
  return book;
}


const myBook: BookI = {
  isbn: '123',
  title: 'Angular',
  rating: 5
};
