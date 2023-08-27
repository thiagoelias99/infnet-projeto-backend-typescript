# infnet-projeto-backend-typescript
 Repositório do projeto de curso de BackEnd com Typescript da Infnet.

 ## **Instalação e Execução do BackEnd**
1. Renomear o arquivo ***"env.example"*** para ***"env"***.
2. Alterar as informações de conexão no arquivo ***.env*** e salvar.
3. Executar o comando para instalação do projeto
```
npm install
 ```
4. A criação do database e tabelas são feitas automaticamento no SGDB (*sqlite*) se não existir previamente.
5. Executar o projeto
```
npm start
```
- **Obs**: O servidor executa por padrão no endereço <http://localhost:3333/>.

6. Utilizar endereço **<http://localhost:3333/>** para acessar documentação ***SWAGGER*** com as rotas/endpoints.
7. Utilizar endereço **<http://localhost:3333/admin/>** para acessar a interface de administrador ***AdminJS***.
8. Para acesso padrão de Administrador utilizar. Pode ser configurado no ***.env***
```
{
    "email": "admin@email.com",
    "password": "Admin123"
}
```
9. É utilizado JWT para autenticação. Retorno na rota ***"/login"***. Utilizar o ***Authorize*** do swagger para inserir o JWT.
10. Rotas privadas para gerenciamento de Student e Course só podem ser acessadas com usuário de Admin.
11. Students só têm acesso as rotas privadas ***/students/info***, ***/courses/info***, ***courses/{uuid}/subscribe*** e ***courses/{uuid}/unsubscribe***
12. Rotas ***subscribe*** e ***unsubscribe*** utilizam o UUID do curso e JWT do estudante para identificação.

## **Versões**
- Node.Js 18.12.1