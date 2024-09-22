import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductCatalog from '../Components/ProductCatalog';
import cartReducer from '../features/cart/cartSlice';

// Mocking the fetchProducts API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: 1, title: 'Product 1', price: 10, image: 'image1.jpg' },
        { id: 2, title: 'Product 2', price: 20, image: 'image2.jpg' },
      ]),
  })
);

const queryClient = new QueryClient();

// Mock store configuration
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Helper function to render the component with Providers
const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    </Provider>
  );
};

describe('ProductCatalog', () => {
  afterEach(() => {
    jest.clearAllMocks(); // clear mocks after each test
  });

  test('renders loading spinner while fetching products', () => {
    renderWithProviders(<ProductCatalog />);
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner should be shown
  });

  test('renders products after successful fetch', async () => {
    renderWithProviders(<ProductCatalog />);

    // Wait for products to be rendered
    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Product 2')).toBeInTheDocument());

    // Check if product titles and prices are shown
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Price: $10')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Price: $20')).toBeInTheDocument();
  });

});
