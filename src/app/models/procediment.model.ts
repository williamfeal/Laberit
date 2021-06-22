import { Category } from "./category.model"
import { InfoProcediment } from "./info-procediment.model"

export class Procediment {
    id: number
	uuid: string
    name: string
    status: boolean 
    publicado:  boolean 
    category : Category
    infoprocedimiento : InfoProcediment
    tramitarElectronicamente:  boolean
}