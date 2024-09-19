import { Component } from '@angular/core';

@Component({
  selector: 'app-mappa-tavoli',
  templateUrl: './mappa-tavoli.component.html',
  styleUrls: ['./mappa-tavoli.component.scss']
})
export class MappaTavoliComponent {

  selectedTable: number | null = null;

  tables = [
    {
      id: 1,
      x: 50, y: 50,
      width: 100, height: 50,
      available: true,
      chairs: [
        { cx: 40, cy: 40 }, // Sedia sinistra
        { cx: 110, cy: 40 }, // Sedia destra
        { cx: 75, cy: 30 }, // Sedia sopra
        { cx: 75, cy: 80 }  // Sedia sotto
      ]
    },
    {
      id: 2,
      x: 200, y: 50,
      width: 100, height: 50,
      available: false,
      chairs: [
        { cx: 190, cy: 40 },
        { cx: 260, cy: 40 },
        { cx: 225, cy: 30 },
        { cx: 225, cy: 80 }
      ]
    },
    {
      id: 3,
      x: 350, y: 50,
      width: 100, height: 50,
      available: true,
      chairs: [
        { cx: 340, cy: 40 },
        { cx: 410, cy: 40 },
        { cx: 375, cy: 30 },
        { cx: 375, cy: 80 }
      ]
    }
  ];

  // Seleziona un tavolo quando viene cliccato
  selectTable(tableId: any) {
    this.selectedTable = tableId;
    console.log('Tavolo selezionato:', tableId);
  }
}
