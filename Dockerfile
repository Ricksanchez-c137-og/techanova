FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

# Use a specific legacy version of MySQL
RUN apt-get update && apt-get install -y \
    curl \
    git \
    nodejs \
    npm && \
    apt-get install -y wget && \
    wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb && \
    dpkg -i mysql-apt-config_0.8.12-1_all.deb && \
    apt-get update && \
    apt-get install -y mysql-server=5.6* && \
    apt-get clean

WORKDIR /app

RUN git clone "https://github.com/Ricksanchez-c137-og/techanova.git" .

RUN npm install --force
RUN npm run build

COPY database-init.sql /docker-entrypoint-initdb.d/

EXPOSE 80 3306

CMD service mysql start && \
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS contactdb;" && \
    mysql -u root -e "CREATE USER IF NOT EXISTS 'alhosn'@'%' IDENTIFIED BY 'password123';" && \
    mysql -u root -e "GRANT ALL PRIVILEGES ON contactdb.* TO 'alhosn'@'%'; FLUSH PRIVILEGES;" && \
    mysql -u root contactdb < /docker-entrypoint-initdb.d/database-init.sql && \
    npm start