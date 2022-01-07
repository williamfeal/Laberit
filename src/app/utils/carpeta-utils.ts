import { UserCertificado } from "../models/user-certificate.model";

export class CarpetaUtils {
    constructor() { }

    public isAuthenticated() {
        return sessionStorage.getItem('nifTitular') !== null;
    }

    public saveSession(data: UserCertificado) {
        sessionStorage.setItem('nifTitular', data.nifTitular);
        sessionStorage.setItem('nombreTitular', data.nombreTitular);
        sessionStorage.setItem('apellidosTitular', data.apellidosTitular);
        sessionStorage.setItem('email', data.email);
    }
    
    public getSession(): UserCertificado {
        let user = new UserCertificado();
        user.apellidosTitular = sessionStorage.getItem('apellidosTitular');
        user.nombreTitular = sessionStorage.getItem('nombreTitular');
        user.nifTitular = sessionStorage.getItem('nifTitular');
        user.email = sessionStorage.getItem('email');

        return user;
    }
    
}