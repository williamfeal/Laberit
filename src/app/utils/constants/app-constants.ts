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
  export const paises = [{
    id: '1',
    val: 'España',
    selected: false
  }];
  export const typeStreet = [{
    id: '1',
    val: 'Calle',
    selected: true
  }, {
    id: '2',
    val: 'Avenida',
    selected: false
  }, {
    id: '3',
    val: 'Plaza',
    selected: false
  }, {
    id: '4',
    val: 'Paseo',
    selected: false
  }, {
    id: '5',
    val: 'Camino',
    selected: false
  }, {
    id: '6',
    val: 'Rambla',
    selected: false
  }, {
    id: '7',
    val: 'Pasaje',
    selected: false
  }];
  export const comunidades = [
    {
      id: '1',
      val: 'Andalucía',
      selected: false
    },
    {
      id: '2',
      val: 'Aragón',
      selected: false
    },
    {
      id: '3',
      val: 'Principado de Asturias',
      selected: false
    },
    {
      id: '4',
      val: 'Illes Balears',
      selected: false 
    },
    {
      id: '5',
      val: 'Canarias',
      selected: false
    },
    {
      id: '6',
      val: 'Cantabria',
      selected: false
    },
    {
      id: '7',
      val: 'Castilla y León',
      selected: false
    },
    {
      id: '8',
      val: 'Castilla-La Mancha',
      selected: false
    },
    {
      id: '9',
      val: 'Cataluña',
      selected: false
    },
    {
      id: '10',
      val: 'Comunitat Valenciana',
      selected: false
    },
    {
      id: '11',
      val: 'Extremadura',
      selected: false
    },
    {
      id: '12',
      val: 'Galicia',
      selected: false
    },
    {
      id: '13',
      val: 'Comunidad de Madrid',
      selected: false
    },
    {
      id: '14',
      val: 'Región de Murcia',
      selected: false
    },
    {
      id: '15',
      val: 'Comunidad Foral de Navarra',
      selected: false
    },
    {
      id: '16',
      val: 'País Vasco',
      selected: false
    },
    {
      id: '17',
      val: 'La Rioja',
      selected: false
    },
    {
      id: '18',
      val: 'Ciudad Autónoma de Ceuta',
      selected: false
    },
    {
      id: '19',
      val: 'Ciudad Autónoma de Melilla',
      selected: false
    }
  ];
  export const provincias = [
    {
      id: '1',
      val: 'Álava',
      selected: false
    },
    {
      id: '2',
      val: 'Albacete',
      selected: false
    },
    {
      id: '3',
      val: 'Alacant/Alicante',
      selected: false
    },
    {
      id: '4',
      val: 'Almería',
      selected: false
    },
    {
      id: '5',
      val: 'Ávila',
      selected: false
    },
    {
      id: '6',
      val: 'Badajoz',
      selected: false
    },
    {
      id: '7',
      val: 'Illes Balears',
      selected: false
    },
    {
      id: '8',
      val: 'Barcelona',
      selected: false
    },
    {
      id: '9',
      val: 'Burgos',
      selected: false
    },
    {
      id: '10',
      val: 'Cáceres',
      selected: false
    },
    {
      id: '11',
      val: 'Cádiz',
      selected: false
    },
    {
      id: '12',
      val: 'Castelló/Castellón',
      selected: false
    },
    {
      id: '13',
      val: 'Ciudad Real',
      selected: false
    },
    {
      id: '14',
      val: 'Córdoba',
      selected: false
    },
    {
      id: '15',
      val: 'A Coruña',
      selected: false
    },
    {
      id: '16',
      val: 'Cuenca',
      selected: false
    },
    {
      id: '17',
      val: 'Girona',
      selected: false
    },
    {
      id: '18',
      val: 'Granada',
      selected: false
    },
    {
      id: '19',
      val: 'Guadalajara',
      selected: false
    },
    {
      id: '20',
      val: 'Guipúzcoa',
      selected: false
    },
    {
      id: '21',
      val: 'Huelva',
      selected: false
    },
    {
      id: '22',
      val: 'Huesca',
      selected: false
    },
    {
      id: '23',
      val: 'Jaén',
      selected: false
    },
    {
      id: '24',
      val: 'León',
      selected: false
    },
    {
      id: '25',
      val: 'Lleida',
      selected: false
    },
    {
      id: '26',
      val: 'La Rioja',
      selected: false
    },
    {
      id: '27',
      val: 'Lugo',
      selected: false
    },
    {
      id: '28',
      val: 'Madrid',
      selected: false
    },
    {
      id: '29',
      val: 'Málaga',
      selected: false
    },
    {
      id: '30',
      val: 'Murcia',
      selected: false
    },
    {
      id: '31',
      val: 'Navarra',
      selected: false
    },
    {
      id: '32',
      val: 'Ourense',
      selected: false
    },
    {
      id: '33',
      val: 'Asturias',
      selected: false
    },
    {
      id: '34',
      val: 'Palencia',
      selected: false
    },
    {
      id: '35',
      val: 'Las Palmas',
      selected: false
    },
    {
      id: '36',
      val: 'Pontevedra',
      selected: false
    },
    {
      id: '37',
      val: 'Salamanca',
      selected: false
    },
    {
      id: '38',
      val: 'Santa Cruz de Tenerife',
      selected: false
    },
    {
      id: '39',
      val: 'Cantabria',
      selected: false
    },
    {
      id: '40',
      val: 'Segovia',
      selected: false
    },
    {
      id: '41',
      val: 'Sevilla',
      selected: false
    },
    {
      id: '42',
      val: 'Soria',
      selected: false
    },
    {
      id: '43',
      val: 'Tarragona',
      selected: false
    },
    {
      id: '44',
      val: 'Teruel',
      selected: false
    },
    {
      id: '45',
      val: 'Toledo',
      selected: false
    },
    {
      id: '46',
      val: 'València/Valencia',
      selected: false
    },
    {
      id: '47',
      val: 'Valladolid',
      selected: false
    },
    {
      id: '48',
      val: 'Vizcaya',
      selected: false
    },
    {
      id: '49',
      val: 'Zamora',
      selected: false
    },
    {
      id: '50',
      val: 'Zaragoza',
      selected: false
    },
    {
      id: '51',
      val: 'Ceuta',
      selected: false
    },
    {
      id: '52',
      val: 'Melilla',
      selected: false
    }
  ];