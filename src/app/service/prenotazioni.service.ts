import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post<Prenotazione>(this.prenotazioniURL, prenotazioneDTO);
  }
}
