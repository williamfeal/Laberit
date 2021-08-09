import { EntityModel } from "./entity.model";
import { IdAuxModel } from "./id-aux.model";
import { LenguageModel } from "./lenguages.model";

export class AdvertisementsModel {
    attachedDocument: string;
    author: string;
    description: string;
    entity: EntityModel;
    id: string;
    idAux: IdAuxModel[];
    languages: LenguageModel[];
    name: string;
    publicarEnSede: boolean;
    releaseDate: string;
    validDate: string;
  }