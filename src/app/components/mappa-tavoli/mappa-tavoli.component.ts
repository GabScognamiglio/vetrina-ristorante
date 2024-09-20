import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';

@Component({
  selector: 'app-mappa-tavoli',
  templateUrl: './mappa-tavoli.component.html',
  styleUrls: ['./mappa-tavoli.component.scss']
})
export class MappaTavoliComponent {

  selectedDate: string;
  selectedTime: string = '13:00';
  isTableAvailable: boolean = false;
  selectedTable: any
  tavoli: any[] = []
  caricamento = true;
  minDate: string;
  orari = [
    "13:00", "14:30", "18:00", "20:00", "21:30"
  ];

  constructor(private prenotazioniSrv: PrenotazioniService, private cd: ChangeDetectorRef) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.selectedDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.prenotazioniSrv.getDisponibilita(this.selectedDate).subscribe((data) => {
      this.tavoli = data;
      this.updateAvailability()
    })
    setTimeout(() => {
      this.caricamento = false
    }, 800);
  }

  onDateChange() {
    this.prenotazioniSrv.getDisponibilita(this.selectedDate).subscribe((data) => {
      this.tavoli = data;
      this.updateAvailability();
    });
  }

  updateAvailability() {
    this.tavoli.forEach(table => {
      if (this.selectedTime) {
        table.isAvailable = table.disponibilita[this.selectedTime] || false;
      } else {
        table.isAvailable = false;
      }
    });
  }

  getOrariDisponibili(): string[] {
    return this.tavoli[0] ? Object.keys(this.tavoli[0].disponibilita) : [];
  }

  checkDisponibilitaTavolo(tavolo: any) {
    this.selectedTable = tavolo
    if (this.selectedTime && tavolo.disponibilita[this.selectedTime]) {
      this.isTableAvailable = true;
    } else {
      this.isTableAvailable = false;
    }
    document.getElementById('my-modal')!.click();
  }
}






// tavoli: any[] = [
//   { id: 1, disponibilita: { '10:00': true, '11:00': false, '12:00': true, '13:00': true, '14:00': false } },
//   { id: 2, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': false, '14:00': true } },
//   { id: 3, disponibilita: { '10:00': true, '11:00': true, '12:00': false, '13:00': true, '14:00': true } },
//   { id: 4, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': true, '14:00': false } },
//   { id: 5, disponibilita: { '10:00': true, '11:00': true, '12:00': false, '13:00': false, '14:00': true } },
//   { id: 6, disponibilita: { '10:00': true, '11:00': false, '12:00': true, '13:00': true, '14:00': true } },
//   { id: 7, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': false, '14:00': true } },
//   { id: 8, disponibilita: { '10:00': true, '11:00': true, '12:00': false, '13:00': true, '14:00': true } },
//   { id: 9, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': false, '14:00': false } },
//   { id: 10, disponibilita: { '10:00': true, '11:00': false, '12:00': true, '13:00': true, '14:00': true } },
//   { id: 11, disponibilita: { '10:00': true, '11:00': true, '12:00': false, '13:00': false, '14:00': true } },
//   { id: 12, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': true, '14:00': false } },
//   { id: 13, disponibilita: { '10:00': true, '11:00': true, '12:00': true, '13:00': false, '14:00': true } },
//   { id: 14, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': true, '14:00': true } },
//   { id: 15, disponibilita: { '10:00': true, '11:00': false, '12:00': true, '13:00': false, '14:00': true } }
// ];

