import { configureStore } from "@reduxjs/toolkit";
import keycloakReducer from "./slices/keycloakSlice";
import accoutReducer from "./slices/accountSlice";
import spendingsReducer from "./slices/spendingsSlice";
import createSpendingsReducer from "./slices/createSpendingsSlice";

export const store = configureStore({
    reducer: {
        keycloak: keycloakReducer,
        account: accoutReducer,
        spendings: spendingsReducer,
        createSpendings: createSpendingsReducer
    },
});