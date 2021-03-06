// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'default',
  app_url: 'http://localhost:4200',
  atencion_cliente_url: 'https://acli-ivf.laberit.com',
  moges_url: 'https://moges2-backend-ivf.laberit.com',
  carpeta_url:'https://acli-ivf.laberit.com',
  trex_url: 'https://trex-ivf.laberit.com',
  tramitador_url: 'https://tramitador-backend-ivf.laberit.com',
  mock_url: 'https://mock-ivf.laberit.com',
  keycloak: {
    issuer: 'https://keycloak-ivf.laberit.com/auth/',
    realm: 'IVF',
    clientId: 'tramitador'
  },
  entity_uuid: 'ca807322-5bcb-11eb-87b5-c4fba02e0591',
  catalogs_url: 'https://catalogs-service-ivf.laberit.com'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
