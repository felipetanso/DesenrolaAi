# DesenrolaAi API

Desenrola Aí tem uma API REST para que empresas consigam automatizar processos, buscar o melhor candidato, por exemplo, entre outras funcionalidades.

# Endpoints

- [User](#user)
- [Motivation](#motivation)
- [Dailies](#dailies)
- [DISC](#disc)

## user

### [GET] api/v1/user/me

Retorna informações da conta a qual o token JWT está associado.

> Requer JWT token

#### Retorno

- **401:** JWT inválido
- **200:** Sucesso

```js
{
    name: String,
    friends: [String],
    level: Number,
    experience: Number,
    profileType: String,
    wallet: Number,
    image: String,
    isCompany: Boolean,
    isPremium: Boolean
}
```

### [GET] api/v1/user/validate

Valida uma sessão baseado no tempo de vida do token JWT.

> Requer JWT token

#### Retorno

- **401:** JWT inválido
- **200:** Sucesso

```js
{
    message: String
}
```

### [POST] api/v1/user/signup

Cria uma nova conta

#### Body
```js
{
    email: String,
    password: String,
    name: String,
    birthdate: String,
    location: {
        city: String,
        state: String,
        country: String
    },
    identity: String
}
```

#### Retorno

- **500:** Hash da senha falhou
- **400:** Informações inválidas
- **409:** Conta já existe
- **201:** Conta criada

```js
{
    message: String
}
```

### [POST] api/v1/user/login

Cria um novo JWT token para aquela conta, usado para autenticação.

#### Retorno

- **401:** Autenticação falhou
- **200:** Autenticação foi realizada com sucesso

```js
{
    message: String
}
```

### [GET] api/v1/user/:userId

Busca informações básicas de um usuário baseado em seu id.

#### Retorno

- **404:** Usuário não existe
- **200:** Busca foi realizada com sucesso

```js
{
    name: String,
    friends: [String],
    level: String,
    experience: String,
    image: String,
    isCompany: String,
    isPremium: String
}
```

## Motivation

## [GET] api/v1/motivation

Retorna uma lista de perguntas para o teste de motivações ser feito. 

> Requer JWT token

#### Retorno

- **401:** Autenticação inválida
- **200:** Lista de perguntas

```js
[
    {
        questionId: Number,
        question: String
    }
]
```

## [POST] api/v1/motivation/calculate

Retorna os resultados da pesquisa de motivação baseada nas respostas do usuário.

> Requer JWT Token

#### Body

- Key: Id da pergunta
- Value: Peso da resposta | x > 0 && x <= 5;

```js
{
    choices: {
        String: Number
    }
}
```

#### Retorno

```js
{
    results: {
        MONEY: Number,
        SECURITY: Number,
        LEARNING: Number,
        SOCIAL: Number,
        SELF: Number
    }
}
```

## Dailies

Endpoint responsável pelas tarefas diárias que um usuário tem acesso.

### [GET] api/v1/dailies/

Retorna uma pergunta diária para o usuário.

> Requer JWT Token

#### Retorno

- **200:** Requisição foi aceita

```js
{
    text: String,
    type: String,
    _id: String
}
```

- **500:** Usuário já completou uma tarefa hoje
- **401:** Autenticação falhou

```js
{
    message: String
}
```

## [POST] api/v1/dailies/submit

Responde a pergunta diária

> Requer JWT Token

#### Retorno

- **200:** Resposta aceita
- **400:** Resposta inválida
- **401:** Autenticação falhou

```js
{
    message: String
}
```


## DISC

## [GET] api/v1/disc

Retorna uma lista de perguntas para o teste de DISC ser feito. 

> Requer JWT token

#### Retorno

- **401:** Autenticação inválida
- **200:** Lista de perguntas

```js
[
    {
        questionId: Number,
        question: String
    }
]
```

## [POST] api/v1/disc/calculate

Retorna os resultados da pesquisa de DISC baseada nas respostas do usuário.

> Requer JWT Token

#### Body

- Key: Id da pergunta
- Value: Peso da resposta | x > 0 && x < 5;

```js
{
    choices: {
        String: Number
    }
}
```

#### Retorno

```js
{
    sums: {
        DOMINANT: Number,
        INFLUENT: Number,
        STABILITY: Number,
        CAUTIOUS: Number
    }
    results: {
        personality: String,
        personalityId: String,
        strongTraits: [String],
        mainTraits: [String],
        weakTraits: [String],
        idealPositions: [String]
    }
}
```