KnexJS - Rocketseat

sudo service postgresql start
sudo -i -u postgres
psql -U postgres

\l   --- lista as bases de dados
ctrl + l --- limpa a tela

CREATE DATABASE knex_test;
\c <nome_database>  --- conecta com o database

\dt --- descreve o banco

\q --quit

CREATE TABLE users (
	id serial unique,
	name text not null
);

\d <table_name> --- descreve a tabela


CREATE TABLE projects (
	id serial unique,
	user_id integer,
	title text not null,
	CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  	REFERENCES users(id)
);

--

npm i knex pg express nodemon
npx knex init
npx knex migrate:make <migration_name>  -- create migration (criação de tabela e campos)
npx knex seed:make <seed_name>   -- create user seed (inserção de dados na tabela)
npx knex migrate:latest  -- run migration
npx knex seed:run -- run seed
npx knex seed:run --specific <name_file.extension> -- run seed

npx knex migrate:down 20210401002420_add_column_delete_at_to_users.js
npx knex migrate:rollback
npx knex migrate:rollback --all
