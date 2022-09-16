import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

/*class RatingMockService {
  rateUp(b: Book) {
    return b;
  }
}*/

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let wasCalled = false;

  beforeEach(async () => {

    const ratingMock: Partial<BookRatingService> = {
      rateUp: (b: Book) => b,
      // rateUp(b: Book) {return b;}
    };

    // Ansatz
    const storeMock = {
      getAll: () => of([])
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        // BRS ersetzen: wenn Service angefordert wird,
        // wird stattdessen ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // Zugriff auf den DOM:
    // Natives HTML-Element vom Browser:
    // fixture.nativeElement.querySelector('#foo');
    // Abstraktion von Angular, funktioniert auch in Nicht-Browser-Umgebung:
    // fixture.debugElement.query(By.css('#foo'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp() for doRateUp()', () => {
    // Arrange
    // Service injecten (ist eigentlich der ratingMock)
    const service = TestBed.inject(BookRatingService);
    // spyOn(service, 'rateUp').and.returnValue({ isbn: '123' } as Book);
    // spyOn(service, 'rateUp').and.callFake(b => b);
    spyOn(service, 'rateUp').and.callThrough(); // callThrough: originale ersetzte Methode trotzdem verwenden

    // Act
    const book = { isbn: '123' } as Book; // Type Assertion
    component.doRateUp(book);

    // Assert
    expect(service.rateUp).toHaveBeenCalledTimes(1);
    expect(service.rateUp).toHaveBeenCalledWith(book);
  });
});
