import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/services/guards/auth-guard.service";
import { AceptationComponent } from "./aceptation/aceptation.component";
import { CarpetaCiudadanaComponent } from "./carpeta-ciudadana.component";
import { AdjuntarDocComponent } from "./includes/adjuntar-documento/adjuntar-doc.component";
import { ConfirmacionSolicitudComponent } from "./includes/confirmacion-solicitud/confirmacion-solicitud.component";
import { PresentarSolicitudComponent } from "./includes/presentar-solicitud/presentar-solicitud.component";
import { RequestsListComponent } from "./requests-list/requests-list.component";
import { InstanciaGeneralComponent } from "./tramites/instancia-general/instancia-general.component";
import { LineaResistirComponent } from "./tramites/linea-resistir/linea-resistir.component";
import { UserIdentificationComponent } from "./user-identification/user-identification.component";


const routes:Routes = [
    { path: 'carpeta-del-ciudadano', component: CarpetaCiudadanaComponent },
  { path: 'carpeta-del-ciudadano/transact/:idProcedure', component: CarpetaCiudadanaComponent },
  { path: 'carpeta-del-ciudadano/identificacion', 
    component: UserIdentificationComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.breadcrumb.applicant', url: '', terminal: true }
    ]},
  },
  { path: 'carpeta-del-ciudadano/requests-list', 
    component: RequestsListComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false },
      { title: 'carpeta_ciudadana.requests-list.title', url: '', terminal: true } 
    ]}
    },
    { path: 'carpeta-del-ciudadano/instancia-general', 
    component: InstanciaGeneralComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.breadcrumb.applicant', url: '/carpeta-del-ciudadano/identificacion', idProcedure: true, terminal: false },
      { title: 'carpeta_ciudadana.breadcrumb.my_request', url: '', terminal: true }
    ]}
    },
    { path: 'carpeta-del-ciudadano/linea-resistir', 
    component: LineaResistirComponent, 
    canActivate: [AuthGuardService],
    data: {
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.breadcrumb.applicant', url: '/carpeta-del-ciudadano/identificacion', idProcedure: true, terminal: false },
      { title: 'carpeta_ciudadana.breadcrumb.my_request', url: '', terminal: true }
    ]}
    },
    { path: 'carpeta-del-ciudadano/adjuntar', 
    component: AdjuntarDocComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.breadcrumb.applicant', url: '/carpeta-del-ciudadano/identificacion', idProcedure: true, terminal: false },
      { title: 'carpeta_ciudadana.breadcrumb.my_request', url: '/carpeta-del-ciudadano', my_request: true, terminal: false },
      { title: 'carpeta_ciudadana.instance.docAdd', url: '', terminal: true },
    ]},
  },
  { path: 'carpeta-del-ciudadano/aceptacion', 
    component: AceptationComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.breadcrumb.applicant', url: '/carpeta-del-ciudadano/identificacion', idProcedure: true, terminal: false },
      { title: 'carpeta_ciudadana.breadcrumb.my_request', url: '/carpeta-del-ciudadano',  my_request: true, terminal: false },
      { title: 'carpeta_ciudadana.instance.docAdd', url: '/carpeta-del-ciudadano/adjuntar', terminal: false },
      { title: 'carpeta_ciudadana.aceptation.title', url: '', terminal: true }
    ]},
  },
  { path: 'carpeta-del-ciudadano/firmar', 
    component: PresentarSolicitudComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.title', url: '/inicio', terminal: false }, 
      { title: 'carpeta_ciudadana.breadcrumb.applicant', url: '/carpeta-del-ciudadano/identificacion', idProcedure: true, terminal: false },
      { title: 'carpeta_ciudadana.instance.title', url: '/carpeta-del-ciudadano', my_request: true, terminal: false },
      { title: 'carpeta_ciudadana.instance.docAdd', url: 'carpeta-del-ciudadano/adjuntar', terminal: false },
      { title: 'carpeta_ciudadana.instance.presentarSolicitud', url: '', terminal: true },
    ]},
  },

  { path: 'carpeta-del-ciudadano/confirmacion', 
    component: ConfirmacionSolicitudComponent, 
    canActivate: [AuthGuardService],
    data: { 
      menu : false,
      breadcrumb:  [
      { title: 'carpeta_ciudadana.instance.presentarSolicitud', url: 'carpeta-del-ciudadano/firmar', terminal: false },
      { title: 'carpeta_ciudadana.confirmation.title', url: '', terminal: true },
    ]},
  }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarpetaCiudadanaRoutingModule {

}