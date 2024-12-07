import itemsReducer, { fetchItems, addItem, updateItem, deleteItem } from './itemsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { vi, describe, beforeEach, test, expect } from 'vitest';

describe('itemsSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                items: itemsReducer,
            },
        });
    });

    test('should handle initial state', () => {
        const state = store.getState().items;
        expect(state.items).toEqual([]);
        expect(state.status).toBe('idle');
    });

    test('should handle fetchItems.fulfilled', () => {
        const mockItems = [{ id: 1, name: 'Item 1' }];
        store.dispatch(fetchItems.fulfilled(mockItems));
        const state = store.getState().items;
        expect(state.items).toEqual(mockItems);
    });

    test('should handle addItem.fulfilled', () => {
        const newItem = { id: 2, name: 'New Item' };
        store.dispatch(addItem.fulfilled(newItem));
        const state = store.getState().items;
        expect(state.items).toContainEqual(newItem);
    });

    test('should handle updateItem.fulfilled', () => {
        const initialState = {
            items: [{ id: 1, name: 'Old Name' }],
            status: 'idle',
            error: null,
        };
        const state = itemsReducer(
            initialState,
            updateItem.fulfilled({ id: 1, name: 'Updated Name' })
        );
        expect(state.items[0].name).toBe('Updated Name');
    });

    test('should handle deleteItem.fulfilled', () => {
        const initialState = {
            items: [{ id: 1, name: 'Item 1' }],
            status: 'idle',
            error: null,
        };
        const state = itemsReducer(initialState, deleteItem.fulfilled(1));
        expect(state.items).toHaveLength(0);
    });
});
