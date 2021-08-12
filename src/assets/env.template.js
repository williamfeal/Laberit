(function(window) {
    window.env = window.env || {};

    // Environment variables
    window["env"]["trexUrl"] = "${TREX_URL}";
    window["env"]["mogesUrl"] = "${MOGES_URL}";
    window["env"]["carpetaUrl"] = "${CARPETA_URL}";
    window["env"]["profile"] = "${PROFILE}";
    window["env"]["keycloakUrl"] = "${KEYCLOAK_URL}";
    window["env"]["keycloakRealm"] = "${KEYCLOAK_REALM}";
    window["env"]["keycloakClientId"] = "${KEYCLOAK_CLIENT_ID}";
    window["env"]["entity_uuid"] = "${ENTITY_UUID}"
    window["env"]["entity_uuid"] = "${ATENCION_CLIENTE_URL}"
})(this);
