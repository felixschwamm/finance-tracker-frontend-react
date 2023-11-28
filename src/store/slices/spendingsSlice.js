import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const spendingsSlice = createSlice({
    name: "spendings",
    initialState: {
        status: "idle",
        error: null,
        spendings: []
    },
    extraReducers(builder) {
        builder
            .addCase(fetchSpendings.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.spendings = action.payload;
            });
        }
});

export const fetchSpendings = createAsyncThunk('spendings/fetchSpendings', async (_, {getState}) => {
    if (!getState().keycloak.token) {
        throw new Error("No token available");
    }
    let res = await fetch("http://localhost:3000/finance/spendings", {
        headers: {
            Authorization: `Bearer ${getState().keycloak.token}`
        }
    });
    if (!res.ok) {
        throw new Error("Error fetching spendings");
    }
    res = await res.json();
    return res;
});

export const createNewSpending = createAsyncThunk('spendings/createNewSpending', async (spending, {getState}) => {
    if (!getState().keycloak.token) {
        throw new Error("No token available");
    }
    let res = await fetch("http://localhost:3000/finance/spendings", {
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

export const getTotalSpendingThisMonth = (state) => {
    if (!state.spendings.spendings) {
        return null;
    }
    const spedingsThisMonth = state.spendings.spendings.filter(s => {
        const date = new Date(s.date);
        const today = new Date();
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });
    return spedingsThisMonth.reduce((acc, curr) => acc + curr.amount, 0);
}

export const getSpendingsSorted = (state) => {
    if (!state.spendings.spendings) {
        return null;
    }
    return [...state.spendings.spendings].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
}

export const getSpendingsPerCategory = (state) => {
    if (!state.spendings.spendings) {
        return null;
    }
    const categories = {};
    state.spendings.spendings.forEach(s => {
        const category = s.transaction_category ? s.transaction_category : 'Sonstiges';
        if (categories[category]) {
            categories[category] += s.amount;
        } else {
            categories[category] = s.amount;
        }
    });
    return categories;
}

export default spendingsSlice.reducer;