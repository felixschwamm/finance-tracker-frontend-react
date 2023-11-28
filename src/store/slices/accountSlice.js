import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        status: "idle",
        error: null,
        budget: null
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAccount.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.budget = action.payload.budget;
            })
            .addCase(fetchAccount.rejected, (state, action) => {
                state.status = "failed";
                console.log(action.error.message);
            })
            .addCase(updateBudget.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.budget = action.payload.budget;
            })
            .addCase(updateBudget.rejected, (state, action) => {
                state.status = "failed";
                console.log(action.error.message);
            });
    }
});

export const fetchAccount = createAsyncThunk('account/fetchAccount', async (_, {getState}) => {
    if (!getState().keycloak.token) {
        throw new Error("No token available");
    }
    let res = await fetch("https://finance-backend.schwaemmle.cloud/finance/budget", {
        headers: {
            Authorization: `Bearer ${getState().keycloak.token}`
        }
    });
    if (!res.ok) {
        throw new Error("Error fetching account");
    }
    res = await res.json();
    return res;
});

export const updateBudget = createAsyncThunk('account/updateBudget', async (budget, {getState}) => {
    if (!getState().keycloak.token) {
        throw new Error("No token available");
    }
    let res = await fetch("https://finance-backend.schwaemmle.cloud/finance/budget", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getState().keycloak.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({amount: budget})
    });
    if (!res.ok) {
        throw new Error("Error updating budget");
    }
    return {budget};
});

export const { setKeycloak } = accountSlice.actions;
export default accountSlice.reducer;
