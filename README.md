# Gerencianet TypeScript SDK - Integração de Typescript com as APIs Efí Pay

Este pacote oferece uma SDK moderna para integrar a API da Gerencianet com TypeScript. Diferente da SDK oficial, esta versão foi desenvolvida com foco total no TypeScript, proporcionando segurança de tipos e melhor reportagem de erros durante o desenvolvimento.


**Atenção**: O pacote está em desenvolvimento ativo. Atualmente, a API de PIX já está completamente integrada, exceto os Endpoints exclusivos da Efí Pay. Outras funcionalidades serão implementadas em futuras atualizações.

---

### Ir para:



- [Instalação](#instalação)

  ---
- [Variáveis de Ambiente (Environment Variables)](#variáveis-de-ambiente-environment-variables)
  - [Gerar automaticamente as Variáveis Ambientes](#gerar-automaticamente-as-variáveis-ambientes)
    - [Criar `.env` através do SDK](#criar-env-através-do-sdk)
    - [Escrever as Variáveis de Ambiente em um `.env` já existente](#escrever-as-variáveis-de-ambiente-em-um-env-já-existente)
    - [Sobrescrever `.env` com as novas Variáveis de Ambiente](#sobrescrever-env-com-as-novas-variáveis-de-ambiente)
    - [Gerar manualmente as Variáveis de Ambiente](#gerar-manualmente-as-variáveis-de-ambiente)

    - [Validação e Segurança de Tipagem](#validação-e-segurança-de-tipagem)

  ---
- [Credenciais](#credenciais)
  - [Primeiro Passo -  Criação da Conta](#primeiro-passo----criação-da-conta)
  - [Segundo Passo - Criação de um Aplicativo](#segundo-passo---criação-de-um-aplicativo)
  - [Terceiro Passo - Criação dos Certificados](#terceiro-passo---criação-dos-certificados)
    - [Certificados em formato `base64`](#certificados-em-formato-base64)
    - [Criação do arquivo `.env`](#criação-do-arquivo-env)
    - [Arquivo `.env` já existente](#arquivo-env-já-existente)

  - [Quarto Passo - Criação da Chave Pix](#quarto-passo---criação-da-chave-pix)  

  ---
- [Utilização do SDK](#utilização-do-sdk)
  - [Utilizar certificados em formato `base64`](#utilizar-certificados-em-formato-base64)
  - [Utilizar certificados em formato `Buffer`](#utilizar-certificados-em-formato-buffer)
  - [Utilizar o SDK sem as Variáveis de Ambiente](#utilizar-o-sdk-sem-as-variáveis-de-ambiente)

    ---
  - [API PIX](#api-pix)
    - [Cobranças imediatas - **imediateCharge**](#cobranças-imediatas---imediatecharge)
    - [Cobranças com vencimento - **dueCharge**](#cobranças-com-vencimento---duecharge)
    - [Envio e Pagamento Pix - **sendAndPayment**](#envio-e-pagamento-pix---sendandpayment)
    - [Webhooks - **webhooks**](#webhooks---webhooks)
    - [Gestão de Pix - **manage**](#gestão-de-pix---manage)
    - [Payload Locations - **payloadLocations**](#payload-locations---payloadlocations)
    - [Cobranças em Lote - **batchCollections**](#cobranças-em-lote---batchcollections)
    - [Split de pagamento Pix - **paymentSplit**](#split-de-pagamento-pix---paymentsplit)

      ---
  - [API Cobranças](#api-cobranças)
    - [Cartão - **card**](#cartão---card)

---

## Instalação

```bash
npm i @bruno-valero/gerencianet-sdk-typescript
```

## Variáveis de Ambiente (Environment Variables)

As variáveis de ambiente **[Não são mais obrigatórias para que o sdk funcione](#utilizar-o-sdk-sem-as-variáveis-de-ambiente)**, porém é recomendável utilizá-las. Elas são usadas para informar as **[Credenciais](#credenciais)** necessárias para utilizar as APIs da Efí Pay, para configurá-las siga os passos abaixo:

### Gerar automaticamente as Variáveis Ambientes

Agora é possível utilizar o SDK para **gerar automaticamente todas as variáveis ambientes necessárias**. Por padrão elas serão geradas com valores dummy padrão, porém você pode inserir o valor de cada uma delas durante a criação se desejar. 

Para criar as variáveis de ambiente, importe a classe `EfiPay` de `@bruno-valero/gerencianet-sdk-typescript` e use seu método estático `generateDotEnv` passando os valores das variáveis que você deseja. **Não é obrigatório preencher todas as variáveis**, as que não forem preenchidas por você serão substituídas por valores dummy padrão.


Observe o exemplo:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

EfiPay.generateDotEnv({
  variables: {
    CLIENT_ID_HOMOLOGACAO: 'meu client id de Homologação',
    CLIENT_ID_PRODUCAO: 'meu client id de Produção',
    CLIENT_SECRET_HOMOLOGACAO: 'meu client secret de Homologação',
    CLIENT_SECRET_PRODUCAO: 'meu client secret de Produção',
    PIX_KEY: 'minha chave pix',
    WEBHOOK_PIX: 'minha url de webhook pix',
  },
})

```

**Lembrando que para que as variáveis sejam efetivamente geradas, será necessário [executar o script criado](#executar-a-geração-automática-das-variáveis-de-ambiente).**

### Criar `.env` através do SDK

Se você ainda não criou um arquivo `.env` na raiz do seu projeto, o método `EfiPay.generateDotEnv()` irá criar este arquivo e escrever nele todas as variáveis de ambiente necessárias. 

**Lembrando que para que as variáveis sejam efetivamente geradas, será necessário [executar o script criado](#executar-a-geração-automática-das-variáveis-de-ambiente).**

### Escrever as Variáveis de Ambiente em um `.env` já existente

Caso já haja um arquivo `.env` na raiz do seu projeto, ao usar o método `EfiPay.generateDotEnv()` ele irá escrever todas as variáveis de ambiente necessárias abaixo do conteúdo já existente no seu arquivo `.env`, portanto nenhuma das variáveis que você escreveu previamente serão substituídas ou sobrescritas. 

**Lembrando que para que as variáveis sejam efetivamente geradas, será necessário [executar o script criado](#executar-a-geração-automática-das-variáveis-de-ambiente).**

### Sobrescrever `.env` com as novas Variáveis de Ambiente

Caso já haja um arquivo `.env` na raiz do seu projeto e você queira sobrescrever completamente seu com as variáveis geradas automaticamente, basta passar a propriedade `mode: "overwite"`, da seguinte forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

EfiPay.generateDotEnv({
  variables: {
    CLIENT_ID_HOMOLOGACAO: 'meu client id de Homologação',
    CLIENT_SECRET_HOMOLOGACAO: 'meu client secret de Homologação',
  },
  // esta opção irá fazer com que o conteúdo do arquivo ".env" existente seja completamente sobrescrito
  mode: 'overwrite',
})
```

**Lembrando que para que as variáveis sejam efetivamente geradas, será necessário [executar o script criado](#executar-a-geração-automática-das-variáveis-de-ambiente).**

### Executar a geração automática das Variáveis de Ambiente

Após criar o script que irá gerar as variáveis de ambiente conforme os exemplos de código acima, será necessário executá-lo para que as variáveis de ambiente sejam efetivamente geradas. 

Então para facilitar o trabalho, escreva o script em um arquivo na raiz do seu projeto chamado `generate-dot-env.js`, agora basta abrir o terminal no diretório raiz do projeto e digitar o comando `node ./generate-dot-env.js`

---

### Gerar manualmente as Variáveis de Ambiente

Caso você queira escrever manualmente o conteúdo de suas variáveis de ambiente, siga os passos abaixo:

- Crie um arquivo na raiz do projeto com nome de `.env`.
- Abra o arquivo num editor de texto e armazene as seguintes variáveis de ambiente.

```bash
# CERTIFICATES ********************************************
CERTIFICADO_HOMOLOGACAO_PATH="./path/to/homologacao-certificate.(p12|pem)"
CERTIFICADO_PRODUCAO_PATH="./path/to/producao-certificate.(p12|pem)"

CERTIFICADO_HOMOLOGACAO_BASE64="base64_string_of_homologacao"
CERTIFICADO_PRODUCAO_BASE64="base64_string_of_producao"

# CREDENTIALS ********************************************
# HOMOLOGACAO
CLIENT_ID_HOMOLOGACAO="Your_Client_Id_for_Homologacao"
CLIENT_SECRET_HOMOLOGACAO="Your_Client_Secret_for_Homologacao"
# PRODUCAO
CLIENT_ID_PRODUCAO="Your_Client_Id_for_Producao"
CLIENT_SECRET_PRODUCAO="Your_Client_Secret_for_Producao"

# SUPPORT VARIABLES ********************************************
# PIX
PIX_KEY="you-pix-key--might-be-cpf-watsappNumber-or-randomkey-generated-by-efi-bank"
#WEBHOOKS
WEBHOOK_PIX="https://your-url/webhook/pix?ignorar=&hmac=your-custom-key"
# ACCOUNT IDENTIFIER
ACCOUNT_IDENTIFIER="your_account_identifier"
```

- Se não estiver usando um framework, será necessário instalar o `dotenv` para ter acesso às variáveis de ambiente. Se for o caso, execute:

```bash
npm i dotenv
```

### Validação e Segurança de Tipagem

Para obter maior segurança de tipagem é recomendado criar um arquivo para validar as variáveis de ambiente. Abaixo está um exemplo utilizando a biblioteca `zod`.

**Instale a biblioteca**

```bash
npm i zod
```

**Crie um arquivo com nome `env.ts` e valide as variáveis da seguinte forma:**

```ts
import 'dotenv/config'

import z from 'zod'

const envSchema = z.object({
  // CERTIFICATES
  CERTIFICADO_HOMOLOGACAO_PATH: z
    .string()
    .min(1, 'environment variable "CERTIFICADO_HOMOLOGACAO_PATH" is missing'),
  CERTIFICADO_PRODUCAO_PATH: z
    .string()
    .min(1, 'environment variable "CERTIFICADO_PRODUCAO_PATH" is missing'),
  CERTIFICADO_HOMOLOGACAO_BASE64: z
    .string()
    .min(1, 'environment variable "CERTIFICADO_HOMOLOGACAO_BASE64" is missing'),
  CERTIFICADO_PRODUCAO_BASE64: z
    .string()
    .min(1, 'environment variable "CERTIFICADO_PRODUCAO_BASE64" is missing'),

  // CREDENTIALS
  CLIENT_ID_HOMOLOGACAO: z
    .string()
    .min(1, 'environment variable "CLIENT_ID_HOMOLOGACAO" is missing'),
  CLIENT_SECRET_HOMOLOGACAO: z
    .string()
    .min(1, 'environment variable "CLIENT_SECRET_HOMOLOGACAO" is missing'),
  CLIENT_ID_PRODUCAO: z
    .string()
    .min(1, 'environment variable "CLIENT_ID_PRODUCAO" is missing'),
  CLIENT_SECRET_PRODUCAO: z
    .string()
    .min(1, 'environment variable "CLIENT_SECRET_PRODUCAO" is missing'),

  // SUPPORT VARIABLES
  PIX_KEY: z
    .string()
    .min(1, 'environment variable "PIX_KEY" is missing'),
  WEBHOOK_PIX: z
    .string()
    .min(1, 'environment variable "WEBHOOK_PIX" is missing'),
  ACCOUNT_IDENTIFIER: z
    .string()
    .min(1, 'environment variable "ACCOUNT_IDENTIFIER" is missing'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success)
  throw new Error(
    `Environment variables error. Make sure that you have been created a  ".env" file at the root of your project.
    
    Also make sure that all environment variables have been set. See the documentation to learn about the environment variables that is required at "https://www.npmjs.com/package/@bruno-valero/gerencianet-sdk-typescript?activeTab=readme"

    Error details:

    ${JSON.stringify(_env.error.format(), null, 2)}
    `,
  )

export const env = _env.data
```

## Credenciais

Para poder utilizar as APIs da Efí Pay é necessário fornecer algumas credenciais que serão passadas através das **[Variáveis de Ambiente](#variáveis-de-ambiente-environment-variables)**, vamos entender cada uma delas.

### Primeiro Passo -  Criação da Conta

É necessário **[criar uma conta na gerencianet (Efí Pay)](https://sejaefi.com.br/abrir-conta)** para poder obter as credenciais das APIs Efí Pay. **[Assista o vídeo que explica o processo de criação de contas](https://www.youtube.com/watch?v=CrEg9d0hH6Y&list=PLRqvcUTH2VsWufBmzOdTVeLEOTGrPNoiu&index=3)** se necessário.

### Segundo Passo - Criação de um Aplicativo

Para ter acesso às suas credenciais é necessário criar um aplicativo. Ele representa uma conta dentro da Gerencianet que terá acesso às APIs da Efí Pay de forma que você pode ter diversos aplicativos, cada um contendo suas próprias credenciais e representando, por exemplo, um negócio aberto por você.

- Vá até a aba API
![Vá até a aba API](README_IMAGES/go-to-api.png)

- Então crie uma aplicação
![Então crie uma aplicação](README_IMAGES/create-an-application.png)

Depois de criada, acesse a aba **Aplicações** de suas APIs. Ela listará todas as suas aplicações criadas. Escolha a aplicação que você acabou de criar e então terá acesso às suas credenciais **Client ID** e **Client Secret** de Produção e de Homologação.

Com essas credenciais, alimente as **[Variáveis de Ambiente](#variáveis-de-ambiente-environment-variables)** `CLIENT_ID_HOMOLOGACAO`, `CLIENT_SECRET_HOMOLOGACAO` e `CLIENT_ID_PRODUCAO`, `CLIENT_SECRET_PRODUCAO`. **Lembrando que agora é possível [gerá-las automaticamente](#gerar-automaticamente-as-variáveis-ambientes) através do SDK.**

### Terceiro Passo - Criação dos Certificados

Acesse a aba **Meus Certificados** abaixo da aba **Aplicações** e então crie um certificado para Produção e outro para Homologação.

Ao criar um certificado, você receberá um arquivo que deve ser baixado no seu computador, **certifique-se de não perder este arquivo**, pois ele só pode ser baixado no momento da criação do certificado e **não estará disponível para download posteriormente**.

Salve o arquivo em algum lugar dentro do seu projeto e após fazer isso alimente as **[Variáveis de Ambiente](#variáveis-de-ambiente-environment-variables)** `CERTIFICADO_HOMOLOGACAO_PATH` e `CERTIFICADO_PRODUCAO_PATH` com o caminho do arquivo onde você salvou os certificados, exemplo: `"./src/certificados/homologacao.p12"`. **Lembrando que agora é possível [gerá-las automaticamente](#gerar-automaticamente-as-variáveis-ambientes) através do SDK.**

#### Certificados em formato `base64`

Agora o SDK oferece uma forma de converter seus cerificados em formato `base64`. 

Para realizar a conversão certifique-se de ter salvo os certificados em algum lugar em seu computador, então importe a classe `EfiPay` de `@bruno-valero/gerencianet-sdk-typescript` e use seu método estático `generateBase64FromCertificate` passando os caminhos onde os certificados estão salvos. **Não é obrigatório passar os caminhos de todos os certificados**, os que não forem preenchidos por você serão substituídas por valores dummy padrão.

Observe o exemplo:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

EfiPay.generateBase64FromCertificate({
  certificadoHomologacaoPath: 'caminho/ate/o-certificado/de/homologacao.p12',
  certificadoProducaoPath: 'caminho/ate/o-certificado/de/producao.p12',
})
```

#### Criação do arquivo `.env`

Caso o arquivo `.env` não exista na raiz do seu projeto, o SDK irá criá-lo após a [execução do script de conversão](#executar-a-conversão-dos-certificados-em-em-formato-base64), preenchendo todas as variáveis de ambiente com valores dummy padrão, exceto as variáveis que irão conter o conteúdo dos seus certificados convertidos em `base64`.

#### Arquivo `.env` já existente

Caso o arquivo `.env` já exista na raiz do seu projeto, ao [executar o script de conversão](#executar-a-conversão-dos-certificados-em-em-formato-base64), o SDK irá preencher todas as variáveis de ambiente com valores já existentes **(as variáveis de ambiente que não existirem no `.env`, serão preenchidas com valores dummy padrão)**, exceto as variáveis que irão conter o conteúdo dos seus certificados convertidos em `base64`.

#### Executar a conversão dos certificados em em formato `base64`

Após criar o script que irá converter os certificados em em formato `base64` conforme o exemplo de código acima, será necessário executá-lo para que os certificados sejam efetivamente convertidos. 

Então para facilitar o trabalho, escreva o script em um arquivo na raiz do seu projeto chamado `certificates-to-base64.js`, agora basta abrir o terminal no diretório raiz do projeto e digitar o comando `node ./certificates-to-base64.js`

### Quarto Passo - Criação da Chave Pix

Para receber uma transação PIX é necessário criar uma chave PIX, que pode ser seu **CPF**, **Número de Celular**, **Email** ou uma **Chave Aleatória**. 

Entre em sua conta da Efí Pay, vá até a aba **Pix** e escolha a opção **Minhas Chaves** então clique no botão **Cadastrar Chave**, escolha o tipo de chave, exemplo *CPF*, *Email*, etc. Por fim alimente a **[Variável de Ambiente](#variáveis-de-ambiente-environment-variables)** `PIX_KEY` com o valor de sua chave.

![Criar a Chave PIX](README_IMAGES/create-pix-key.png)

**Após cumprir estes passos, todas as credenciais necessárias para o funcionamento do sdk estão configuradas.**


## Utilização do SDK

Para utilizar o SDK integrado ao typescript, basta importá-lo no arquivo e instanciar a classe `EfiPay` passando como parâmetro o tipo da conexão que pode ser `"PRODUCTION"` ou `"SANDBOX"`, da seguinte forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')
```

- Tipo "PRODUCTION": É a conexão com as APIs de Produção, ou seja, destinado a transações financeiras reais
- Tipo "SANDBOX": É a conexão com as APIs de Homologação, ou seja, destinado a transações financeiras fictícias


### Utilizar certificados em formato `base64`

Agora é possível instanciar a classe `EfiPay` configurada para aceitar certificados em formato `base64`. 

Caso você não tenha os certificados, [veja como obtê-los](#terceiro-passo---criação-dos-certificados) e como [convertê-los em formato `base64`](#certificados-em-formato-base64).

Para utilizar o SDK com certificados em formato `base64`, basta ter feito o [processo de conversão](#certificados-em-formato-base64) e instanciar a classe `EfiPay` passando a propriedade `certificateType: "base64"` da seguinte forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX', { certificateType: 'base64' })
```

### Utilizar certificados em formato `Buffer`

Agora é possível instanciar a classe `EfiPay` configurada para aceitar certificados em formato `Buffer`.

Esta opção é útil, caso você não queira deixar o certificado salvo em sua aplicação, deixando-o hospedado num [Amazon S3](https://aws.amazon.com/pt/s3/), [Google Cloud Storage](https://cloud.google.com/storage?hl=pt_br), entre outros.

Há duas formas de utilizar os certificados em formato `Buffer`:

- 1. Instanciar a classe `EfiPay` passando diretamente o certificado em formato buffer, sem a utilização das variáveis de ambiente. Execute o código abaixo para obter o `Buffer` de seu certificado através do `console.log`.


  ```ts
  import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

  const efi = new EfiPay('SANDBOX', {
      client_id: 'meu_client_id',
      client_secret: 'meu_client_secret',
      // passe o Buffer aqui
      certificate: bufferDoCertificado,
      // indique que os certificados serão passados em formato Buffer
      certificateType: 'buffer',
    })
  ```

- 2. Salvar o Buffer em formato `base64` através do método estático `EfiPay.generateBase64FromBufferCertificate`. Esse método irá gerar um arquivo `.env` da mesma forma que é explicado [aqui](#utilizar-certificados-em-formato-base64). Abaixo há um exemplo de como obter os dados a partir da url de download, transformar a resposta em `Buffer` e com isso utilizar o método `EfiPay.generateBase64FromBufferCertificate`.


  ```ts
  async function generateBase64FromBuffer() {
    const downloadUrlHomologacao = `your-certificate-download-url`
    const downloadUrlProducao = `your-certificate-download-url`

    const { data: dataHomologacao } = await axios.get(downloadUrlHomologacao, {
      responseType: 'blob',
    })

    const { data: dataProducao } = await axios.get(downloadUrlProducao, {
      responseType: 'blob',
    })

    const certificates = {
      homologacaoBuffer: Buffer.from(await dataHomologacao.arrayBuffer()),
      producaoBuffer: Buffer.from(await dataProducao.arrayBuffer()),
    }

    EfiPay.generateBase64FromBufferCertificate({
      certificadoHomologacaoBuffer: certificates.homologacaoBuffer,
      certificadoProducaoBuffer: certificates.producaoBuffer,
    })
  }

  generateBase64FromBuffer()
  ```

### Utilizar o SDK sem as Variáveis de Ambiente

Agora é possível utilizar o SDK sem as variáveis de ambiente. Basta passar as credenciais manualmente, da seguinte forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX', {
  client_id: 'meu_client_id',
  client_secret: 'meu_client_secret',
  certificate: 'certificado de Homologacao em formato "base64"',
  certificateType: 'base64',
})
```

---

### API PIX

A API Pix Efí oferece recursos avançados para integração com sua aplicação, permitindo que você crie soluções personalizadas e ofereça opções de pagamento inovadoras aos seus clientes. É possível criar cobranças, verificar os Pix recebidos, devolver e enviar Pix.

#### Cobranças imediatas - **imediateCharge**

Responsável pela gestão de cobranças imediatas. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.

##### Informação

É possível dividir o recebimento do pix em até 20 pessoas, um exemplo de contexto onde isto seria útil é em casos que uma comissão deve ser pagada para um dos contribuintes de um serviço.

A divisão do recebimento pode ser feita após criar a cobrança imediata e antes do pagador realizar o envio. Para dividir, basta utilizar o [split de pagamento pix](#split-de-pagamento-pix---paymentsplit)

---

- **Testes de Integração Realizados**

---

Para entender mais sobre as **cobranças imediatas**, leia as anotações typescript do SDK ou [visite a documentação oficial](https://dev.efipay.com.br/docs/api-pix/cobrancas-imediatas)

Para utilizar as **cobranças imediatas** através do SDK acesse a propriedade `imediateCharge` da api PIX, dessa forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')

efi.pix.imediateCharge.create({
  // passe os parâmetros necessários
})
efi.pix.imediateCharge.update({
  // passe os parâmetros necessários
})
efi.pix.imediateCharge.findUnique({
  // passe os parâmetros necessários
})
efi.pix.imediateCharge.findMany({
  // passe os parâmetros necessários
})
```

#### Cobranças com vencimento - **dueCharge**

Responsável pela gestão de cobranças com vencimento. As cobranças, no contexto da API Pix, representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.

##### Informação

É possível dividir o recebimento do pix em até 20 pessoas, um exemplo de contexto onde isto seria útil é em casos que uma comissão deve ser pagada para um dos contribuintes de um serviço.

A divisão do recebimento pode ser feita após criar a cobrança com vencimento e antes do pagador realizar o envio. Para dividir, basta utilizar o [split de pagamento pix](#split-de-pagamento-pix---paymentsplit)

---

- **Testes de Integração Realizados**

---

Para entender mais sobre as **cobranças com vencimento**, leia as anotações typescript do SDK ou [visite a documentação oficial](https://dev.efipay.com.br/docs/api-pix/cobrancas-com-vencimento)

Para utilizar as **cobranças com vencimento** através do SDK acesse a propriedade `dueCharge` da api PIX, dessa forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')

efi.pix.dueCharge.create({
  // passe os parâmetros necessários
})
efi.pix.dueCharge.update({
  // passe os parâmetros necessários
})
efi.pix.dueCharge.findUnique({
  // passe os parâmetros necessários
})
efi.pix.dueCharge.findMany({
  // passe os parâmetros necessários
})
```

#### Envio e Pagamento Pix - **sendAndPayment**

Traz as funcionalidades disponíveis para a gestão do Envio de Pix e do Pagamento de QR Codes Pix

---

- **Testes de Integração *Não Realizados***

---

Para entender mais sobre as **envio e pagamento pix**, leia as anotações typescript do SDK ou [visite a documentação oficial](https://dev.efipay.com.br/docs/api-pix/envio-pagamento-pix)

Para utilizar as **envio e pagamento pix** através do SDK acesse a propriedade `sendAndPayment` da api PIX, dessa forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')

efi.pix.sendAndPayment.send({
  // passe os parâmetros necessários
})
```

#### Webhooks - **webhooks**

Gerenciamento de notificações por parte do PSP recebedor a pessoa usuária recebedora.

---

- **Testes de Integração Realizados**

---

Para entender mais sobre as **webhooks**, leia as anotações typescript do SDK ou [visite a documentação oficial](https://dev.efipay.com.br/docs/api-pix/webhooks)

Para utilizar as **webhooks** através do SDK acesse a propriedade `webhooks` da api PIX, dessa forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')

efi.pix.webhooks.add({
  // passe os parâmetros necessários
})

efi.pix.webhooks.findUnique({
  // passe os parâmetros necessários
})

efi.pix.webhooks.findMany({
  // passe os parâmetros necessários
})

efi.pix.webhooks.delete({
  // passe os parâmetros necessários
})
```


#### Gestão de Pix - **manage**

Gestão das transações Pix, isto é, a manutenção dos recebimentos e devoluções Pix.

---

- **Testes de Integração *Não Realizados***

---

Para entender mais sobre as **gestão de pix**, leia as anotações typescript do SDK ou [visite a documentação oficial](https://dev.efipay.com.br/docs/api-pix/gestao-de-pix)

Para utilizar as **gestão de pix** através do SDK acesse a propriedade `manage` da api PIX, dessa forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')

efi.pix.manage.consult({
  // passe os parâmetros necessários
})

efi.pix.manage.consultMany({
  // passe os parâmetros necessários
})

efi.pix.manage.return({
  // passe os parâmetros necessários
})

efi.pix.manage.consultReturn({
  // passe os parâmetros necessários
})
```

#### Payload Locations - **payloadLocations**

Destinado a lidar com configuração e remoção de locations para uso dos payloads.

---

- **Testes de Integração Realizados**

---

Para entender mais sobre as **payload locations**, leia as anotações typescript do SDK ou [visite a documentação oficial](https://dev.efipay.com.br/docs/api-pix/payload-locations/)

Para utilizar as **payload locations** através do SDK acesse a propriedade `payloadLocations` da api PIX, dessa forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')

efi.pix.payloadLocations.create({
  // passe os parâmetros necessários
})

efi.pix.payloadLocations.findUnique({
  // passe os parâmetros necessários
})

efi.pix.payloadLocations.findMany({
  // passe os parâmetros necessários
})

efi.pix.payloadLocations.generateQrCode({
  // passe os parâmetros necessários
})
efi.pix.payloadLocations.detachTxId({
  // passe os parâmetros necessários
})
```

#### Cobranças em Lote - **batchCollections**

Responsável pela gestão de cobranças em lote. As cobranças, no contexto da API Pix, representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.

---

- **Testes de Integração Realizados**

**Atenção** - Ainda não foram realizados corretamente para o método `updateDueChargeBatch`

---

Para entender mais sobre as **Cobranças em Lote**, leia as anotações typescript do SDK ou [visite a documentação oficial](https://dev.efipay.com.br/docs/api-pix/cobrancas-lote)

Para utilizar as **Cobranças em Lote** através do SDK acesse a propriedade `batchCollections` da api PIX, dessa forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')

efi.pix.batchCollections.createOrUpdateDueChargeBatch({
  // passe os parâmetros necessários
})

efi.pix.batchCollections.updateDueChargeBatch({
  // passe os parâmetros necessários
})

efi.pix.batchCollections.findUniqueDueChargeBatch({
  // passe os parâmetros necessários
})

efi.pix.batchCollections.findManyDueChargeBatch({
  // passe os parâmetros necessários
})
```

#### Split de pagamento Pix - **paymentSplit**

Realização do Split de pagamento na API Pix Efí. Responsável pela configuração dos Splits de pagamento na API Pix. As cobranças, no contexto da API Pix representam uma transação financeira entre um pagador e um recebedor, cuja forma de pagamento é o Pix.

##### Realizar o split de pagamento após criar uma cobrança

É possível realizar a divisão do pagamento depois de criar uma [cobrança imediata](#cobranças-imediatas---imediatecharge) ou uma [cobrança com vencimento](#cobranças-com-vencimento---duecharge).

---

##### Importante!

 O **Split de pagamento Pix** só pode ser realizado entre contas Efí, com limite máximo de 20 contas para o repasse.

---

##### Informação
Uma mesma configuração de Split pode ser utilizada em várias cobranças. Isso significa que você pode definir uma divisão de valores para um parceiro e aplicá-la em todas as cobranças relacionadas.

---

##### Configure Split de Pagamento em QR Code e copia e cola estático!
Você tem a flexibilidade de dividir o pagamento dos QR Codes e copia e cola estático entre diferentes contas Efí. Isso significa que, ao gerar um QR Code ou um código copia e cola estáticos para pagamento, você pode especificar como o valor recebido será distribuído, facilitando a gestão financeira e assegurando que os fundos sejam alocados corretamente desde o início.

---

##### Instruções para testes em Homologação
No processo de split de pagamento, é essencial fornecer uma conta digital EFÍ válida.
É importante destacar que não é possível realizar o split para a própria conta. Portanto, se estiver realizando testes em ambiente de homologação e não possuir uma conta válida para os repasses, será necessário criar uma subconta. Veja como fazer isso [aqui](https://sejaefi.com.br/central-de-ajuda/efi-bank/ter-mais-de-uma-conta-efi#conteudo).

---

- **Testes de Integração Realizados**
---

Para entender mais sobre as **Split de pagamento Pix**, leia as anotações typescript do SDK ou [visite a documentação oficial](https://dev.efipay.com.br/docs/api-pix/split-de-pagamento-pix)

Para utilizar as **Split de pagamento Pix** através do SDK acesse a propriedade `paymentSplit` da api PIX, dessa forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')

efi.pix.paymentSplit.create({
  // passe os parâmetros necessários
})

efi.pix.paymentSplit.findUnique({
  // passe os parâmetros necessários
})

efi.pix.paymentSplit.attachImediateCharge({
  // passe os parâmetros necessários
})

efi.pix.paymentSplit.findUniqueImediateChargeAttachment({
  // passe os parâmetros necessários
})

efi.pix.paymentSplit.deleteImediateChargeAttachment({
  // passe os parâmetros necessários
})

efi.pix.paymentSplit.attachDueCharge({
  // passe os parâmetros necessários
})

efi.pix.paymentSplit.findUniqueDueChargeAttachment({
  // passe os parâmetros necessários
})

efi.pix.paymentSplit.deleteDueChargeAttachment({
  // passe os parâmetros necessários
})
```

### API Cobranças

A API Cobranças Efí oferece recursos avançados que permitem emitir diferentes tipos de cobranças, tais como **Boleto**, **Cartão de crédito**, **Carnê**, **Links de pagamento**, **Assinaturas (Recorrência)** e **Marketplace (Split de pagamento)**.

#### Cartão - **card**

As transações online via cartão de crédito exigem apenas a numeração de face e o código no verso do cartão, o que pode resultar em transações suspeitas. Por isso, é importante adotar procedimentos de segurança para evitar prejuízos financeiros, como o Chargeback.

Quando uma transação com cartão de crédito é realizada, ela passa por três etapas: autorização da operadora, análise de segurança e captura. Cada transação é analisada para identificar possíveis riscos. Se for aprovada, o valor é debitado na fatura do cliente. Caso contrário, o valor fica reservado até que a comunicação reversa seja concluída e o limite do cartão seja reestabelecido.

**As funcionalidades estão em desenvolvimento**

---

### Lista de Cartões aceitos pela Efí Pay
- Visa
- Master
- AmericanExpress
- Elo
- Hipercard

---

### Atenção!

Para fazer o pagamento com cartão de crédito, ***é necessário obter o payment_token*** da transação. Portanto, é imprescindível seguir os procedimentos para [obter o payment_token](https://dev.efipay.com.br/docs/api-cobrancas/cartao#obten%C3%A7%C3%A3o-do-payment_token) conforme descrito no documento antes de criar a cobrança com cartão de crédito.
Outra informação importante é você precisa cadastrar o ramo de atividade em sua conta. Confira mais detalhes [aqui](https://sejaefi.com.br/artigo/inserir-ramo-de-atividade/#versao-7).

---

### Tokenização de cartão
Se você precisa reutilizar o payment_token para fins de recorrência, utilize o atributo `reuse` com o valor booleano `true`. Dessa forma, o payment_token pode ser usado em mais de uma transação de forma segura, sem a necessidade de salvar os dados do cartão

---

### Simulação em Ambiente de Homologação
A simulação de cobranças de cartão em ambiente de Homologação funciona com base na análise imediata de acordo com o último dígito do número do cartão de crédito utilizado:
- Cartão com final 1 retorna: `"reason":"Dados do cartão inválidos."`
- Cartão com final 2 retorna: `"reason":"Transação não autorizada por motivos de segurança."`
- Cartão com final 3 retorna: `"reason":"Transação não autorizada, tente novamente mais tarde."`
- Demais finais têm transação aprovada.

---

- **Testes de Integração *Não Realizados***

---

Para entender mais sobre o **Cartão**, leia as anotações typescript do SDK ou [visite a documentação oficial](https://dev.efipay.com.br/docs/api-cobrancas/cartao)

Para utilizar o **Cartão** através do SDK acesse a propriedade `card` da api Cobranca, dessa forma:

```ts
import EfiPay from '@bruno-valero/gerencianet-sdk-typescript'

const efi = new EfiPay('SANDBOX')

efi.cobranca.card.['in development']({
  // passe os parâmetros necessários
})
```

