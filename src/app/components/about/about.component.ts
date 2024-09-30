import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  openPDF(){
    const pdfUrl= "../../../assets/docs/prova_menu.pdf"
    window.open( pdfUrl, '_blank');
  }
}
