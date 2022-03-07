import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

test('it renders correctly', async () => {
  render(<Async />);

  screen.logTestingPlaygroundURL();

  expect(screen.getByText('Hello World')).toBeInTheDocument();

  // expect(await screen.findByText('Button')).toBeInTheDocument();

  // await waitForElementToBeRemoved(screen.queryByText('Button'));

  await waitFor(() => {
    return expect(screen.getByText('Button')).toBeInTheDocument();
  });
});