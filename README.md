# ConnectEdu – Plataforma Educacional Online

## 📌 Descrição

O ConnectEdu é uma plataforma educacional online, sendo um ambiente virtual de aprendizado
que permite a gestão de cursos, atividades e avisos para alunos e professores.

O sistema permite que alunos visualizem cursos disponíveis, consultem conteúdos e realizem atividades práticas.

<img width="1920" height="919" alt="educ" src="https://github.com/user-attachments/assets/03f263f4-a4bb-42ca-9bb9-36ba68a9fc55" />

## 📁 Ficha Técnica

A aplicação segue princípios de arquitetura modular, proporcionando uma separação clara entre frontend e backend, facilitando manutenção e evolução do sistema.

Frontend utiliza de layout responsivo e moderno, com características server-side e client-side de forma dinâmica.

Backend Segue o modelo de **Api Rest** e **MVC**, com distinções claras e objetivas entre classes, entidades, dtos, repositories, services, controlles e outros.

O sistema conta com suporte para autenticação de usuários, separados por Roles, no momento sendo estes de: Aluno, Professor e Administrador do sistema.

As senhas dos usuários são protegidas por codificações de Password Hashes

O banco de dados Postgresql garante integridade, durabilididade e consistência dos dados.

<img width="1920" height="922" alt="educdb" src="https://github.com/user-attachments/assets/1606c004-be54-4961-9647-5928d0a5446a" />

É feito a utilização de um servidor proxy reverso como o nginx, para garantir critérios de segurança, balanceamento de carga, cache, entre outros.

O sistema conta com um serviço de monitoramento. Uptime Kuma vai alertar sobre qunado o serviço web cai e quando volta, 
sendo possível gerar Slis dentro da ferramenta para saber se a plataforma esta dentro do Slas e Slos previstos, junto com o time dev internamente. 

<img width="1920" height="909" alt="uptime" src="https://github.com/user-attachments/assets/e903968b-ed7e-4286-be28-23d50566de67" />

A aplicação conta com toda uma infraestrutura como código disponibilizado por containers(Docker), que garante fácil implantação.

## 🛠 Funcionalidades

Usuário Aluno: 
* Visualizar lista de cursos matriculados.
* Acessar página de curso com conteúdo, atividades e avisos.
* Enviar atividades em PDF.
* Navegação paginada de atividades.

Usuário Professor: 
* Criar e avaliar atividades.
* Gerenciar e ministrar cursos.
* Publicar avisos para alunos.

Usuario Administrador:
* Cadastrar Alunos e professores.
* Cadastrar, atualizar, excluir, visualizar cursos.
* Atribuir Alunos e professores aos cursos.
* Atualizar dados de alunos, professores ou da plataforma.

## ⚙️ Tecnologias Utilizadas

**Frontend**

Next.js 13 – Framework React moderno para construção de interfaces.

React 18 – Biblioteca para construção de componentes.

TypeScript – Tipagem estática para maior robustez.

CSS Modules – Estilização modular e isolada.

**Backend**

NestJS – Aplicação modular em Node.js

TypeScript – Tipagem estática para maior robustez.

JWT Authentication – Autenticação baseada em token.

Postgresql – Banco de dados relacional.

Pgadmin - Plataforma gerenciadora de bancos de dados.

Docker/Docker Compose – Containerização do projeto para desenvolvimento e produção.

Nginx - Provedor de Servidor web e proxy reverso.

Uptime Kuma - Ferramenta de monitoramento e observabilidade.

## 📝 Observações

Para rodar o projeto em sua máquina, instale a versão Docker mais recente, e certifique-se de possuir o buildx.

Atividades e conteúdos podem ser simulados (mock) para testes

Acesso a todos os recursos da aplicação não é provisionado

## 🚀 Executando o Projeto

1 - Rode o comando docker compose build // irá buildar a aplicação

2 - Rode o comando docker compose up -d // para subir os containers na sua maquina

3 - Acesse o pgadmin com os dados: 

PGADMIN_DEFAULT_EMAIL: educ@example.com
PGADMIN_DEFAULT_PASSWORD: 1234567

4 - Conecte-se ao servidor postgres com estes dados: 

Host: postgres
POSTGRES_DB: educdb
POSTGRES_USER: postgres
POSTGRES_PASSWORD: 1234567

5 - preencha as tabelas com o seed.txt

6 - Acesse a aplicação com o usuario: marcelo@aluno.com e senha: Ete01 no localhost:8080

7 - Acesse o uptime kuma no localhost:3001 e certifique-se de utilizar requisições http provindas do nginx



  
