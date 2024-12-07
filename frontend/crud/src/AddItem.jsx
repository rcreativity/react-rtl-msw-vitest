import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchItems, addItem, updateItem, deleteItem } from './redux/itemsSlice';

function AddItem() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.items);
    const [newItem, setNewItem] = useState('');


    const handleAdd = () => {
        if (newItem) {
            dispatch(addItem({ name: newItem }));
            setNewItem('');
        }
    };

    return (
        <div>
            <h1>Add Item</h1>
            <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter item name"
                />
                <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default AddItem;
