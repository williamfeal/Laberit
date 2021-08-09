import { environment } from "src/environments/environment";

export class UrlConstants {
    public static readonly VIEW_REQUEST_LIST = 'carpeta-del-ciudadano/requests-list';
    public static readonly VIEW_USER_IDENTIFICATION = 'carpeta-del-ciudadano/identificacion';
    
    public static readonly VIEW_TRANSACT = '/carpeta-del-ciudadano/transact';

    /* API */
    public static readonly API_SUFFIX = '/api/v1'
    public static readonly ENDPOINT_UTIL = '/utils'
    public static readonly ENDPOINT_WEATHER = '/weather'
    public static readonly ENDPOINT_TOKEN = '/token'

    public static readonly ENDPOINT_ADVERTISEMENTS = '/noticeboards';
    public static readonly ENDPOINT_CATEGORIES = '/categories';
    public static readonly ENDPOINT_CATEGORIES_BY_STATE = '/categories?filterByState=true';
    public static readonly ENDPOINT_PROCEDURES = '/procedures';
    public static readonly ENDPOINT_LANGUAGES = '/i18n';
    public static readonly ENDPOINT_STYLES = '/styles'
    public static readonly ENDPOINT_USER_LOGIN = '/login/validar'
    public static readonly ENDPOINT_LOGIN = '/login';
    public static readonly ENDPOINT_CLAVE = '/clave';
    public static readonly ENDPOINT_LOGGED_USER = '/getLoggedUser';

    public static readonly URL_REDIRECT_CLAVE = 'http://clave.apc.alfatecsistemas.es/SPClave/TokenServlet?urlvuelta=' + 
        environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_CLAVE + '?url=';
}