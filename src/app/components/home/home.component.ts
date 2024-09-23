import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentTheme: any;
  
  constructor(private themeSrv: ThemeService) { }


  ngOnInit(): void {
    this.themeSrv.currentTheme$.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
  }  
  
  openPDF(){
    const pdfUrl= "../../../assets/docs/prova_menu.pdf"
    window.open( pdfUrl, '_blank');
  }

}
