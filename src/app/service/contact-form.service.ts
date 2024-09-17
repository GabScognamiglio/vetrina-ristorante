import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  contactFormURL= "http://localhost:8080/contact"

  constructor(private http: HttpClient) { }

  saveContactForm(contactForm:any){
    return this.http.post(this.contactFormURL, contactForm)
      .pipe(
        catchError(this.handleError) 
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Errore: ${error.error.message}`;
    } else {
      errorMessage = `Errore Server: ${error.status}\nMessaggio: ${error.message}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
