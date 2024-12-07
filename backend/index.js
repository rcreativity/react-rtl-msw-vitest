const express = require('express');
const app = express();
var cors = require('cors')

// Middleware to parse JSON body
app.use(express.json());
app.use(cors())

const items = [];

// GET: Fetch all items
app.get('/items', (req, res) => {
    res.status(200).json({ success: true, data: items });
});

// POST: Create a new item
app.post('/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: 'Name is required' });
    }
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json({ success: true, data: newItem });
});

// PUT: Update an existing item
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const item = items.find((i) => i.id === parseInt(id));
    if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
    }

    item.name = name || item.name;
    res.status(200).json({ success: true, data: item });
});

// DELETE: Remove an item
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;

    const index = items.findIndex((i) => i.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Item not found' });
    }

    items.splice(index, 1);
    res.status(200).json({ success: true, message: 'Item deleted' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
