import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from '../shared/book';
import * as fromBook from './book.reducer';

export const selectBookState = createFeatureSelector<fromBook.State>(
  fromBook.bookFeatureKey
);

export const selectBooksLoading = createSelector(
  selectBookState,
  state => state.loading
);

export const selectBooks = createSelector(
  selectBookState,
  state => state.books
);


/*export const selectBooksForCurrentUser = createSelector(
  selectCurrentUser,
  selectBooks
  (user, books) => books.filter(b => b.ownedBy === user.id)
);*/

/*
const result = selectFirstBook({
  book: {
    loading: true,
    books: [
      { isbn: '123' } as Book
    ]
  },
  user: {},
  admin: {},
  homecontrol: {}
})
*/
