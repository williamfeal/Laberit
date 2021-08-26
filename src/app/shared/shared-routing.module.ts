import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccesibilityComponent } from "./footer/accesibility/accesibility.component";
import { HowElectronicCertificateComponent } from "./footer/how-electronic-certificate/how-electronic-certificate.component";
import { LegalWarningComponent } from "./footer/legal-warning/legal-warning.component";
import { TechnicalRequirementsComponent } from "./footer/technical-requirements/technical-requirements.component";

const routes:Routes = [
    { path: 'requisitos-tecnicos', component: TechnicalRequirementsComponent },
    { path: 'certificado-electronico', component: HowElectronicCertificateComponent },
    { path: 'accesibilidad', component: AccesibilityComponent },
    { path: 'aviso-legal', component: LegalWarningComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule {

}