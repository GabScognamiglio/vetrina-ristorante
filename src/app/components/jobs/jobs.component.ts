import { Component } from '@angular/core';
import { JobsService } from 'src/app/service/jobs.service';
import { ThemeService } from 'src/app/service/theme.service';
import { JobOffer } from 'src/interface/job-offer';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  jobs: JobOffer[] = [];
  caricamento = true;

  currentTheme!: string;

  constructor(private themeSrv: ThemeService, private jobsSrv: JobsService) { }

  ngOnInit() {
    this.themeSrv.currentTheme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
    this.getJobsOffers()

    setTimeout(() =>
      this.caricamento = false
      , 1000)
  }

  getJobsOffers() {
    this.jobsSrv.getJobOffers().subscribe((data) => {
      this.jobs = data;
    })
  }
}
