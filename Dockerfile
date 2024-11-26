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

EXPOSE 80 3306

CMD service mysql start && mysql -e "CREATE DATABASE IF NOT EXISTS techanova;" && npm start
