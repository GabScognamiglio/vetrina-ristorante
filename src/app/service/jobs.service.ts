import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { JobOffer } from 'src/interface/job-offer';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  jobsURL = "http://localhost:8080/job-offers"


  constructor(private http: HttpClient) { }


  getJobOffers() {
    return this.http.get<JobOffer[]>(this.jobsURL)
  }

}
