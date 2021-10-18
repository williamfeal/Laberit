export const IF_PROBLEM_PERSIST = ', si el problema persiste contacte con el administrador.';
export const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export class AppConstants {
    public static readonly TITLE_ERROR = 'Error';
    public static readonly ERROR_LOAD_WEATHER = 'Ha habido un error obteniendo el tiempo' + IF_PROBLEM_PERSIST;
    public static readonly ERROR_LOAD_CATEGORIES = 'Ha habido un error obteniendo las categorías' + IF_PROBLEM_PERSIST;
    public static readonly ERROR_LOAD_LOGGED_USER = 'Ha habido un error obteniendo el usuario' + IF_PROBLEM_PERSIST;
    public static readonly FILE_SIZE_TEXT = '50 MB';
    public static readonly FILE_SIZE_NUMBER = '52428800';

    public static readonly LINEA_RESISTIR_CODE: 'bed28de7-7096-4bad-b292-07503232b2b5';

}
export const actuation = [{
  concept_code:'interested',
  description:'Interesado',
  selected: true
},
{
  concept_code:'representative',
  description:'Representante',
  selected: false
}
];

export const representation_power = [{
  concept_code: '1',
  description: 'Representante en el Registro Electrónico de Apoderamiento',
  selected: true
} ]
export const siNo = [{
  concept_code:'true',
  description:'Si',
  selected: false
},
{
  concept_code:'false',
  description:'No',
  selected: false
}];
export const personType = [{
  concept_code:'natural-person',
  description:'Persona física',
  selected: false
},
{
  concept_code:'artifitial-person',
  description:'Persona jurídica',
  selected: false
}];
export const businessType = [{
  concept_code:'1',
  description:'Autónomo',
  selected: false
},
{
  concept_code:'2',
  description:'Microempresa',
  selected: false
},
{
  concept_code:'3',
  description:'Pyme',
  selected: false
},
{
  concept_code:'4',
  description:'Gran Empresa',
  selected: false
},
{
  concept_code:'5',
  description:'Comunidad de bienes y OE',
  selected: false
},
{
  concept_code:'6',
  description:'Sociedad Civil',
  selected: false
}
];
export const businessTypeWithoutAutonomo = [
  
{
  concept_code:'2',
  description:'Microempresa',
  selected: false
},
{
  concept_code:'3',
  description:'Pyme',
  selected: false
},
{
  concept_code:'4',
  description:'Gran Empresa',
  selected: false
},
{
  concept_code:'5',
  description:'Comunidad de bienes y OE',
  selected: false
},
{
  concept_code:'6',
  description:'Sociedad Civil',
  selected: false
}
];
export const selectMeans = [{
    concept_code: '1',
    description: 'Electrónico',
    selected: false
  }, {
    concept_code: '2',
    description: 'Papel',
    selected: false
  }];
  export const paises = [{
    concept_code: '1',
    description: 'España',
    selected: false
  }];
  export const typeStreet = [{
    concept_code: '1',
    description: 'Calle',
    selected: false
  }, {
    concept_code: '2',
    description: 'Avenida',
    selected: false
  }, {
    concept_code: '3',
    description: 'Plaza',
    selected: false
  }, {
    concept_code: '4',
    description: 'Paseo',
    selected: false
  }, {
    concept_code: '5',
    description: 'Camino',
    selected: false
  }, {
    concept_code: '6',
    description: 'Rambla',
    selected: false
  }, {
    concept_code: '7',
    description: 'Pasaje',
    selected: false
  }];
  export const comunidades = [
    {
      concept_code: '1',
      description: 'Andalucía',
      selected: false
    },
    {
      concept_code: '2',
      description: 'Aragón',
      selected: false
    },
    {
      concept_code: '3',
      description: 'Principado de Asturias',
      selected: false
    },
    {
      concept_code: '4',
      description: 'Illes Balears',
      selected: false 
    },
    {
      concept_code: '5',
      description: 'Canarias',
      selected: false
    },
    {
      concept_code: '6',
      description: 'Cantabria',
      selected: false
    },
    {
      concept_code: '7',
      description: 'Castilla y León',
      selected: false
    },
    {
      concept_code: '8',
      description: 'Castilla-La Mancha',
      selected: false
    },
    {
      concept_code: '9',
      description: 'Cataluña',
      selected: false
    },
    {
      concept_code: '10',
      description: 'Comunitat Valenciana',
      selected: false
    },
    {
      concept_code: '11',
      description: 'Extremadura',
      selected: false
    },
    {
      concept_code: '12',
      description: 'Galicia',
      selected: false
    },
    {
      concept_code: '13',
      description: 'Comunidad de Madrid',
      selected: false
    },
    {
      concept_code: '14',
      description: 'Región de Murcia',
      selected: false
    },
    {
      concept_code: '15',
      description: 'Comunidad Foral de Navarra',
      selected: false
    },
    {
      concept_code: '16',
      description: 'País Vasco',
      selected: false
    },
    {
      concept_code: '17',
      description: 'La Rioja',
      selected: false
    },
    {
      concept_code: '18',
      description: 'Ciudad Autónoma de Ceuta',
      selected: false
    },
    {
      concept_code: '19',
      description: 'Ciudad Autónoma de Melilla',
      selected: false
    }
  ];
  export const provincias = [
    {
      concept_code: '1',
      description: 'Álava',
      selected: false
    },
    {
      concept_code: '2',
      description: 'Albacete',
      selected: false
    },
    {
      concept_code: '3',
      description: 'Alacant/Alicante',
      selected: false
    },
    {
      concept_code: '4',
      description: 'Almería',
      selected: false
    },
    {
      concept_code: '5',
      description: 'Ávila',
      selected: false
    },
    {
      concept_code: '6',
      description: 'Badajoz',
      selected: false
    },
    {
      concept_code: '7',
      description: 'Illes Balears',
      selected: false
    },
    {
      concept_code: '8',
      description: 'Barcelona',
      selected: false
    },
    {
      concept_code: '9',
      description: 'Burgos',
      selected: false
    },
    {
      concept_code: '10',
      description: 'Cáceres',
      selected: false
    },
    {
      concept_code: '11',
      description: 'Cádiz',
      selected: false
    },
    {
      concept_code: '12',
      description: 'Castelló/Castellón',
      selected: false
    },
    {
      concept_code: '13',
      description: 'Ciudad Real',
      selected: false
    },
    {
      concept_code: '14',
      description: 'Córdoba',
      selected: false
    },
    {
      concept_code: '15',
      description: 'A Coruña',
      selected: false
    },
    {
      concept_code: '16',
      description: 'Cuenca',
      selected: false
    },
    {
      concept_code: '17',
      description: 'Girona',
      selected: false
    },
    {
      concept_code: '18',
      description: 'Granada',
      selected: false
    },
    {
      concept_code: '19',
      description: 'Guadalajara',
      selected: false
    },
    {
      concept_code: '20',
      description: 'Guipúzcoa',
      selected: false
    },
    {
      concept_code: '21',
      description: 'Huelva',
      selected: false
    },
    {
      concept_code: '22',
      description: 'Huesca',
      selected: false
    },
    {
      concept_code: '23',
      description: 'Jaén',
      selected: false
    },
    {
      concept_code: '24',
      description: 'León',
      selected: false
    },
    {
      concept_code: '25',
      description: 'Lleida',
      selected: false
    },
    {
      concept_code: '26',
      description: 'La Rioja',
      selected: false
    },
    {
      concept_code: '27',
      description: 'Lugo',
      selected: false
    },
    {
      concept_code: '28',
      description: 'Madrid',
      selected: false
    },
    {
      concept_code: '29',
      description: 'Málaga',
      selected: false
    },
    {
      concept_code: '30',
      description: 'Murcia',
      selected: false
    },
    {
      concept_code: '31',
      description: 'Navarra',
      selected: false
    },
    {
      concept_code: '32',
      description: 'Ourense',
      selected: false
    },
    {
      concept_code: '33',
      description: 'Asturias',
      selected: false
    },
    {
      concept_code: '34',
      description: 'Palencia',
      selected: false
    },
    {
      concept_code: '35',
      description: 'Las Palmas',
      selected: false
    },
    {
      concept_code: '36',
      description: 'Pontevedra',
      selected: false
    },
    {
      concept_code: '37',
      description: 'Salamanca',
      selected: false
    },
    {
      concept_code: '38',
      description: 'Santa Cruz de Tenerife',
      selected: false
    },
    {
      concept_code: '39',
      description: 'Cantabria',
      selected: false
    },
    {
      concept_code: '40',
      description: 'Segovia',
      selected: false
    },
    {
      concept_code: '41',
      description: 'Sevilla',
      selected: false
    },
    {
      concept_code: '42',
      description: 'Soria',
      selected: false
    },
    {
      concept_code: '43',
      description: 'Tarragona',
      selected: false
    },
    {
      concept_code: '44',
      description: 'Teruel',
      selected: false
    },
    {
      concept_code: '45',
      description: 'Toledo',
      selected: false
    },
    {
      concept_code: '46',
      description: 'València/Valencia',
      selected: false
    },
    {
      concept_code: '47',
      description: 'Valladolid',
      selected: false
    },
    {
      concept_code: '48',
      description: 'Vizcaya',
      selected: false
    },
    {
      concept_code: '49',
      description: 'Zamora',
      selected: false
    },
    {
      concept_code: '50',
      description: 'Zaragoza',
      selected: false
    },
    {
      concept_code: '51',
      description: 'Ceuta',
      selected: false
    },
    {
      concept_code: '52',
      description: 'Melilla',
      selected: false
    }
  ];

  export const base64= "JVBERi0xLjcNCiW1tbW1DQoxIDAgb2JqDQo8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFIvTGFuZyhlcy1FUykgL1N0cnVjdFRyZWVSb290IDEyIDAgUi9NYXJrSW5mbzw8L01hcmtlZCB0cnVlPj4vTWV0YWRhdGEgMjMgMCBSL1ZpZXdlclByZWZlcmVuY2VzIDI0IDAgUj4+DQplbmRvYmoNCjIgMCBvYmoNCjw8L1R5cGUvUGFnZXMvQ291bnQgMS9LaWRzWyAzIDAgUl0gPj4NCmVuZG9iag0KMyAwIG9iag0KPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9FeHRHU3RhdGU8PC9HUzUgNSAwIFIvR1M4IDggMCBSPj4vRm9udDw8L0YxIDYgMCBSL0YyIDkgMCBSPj4vUHJvY1NldFsvUERGL1RleHQvSW1hZ2VCL0ltYWdlQy9JbWFnZUldID4+L01lZGlhQm94WyAwIDAgNTk1LjMyIDg0MS45Ml0gL0NvbnRlbnRzIDQgMCBSL0dyb3VwPDwvVHlwZS9Hcm91cC9TL1RyYW5zcGFyZW5jeS9DUy9EZXZpY2VSR0I+Pi9UYWJzL1MvU3RydWN0UGFyZW50cyAwPj4NCmVuZG9iag0KNCAwIG9iag0KPDwvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCAyNzI+Pg0Kc3RyZWFtDQp4nK1STUsDMRC9B/If3jFbaDaTj24WSg/d1qJQ0HbBg3gQ3ZaCVtzVn+1/cLJaaBHxoAkzmZnHzLwJg/wS43G+rM5nMJMJprMK+WIdsO2kIGyliEGT8ShCoYsIIqeJH6ed92gbKTYDKTBfVsBRKfoq9SKF0SadGAuCQSiDdhbRky5tn389wF6KaS1FfkZcXweLepOaG76EQ/+R0Qw8pYJEHknj02yZJXOOPedv6GohxY1aP2dePWZO7Vjuk3rNhla9cfSBBclJ8Hsy9hxpsuFI3R2gFUMNO13K7PrUXXaL+kKKOTO/kuIfJqXSa+d+m/SHAds/0bGJDv/yKZ2obXlMJ62DQd8Op+36BfgAB3dz/w0KZW5kc3RyZWFtDQplbmRvYmoNCjUgMCBvYmoNCjw8L1R5cGUvRXh0R1N0YXRlL0JNL05vcm1hbC9jYSAxPj4NCmVuZG9iag0KNiAwIG9iag0KPDwvVHlwZS9Gb250L1N1YnR5cGUvVHJ1ZVR5cGUvTmFtZS9GMS9CYXNlRm9udC9BcmlhbE1UL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9Gb250RGVzY3JpcHRvciA3IDAgUi9GaXJzdENoYXIgMzIvTGFzdENoYXIgMjM3L1dpZHRocyAyMCAwIFI+Pg0KZW5kb2JqDQo3IDAgb2JqDQo8PC9UeXBlL0ZvbnREZXNjcmlwdG9yL0ZvbnROYW1lL0FyaWFsTVQvRmxhZ3MgMzIvSXRhbGljQW5nbGUgMC9Bc2NlbnQgOTA1L0Rlc2NlbnQgLTIxMC9DYXBIZWlnaHQgNzI4L0F2Z1dpZHRoIDQ0MS9NYXhXaWR0aCAyNjY1L0ZvbnRXZWlnaHQgNDAwL1hIZWlnaHQgMjUwL0xlYWRpbmcgMzMvU3RlbVYgNDQvRm9udEJCb3hbIC02NjUgLTIxMCAyMDAwIDcyOF0gPj4NCmVuZG9iag0KOCAwIG9iag0KPDwvVHlwZS9FeHRHU3RhdGUvQk0vTm9ybWFsL0NBIDE+Pg0KZW5kb2JqDQo5IDAgb2JqDQo8PC9UeXBlL0ZvbnQvU3VidHlwZS9UcnVlVHlwZS9OYW1lL0YyL0Jhc2VGb250L0JDREVFRStDYWxpYnJpL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZy9Gb250RGVzY3JpcHRvciAxMCAwIFIvRmlyc3RDaGFyIDMyL0xhc3RDaGFyIDMyL1dpZHRocyAyMSAwIFI+Pg0KZW5kb2JqDQoxMCAwIG9iag0KPDwvVHlwZS9Gb250RGVzY3JpcHRvci9Gb250TmFtZS9CQ0RFRUUrQ2FsaWJyaS9GbGFncyAzMi9JdGFsaWNBbmdsZSAwL0FzY2VudCA3NTAvRGVzY2VudCAtMjUwL0NhcEhlaWdodCA3NTAvQXZnV2lkdGggNTIxL01heFdpZHRoIDE3NDMvRm9udFdlaWdodCA0MDAvWEhlaWdodCAyNTAvU3RlbVYgNTIvRm9udEJCb3hbIC01MDMgLTI1MCAxMjQwIDc1MF0gL0ZvbnRGaWxlMiAyMiAwIFI+Pg0KZW5kb2JqDQoxMSAwIG9iag0KPDwvQXV0aG9yKP7/AFMAYQBiAGUAbABhACAAWQBhAPEAZQB6ACAATADz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bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iMy4xLTcwMSI+CjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPgo8cGRmOlByb2R1Y2VyPk1pY3Jvc29mdMKuIFdvcmQgMjAxOTwvcGRmOlByb2R1Y2VyPjwvcmRmOkRlc2NyaXB0aW9uPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5TYWJlbGEgWWHDsWV6IEzDs3BlejwvcmRmOmxpPjwvcmRmOlNlcT48L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgo8eG1wOkNyZWF0b3JUb29sPk1pY3Jvc29mdMKuIFdvcmQgMjAxOTwveG1wOkNyZWF0b3JUb29sPjx4bXA6Q3JlYXRlRGF0ZT4yMDIxLTEwLTAxVDEyOjEwOjQ0KzAyOjAwPC94bXA6Q3JlYXRlRGF0ZT48eG1wOk1vZGlmeURhdGU+MjAyMS0xMC0wMVQxMjoxMDo0NCswMjowMDwveG1wOk1vZGlmeURhdGU+PC9yZGY6RGVzY3JpcHRpb24+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyI+Cjx4bXBNTTpEb2N1bWVudElEPnV1aWQ6NzZCNzlEQUEtNzQ1MC00RjY2LUJBQzEtNTI0RDE1REZDNzM2PC94bXBNTTpEb2N1bWVudElEPjx4bXBNTTpJbnN0YW5jZUlEPnV1aWQ6NzZCNzlEQUEtNzQ1MC00RjY2LUJBQzEtNTI0RDE1REZDNzM2PC94bXBNTTpJbnN0YW5jZUlEPjwvcmRmOkRlc2NyaXB0aW9uPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPC9yZGY6UkRGPjwveDp4bXBtZXRhPjw/eHBhY2tldCBlbmQ9InciPz4NCmVuZHN0cmVhbQ0KZW5kb2JqDQoyNCAwIG9iag0KPDwvRGlzcGxheURvY1RpdGxlIHRydWU+Pg0KZW5kb2JqDQoyNSAwIG9iag0KPDwvVHlwZS9YUmVmL1NpemUgMjUvV1sgMSA0IDJdIC9Sb290IDEgMCBSL0luZm8gMTEgMCBSL0lEWzxBQTlEQjc3NjUwNzQ2NjRGQkFDMTUyNEQxNURGQzczNj48QUE5REI3NzY1MDc0NjY0RkJBQzE1MjREMTVERkM3MzY+XSAvRmlsdGVyL0ZsYXRlRGVjb2RlL0xlbmd0aCA5OD4+DQpzdHJlYW0NCnicY2AAgv//GYGkIAMDiFoGoe6BKcavYIrZH0K1gCkWVTDFyg6hbCDUEzDFdoWBgQmoXZiBCUIxQygWCMUKoRghFFQlG1Af+wWwds54MMVtBKF8wVR4KphK3sbAAACT+gv+DQplbmRzdHJlYW0NCmVuZG9iag0KeHJlZg0KMCAyNg0KMDAwMDAwMDAxMiA2NTUzNSBmDQowMDAwMDAwMDE3IDAwMDAwIG4NCjAwMDAwMDAxNjYgMDAwMDAgbg0KMDAwMDAwMDIyMiAwMDAwMCBuDQowMDAwMDAwNTAxIDAwMDAwIG4NCjAwMDAwMDA4NDcgMDAwMDAgbg0KMDAwMDAwMDkwMCAwMDAwMCBuDQowMDAwMDAxMDYxIDAwMDAwIG4NCjAwMDAwMDEyODcgMDAwMDAgbg0KMDAwMDAwMTM0MCAwMDAwMCBuDQowMDAwMDAxNTA4IDAwMDAwIG4NCjAwMDAwMDE3NDggMDAwMDAgbg0KMDAwMDAwMDAxMyA2NTUzNSBmDQowMDAwMDAwMDE0IDY1NTM1IGYNCjAwMDAwMDAwMTUgNjU1MzUgZg0KMDAwMDAwMDAxNiA2NTUzNSBmDQowMDAwMDAwMDE3IDY1NTM1IGYNCjAwMDAwMDAwMTggNjU1MzUgZg0KMDAwMDAwMDAxOSA2NTUzNSBmDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDIzOTkgMDAwMDAgbg0KMDAwMDAwMjg2NiAwMDAwMCBuDQowMDAwMDAyODkzIDAwMDAwIG4NCjAwMDAwMjIzNzMgMDAwMDAgbg0KMDAwMDAyNTUyNiAwMDAwMCBuDQowMDAwMDI1NTcxIDAwMDAwIG4NCnRyYWlsZXINCjw8L1NpemUgMjYvUm9vdCAxIDAgUi9JbmZvIDExIDAgUi9JRFs8QUE5REI3NzY1MDc0NjY0RkJBQzE1MjREMTVERkM3MzY+PEFBOURCNzc2NTA3NDY2NEZCQUMxNTI0RDE1REZDNzM2Pl0gPj4NCnN0YXJ0eHJlZg0KMjU4NjkNCiUlRU9GDQp4cmVmDQowIDANCnRyYWlsZXINCjw8L1NpemUgMjYvUm9vdCAxIDAgUi9JbmZvIDExIDAgUi9JRFs8QUE5REI3NzY1MDc0NjY0RkJBQzE1MjREMTVERkM3MzY+PEFBOURCNzc2NTA3NDY2NEZCQUMxNTI0RDE1REZDNzM2Pl0gL1ByZXYgMjU4NjkvWFJlZlN0bSAyNTU3MT4+DQpzdGFydHhyZWYNCjI2NTQ2DQolJUVPRg==";

  export const tipoProyecto = [
    {
      concept_code: '1',
      description: 'Inversión',
      selected: false,
    },
    {
      concept_code: '2',
      description: 'Circulante',
      selected: false
    },
    {
      concept_code: '3',
      description: 'Inversión y Circulante',
      selected: false
    }
  ]
  export const tipoInteres = [
    {
      concept_code: '1',
      description: 'A',
      selected: false,
    },
    {
      concept_code: '2',
      description: 'B',
      selected: false
    }
  ]

  export const genero = [
    {
      concept_code: '1',
      description: 'Hombre',
      selected: false,
    },
    {
      concept_code: '2',
      description: 'Mujer',
      selected: false
    },
    {
      concept_code: '2',
      description: 'Otro',
      selected: false
    }
  ]