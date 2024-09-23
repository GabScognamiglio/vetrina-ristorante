import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prenotazione } from 'src/interface/prenotazione';
import { PrenotazioneDTO } from 'src/interface/prenotazione-dto';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  prenotazioniURL= environment.apiUrl + "/prenotazioni"

  constructor(private http: HttpClient) { }


  getDisponibilita(data: string): Observable<any[]> {
    const params = new HttpParams().set('data', data);
    return this.http.get<any[]>(`${this.prenotazioniURL}/disponibilita`, { params });
  }

  creaPrenotazione(prenotazioneDTO: PrenotazioneDTO): Observable<Prenotazione> {
    return this.http.post<Prenotazione>(this.prenotazioniURL, prenotazioneDTO)      .pipe(
      catchError(this.handleError)
    );
}

// Metodo per gestire errori di rete o di server
private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Errore sconosciuto!';
  if (error.error instanceof ErrorEvent) {
    // Errore lato client
    errorMessage = `Errore: ${error.error.message}`;
  } else {
    // Errore lato server
    errorMessage = `Errore del server: ${error.status}\nMessaggio: ${error.message}`;
  }
  return throwError(errorMessage);
}
}
