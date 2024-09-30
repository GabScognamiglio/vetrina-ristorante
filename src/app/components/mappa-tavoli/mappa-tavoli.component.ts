import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { PrenotazioniService } from 'src/app/service/prenotazioni.service';
import { DisponibilitaTavolo } from 'src/interface/disponibilita-tavolo';
import { PrenotazioneDTO } from 'src/interface/prenotazione-dto';

@Component({
  selector: 'app-mappa-tavoli',
  templateUrl: './mappa-tavoli.component.html',
  styleUrls: ['./mappa-tavoli.component.scss']
})
export class MappaTavoliComponent {

  selectedDate: string;
  orari = ["13:00", "14:30", "18:00", "20:00", "21:30"];
  selectedTime!: string
  isTableAvailable: boolean = false;
  selectedTable!: DisponibilitaTavolo;
  tavoli: any[] = [];
  caricamento = true;
  minDate: string;
  formPrenotazione!: NgForm;
  persone!: number;
  nome!: string;
  email!: string;
  numeroTel!: string;
  minPersone: number = 1;
  maxPersone: number = 10;
  isModalVisible = false; 
  modalMessage = ''; 
  modalType = ''; 
  orariFiltrati!: string[];


  constructor(private prenotazioniSrv: PrenotazioniService, private cd: ChangeDetectorRef) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.selectedDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.refreshPrenotazioni();
  }

  refreshPrenotazioni() {
    this.prenotazioniSrv.getDisponibilita(this.selectedDate).subscribe((data) => {
      this.tavoli = data;
      this.eliminaOrariPassati()
      this.updateAvailability();

    });
    setTimeout(() => {
      this.caricamento = false;
    }, 800);
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

  eliminaOrariPassati() {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    if (this.selectedDate === formattedToday) {
      const currentHour = today.getHours();

      this.orariFiltrati = this.orari.filter(orario => {
        const [hour] = orario.split(':').map(Number);
        return hour > currentHour;
      });
    }
    else {
      this.orariFiltrati=["13:00", "14:30", "18:00", "20:00", "21:30"]
    }
    this.selectedTime = this.orariFiltrati[0]
  }

  onDateChange() {
    this.prenotazioniSrv.getDisponibilita(this.selectedDate).subscribe((data) => {
      this.tavoli = data;      
      this.updateAvailability();
      this.eliminaOrariPassati()
    });
  }

  checkDisponibilitaTavolo(tavolo: any) {
    this.selectedTable = tavolo;
    this.isTableAvailable = this.selectedTime && tavolo.disponibilita[this.selectedTime];
    this.updatePersoneLimits();
    document.getElementById('my-modal')!.click();
  }

  creaPrenotazione(form: NgForm) {
    const prenotazione: PrenotazioneDTO = {
      tavoloId: this.selectedTable.id,
      data: this.selectedDate,
      ora: this.selectedTime,
      persone: this.persone,
      nome: this.nome,
      email: this.email,
      numeroTel: this.numeroTel
    };

    this.prenotazioniSrv.creaPrenotazione(prenotazione).subscribe(
      (response) => {
        this.modalMessage = 'Prenotazione effettuata con successo!';
        this.modalType = 'success';

        setTimeout(() => {
          console.log('Eseguendo reload...');
          window.location.reload();
        }, 3000);
      },
      (error) => {
        this.modalMessage = 'Si è verificato un errore durante la prenotazione.';
        this.modalType = 'error';
        console.error(error);
      }
    );
  }

  updatePersoneLimits() {
    if (this.selectedTable) {
      const tavoloId = this.selectedTable.id;
      if (tavoloId >= 1 && tavoloId <= 3) {
        this.minPersone = 6;
        this.maxPersone = 10;
      } else if (tavoloId >= 4 && tavoloId <= 9) {
        this.minPersone = 3;
        this.maxPersone = 6;
      } else if (tavoloId >= 10 && tavoloId <= 15) {
        this.minPersone = 1;
        this.maxPersone = 2;
      }
    }
    this.persone = this.minPersone;
  }

}

