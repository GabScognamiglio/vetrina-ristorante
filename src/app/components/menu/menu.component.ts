import { Component } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
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
