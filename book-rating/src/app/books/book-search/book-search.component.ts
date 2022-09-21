import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchControl = new FormControl('', { nonNullable: true });

  results$ = this.searchControl.valueChanges.pipe(
    debounceTime(1000),
    filter(value => value.length >= 3),
    distinctUntilChanged(),
    switchMap(value => this.bs.search(value))
  );


  constructor(private bs: BookStoreService) {
  }

  ngOnInit(): void {
  }

}
