import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Directory from '../';
import exchangesData from '../../../utils/exchangesDummyData';

const API_URL = 'https://api.coingecko.com/api/v3/exchanges';
const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.json(exchangesData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Directory', () => {
  render(
    <BrowserRouter>
      <Directory />
    </BrowserRouter>
  );
  const directoryComponent = screen.getByTestId('directory');
  expect(directoryComponent).toBeInTheDocument();
});

test('handles API data and renders in UI', async () => {
  render(
    <BrowserRouter>
      <Directory />
    </BrowserRouter>
  );
  await waitFor(() => screen.getByTestId('exchanges-table'));
});

test('handles server error', async () => {
  server.use(
    rest.get(API_URL, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(
    <BrowserRouter>
      <Directory />
    </BrowserRouter>
  );
  await waitFor(() => screen.getByTestId('coingecko-error-alert'));
});
