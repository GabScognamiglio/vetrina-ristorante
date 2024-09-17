import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobOffer } from 'src/interface/job-offer';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  jobsURL = environment.apiUrl + "/job-offers"


  constructor(private http: HttpClient) { }


  getJobOffers() {
    return this.http.get<JobOffer[]>(this.jobsURL)
  }

}
