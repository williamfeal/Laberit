import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractorProfileComponent } from "./contractor-profile.component";


const routes:Routes = [
    { path: 'perfil-de-contratante', component: ContractorProfileComponent},

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContractorProfileRoutingModule {

}