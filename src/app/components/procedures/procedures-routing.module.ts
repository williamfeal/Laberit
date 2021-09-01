import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProcedureDetailComponent } from "./procedure-detail/procedure-detail.component";
import { ProceduresSearchComponent } from "./procedures-search/procedures-search.component";
import { ProceduresComponent } from "./procedures.component";


const routes:Routes = [
    { path: 'areas', component: ProceduresComponent },
    { path: 'catalogo-de-procedimientos', component: ProceduresSearchComponent },
    { path: 'categories/:idCategory', component: ProceduresComponent},
    { path: 'procedures/:idProcedure', component: ProcedureDetailComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProceduresRoutingModule {

}