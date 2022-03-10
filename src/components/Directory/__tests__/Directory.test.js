import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Directory from '../Directory';

test('renders Directory', () => {
  render(
    <BrowserRouter>
      <Directory />
    </BrowserRouter>
  );
  const directoryComponent = screen.getByTestId('directory');
  expect(directoryComponent).toBeInTheDocument();
});
