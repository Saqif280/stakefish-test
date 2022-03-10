import { render, screen } from '@testing-library/react';
import CoinGeckoErrorAlert from '../CoinGeckoErrorAlert';

test('renders CoinGeckoErrorAlert', () => {
  render(<CoinGeckoErrorAlert />);
  const alertComponent = screen.getByTestId('coingecko-error-alert');
  expect(alertComponent).toBeInTheDocument();
});
