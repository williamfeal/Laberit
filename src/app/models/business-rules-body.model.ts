
export class BusinessRuleBody {

}
export class BusinessRuleBodyLineaResistir extends BusinessRuleBody {
    autonomoMicroEmp: boolean
    importe: number
    g1terrenos: number
    g1inmuebles: number
    g1maquinaria: number
    g1instalaciones: number
    g1otros: number
    recursosPropios: number
    subvenciones: number
    otraFinBancaria: number
    activoIVF: number
    g2importeFinanciarCirculante: number
    g2financiacionIVF: number
    porcentaje: number
    g3inversionActivosFijos: number
    g3inversionActivoCirculante: number
    g3totalPrestamo: number
    tipoProyecto: string
}

export class BusinessRuleBodyCompanyType extends BusinessRuleBody {
    tipoEmpresa:string
    activo:number
    cifraNegocio:number
    numEmpleados:number
}

export class BusinessRuleBodyAddress extends BusinessRuleBody {
    paisLocalidadProyecto:string
    provinciaLocalidadProyecto:string
    paisDomicilioSocial:string
    provinciaDomicilioSocial:string
}