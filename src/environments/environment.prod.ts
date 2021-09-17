export const environment = {
  production: true,
  envName: 'default',
  moges_url: window["env"]["mogesUrl"] || "error-moges-url-env",
  carpeta_url: window["env"]["carpetaUrl"] || "error-carpeta-url-env",
  trex_url: window["env"]["trexUrl"] || "error-trex-url-env",
  mock_url: window["env"]["mockUrl"] || "error-mock-url-env",
  keycloak: {
    issuer: window["env"]["keycloakUrl"] || "error-keycloak-url-env",
    realm: window["env"]["keycloakRealm"] || "error-keycloak-realm-env",
    clientId: window["env"]["keycloakClientId"] || "error-keycloak-clientId-env",
  },
  entity_uuid: window["env"]["entity_uuid"] || "error-entity-uuid-env",
  app_url: window["env"]["app_url"] || 'error-app-url',
  atencion_cliente_url: window["env"]["atencion_cliente_url"] || 'error-atencion-cliente-url',
  catalogs_url: window["env"]["catalog"] || "error-catalog-url-env",

};
