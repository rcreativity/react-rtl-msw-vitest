// src/setupTests.js
import '@testing-library/jest-dom'; // To extend matchers like toBeInTheDocument
import { server } from './server';  // Assuming you have a separate server setup for msw

// MSW setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



