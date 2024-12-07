import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/items';

// Async thunks for API calls
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {
    const response = await axios.post(API_URL, item);
    return response.data.data;
});

export const updateItem = createAsyncThunk('items/updateItem', async ({ id, name }) => {
    const response = await axios.put(`${API_URL}/${id}`, { name });
    return response.data.data;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Redux slice
const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                }
            );
    },
});

export default itemsSlice.reducer;
