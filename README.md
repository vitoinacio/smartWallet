# 💼 SmartWallet

SmartWallet é uma dashboard moderna e atraente para gestão financeira. Este projeto permite que os usuários gerenciem suas finanças de forma eficaz através de diversas funcionalidades disponíveis na aplicação.

## 🌟 Funcionalidades

- **🏠 Tela de Início**
  - Apresenta informações sobre a empresa fictícia "SmartWallet".
  - Opção para cadastrar novos usuários.

- **📊 Dashboard**
  - Exibe gráficos de gastos mensais.
  - Gráfico detalhado de entradas, saídas e movimentações em débitos.

- **👤 Página de Usuário**
  - Visualização das informações do usuário.
  - Edição de dados e foto de perfil.

- **💸 Gerenciamento de Finanças**
  - Adição de novas finanças e contas a pagar.
  - Edição e exclusão de contas.
  - Marcação de contas como pagas.
  - Cada conta inclui identificação, descrição, data de vencimento, notificações sobre o débito e valor.

- **🔔 Notificações**
  - Tela para visualização de notificações relacionadas aos débitos.

- **⚙️ Configurações**
  - Opção para alterar o tema da aplicação.

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS para estilização rápida e eficiente.
- **Vite**: Ferramenta de build rápida e moderna.
- **shadcdn**: CDN para carregar componentes de terceiros.
- **react-hook-form**: Biblioteca para gerenciamento de formulários em React.
- **react-toastify**: Biblioteca para exibição de notificações.
- **axios**: Cliente HTTP para realizar requisições à API.

## 🏗️ Arquitetura do Projeto

O projeto é desenvolvido utilizando a arquitetura MVVM (Model-View-ViewModel), onde:

- **Model**: Representa a lógica de negócio e os dados da aplicação.
- **View**: Responsável pela interface com o usuário.
- **ViewModel**: Atua como um intermediário entre o Model e a View, gerenciando a lógica de apresentação.

### Estrutura de Pastas

- **src/**: Contém o código-fonte do projeto.
  - **components/**: Componentes reutilizáveis da aplicação.
  - **hooks/**: Hooks customizados para lógica de estado e efeitos.
  - **pages/**: Páginas principais da aplicação.
  - **lib/**: Bibliotecas e utilitários específicos do projeto.
  - **service/**: Serviços para integração com APIs.

## 🛠️ Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/vitoinacio/smartWallet.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd smartWallet
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🤝 Como Contribuir

1. Faça um fork do projeto.
2. Crie uma nova branch para a sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m 'Add minha feature'
   ```
4. Envie para a branch principal:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.
