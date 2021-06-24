import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transact-procediment',
  templateUrl: './transact-procediment.component.html',
  styleUrls: ['./transact-procediment.component.scss']
})
export class TransactProcedimentComponent implements OnInit {

  public transaction_url;

  constructor(
    private activatedRoute:ActivatedRoute,
    private proceduresService:ProceduresService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.idProcedure;
    
    this.transaction_url = environment.carpeta_url + '/solicitudes?proc=' + id;
    let iframe_carpeta =  document.getElementById("iframe-transact");
    iframe_carpeta.setAttribute("src", this.transaction_url);
    this.proceduresService.getTransactionRequest();
  }

}
