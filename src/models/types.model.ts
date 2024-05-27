export type Segnalazione = {
    id?: number,
    dataOra: Date,
    cliente: Cliente,
    tecnico: Tecnico
}

export type Cliente = {
    id?: number,
    nome: string,
    cognome: string,
    email: string,
    telefono: string
}

export type Tecnico = {
    id?: number,
    nome: string,
    cognome: string,
    email: string,
    telefono: string,
    dataAssunzione: Date,
    specializzazione: string
}