import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, updateItem, deleteItem } from './redux/itemsSlice';

const App = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.items);

    const [newItem, setNewItem] = useState('');
    const [editItem, setEditItem] = useState(null);
    const [deletItem, setDeleteItem] = useState(null);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleAdd = () => {
        if (newItem) {
            dispatch(addItem({ name: newItem }));
            setNewItem('');
        }
    };

    const handleEdit = (id, name) => {
        setEditItem({ id, name });
    };

    const handleUpdate = () => {
        if (editItem && editItem.name) {
            dispatch(updateItem(editItem));
            setEditItem(null);
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteItem(id));
        setDeleteItem("Item Deleted")
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>React-Redux CRUD</h1>

            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {deletItem}

            <div>
                <h2>Add Item</h2>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter item name"
                />
                <button onClick={handleAdd}>Add</button>
            </div>

            <div>
                <h2>Items List</h2>
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            {item.id}: {item.name}{' '}
                            <button data-testid={`edit-${item.id}`} onClick={() => handleEdit(item.id, item.name)}>Edit</button>
                            <button data-testid={`delete-${item.id}`} onClick={() => handleDelete(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {editItem && (
                <div>
                    <h2>Edit Item</h2>
                    <input
                        type="text"
                        value={editItem.name}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                        placeholder="update item name"
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setEditItem(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default App;
