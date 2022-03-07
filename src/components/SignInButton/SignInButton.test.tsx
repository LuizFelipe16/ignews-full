import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/client';
import { SignInButton } from '.';

jest.mock('next-auth/client');

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    // useSessionMocked.mockReturnValue([null, false]);
    // a partir dessa linha, toda vez que useSession for chamado, 
    // ele irá retornar com os parâmetros colocados ali

    useSessionMocked.mockReturnValueOnce([null, false]);
    // vai falar que quer "mokar" apenas o próximo retorno, não tudo

    render(<SignInButton />);

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: 'John Doe',
        email: 'john.doe@gmail.com'
      },
      expires: 'fake-expires',
    },
      false
    ]);

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
