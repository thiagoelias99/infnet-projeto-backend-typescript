# infnet-projeto-bck-express-node
 Projeto do curso Back-end com Express & Node.JS da Infnet

## **Instalação e Execução do BackEnd**
1. Renomear o arquivo ***"env.example"*** para ***"env"***.
2. Alterar as informações de conexão no arquivo ***.env*** e salvar.
    - Opção "***RUN_SEED***" vai popular as tabelas com informações de exemplo. Somente se o valor for "***true***" e as ***tabelas estiverem vazias***.
3. Executar o comando para instalação do projeto
```
npm install
 ```
4. A criação do database e tabelas são feitas automaticamento no SGDB se não existir previamente.
5. Executar o projeto
```
npm start
```
- **Obs**: O servidor está configurado para utilizar SGDB MariaDb.
- **Obs**: O servidor executa por padrão no endereço <http://localhost:3333/>.

6. Utilizar endereço **<http://localhost:3333/>** para acessar documentação ***SWAGGER*** com as rotas/endpoints.
7. É utilizado JWT para autenticação. Retorno na rota ***"/login"***. Utilizar o ***Authorize*** do swagger para inserir o JWT.
8. Para acesso de Administrador utilizar
```
{
    "email": "admin@email.com",
    "password": "Admin123"
}
```
9. Rotas privadas para gerenciamento de Student e Course só podem ser acessadas com usuário de Admin.
10. Students só têm acesso as rotas privadas ***/students/info***, ***/courses/info***, ***courses/{uuid}/subscribe*** e ***courses/{uuid}/unsubscribe***
11. Rotas ***subscribe*** e ***unsubscribe*** utilizam o UUID do curso, e JWT do estudante para identificação.

## **Versões**
- Node.Js 18.12.1