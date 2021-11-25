import Swal from 'sweetalert2';
import { AppUtils } from 'src/app/utils/app-utils';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Procedure } from 'src/app/models/procedure.model';
import { DraftsService } from 'src/app/services/acli-service/drafts.service';
import { Draft } from 'src/app/models/draft.model';
import { FileModel } from 'src/app/models/file.model';

@Component({
  selector: 'app-FirmarYPresentarPopUp',
  templateUrl: './firmarYpresentarPopUp.component.html',
  styleUrls: ['./firmarYpresentarPopUp.component.scss']
})
export class FirmarYPresentarPopUp implements OnInit {
  public documentBase64: string = "";
  public showButtons: boolean;
  public width;
  private unsubscribe$ = new Subject<void>();
  public procedure;
  public fileList = [];
  public draft: Draft;
  public draftAdjuntarDoc;
  constructor(public appUtils: AppUtils,
    @Inject(MAT_DIALOG_DATA) data: any,
    private router: Router,
    private procedureService: ProceduresService,
    public dialogRef: MatDialogRef<FirmarYPresentarPopUp>,
    private activatedRoute: ActivatedRoute,
    private draftService: DraftsService,

  ) {
    this.documentBase64 = "data:application/pdf;base64," + data.base64;
    this.showButtons = data.showButtons;

  }

  ngOnInit(): void {
    this.fileList = JSON.parse(localStorage.getItem('documents'));
    console.log(this.fileList);
    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (data: Procedure) => {
        this.procedure = data;
        this.getDraft();

      })
  }
  private getDraft() {
    if (this.activatedRoute.snapshot.queryParams.draft) {
      this.draftService.getDraftById(this.activatedRoute.snapshot.queryParams.draft + ':forms:documents').subscribe(
        (data: Draft) => {
          if (data !== null) {
            this.draft = data;
            this.draftAdjuntarDoc = JSON.parse(data.info);
            this.fileList = this.draftAdjuntarDoc;
          } else {
            this.setDraft();
          }
        },
        () => this.setDraft()
      )
    }
  }
  private setDraft() {
    const info = { idProcedure: sessionStorage.getItem('idProcedure') };
    const infoProcedure = this.procedure.languages.find(
      language => language.codigo === localStorage.getItem('lang')
    );
    this.draft = new Draft(sessionStorage.getItem('nifTitular'), 'Borrador', JSON.stringify(info), this.procedure.category.name, infoProcedure.name,
      'info', this.activatedRoute.snapshot.queryParams.draft);
  }
  singAndPresent() {
    try {
      this.appUtils.signDocument(this.documentBase64).then((documentSinged) => {
        //this.dialogRef.close(false);
        const objSigned = {
          naturalName: 'signedDocument.pdf',
          base64: documentSinged,
          controlName: 'signedDocument'
        };
        this.fileList.push(objSigned)
        console.log(this.fileList);
        const draft: Draft = new Draft(sessionStorage.getItem('nifTitular'), 'BORRADOR', JSON.stringify(this.fileList), this.procedure.category.name,
          this.draft.producto, 'forms:documents', this.draft.key, '');

        this.draftService.saveDraft(draft).subscribe(
          () => this.router.navigate(['carpeta-del-ciudadano/confirmacion'], {
            queryParams: { draft: this.draft.key }
          })
        )

      });
    } catch (e) {
      Swal.fire('Error', 'En la firma del documento', 'info');

      Swal.update({
        icon: 'error'
      })
    }


  }
  close(): void {
    this.dialogRef.close(false);
  }
}
