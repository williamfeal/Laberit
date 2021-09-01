import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppUtils } from 'src/app/utils/app-utils';

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
        public dialogRef: MatDialogRef<FirmarYPresentarPopUp>
    ) {
        this.documentBase64 = "data:application/pdf;base64," + dialogRef._containerInstance._config.data.base64;
    }

    ngOnInit(): void {
        
    }
    singAndPresent() {
        this.appUtils.signDocument(this.documentBase64).then((documentSinged) => {
            console.log('documentSinged :>> ', documentSinged);
        });
    }
    close(): void {
        this.dialogRef.close(false);
    }
}
