(function(window) {
    window["env"] = window["env"] || {};

    // Environment variables
    window["env"]["trexUrl"] = "${TREX_URL}";
    window["env"]["keycloakUrl"] = "${MOGES_URL}";
    window["env"]["keycloakRealm"] = "${PROFILE}";
})(this);