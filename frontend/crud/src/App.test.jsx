import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { server } from './server'
// import { http } from 'msw';
// import { setupServer } from 'msw/node';
import { beforeAll,afterAll, afterEach , describe, test, vitest} from 'vitest'


// Mock API server
// const handlers = [
    // http.get('http://localhost:3000/items', (req, res, ctx) => {
    //     return res(ctx.json({ data: [{ id: 1, name: 'Test Item' }] }));
    // }),
    // http.post('http://localhost:3000/items', (req, res, ctx) => {
    //     return res(ctx.json({ data: { id: 2, name: req.body.name } }));
    // }),
    // http.put('http://localhost:3000/items/:id', (req, res, ctx) => {
    //     return res(ctx.json({ data: { id: req.params.id, name: req.body.name } }));
    // }),
    // http.delete('http://localhost:3000/items/:id', (req, res, ctx) => {
    //     return res(ctx.status(200));
    // }),
// ];
// const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App Component', () => {
   

    test('renders items list', async () => {
        const xxx =  render(
             <Provider store={store}>
                 <App />
             </Provider>
         );
 
         const item = await waitFor(() => screen.findByText(/Test Item \d+/i)); // Case-insensitive match
         expect(item).toBeInTheDocument();
 
         // const item = await waitFor(() => screen.findByText('Test Item 1'));
         // expect(item).toBeInTheDocument();
     });

    test('adds a new item', async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Enter item name'), {
            target: { value: 'New Test Item' },
        });
        fireEvent.click(screen.getByText('Add'));

        const item = await waitFor(() => screen.findByText(/New Test Item/i)); // Case-insensitive match
        expect(item).toBeInTheDocument();
    });

   
    test('edits an item', async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        fireEvent.click(screen.getByTestId('edit-1'));
        fireEvent.change(screen.getByPlaceholderText('update item name'), {
            target: { value: 'Updated Item' },
        });
        fireEvent.click(screen.getByText('Update'));

        const item = await waitFor(() => screen.findByText(/Updated Item/i)); // Case-insensitive match
        expect(item).toBeInTheDocument();

        // await waitFor(() => expect(screen.getByText('Updated Item')).toBeInTheDocument());
    });

    test('Deletes an item and checks server response message', async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        fireEvent.click(screen.getByTestId('delete-1'));
        const item = await waitFor(() => screen.findByText(/Item Deleted/i)); // Case-insensitive match
        expect(item).toBeInTheDocument();
    
        // Spy on the fetch call and mock the response
        // const fetchSpy = vitest.spyOn(global, 'fetch').mockResolvedValueOnce(
        //     new Response(
        //         JSON.stringify({ success : true, message: "Item deleted" }),
        //         { status: 200, headers: { 'Content-Type': 'application/json' } }
        //     )
        // );
    
        // Simulate clicking the delete button for item with id = 1
        // fireEvent.click(screen.getByTestId('delete-1'));

        // Wait for the API call to resolve
        // const resultValue = fetchSpy.mock.results[0].value; // Access the mock's result
        // const response = await resultValue.json(); // Parse the JSON response

        // // Assert the response message
        // expect(response.message).toBe("Item deleted successfully");

        // // Assert success flag
        // expect(response.success).toBe(true);

        // Clean up the mock
        // fetchSpy.mockRestore();
    });
});
