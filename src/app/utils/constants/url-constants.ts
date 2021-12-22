import { environment } from 'src/environments/environment';

export class UrlConstants {
    public static readonly ENDPOINT_CARPETA= '/carpeta-del-ciudadano'

    public static readonly VIEW_REQUEST_LIST = UrlConstants.ENDPOINT_CARPETA + '/requests-list';
    public static readonly VIEW_USER_IDENTIFICATION = UrlConstants.ENDPOINT_CARPETA + '/identificacion';
    
    public static readonly VIEW_TRANSACT = UrlConstants.ENDPOINT_CARPETA + '/transact';
    public static readonly VIEW_ADJUNTAR = UrlConstants.ENDPOINT_CARPETA + '/adjuntar';

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
    public static readonly ENDPOINT_STYLES = '/styles';
    public static readonly ENDPOINT_CALENDARS = '/calendars';
    public static readonly ENDPOINT_USER_LOGIN = '/login/validar'
    public static readonly ENDPOINT_LOGIN = '/login';
    public static readonly ENDPOINT_CLAVE = '/clave';
    public static readonly ENDPOINT_LOGGED_USER = '/getLoggedUser';
    public static readonly ENDPOINT_REFRESH_TOKEN = '/refreshToken';
    public static readonly ENDPOINT_DRAFT = '/draft';
    public static readonly ENDPOINT_DRAFTS = '/drafts';
    public static readonly ENDPOINT_CONCEPTS = '/concept'
    public static readonly ENDPOINT_GET_CONCEPT_BY_CODE = '/getConceptByCode';
    public static readonly ENDPOINT_GET_CATALOG_BY_CODE = '/getCatalogByCode';
    public static readonly ENDPOINT_GET_DRAFT_BY_ID = '/getDraftById';

    public static readonly ENDPOINT_REQUEST = '/api/v1/registro/crear/';
    public static readonly ENDPOINT_JUSTIFICANT = '/api/v1/registro/guardar/';
    public static readonly ENDPOINT_RECIBO = '/api/v1/registro/recibo/';
    public static readonly ENDPOINT_SOLICITUD = '/api/v1/registro/solicitud/';
    public static readonly ENDPOINT_TOKEN_VALIDAR = '/api/v1/login/validar';
    public static readonly ENDPOINT_REQUEST_LIST= '/api/v1/trex/solicitudes';

    public static readonly ENDPOINT_REPRESENTA_CAN_PROCEDURE = '/representa/puedeRealizarTramite';

    public static readonly ENDPOINT_BUSINESS_RULES = '/rule';
    public static readonly URL_REDIRECT_CLAVE = 'http://clave.apc.alfatecsistemas.es/SPClave/TokenServlet?urlvuelta=' + 
    environment.atencion_cliente_url + UrlConstants.API_SUFFIX + UrlConstants.ENDPOINT_LOGIN + UrlConstants.ENDPOINT_CLAVE + '?url=';

    public static readonly URL_ALFRESCO_GET_TEMPLATE = 'https://alfresco-tdgov.laberit.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/';    
}