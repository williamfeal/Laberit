import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';
import { catchError, isEmpty, takeUntil } from 'rxjs/operators';
import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
    } from '@angular/core';
import { ConceptConstants } from 'src/app/utils/constants/concept-constants';
import { deleteDocument, saveDocument } from '../AppUtils.component';
import { DocumentsType } from 'src/app/shared/form/fields/input-document/input-document';
import { FileModel } from 'src/app/models/file.model';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { isEmptyObject } from 'jquery';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-autonoms',
    templateUrl: './autonoms.component.html',
    styleUrls: ['./autonoms.component.scss']
})
export class AutonomsComponent implements OnInit, OnChanges {
    @Input() formAdjuntarDocAuto: FormGroup;
    @Input() fileListAu: FileModel[] = [];
    @Input() validate: boolean;
    @Input() draft:any;
    @Input() readOnly: boolean;
    public urlPlantilla: string = '';
    public draftAutonomus;
    public validCodes: boolean[] = [];
    public documentsTypeAutonoms: DocumentsType;
    public collapse:boolean = true;
    public collapse2:boolean = false;

    public mandatoryDocs: any = [];
    public optionalDocs: DocumentsType[];

    public codes: string[] = [];
    public arrayUrls: string[] = [];
    private unsubscribe$ = new Subject<void>();
    constructor(public catalogService: CatalogsService) { }

    ngOnInit(): void {
        this.getMandatoryDocs();
        this.getOptionalDocs();
    }
 
   async getTemplates(concept: any){
        this.catalogService.getCatalogByCodePlantilla(concept.concept_code).subscribe((data)=>{
            concept.descriptionPlantilla = data[0].description;    
        },  err => {
            concept.descriptionPlantilla = ''
        })
    }

    // se crea un json con los tipos de documentos para cada idioma y se valida con el consumo
    // del servicio el idioma actual, luego se envia a la variable los datos creados
    // autor: @william
    private getMandatoryDocs() {
        let arrayDocs = [
        ]
         this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_AUTONOMOUS_MANDATORY_DOCUMENTS).pipe(
             takeUntil(this.unsubscribe$)
         ).subscribe(
             data => {  
                 data.forEach(element => {
                     this.getTemplates(element);    
                 });
                 const docs: any = data;
                 if(docs.length > 0){
                     if(docs[0].description.includes('targeta')){
                        arrayDocs = [
                            {
                                concept_code: 'document-type-bill-water',
                                active: true,
                                description: "factura d'aigua",
                                descriptionPlantilla: ''
                            },
                            {
                                concept_code: 'document-type-reparation_date',
                                active: true,
                                description: 'factura reparació fuga',
                                descriptionPlantilla: ''
                            },
                            {
                                concept_code: 'document-type-certification',
                                active: true,
                                description: "Certificació de l'empresa subministradora amb historial de consums (historial de lectures)",
                                descriptionPlantilla: ''
                            },
                            {
                                concept_code: 'document-type-other',
                                active: true,
                                description: 'altres',
                                descriptionPlantilla: ''
                            }
                        ]
                     }else{
                        arrayDocs = [
                            {
                                concept_code: 'document-type-bill-water',
                                active: true,
                                description: 'Factura/s agua',
                                descriptionPlantilla: ''
                            },
                            {
                                concept_code: 'document-type-reparation_date',
                                active: true,
                                description: 'Factura/s reparación fuga',
                                descriptionPlantilla: ''
                            },
                            {
                                concept_code: 'document-type-certification',
                                active: true,
                                description: 'Certificación de la empresa suministradora con historial de consumos(historial de lecturas)',
                                descriptionPlantilla: ''
                            },
                            {
                                concept_code: 'document-type-other',
                                active: true,
                                description: 'Otros',
                                descriptionPlantilla: ''
                            }
                        ]
                     }
                 }
                 this.mandatoryDocs = arrayDocs;
                 console.log(this.mandatoryDocs)
             }
         )
    }

    private getOptionalDocs() {
        this.catalogService.getCatalogByCode(ConceptConstants.LINEA_RESISTIR_AUTONOMOUS_OPTIONAL_DOCUMENTS).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            data => {  
                data.forEach(element => {
                    this.getTemplates(element);    
                });
                this.optionalDocs = data; 
            }
        )
    }
    
    ngOnChanges(changes:SimpleChanges) {
        if(changes.draft && !isEmptyObject(this.draft) && !isEmptyObject(this.draft.autonomous)) {
            this.draftAutonomus = this.draft
        }
    }

    saveDocument(ev) {
        this[ev.controlName] = false;
        saveDocument(this.fileListAu, ev);
    }

    deleteDocument(ev) {
        this[ev.controlName] = true;
        deleteDocument(this.fileListAu, ev);
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
  
}
