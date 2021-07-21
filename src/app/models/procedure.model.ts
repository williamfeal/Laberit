import { Category } from "./category.model"
import { InfoProcedure } from "./info-procedure.model"

export class Procedure {
    id: number
	uuid: string
    name: string
    status: boolean 
    publicado:  boolean 
    category : Category
    languages : InfoProcedure[]
    tramitacionElectronica:  boolean
}