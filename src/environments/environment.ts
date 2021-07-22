// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'default',
  moges_url: 'http://lavenganza.apc.alfatecsistemas.es',
  carpeta_url:'http://carpeta.apc.alfatecsistemas.es',
  trex_url: 'http://trex-sede.apc.alfatecsistemas.es',
  mock_url: 'mock.apc.alfatecsistemas.es',
  keycloak: {
    issuer: 'http://keycloak.apc.alfatecsistemas.es/auth/',
    realm: 'Angular2',
    clientId: 'angular-tasklist'
  },
  entity_uuid: 'ca807322-5bcb-11eb-87b5-c4fba02e0591'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
