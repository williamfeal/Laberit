import Swal from 'sweetalert2';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
    } from '@angular/core';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import { FileModel } from 'src/app/models/file.model';
import {
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators
    } from '@angular/forms';
import { isEmptyObject } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CatalogsService } from 'src/app/services/catalogs/catalogs.service';

@Component({
    selector: 'app-input-document',
    templateUrl: './input-document.component.html',
    styleUrls: ['./input-document.component.scss']
})
export class InputDocumentComponent implements OnInit, OnChanges {

    @Input() form: FormGroup = new FormGroup({});
    @Input() label: string = '';
    @Input() idValue!: string;
    @Input() isRequired!: boolean;
    @Input() idplantilla!: string;
    @Input() fileExtension: string;
    @Input() errorText: string;
    @Input() controlName!: string;
    @Input() error!: boolean;
    @Input() set draft(draft) {
        if(!isEmptyObject(draft) && !isEmptyObject(draft[this.controlName])) {
            this.documentExist = true;
            this.document = new FileModel(draft[this.controlName]);
        }  
    }
    public _draft;

    @Output() public uploadFileDocument = new EventEmitter<FileModel>();
    @Output() public deleteFileDocument = new EventEmitter<FileModel>();

    validaciones: ValidatorFn[] = [];
    popUpError;
    textError: string;

    private unsubscribe$ = new Subject<void>();
    private formControl:FormControl;

    document: FileModel;
    documentExist: boolean = false;
    private fileReader = new FileReader();
    docBase64: string;
    constructor(private translateService: TranslateService,
        public catalogService: CatalogsService) { }

    ngOnInit(): void {
        //Hay que ver como hacer que sean campos requeridos
        if (this.isRequired) {
            this.formControl = new FormControl([],Validators.required);
        } else {
            this.formControl = new FormControl([]);
        }
        if (this.validaciones.length > 0) {
            this.formControl.setValidators(Validators.required);
        }
        this.form.addControl(this.idValue, this.formControl);
        this.formControl.setValue(this.document?.naturalName);
        //habr� que llamar con el idPlantilla al back para que nos de el documento a descargar
        // this.idPlantilla;
        // this.docBase64
    }

    ngOnChanges(changes:SimpleChanges) {
        this.translateService.get('error_texts.input.' + this.errorText).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            text => {
                this.textError = text;
            }
        )
        this.translateService.get('error_texts.pop_up').pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(
            text => {
                this.popUpError = text;
            })
    }

    public uploadFile(event: any): void {
        let error = 0;
        console.log(event);
        const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
        const fileExtension = file.name.split('.').pop();
        const fileExtensionAllowed = this.fileExtension.split(',.');
        fileExtensionAllowed.shift();
        fileExtensionAllowed.forEach(element => {
            if (!file.name || element == fileExtension) {
                error++;
            }
        });
        if (error != 1) {
            Swal.fire(this.popUpError.format_error.title, this.popUpError.format_error.text + fileExtensionAllowed.toString(), 'info').then();
            return;
        }

        if (file.size > AppConstants.FILE_SIZE_NUMBER) {
            Swal.fire(this.popUpError.size_error.title, this.popUpError.size_error.text + AppConstants.FILE_SIZE_TEXT, 'info').then();
            return;
        }

        this.fileReader.readAsDataURL(file);
        this.fileReader.onload = () => {
            const newFile = new FileModel(file.name);
            newFile.base64 = this.fileReader.result?.toString().split(',')[1];
            newFile.controlName = this.idValue;
            this.documentExist = true;
            this.document = newFile;
            this.uploadFileDocument.emit(this.document);
        };
    }

    deleteFile() {
        this.formControl.setValue('');
        this.deleteFileDocument.emit(this.document);
        this.documentExist = false;
    }

    verPlantilla(id: string) {
        //matizar el tipo de documento que es (typeDoc)

        // const byteArray = new Uint8Array(atob(this.docBase64).split('').map(char => char.charCodeAt(0)));
        // const byte = new Blob([byteArray], { type: typeDoc });
        // const urlPdf = URL.createObjectURL(byte);
        // window.open(urlPdf, '_blank');
        this.catalogService.prueba(id).subscribe((data)=>{
            console.log(data);
        });
    }

    ngOnDestroy(): void {
       this.unsubscribe$.next();
       this.unsubscribe$.complete();
    }
}

