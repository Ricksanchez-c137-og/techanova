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

RUN mkdir -p /var/run/mysqld && \
    chown -R mysql:mysql /var/run/mysqld && \
    chown -R mysql:mysql /var/lib/mysql && \
    chmod 777 /var/run/mysqld

RUN mysqld --initialize-insecure --user=mysql

EXPOSE 80 3306

CMD set -e \
    && mysqld --user=mysql & \
    sleep 10 \
    && mysql -u root -e "CREATE DATABASE IF NOT EXISTS contactdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" \
    && mysql -u root -e "CREATE USER IF NOT EXISTS 'alhosn'@'%' IDENTIFIED BY 'password123';" \
    && mysql -u root -e "GRANT ALL PRIVILEGES ON contactdb.* TO 'alhosn'@'%' WITH GRANT OPTION;" \
    && mysql -u root -e "FLUSH PRIVILEGES;" \
    && mysql -u root contactdb < /docker-entrypoint-initdb.d/database-init.sql \
    && tail -f /var/log/mysql/error.log & \
    npm start