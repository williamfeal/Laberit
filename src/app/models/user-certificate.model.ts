import { UserDatosRepresentante } from "./user-representative-data.model"

export class UserCertificado {
    tipoCertificado:string
    subject:string
    politica:string
    numeroSerie:string
    idEmisor:string
    email:string
    validoHasta:string
    clasificacion:number
    nifTitular:string
    nombreTitular:string
    apellidosTitular:string
    datosRepresentante:UserDatosRepresentante    
}