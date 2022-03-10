import { render, screen } from '@testing-library/react';
import CoinGeckoErrorAlert from '../';

test('renders CoinGeckoErrorAlert', () => {
  render(<CoinGeckoErrorAlert />);
  const alertComponent = screen.getByTestId('coingecko-error-alert');
  expect(alertComponent).toBeInTheDocument();
});
