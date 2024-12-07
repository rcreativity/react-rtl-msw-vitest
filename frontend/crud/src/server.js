import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup the server with mock handlers
export const server = setupServer(...handlers);
