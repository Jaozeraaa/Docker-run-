Passos para executar a aplicação:

Para executar o banco de dados MySQL localmente, execute o seguinte comando Docker:
docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_USER=user -e MYSQL_PASSWORD=1234 -e MYSQL_DATABASE=api mysql:latest

Buildar projeto: 
docker build --no-cache -t myapp:latest .

Tag: 
docker tag myapp:latest jaovictor/myapp:latest

Push:
docker push jaovictor/myapp:latest

Execute o script de criação da tabela e inserção de dados:
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS api;

-- Seleciona o banco de dados
USE api;

-- Criação da tabela
CREATE TABLE IF NOT EXISTS pessoa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  idade INT NOT NULL
);

-- Inserção de dados de exemplo
INSERT INTO pessoa (nome, idade) VALUES 
('João', 30),
('Maria', 25),
('Pedro', 35);

Obtenha o ip do contêiner do mysql:
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mysql

Execute o contêiner da aplicação, passando pra variável de ambiente DB_HOST o ip obtido do contêiner do mysql:
docker run -p 3001:3001 -e DB_HOST=172.17.0.2 --name myapp -d eduardorossetti/myapp:latest

- Abra a URL http://localhost:3001/consulta-dados
- Abra a URL http://localhost:3001/liveness
- Abra a URL http://localhost:3001/readiness

GitHub: https://github.com/Jaozeraaa/atividade4
Docker Hub:https://hub.docker.com/r/jaovictor/myapp/tags
