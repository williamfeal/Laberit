import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileModel } from 'src/app/models/file.model';
import { ProceduresService } from 'src/app/services/moges-services/procedures.service';
@Component({
  selector: 'app-adjuntar-documento',
  templateUrl: './adjuntar-doc.component.html',
  styleUrls: ['./adjuntar-doc.component.scss']
})
export class AdjuntarDocComponent implements OnInit {

  public fileList: FileModel[] = [];
  public tipo_empresa: string = "micro_empresa";
  public requi: boolean = true;
  @Output() public uploadFileDocument = new EventEmitter<FileModel[]>();

  public procedure;
  public formDocument: FormGroup;
  validate: boolean = false;


  constructor(private router: Router,
              private procedureService: ProceduresService,
              private cdRef:ChangeDetectorRef,
              private fb: FormBuilder) {

    this.procedureService.getProcedureById(sessionStorage.getItem('idProcedure')).subscribe(
      data => this.procedure = data
    )
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.loadedFileList.currentValue !== undefined) {
      this.fileList = changes.loadedFileList.currentValue;
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }
  // newForm() {
  //   this.formDocument = this.fb.group({
  //     documentNif: new FormGroup({}), //general
  //     documentHelp: new FormGroup({}), //general
  //     responsible_declaration: new FormGroup({}), //general
  //     distribution_by_year: new FormGroup({}), //general
  //     model_303: new FormGroup({}), //general
  //     model_347_: new FormGroup({}), //autonom
  //     model_RLC: new FormGroup({}), //autonom
  //     tax_returns: new FormGroup({}), //autonom
  //     self_assessment: new FormGroup({}), //autonom
  //     model_390: new FormGroup({}), //autonom
  //     society_constitution_micro: new FormGroup({}), //Micro
  //     beneficial_ownership_micro: new FormGroup({}),//Micro
  //     legal_representative_micro: new FormGroup({}),//Micro
  //     annual_accounts_micro: new FormGroup({}),//Micro
  //     _commercial_code_micro: new FormGroup({}),//Micro
  //     tax_returns_micro_micro: new FormGroup({}),//Micro
  //     model_390_micro_micro: new FormGroup({}),//Micro
  //     model_347_micro: new FormGroup({}), //Micro
  //     registered_office_micro: new FormGroup({}),//Micro
  //     business_group_micro: new FormGroup({}),//Micro
  //     PYME_micro: new FormGroup({}),//Micro
  //     society_constitution_PYME: new FormGroup({}),//PYME
  //     beneficial_ownership_PYME: new FormGroup({}), //PYME
  //     legal_representative_PYME: new FormGroup({}), //PYME
  //     annual_accounts_PYME: new FormGroup({}), //PYME
  //     _commercial_code_PYME: new FormGroup({}), //PYME
  //     tax_returns_PYME: new FormGroup({}), //PYME
  //     risk_inform_PYME: new FormGroup({}), //PYME
  //     model_390_PYME: new FormGroup({}), //PYME
  //     model_347_PYME: new FormGroup({}), //PYME
  //     registered_office_PYME: new FormGroup({}), //PYME
  //     business_group_PYME: new FormGroup({}), //PYME
  //     PYME: new FormGroup({}), //PYME
  //     tecnic_memory_PYME: new FormGroup({}), //PYME
  //     society_constitution_big: new FormGroup({}), //big_business
  //     beneficial_ownership_big: new FormGroup({}), //big_business
  //     legal_representative_big: new FormGroup({}), //big_business
  //     annual_accounts_big: new FormGroup({}), //big_business
  //     _commercial_code_big: new FormGroup({}), //big_business
  //     tax_returns_big: new FormGroup({}), //big_business
  //     risk_inform_big: new FormGroup({}), //big_business
  //     registered_office_big: new FormGroup({}), //big_business
  //     business_group_big: new FormGroup({}), //big_business
  //     PYME_big: new FormGroup({}), //big_business
  //     tecnic_memory_big: new FormGroup({}), //big_business
  //     society_constitution_community: new FormGroup({}), //Beneficits_community
  //     declarations_rent_community: new FormGroup({}), //beneficits_community 
  //     model_390_community: new FormGroup({}), //beneficits_community 
  //     model_184_entities_community: new FormGroup({}), //beneficits_community 
  //     voucher_pay_community: new FormGroup({}), //beneficits_community
  //     model_130_131_community: new FormGroup({}), //beneficits_community 
  //     model_347_community: new FormGroup({}), //beneficits_community 
  //     registered_office_community: new FormGroup({}), //beneficits_community
  //     society_constitution_civil: new FormGroup({}), //civil_society
  //     declarations_rent_civil: new FormGroup({}), //civil_society
  //     model_390_civil: new FormGroup({}), //civil_society
  //     model_184_entities_civil: new FormGroup({}), //civil_society
  //     voucher_pay_civil: new FormGroup({}), //civil_society
  //     model_130_131_civil: new FormGroup({}), //civil_society
  //     model_347_civil: new FormGroup({}), //civil_society
  //     registered_office_civil: new FormGroup({}), //civil_society
  //   });
  // }

  saveDocument(ev) {
    this.fileList.push(ev);
    console.log(this.fileList);
  }

  deleteDocument(ev) {
    const fileIndex = this.fileList.indexOf(ev);
    this.fileList.splice(fileIndex, 1);
  }

  public goToRequestInfo() {
    console.log(this.formDocument);
    console.log(this.formDocument.controls['documentNif'].value);
    //validar si estan todos los documentos
    this.router.navigate(['carpeta-del-ciudadano/firmar']);
    if (this.formDocument.valid) {
      console.log('ENTRA AL IF');
      
    } else {
      console.log('ENTRA else');
      this.validate = true;
    }
  }
}
