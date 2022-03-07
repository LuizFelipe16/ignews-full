Testes garantem confiabilidade no seu código, em uma aplicação grande, você espere que aconteça algo, mas isso pode afetar outras partes. Você consegue rodar scripts que simulam um usuário na aplicação, vendo se os fluxos funcionam

# Teste Unitários

  Garante que um componente, uma parte pequena da aplicação esteja funcionando desconectada do resto da aplicação, eu não testo como os compoentes interagem, mas sim o componente desconectado e isolado do resto.

  Pensando no modelo padrão, é como testar uma função, enviando parâmetros e esperando que eles retornem de determinada  forma, tendo determinado resultado.

# Teste de Integração

  Vai testar como duas ou mais funcionalidades funcionem juntas, por exemplo, ver se ao adicionar um usuário ele é listado logo depois.

# Teste Ponta a Ponta

  Testa a aplicação da maneira que o usuário costuma usar, como um roteiro de ações comuns do usuário na aplicação. Esse sim testa um fluxo

- vamos começar adicionado as libs:

yarn add jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest -D

Testing Library é uma das mais famosas para testar frontend, e jest é para testes no geral

- criação do jest.config.js
- criaçaõ da pasta tests e setupTests

extensão do arquivo pode ser tanto spec como test

# Módulo 1

  - Criação do ActiveLink.test

  - Criação do babel.config

  - Um erro que ocorreu foi relativo ao useRouter, causado pelo fato do Teste Unitário ser um teste completamente isolado do resto da aplicação, do resto da estrutura própria do next, do react ou de outro componente, isso é um problema para testar componentes dependentes de algum fator externo e aí veio os [Moks].

  Moks - Imitações {
    Sempre que algo que estivermos testando depender de uma funcionalidade externa a ele, precisamos criar uma imitação daquela funcionalidade, que vai permitir o test funcionar corretamente.

    arquivo ActiveLink - line 5|8 - 17|19
  }

  - Todo teste consiste em executar uma ação e dizer o que esperamos de retorno daquela ação

  - Um arquivo com muitos testes é bom colocar um describe, categorizar os testes

  - Os testes precisam estar o mais semanticos para entender o que aquilo está fazendo,

  - criado arquivo Header.test 

  - erro de estilo

  - yarn add identity-obj-proxy para o jest entender aquivos css

  - erro de componente: sempre que o que estamos testando de componente precisar, mesmo que seja por efeito colaterar, de uma biblioteca externa, precisamos fazer um mock com retorno fictício e apenas simulatório.

  - use screen ou retorno do render direto

  - criado arquivo SignInButton.test

  - precisamos testar dois tipos de funcionalidades, e nese caso `quando precisamos que o mock seja alterado, retornando algo diferente para cada um dos testes` {
    - deixar só o mock do import
    - importar a funcionalidade diretamente
    - usar lib yarn add ts-jest -D
    - uma parcela de funcionalidades a mais
    - uso do mocked para controlar a variável que é requisitada
    - mockReturnValueOnce e mockReturnValue
  }

  - criado aquivo SubscribeButton.test

  - como simular o dispatch de uma função de um botão? {
    - fireEvent
    - fazer o mocked da função em específico
  }

  - Se eu quero que o valor do mocke seja diferente para cada teste, então precisamos declarar em cada teste

# Módulo 2

  - criado Home.test

  - vamos testar o GetStaticProps da pagina Home, sua única funcionalidade de verdade {
    mokando o stripe;

    vemos uma segunda forma de validar objeto
  }

  - se a função que estivermos mockando for uma assincrina, que usa await, então devemos usar mockResolvedValueOnce(); 

  - criado Posts.test {
    testar o redirect da pagina se ele não estiver "logado"

    alguns acontecem se fazer do jeito básico então o próximo passou é testar de outra forma, mockando a função getSession para dizer nela que o usuário não está logando;

    - erro que pode dar, o redirect é outro objeto separado, então precisamos dizer só o que queremos dele também, com objectContaining

    - segundo teste precismos testar o router também
  }

# Módulo 3

  - Algumas dicas para lidar com funções async, assíncronas
  - criado componente Async

  - jest não espera, os método get não esperam e dão erro: solutions: {
    - os método assíncronos

    - trocar getByText por findByText: mesma coisa, mas espera algo acontecer por algum tempo, monitorando
    - waitfor: espero algo acontecer

    - query e waitForElementToBeRemoved: para algo que não aconteça ou esteja {
      - não pode usar o getByText, tem que user o queryByText: a diferença é que se ele não encontrar, não retorna nada, não da erro
    }
  }
  
  ## Se quer que algo não blabla use na regra, antes: .not e depois .to...

  - trocou por invisible

  - testing library possui muitos outros tipos de test {
    byPlaceholder é ótimo pra inputs,
    alt texto alternativo,
    testId: colocar uma propriedade chamada data-test-id e encontrar por isso,
    byRole: fala o tipo do elemento e o que tem dentro

    se não sabe muito bem qual usar para achar determinado elemento, então {
      screen.logTestingPlaygroundURL

      retorna uma url, onde dá pra ver o html que o componente gerou, e se clicar em determinado elemento, ele mostra como você pode encontrar ele, o que utilizar
    }
  }

  - Coverage Report: relatório de cobertura, para saber se os testes criados estão cubrindo boa parte, e quais partes são essas e quais partes ainda não estão sendo cobertas {
    - gera um relatório html sobre todos os componentes, vendo o que os testes cobrem e o que não cobrem
  }
