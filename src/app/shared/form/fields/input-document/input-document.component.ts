import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FileModel } from 'src/app/models/file.model';
import { AppConstants } from 'src/app/utils/constants/app-constants';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-input-document',
    templateUrl: './input-document.component.html',
    styleUrls: ['./input-document.component.scss']
})
export class InputDocumentComponent implements OnInit {

    @Input() form: FormGroup = new FormGroup({});
    @Input() label: string = '';
    @Input() idValue!: string;
    @Input() isRequired!: boolean;
    @Input() idPlantilla!: string;
    @Input() fileExtension: string
    @Input() errorText: string
    @Input() error!: boolean;

    @Output() public uploadFileDocument = new EventEmitter<FileModel>();
    @Output() public deleteFileDocument = new EventEmitter<FileModel>();

    validaciones: ValidatorFn[] = [];
    popUpError;
    textError: string;

    document: FileModel;
    documentExist: boolean = false;
    private fileReader = new FileReader();
    docBase64: string;
    constructor(private translateService: TranslateService) { }

    ngOnInit(): void {
        let formControl;
        //Hay que ver como hacer que sean campos requeridos
        if (this.isRequired) {
            formControl = new FormControl([],Validators.required);
        }else{
            formControl = new FormControl([]);
        }
        if (this.validaciones.length > 0) {
            formControl.setValidators(Validators.required);
            console.log('this.formControl :>> ', formControl);
        }
        this.form.addControl(this.idValue, formControl);
        console.log('this.form :>> ', this.form);

        //habr� que llamar con el idPlantilla al back para que nos de el documento a descargar
        // this.idPlantilla;
        // this.docBase64
    }

    ngOnChanges() {
        this.translateService.get('error_texts.input.' + this.errorText).subscribe(
            text => {
                this.textError = text;
            }
        )
        this.translateService.get('error_texts.pop_up').subscribe(
            text => {
                this.popUpError = text;
            })
    }

    public uploadFile(event: any): void {
        let error = 0;
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
        this.deleteFileDocument.emit(this.document);
        this.documentExist = false;
    }

    verPlantilla() {
        //matizar el tipo de documento que es (typeDoc)

        // const byteArray = new Uint8Array(atob(this.docBase64).split('').map(char => char.charCodeAt(0)));
        // const byte = new Blob([byteArray], { type: typeDoc });
        // const urlPdf = URL.createObjectURL(byte);
        // window.open(urlPdf, '_blank');
    }

}

