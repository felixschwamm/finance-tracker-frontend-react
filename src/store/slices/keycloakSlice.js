import { createSlice } from "@reduxjs/toolkit";

const keycloakSlice = createSlice({
    name: "keycloak",
    initialState: {
        username: null,
        token: null
    },
    reducers: {
        setKeycloak(state, action) {
            console.log('setKeycloak', action.payload);
            return {
                ...state,
                username: action.payload.username ?? "null",
                token: action.payload.token ?? null
            }
        }
    }
});

export const { setKeycloak } = keycloakSlice.actions;
export default keycloakSlice.reducer;
