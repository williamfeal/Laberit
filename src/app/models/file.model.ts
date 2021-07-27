export class FileModel {

    icon: string;
    base64?: string;
    base64Content?: string;
    eliminado?: boolean;
    idDocumento?: number;
    idInt?: number;
    naturalName: string;
    idInside: string;
  
    constructor( name?: string, icon?: string ) {
      this.naturalName = name;
      this.icon = icon;
    }
  
  }