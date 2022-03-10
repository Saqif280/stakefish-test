import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ExchangesTable from '../ExchangesTable';
import exchangesData from '../../../utils/exchangesDummyData';

test('renders ExchangesTable', () => {
  render(
    <BrowserRouter>
      <ExchangesTable exchanges={exchangesData} />
    </BrowserRouter>
  );
  const tableComponent = screen.getByTestId('exchanges-table');
  expect(tableComponent).toBeInTheDocument();
});
