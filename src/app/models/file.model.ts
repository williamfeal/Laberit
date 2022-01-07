export class FileModel {

  icon: string;
  base64?: string;
  base64Content?: string;
  eliminado?: boolean;
  idDocumento?: number;
  idInt?: number;
  naturalName: string;
  idInside: string;
  controlName?: string;

  constructor(name?: string) {
    this.naturalName = name;
  }

}