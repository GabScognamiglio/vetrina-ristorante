import { Tavolo } from "./tavolo";

export interface Prenotazione {
    id: number,
    tavolo: Tavolo,
    data: Date,
    ora: string,
    persone: number,
    nome: string,
    email: string,
    numeroTel: string
}
