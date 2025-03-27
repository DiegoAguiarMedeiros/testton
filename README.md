# 🚀 Projeto TestTon Node.js

Este é um projeto Node.js seguindo a arquitetura **Clean Architecture**, utilizando **TypeScript**, **PostgreSQL** e **Redis**.  

---

## 🐳 Como Rodar o Projeto Com Docker

### 🛠 **Pré-requisitos**
- **Docker** instalado
- **Docker Compose** instalado

### ▶️ **Passos para executar**
1. **Clone o repositório**:
   ```sh
   git clone https://github.com/DiegoAguiarMedeiros/testton.git
   cd testton
   ```

2. **Suba os containers**:
   ```sh
   npm run docker:up
   ```

3. **Acesse a aplicação**:
   O servidor estará disponível em `http://localhost:3000` 🚀  

### 📌 **Comandos Docker**

| Comando                 | Descrição |
|-------------------------|-----------|
| `npm run docker:up`    | Inicia os containers em segundo plano |
| `npm run docker:build` | Recria e inicia os containers |
| `npm run docker:run`   | Reinicia apenas o serviço `app` |
| `npm run docker:stop`  | Para todos os containers |

---

## 🚀 Como Rodar o Projeto Sem Docker  

### 🛠 **Pré-requisitos**
- **Node.js 23**  
- **PostgreSQL** rodando localmente (`localhost:5432`)
- **Redis** rodando localmente (`localhost:6379`)
- **Banco de dados PostgreSQL criado** (`meu_banco`)

### ▶️ **Passos para executar**
1. **Clone o repositório**:
   ```sh
   git clone https://github.com/DiegoAguiarMedeiros/testton.git
   cd testton
   ```

2. **Instale as dependências**:
   ```sh
   npm install
   ```

3. **Configure o banco de dados**:  
   - Crie um banco no PostgreSQL:  
     ```sql
     CREATE DATABASE meu_banco;
     ```
   - Configure as variáveis no arquivo `.env`:
     ```
     DATABASE_URL=postgres://usuario:senha@localhost:5432/meu_banco
     REDIS_HOST=localhost
     REDIS_PORT=6379
     PORT=3000
     ```

6. **Inicie o servidor**:  
   - Em modo desenvolvimento:
     ```sh
     npm run dev
     ```
   - Em modo produção:
     ```sh
     npm run build && npm start
     ```

   O servidor estará disponível em `http://localhost:3000` 🚀  

---

## 🧪 Rodando os Testes  
Para executar os testes unitários:  
```sh
npm run test
```
Para gerar o relatório de cobertura de testes:  
```sh
npm run test:coverage
```

---

## 🛠 Comandos Úteis  

| Comando                 | Descrição |
|-------------------------|-----------|
| `npm run dev`          | Inicia o servidor em modo desenvolvimento |
| `npm run build`        | Compila o código TypeScript para JavaScript |
| `npm start`           | Executa o código compilado em `dist/` |
| `npm run test`        | Executa os testes unitários |
| `npm run test:coverage` | Executa os testes e gera cobertura |

---

## 📌 Acessando o Swagger

Após iniciar o servidor, você pode acessar a documentação da API via Swagger em:

http://localhost:3000/api-docs/

---

## 📄 Licença
Este projeto está sob a licença MIT.  

