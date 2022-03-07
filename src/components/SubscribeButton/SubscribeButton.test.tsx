import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';
import { signIn, useSession } from 'next-auth/client';
import { SubscribeButton } from '.';

jest.mock('next-auth/client'); // fiz um mock da funcionalidade

jest.mock('next/router');

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe Now')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn); // peguei a função

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe Now')

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled(); // espero que a função tenha sido chamada
  });

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter);
    // a questão aqui é conseguir só usar o push do router
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: 'John Doe',
        email: 'john.doe@gmail.com'
      },
      activeSubscription: 'fake-active-subscription',
      expires: 'fake-expires',
    },
      false
    ]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe Now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});
