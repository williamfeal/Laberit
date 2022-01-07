export class Notification {
    canalEnvio: string
    concepto: string
    envioDestinatario: string
    estado: string
    fechaActualizacion: string
    fechaCreacion: string
    nombreOrganismoRemisor: string
    organismoRemisor: string
    tipoEnvio: string
    vinculo: string
    destinatarios:DestinatariesNotification
    documento: NotificationDoc
    fechaEnvioProgramado: string
    organismoEmisor: OrganismoEmisor
    organismoPagadorCie: string
    organismoPagadorCorreos: string
    procedimiento: NotificationProcedure
}

export class NotificationDoc {
    contenido:string
    generarCsv:string
    hashSha1:string
    normalizado:string
}

export class OrganismoEmisor {
    codigoDir3:string
    nombre:string
}

export class NotificationProcedure {
    codigoSia:string
    descripcionSia:string
}

export class DestinatariesNotification {
    item:DestinataryNotification[]
}

export class DestinataryNotification {
    destinatario:PersonaModel
    referenciaEmisor:string
    direccionElectronica: string
    domicilio: string
    opcionesEmision: string
    servicio: string
    tipoDomicilio: string
    titular:PersonaModel
}

export class PersonaModel {
    telefono:string
    email:string
    nif:string
    nombre:string
    apellidos:string
}