export const environment = {
  production: true,
  envName: 'default',
  moges_url: window["env"]["mogesUrl"] || "error-moges-url-env",
  carpeta_url: window["env"]["carpetaUrl"] || "error-carpeta-url-env",
  trex_url: window["env"]["trexUrl"] || "error-trex-url-env",
  keycloak: {
    issuer: window["env"]["keycloakUrl"] || "error-keycloak-url-env",
    realm: window["env"]["keycloakRealm"] || "error-keycloak-realm-env",
    clientId: window["env"]["keycloakClientId"] || "error-keycloak-clientId-env",
  }
};