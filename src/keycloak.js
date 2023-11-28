import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    url: "https://keycloak.schwaemmle.cloud",
    realm: "finance-tracker",
    clientId: "finance-tracker-express-backend",
})

export default keycloak