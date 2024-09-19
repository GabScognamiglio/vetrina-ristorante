import { Component } from '@angular/core';

@Component({
  selector: 'app-mappa-tavoli',
  templateUrl: './mappa-tavoli.component.html',
  styleUrls: ['./mappa-tavoli.component.scss']
})
export class MappaTavoliComponent {
  selectedDate!: string;
  selectedTime: string = '';
  numeroPersone: number = 1;
  nomePrenotazione: string = '';
  numeroTelefono: string = '';
  isTableAvailable: boolean = false;
  selectedTable:any

  tavoli: any[] = [
    { id: 1, disponibilita: { '10:00': true, '11:00': false, '12:00': true, '13:00': true, '14:00': false } },
    { id: 2, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': false, '14:00': true } },
    { id: 3, disponibilita: { '10:00': true, '11:00': true, '12:00': false, '13:00': true, '14:00': true } },
    { id: 4, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': true, '14:00': false } },
    { id: 5, disponibilita: { '10:00': true, '11:00': true, '12:00': false, '13:00': false, '14:00': true } },
    { id: 6, disponibilita: { '10:00': true, '11:00': false, '12:00': true, '13:00': true, '14:00': true } },
    { id: 7, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': false, '14:00': true } },
    { id: 8, disponibilita: { '10:00': true, '11:00': true, '12:00': false, '13:00': true, '14:00': true } },
    { id: 9, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': false, '14:00': false } },
    { id: 10, disponibilita: { '10:00': true, '11:00': false, '12:00': true, '13:00': true, '14:00': true } },
    { id: 11, disponibilita: { '10:00': true, '11:00': true, '12:00': false, '13:00': false, '14:00': true } },
    { id: 12, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': true, '14:00': false } },
    { id: 13, disponibilita: { '10:00': true, '11:00': true, '12:00': true, '13:00': false, '14:00': true } },
    { id: 14, disponibilita: { '10:00': false, '11:00': true, '12:00': true, '13:00': true, '14:00': true } },
    { id: 15, disponibilita: { '10:00': true, '11:00': false, '12:00': true, '13:00': false, '14:00': true } }
  ];


  constructor() {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
  }


  ngOnInit() {
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.updateAvailableTimes();
    this.updateAvailability();
  }

  updateAvailableTimes() {
    const availableTimes = this.getOrariDisponibili();
    if (availableTimes.length > 0) {
      this.selectedTime = availableTimes[0];
    }
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
    // Restituisce gli orari disponibili dal primo tavolo, ma puoi adattarlo se necessario
    return this.tavoli[0] ? Object.keys(this.tavoli[0].disponibilita) : [];
  }

    // Logica per verificare la disponibilità del tavolo
    checkDisponibilitaTavolo(tavolo: any) {
      this.selectedTable=tavolo
      if (this.selectedTime && tavolo.disponibilita[this.selectedTime]) {
        this.isTableAvailable = true;
      } else {
        this.isTableAvailable = false;
      }
      
      // Mostra la modale
      document.getElementById('my-modal')!.click();
    }
}
