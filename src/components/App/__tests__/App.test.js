import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App', () => {
  render(<App />);
  const appComponent = screen.getByTestId('app');
  expect(appComponent).toBeInTheDocument();
});
