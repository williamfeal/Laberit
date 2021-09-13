import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppUtils } from 'src/app/utils/app-utils';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-FirmarYPresentarPopUp',
    templateUrl: './firmarYpresentarPopUp.component.html',
    styleUrls: ['./firmarYpresentarPopUp.component.scss']
})
export class FirmarYPresentarPopUp implements OnInit {
    public documentBase64: string = "";
    public width;
    
    constructor(public appUtils: AppUtils,
        @Inject(MAT_DIALOG_DATA) data: any,
        private router: Router,
        public dialogRef: MatDialogRef<FirmarYPresentarPopUp>
    ) {
        this.documentBase64 = "data:application/pdf;base64," + dialogRef._containerInstance._config.data.base64;
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
