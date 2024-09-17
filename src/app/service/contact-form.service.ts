import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  contactFormURL= environment.apiUrl + '/contact'

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
