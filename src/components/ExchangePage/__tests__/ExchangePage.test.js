import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExchangePage from '../ExchangePage';
import exchangeData from '../../../utils/exchangeDummyData';

const API_URL = 'https://api.coingecko.com/api/v3/exchanges';
const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.json(exchangeData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders ExchangePage', () => {
  render(
    <BrowserRouter>
      <ExchangePage />
    </BrowserRouter>
  );
  const exchangePageComponent = screen.getByTestId('exchange-page');
  expect(exchangePageComponent).toBeInTheDocument();
});

test('handles API data and renders in UI', async () => {
  render(
    <BrowserRouter>
      <ExchangePage />
    </BrowserRouter>
  );
  await waitFor(() => screen.getByTestId('exchange-info'));
});

test('handles server error', async () => {
  server.use(
    rest.get(API_URL, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(
    <BrowserRouter>
      <ExchangePage />
    </BrowserRouter>
  );
  await waitFor(() => screen.getByTestId('coingecko-error-alert'));
});
