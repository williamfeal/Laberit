import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocumentVerificationComponent } from "./document-verification/document-verification.component";
import { ElectronicInvoiceComponent } from "./electronic-invoice/electronic-invoice.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { ValideComponent } from "./valide/valide.component";


const routes:Routes = [
    { path: 'validacion', component: ValideComponent },
    { path: 'factura-electronica', component: ElectronicInvoiceComponent },
    { path: 'verifirma', component: DocumentVerificationComponent },
    { path: 'notificaciones', component: NotificationsComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ElectronicServicesRoutingModule {

}