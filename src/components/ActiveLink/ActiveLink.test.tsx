import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

// func render: vai renderizar o componente de uma maneira "virtual", não de verdade

// jest.mock -diz que vai imitar e então (o nome do módulo que precisa, o que deve retornar)

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText('Home')).toBeInTheDocument(); // Procura um elemento na página que esteja escrito Home

    // debug(); // é como um console.log que mostra o html virtual gerado
  });

  // pode ser da forma de cima ou de baixo

  // Vamos testar a funcionalidade dele
  it('adds active class if the link as currently active', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText('Home')).toHaveClass('active'); // Procura um elemento na página que esteja escrito Home
  });
});
