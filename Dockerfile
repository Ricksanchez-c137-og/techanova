FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl \
    git \
    nodejs \
    npm \
    mysql-server \
    mysql-common && \
    apt-get clean

WORKDIR /app

RUN git clone "https://github.com/Ricksanchez-c137-og/techanova.git" .

RUN npm install --force
RUN npm run build

COPY database-init.sql /docker-entrypoint-initdb.d/

EXPOSE 80 3306

CMD service mysql start && \
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS techanova;" && \
    mysql -u root -e "CREATE USER IF NOT EXISTS 'alhosn'@'%' IDENTIFIED BY 'password123';" && \
    mysql -u root -e "GRANT ALL PRIVILEGES ON techanova.* TO 'alhosn'@'%'; FLUSH PRIVILEGES;" && \
    mysql -u root techanova < /docker-entrypoint-initdb.d/database-init.sql && \
    npm start
