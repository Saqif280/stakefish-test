import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExchangePage from '../ExchangePage';

test('renders ExchangePage', () => {
  render(
    <BrowserRouter>
      <ExchangePage />
    </BrowserRouter>
  );
  const exchangePageComponent = screen.getByTestId('exchange-page');
  expect(exchangePageComponent).toBeInTheDocument();
});
