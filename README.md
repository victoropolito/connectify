# Connectify - Gerenciador de Contatos

## Descrição
Aplicação web para gerenciar contatos, com backend em Node.js e frontend em Vue.js com Vuetify.

## Funcionalidades
* Adicionar contatos
* Listar contatos
* Editar contatos
* Excluir contatos
* Validação de dados
* Formatação da tabela com base no DDD

## Tecnologias utilizadas
* Node.js - Caso não tenha instalado na sua máquina, basta acessar o link: `https://nodejs.org/en/download/package-manager`.
* Express
* MySQL
* Vue.js
* Vuetify
* Axios

## Como configurar e rodar o projeto

### Backend
1. **Clonar o repositório:**
    ```bash
    git clone <URL do repositório>
    ```

2. **Instalar as dependências:**
    ```bash
    cd connectify
    npm install
    ```

3. **Criar o banco de dados MySQL:**
    * De preferência criar um banco de dados chamado `connectify_db`.
    * Se preferir, pode usar outro nome, mas que seja usado o mesmo nome no `.env`.

4. **Configurar as variáveis de ambiente:**
    * Criar um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:
        ```
        DB_HOST=localhost
        DB_USER=seu_usuario
        DB_PASSWORD=sua_senha
        DB_DATABASE=connectify_db
        ```

5. **Iniciar o servidor:**
    ```bash
    node server.js
    ```

### Frontend
* Abrir o arquivo `index.html` no navegador para acessar a aplicação.

**Observações:**

* Certifique-se de que o MySQL esteja instalado e configurado corretamente na sua máquina.
* Ajuste as variáveis de ambiente no arquivo `.env` de acordo com as suas configurações do MySQL.
* O projeto frontend não requer nenhuma configuração adicional, pois utiliza bibliotecas via CDN.
* O script SQL para criar a tabela `contatos` é executado automaticamente pelo backend, 
  eliminando a necessidade de execução manual.
