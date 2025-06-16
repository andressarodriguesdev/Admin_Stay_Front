<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# 🏨 Admin Stay UI

![Image](https://github.com/user-attachments/assets/e1fa6220-0d2b-4593-8755-8f8ce47546f7)

https://github.com/user-attachments/assets/cf298dbe-73e7-4b5d-819e-6903d10151af

**Admin Stay UI** é a interface web do sistema de hospedagem **Admin Stay**, desenvolvida com **ReactJS** e **TailwindCSS**.  
Permite gerenciar **clientes**, **quartos** e **reservas**, além de exibir **estatísticas** e **ações recentes**.

Este front-end se conecta a uma API em **Java Spring Boot** com banco de dados **H2**.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ [React](https://reactjs.org/)
- ⚡ [Vite](https://vitejs.dev/)
- 🎨 [TailwindCSS](https://tailwindcss.com/)
- 🔗 [Axios](https://axios-http.com/)

---

## 🛠️ Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/admin-stay-ui.git

# 2. Acesse o diretório
cd admin-stay-ui

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse o sistema em:  
[http://localhost:5173](http://localhost:5173)

---

## ⚙️ Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Altere conforme o endereço da sua API backend.

---

## 📁 Estrutura de Pastas

```bash
src/
├── assets/         # Imagens, logos e fundos
├── components/     # Componentes reutilizáveis
├── pages/          # Telas (login, dashboard, cadastros, listagens)
├── services/       # Requisições HTTP e instância do Axios
├── App.jsx         # Componente principal
└── main.jsx        # Ponto de entrada da aplicação
```

---

## ✅ Funcionalidades

### 🔐 Autenticação
- Login de usuários
- Cadastro de novos usuários

### 📊 Dashboard
- Visualização de estatísticas
- Ações rápidas (nova reserva, cliente, quarto)
- Histórico de atividades recentes

### 👥 Clientes
- Cadastro de cliente
- Listagem de clientes
- Visualização de informações
- Exclusão de cliente

### 🛏️ Quartos
- Cadastro de quarto
- Listagem de quartos
- Visualização de informações
- Exclusão de quarto

### 📅 Reservas
- Cadastro de reserva
- Listagem de reservas
- Exclusão de reserva

---

## 📱 Layout Responsivo

- Abordagem **mobile-first**
- Responsivo a partir de **768px**
- Fonte personalizada: **Poppins**
- Paleta de cores suaves e pastéis
- Interface amigável e reutilizável

---

## 🎨 Design

- Design criado no **Figma** (não incluso neste repositório)
- Tela de login com **glassmorphism** (efeito vidro)
- Seção lateral com branding:
  - Logo
  - Frase institucional
  - Botão de ação
- Elementos inspirados em **peças de Lego**

---

## 📄 Licença

Distribuído sob a licença **MIT**.  
Consulte o arquivo `LICENSE` para mais informações.

---

## 👩‍💻 Autoria

Desenvolvido com 💜 por **Andressa Rodrigues**
>>>>>>> 0dd1724f60a676f4665a3975510a0ad887156a9e
