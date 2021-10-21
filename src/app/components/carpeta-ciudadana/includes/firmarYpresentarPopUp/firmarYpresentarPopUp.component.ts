import Swal from 'sweetalert2';
import { AppUtils } from 'src/app/utils/app-utils';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-FirmarYPresentarPopUp',
    templateUrl: './firmarYpresentarPopUp.component.html',
    styleUrls: ['./firmarYpresentarPopUp.component.scss']
})
export class FirmarYPresentarPopUp implements OnInit {
    public documentBase64: string = "";
    public showButtons:boolean;
    public width;
    
    constructor(public appUtils: AppUtils,
        @Inject(MAT_DIALOG_DATA) data: any,
        private router: Router,
        public dialogRef: MatDialogRef<FirmarYPresentarPopUp>
    ) {
        this.documentBase64 = "data:application/pdf;base64," + data.base64;
        this.showButtons = data.showButtons;

    }

    ngOnInit(): void {
        
    }
    singAndPresent() {
        try{
        this.appUtils.signDocument(this.documentBase64).then((documentSinged) => {
            console.log('documentSinged :>> ', documentSinged);
            this.dialogRef.close(false);
            setInterval(() =>{
                this.router.navigate(['carpeta-del-ciudadano/confirmacion']);
            },3000);
            
        });
        }catch(e){
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
