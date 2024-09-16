import { Component } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  jobs: any[] = [];

  currentTheme!: string;

  constructor(private themeSrv: ThemeService) { }

  ngOnInit() {
    this.themeSrv.currentTheme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
  }
}
