export const IF_PROBLEM_PERSIST = ', si el problema persiste contacte con el administrador.';
export const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export class AppConstants {
    public static readonly TITLE_ERROR = 'Error';
    public static readonly ERROR_LOAD_WEATHER = 'Ha habido un error obteniendo el tiempo' + IF_PROBLEM_PERSIST;
    public static readonly ERROR_LOAD_CATEGORIES = 'Ha habido un error obteniendo las categorías' + IF_PROBLEM_PERSIST;
}
export const selectMeans = [{
    id: '1',
    val: 'Electrónico',
    selected: false
  }, {
    id: '2',
    val: 'Papel',
    selected: false
  }];
