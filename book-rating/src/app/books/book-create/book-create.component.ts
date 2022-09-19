import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/\d/),
        // Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    description: new FormControl('', { nonNullable: true }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0)]
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.min(1),
        Validators.max(5),
      ]
    }),
  });

  constructor() { }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.invalid && control.touched;

    // Andere Varianten:
    // if (!control) { return false; }
    // return control.invalid && control.touched;

    // return !!(control?.invalid && control?.touched);

    // return (control?.invalid && control?.touched) || false;
  }


  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    // return !!control && control.touched && control.getError(errorCode);
    // return !!control && control.touched && control.errors?.[errorCode];
    return !!control && control.touched && control.hasError(errorCode);
  }

  ngOnInit(): void {
  }

}


/*
TODO:
- Input-Validierung
- Feedback
- Formular abschicken
  - Button
  - Buch erzeugen
  - HTTP
  - bei Erfolg: Varianten:
    - Navigation zum Dashboard oder Detailseite
    - Notification Success
    - Zurücksetzen
*/
