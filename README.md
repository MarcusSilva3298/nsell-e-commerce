# NSell E-Commerce

## Descrição
Este projeto consiste num sistema de gerenciamento de E-Commerce simplificado, contando com usuários, login, produtos, carrinhos e relatório de venda de produtos.

## Tecnologias Usadas

- **NestJS**: Framework Node.js para criar aplicações eficientes e escaláveis.
- **TypeScript**: Linguagem usada para o desenvolvimento do projeto.
- **PostgreSQL**: Banco de dados utilizado.
- **Prisma**: ORM para interação com o banco de dados.
- **Stripe**: Para simulação de pagamentos.
- **Jest**: Framework de testes.

## Requisitos
- Docker e Docker Compose instalados
- Node.js e Yarn instalados
- Conta no [Mailtrap](https://mailtrap.io/) para enviar e-mails
- Conta no [Stripe](https://stripe.com/) para integração de pagamentos

## Instalação e Configuração

### 1. Clone o repositório:
Clone o repositório via https, SSH ou GitHub CLI.
   
### 2. Instalar dependências:
Instale as dependências dos projetos via npm, pnpm ou yarn (utilizado durante o desenvolvimento).

### 3. Crie um Container do PostgreSQL:
Caso não tenha um container do PostgreSQL na porta 5432 com usuário postgres:postgres, utilize o docker-compose do projeto para subir um container com o seguinte comando:

```bash
docker compose up -d
```

### 4. Crie/Acesse suas contas do Mailtrap e Stripe:
Caso não tenha feito ainda, vá até os sites listados no tópico de requisitos e faça suas contas no Mailtraip e Stripe.

### 5. Preencha as variáveis de ambiente:
Copie o `example.env` renomeie-o para `.env`, você pode utilizar o seguinte comando:

```bash
cp example.env .env
```

Não esqueça de prenchar as variáveis de ambiente do Mailtrap e Stripe, do contrário a aplicação não funcionará.

### 6. Rode as Migrations:
Utilize o comando abaixo para rodar as migrations e a seed do prisma.
```bash
yarn prisma migrate deploy
```

### 7. Inicialize o servidor
Utilize o comando abaixo para incializar o servidor.
```bash
yarn start:prod
```

### 8. Aplique os testes unitários
Caso tenha interesse, é possível iniciar uma rodada de testes unitários automatizados com o seguinte comando:
```bash
yarn test:unit
```