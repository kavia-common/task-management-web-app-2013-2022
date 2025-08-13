import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TODO APP title on home screen', () => {
  render(<App />);
  const heading = screen.getByText(/TODO APP/i);
  expect(heading).toBeInTheDocument();
});
