import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExchangesTable from '../ExchangesTable';

test('renders ExchangesTable', () => {
  render(
    <BrowserRouter>
      <ExchangesTable exchanges={[]} />
    </BrowserRouter>
  );
  const tableComponent = screen.getByTestId('exchanges-table');
  expect(tableComponent).toBeInTheDocument();
});
