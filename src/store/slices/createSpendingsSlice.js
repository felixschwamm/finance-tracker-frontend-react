import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const createSpendingsSlice = createSlice({
    name: "createSpendings",
    initialState: {
        status: "idle",
        error: null
    },
    extraReducers(builder) {
        builder
            .addCase(createNewSpending.fulfilled, (state, action) => {
                state.status = "succeeded";
            });
        }
});

export const createNewSpending = createAsyncThunk('createSpendings/createNewSpending', async (spending, {getState}) => {
    if (!getState().keycloak.token) {
        throw new Error("No token available");
    }
    let res = await fetch("https://finance-backend.schwaemmle.cloud/finance/spendings", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getState().keycloak.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spending)
    });
    if (!res.ok) {
        throw new Error("Error creating new spending");
    }
    res = await res.json();
    return res;
});

export default createSpendingsSlice.reducer;