# -picker

# This is a repo to practice some concepts of nodejs api

## Steps
- Module aliasing 
- OvernightJS/core
- eslinting
- jest setup (testes de end points, funcionais)





## What i may review
- Setup a tsc project 
    -> point correctly output and root dir

- Jest setup testing
    1 -> Setup do jest com suas peculiaridades (implementando novos tipos inline etc): ver cmments
    2 -> Teste funcional: Operacional 
    3 -> Testes de unidade p. cada 
    4 -> Receber e trabalhar com os dados em (Object) da  API
    5 -> Normalizaçao de dados captados na API dota: definicao json de resposta (em arquivo separado test/fixtures/***.json) 
    6 -> Validaçao com <Partial>  * vi nada
    7 -> Mocker 


    *1/3: Setup do jest p/ subir, sozinho, o checker em cima dos arquivos TYPESCRIPT, ou seja, ele nao le os arquivos compilados, e sim os Typescripts. Antes do transpile [ ´testMatch´  ] 

    *4: - precisei castar pra um array e aí sim acessar/manipular os dados
        - const objResponse = await this.request.get<Hero, Hero[]>(url); /clients/__test__/openDota.test.ts

    *7: 
        - const mockedAxios = axios as jest.Mocked<typeof axios>; /clients/


