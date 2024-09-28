
# 🩸 Frontend do Sistema de Agendamento de Doação de Sangue

## 📝 Descrição do Projeto
Este projeto tem como objetivo desenvolver o frontend de um sistema que controla o processo de agendamento de doações de sangue em uma instituição. Ele se conecta à API RESTful desenvolvida para gerenciar entidades como tipos sanguíneos, pessoas, locais de coleta e doações.

## 🛠️ Tecnologias Utilizadas
As tecnologias escolhidas para o desenvolvimento do frontend incluem:
- **[Vite](https://vitejs.dev/)**: Um construtor de projetos rápido e moderno que oferece uma experiência de desenvolvimento otimizada.
- **[Vue.js](https://vuejs.org/)**: Um framework progressivo para construção de interfaces de usuário, permitindo uma abordagem reativa e componentes reutilizáveis.
- **[Naive UI](https://www.naiveui.com/)**: Uma biblioteca de componentes de UI baseada em Vue 3 que oferece uma variedade de componentes prontos e personalizáveis.

## 📂 Estrutura do Projeto
A estrutura do projeto foi organizada de forma modular, permitindo uma melhor separação de preocupações, reutilização de código e facilidade de manutenção. Essa abordagem tem os seguintes benefícios:
- **Escalabilidade**: Permite adicionar novos recursos e componentes de forma mais fácil.
- **Organização**: Ajuda a manter o código mais limpo e gerenciável.
- **Reutilização**: Facilita o uso de componentes em diferentes partes da aplicação.

#### 🧬 Estrutura de Arquivos
- **src/**: Contém todo o código fonte do projeto.
  - **assets/**: Imagens e outros ativos utilizados na aplicação.
  - **i18n/**: Configuração do i18n para internacionalização da aplicação.
  - **router/**: Configuração das rotas da aplicação.
  - **views/**: Páginas principais que compõem a interface do usuário.
    - **views/dashboard/**: Estrutura de componentes das páginas do dashboard.
        - **views/dashboard/components/**: Componentes reutilizáveis do dashboard.
        - **views/dashboard/hooks/**: Hooks personalizados utilizados no dashboard.
        - **views/dashboard/views/**: Páginas do dashboard.
            - **views/dashboard/views/admin/**: Páginas do dashboard do administrador.
            - **views/dashboard/views/public/**: Páginas do dashboard público.

## 🚀 Executando a Aplicação Localmente 
Para executar o frontend localmente, siga os passos abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/kevin504-max/frontend.git
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure a URL da API**: 
   Altere a URL para onde as requisições serão feitas no seu arquivo `.env`. Por padrão, utilize:
   ```javascript
   VITE_DB_URL = "http://localhost:3300/api";
   ```

4. **Inicie o servidor**:
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação** em `http://localhost:5173`.

## 📡 Requisições à API
As requisições à API serão feitas para a URL configurada (`http://localhost:3300/api`), que fornece acesso às funcionalidades do backend, permitindo a criação, leitura, atualização e exclusão de registros.
