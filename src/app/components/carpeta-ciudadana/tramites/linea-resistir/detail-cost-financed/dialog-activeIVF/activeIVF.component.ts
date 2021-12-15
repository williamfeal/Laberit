import { style } from "@angular/animations";
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-activeIVF',
    templateUrl: './activeIVF.component.html',
    styleUrls: ['./activeIVF.component.css']
  })
  export class ActiveIVF implements OnInit, OnChanges {

    ngOnChanges(changes: SimpleChanges): void {
        throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    constructor(
      public dialogRef: MatDialogRef<ActiveIVF>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    onCancel(): void {
      this.dialogRef.close();
    }

  }