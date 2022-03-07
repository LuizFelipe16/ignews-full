import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { getPrismicClient } from '../../services/prismic';
import Posts, { getStaticProps } from '../../pages/posts';

const posts = [
  { slug: 'my-test-post', title: 'My Test Post', excerpt: 'Post excerpt', updatedAt: '10 April' }
];

jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My Test Post")).toBeInTheDocument();
  });

  it('load posts of prismic in GetStaticProps Method', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-test-post',
            data: {
              title: [
                { type: 'heading', text: 'My Test Post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ],
            },
            last_publication_date: '04-01-2021'
          }
        ]
      }) // uma função await que deve retornar...
    } as any); // quando x método mockado for chamado, quero que retorne para mim...
    // as any porque ele espera que tenha mais funções do que só query

    const response = await getStaticProps({});

    expect(response).toEqual(
      // aqui ele diz que se esse objeto pelo menos conter isso, então é igual
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-test-post',
            title: 'My Test Post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021'
          }]
        }
      })
    );
  });
});