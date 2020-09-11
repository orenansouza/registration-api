# Registration API

API para registrar um usuário com nome e email.

Nosso projeto irá utilizar o banco de dados mysql e nodejs.
Para rodar nosso banco de dados mysql iremos utilizar o docker.

**Instalação**

Instalação do docker conforme seu sistema operacional: https://docs.docker.com/engine/install/.

Clonando o projeto: `git clone https://github.com/orenansouza/registration-api.git`.

**Iniciando o banco de dados**

Vá a raiz do seu projeto inicie o banco de dados com o comando `docker-compose up`.

**Iniciando o projeto**

Vá a raiz do seu projeto inicie a API com o comando `yarn start`.

### POST `http://localhost:3000/user/`

- Payload:

```json
{
  "name": "username",
  "email": "email@email.com"
}
```

Este método irá criar um usuário no banco de dados e retornar:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "username",
    "email": "email@email.com",
    "updatedAt": "2020-09-11T03:58:04.137Z",
    "createdAt": "2020-09-11T03:58:04.137Z"
  }
}
```

### GET `http://localhost:3000/users/`

Este método irá retornar uma listagem dos usuários com paginação conforme abaixo:

```json
{
  "success": true,
  "pagination": {
    "totalItems": 1,
    "totalPages": 1,
    "currentPage": 1
  },
  "users": [
    {
      "id": 1,
      "name": "username",
      "email": "email@email.com",
      "createdAt": "2020-09-11T03:58:04.000Z",
      "updatedAt": "2020-09-11T04:01:19.000Z"
    }
  ]
}
```

### PUT `http://localhost:3000/user/:id`

- Payload:

```json
{
  "name": "username novo",
  "email": "email_novo@email.com"
}
```

Este método irá atualizar o usuário pelos novos dados informado no payload e irá retornar:

````json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Renan",
    "email": "renan2@email.com",
    "createdAt": "2020-09-11T03:58:04.000Z",
    "updatedAt": "2020-09-11T04:01:19.000Z"
  }
}
```
````
