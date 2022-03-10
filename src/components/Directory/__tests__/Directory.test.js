import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Directory from '../';
import exchangesData from '../../../utils/exchangesDummyData';

const API_URL = 'https://api.coingecko.com/api/v3/exchanges';
const server = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.json(exchangesData), ctx.set('total', '392'));
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
      return res(ctx.json({}), ctx.status(500));
    })
  );

  render(
    <BrowserRouter>
      <Directory />
    </BrowserRouter>
  );
  await waitFor(() => screen.getByTestId('coingecko-error-alert'));
});

test('handles page navigation through next and back buttons', async () => {
  render(
    <BrowserRouter>
      <Directory />
    </BrowserRouter>
  );
  await waitFor(() => screen.getByText('Page 1 / 40'));
  const previousButton = screen.getByText('Previous Page');
  const nextButton = screen.getByText('Next Page');
  // test forward
  userEvent.click(nextButton);
  expect(screen.getByText('Page 2 / 40')).toBeInTheDocument();
  // test backwards
  userEvent.click(previousButton);
  expect(screen.getByText('Page 1 / 40')).toBeInTheDocument();
  // test going back when limit reached
  userEvent.click(previousButton);
  expect(screen.getByText('Page 1 / 40')).toBeInTheDocument();
});

test('handles page navigation through input', async () => {
  render(
    <BrowserRouter>
      <Directory />
    </BrowserRouter>
  );
  await waitFor(() => screen.getByText('Page 1 / 40'));
  const pageInput = screen.getByTestId('page-input');
  const goButton = screen.getByText('Go');
  // test acceptable input
  userEvent.type(pageInput, '20');
  userEvent.click(goButton);
  expect(screen.getByText('Page 20 / 40')).toBeInTheDocument();
  // test too low input
  userEvent.type(pageInput, '-45');
  userEvent.click(goButton);
  expect(screen.getByText('Page 1 / 40')).toBeInTheDocument();
  // test too high input
  userEvent.type(pageInput, '45');
  userEvent.click(goButton);
  expect(screen.getByText('Page 40 / 40')).toBeInTheDocument();
  // test NaN input
  userEvent.type(pageInput, 'hello');
  userEvent.click(goButton);
  expect(screen.getByText('Page 1 / 40')).toBeInTheDocument();
});
