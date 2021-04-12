# -picker

# This is a repo to practice some concepts of nodejs api

## Depend 
- Module aliasing 
- OvernightJS/core
- Eslinting
- Prettier
- Jest setup (testes de end points, funcionais)
- Super test
- Axios (external service)



## Steps with notes that i may review
- Setup a tsc project 
    -> point correctly output and root dir

- Jest setup / testing
  - 1  Setup do jest com suas peculiaridades (implementando novos tipos inline etc): ver cmments
  - 2  Teste funcional: Operacional 
  - 3  Testes de unidade p. cada 
  - 4  Receber e trabalhar com os dados em (Object) da  API
  - 5  Normalizaçao de dados captados na API dota: definicao json de resposta (em arquivo separado test/fixtures/***.json) 
  - 6  Validaçao com <Partial>  * vi nada
  - 7  Mocker 
  - 8  Extensao testes: construcao de novos testes em OpenDota.ts <-> opendota.test
  - 9  Settando Errors personalizados pra falhas na unidade de Cliente (comunicaçao com a API externa - OpenDota)


* 1/3: Setup do jest p/ subir, sozinho, o checker em cima dos arquivos TYPESCRIPT, ou seja, ele nao le os arquivos compilados, e sim os Typescripts. Antes do transpile [ ´testMatch´  ] 

 * 4: - precisei castar pra um array e aí sim acessar/manipular os dados
>
     const objResponse = await this.request.get<Hero, Hero[]>(url); /clients/__test__/openDota.test.ts

* 7: 
        - const mockedAxios = axios as jest.Mocked<typeof axios>; /clients/

* 9/1: Escondendo o Axios calls na estrutura
    * Axios.get --> HTTUtil.get
    * Usar class x instancia **    
> 
            // Static call
            const mockedRequestClass = HTTPUtil.Request as jest.Mocked<typeof HTTPUtil.Request>;
            // Instance call
            const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;


------
- Setup MYSQL + ObjectionJS(+ Knex);
.mysql2 driver
  - 1 um migration pra cada tabela 
  - 2 nao to verificando se a table existe antes de fazer o insert <- care about this
  - 3 //TODO : refactorar a configuracao do Knex e utilizar o config aliasing (verificar pq essa merda nao ta pegando)
  - 4 // OBS  TESTING with test: Nao se faz teste de unidade para controllers - a ele fica responsavel apenas o test funcional (q é o responsavel por verificar um endpoint
  - 5 models
  - 6 relationship entre modulos
  - 7 teste de funcionalidade - end point to end point

------

