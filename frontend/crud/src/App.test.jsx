import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from './redux/store'; // Ensure store is correctly configured
import App from './App';
import { server } from './server'; // Ensure the mock server is imported
import { beforeAll, afterAll, afterEach, describe, test, vitest } from 'vitest';

// Mock API server setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App Component', () => {
    test('renders items list', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        // Ensure items load from the mocked server
        const item = await waitFor(() => screen.findByText(/Test Item/i));
        expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
        expect(item).toBeInTheDocument();
    });

    test('adds a new item', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/add-item']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        // if you don't add this initialEntries={['/add-item']}, you have to use below code
        // fireEvent.click(screen.getByText('Add Item')); 

        fireEvent.change(screen.getByPlaceholderText('Enter item name'), {
            target: { value: 'New Test Item' },
        });
        fireEvent.click(screen.getByText('Add'));

        const item = await waitFor(() => screen.findByText(/New Test Item/i));
        expect(item).toBeInTheDocument();
    });

    test('edits an item', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByTestId('edit-1'));
        fireEvent.change(screen.getByPlaceholderText('update item name'), {
            target: { value: 'Updated Item' },
        });
        fireEvent.click(screen.getByText('Update'));

        const updatedItem = await waitFor(() => screen.findByText(/Updated Item/i));
        expect(updatedItem).toBeInTheDocument();
    });

    test('deletes an item and checks server response message', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByTestId('delete-1'));

        const responseMessage = await waitFor(() => screen.findByText(/Item Deleted/i));
        expect(responseMessage).toBeInTheDocument();

        // Uncomment and adjust fetch spy for additional checks
        /*
        const fetchSpy = vitest.spyOn(global, 'fetch').mockResolvedValueOnce(
            new Response(
                JSON.stringify({ success: true, message: 'Item Deleted' }),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            )
        );

        fireEvent.click(screen.getByTestId('delete-1'));
        const resultValue = fetchSpy.mock.results[0].value;
        const response = await resultValue.json();
        expect(response.message).toBe('Item Deleted');
        expect(response.success).toBe(true);

        fetchSpy.mockRestore();
        */
    });
});
