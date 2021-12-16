import { style } from "@angular/animations";
import { Component, Inject, OnInit, SimpleChanges } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-aceptation',
    templateUrl: './data-protection.component.html',
    styleUrls: ['./data-protection.component.css']
  })
  export class Aceptation implements OnInit {

    ngOnInit(): void {
    }

    constructor(
      public dialogRef: MatDialogRef<Aceptation>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    onCancel(): void {
      this.dialogRef.close();
    }

  }