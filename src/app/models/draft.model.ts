export class Draft {
    key?:string
    nif:string
    desc:string
    info:string
    fecha?:string
    linea:string
    producto:string
    idInfo:string;
    nombre: string;

    constructor(nif:string, desc:string, info:string, linea:string, producto:string, idInfo:string,nombre: string, key?:string, fecha?:string, ) {
        this.key = key;
        this.nif = nif;
        this.desc = desc;
        this.info = info;
        this.fecha = fecha;
        this.linea = linea;
        this.producto = producto;
        this.idInfo = idInfo;
        this.nombre = nombre
    }
}