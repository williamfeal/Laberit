import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConoceLaSedeComponent } from "./conoce-la-sede.component";



const routes:Routes = [
    { path: 'conoce-la-sede', component: ConoceLaSedeComponent },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConoceSedeRoutingModule {

}