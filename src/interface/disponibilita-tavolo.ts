export interface DisponibilitaTavolo {
    disponibilita: {
      '13:00': boolean;
      '14:30': boolean;
      '18:00': boolean;
      '20:00': boolean;
      '21:30': boolean;
    };
    id: number;
    isAvailable: boolean;
  }