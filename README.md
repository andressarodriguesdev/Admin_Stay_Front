# Admin Stay UI

Admin Stay UI é a interface web do sistema de hospedagem Admin Stay, desenvolvida com ReactJS e TailwindCSS. O sistema permite gerenciar clientes, quartos e reservas, além de visualizar estatísticas e ações recentes. Este front-end se conecta a uma API desenvolvida em Java Spring Boot com banco de dados H2.

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

## Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/admin-stay-ui.git
```

### 2. Acesse o diretório do projeto

```bash
cd admin-stay-ui
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse o sistema em [http://localhost:5173](http://localhost:5173)

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Altere conforme o endereço da sua API backend.

## Estrutura de Pastas

```bash
src/
├── assets/            # Imagens, logos e fundos
├── components/        # Componentes reutilizáveis
├── pages/             # Telas (login, dashboard, cadastros, listagens)
├── services/          # Requisições HTTP e instância do Axios
├── App.jsx            # Componente principal
└── main.jsx           # Ponto de entrada da aplicação
```

## Funcionalidades

### Autenticação

- Login de usuários
- Cadastro de novos usuários

### Dashboard

- Exibição de estatísticas:
  - Clientes ativos
  - Quartos disponíveis
  - Últimas atualizações
- Ações rápidas:
  - Nova reserva
  - Novo cliente
  - Novo quarto
- Lista de ações recentes realizadas pelo usuário

### Clientes

- Cadastro de cliente
- Listagem de clientes
- Visualização de informações do cliente
- Exclusão de cliente

### Quartos

- Cadastro de quarto
- Listagem de quartos
- Visualização de informações do quarto
- Exclusão de quarto

### Reservas

- Cadastro de reserva
- Listagem de reservas
- Exclusão de reserva

## Layout Responsivo

- Abordagem mobile-first
- Adaptação para telas maiores a partir de 768px
- Fonte Poppins
- Paleta de cores suaves e tons pastéis
- Componentes reutilizáveis e interface amigável

## Design

- Design criado no Figma (não incluso neste repositório)
- Tela de login com card centralizado e efeito de vidro (glassmorphism)
- Seção lateral com branding (logo, frase e botão)
- Elementos visuais inspirados em peças de Lego

## Licença

Este projeto está licenciado sob a licença MIT.  
Consulte o arquivo `LICENSE` para mais informações.

## Autoria

Desenvolvido por **Andressa Rodrigues**

