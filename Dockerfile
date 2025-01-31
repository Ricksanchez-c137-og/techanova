FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && apt-get install -y \
    curl \
    git \
    nodejs \
    npm \
    mysql-server \
    mysql-common && \
    apt-get clean

# Fix MySQL systemctl issue in Docker
RUN ln -s /usr/bin/true /usr/local/bin/systemctl

# Set up required MySQL directories and permissions
RUN rm -rf /var/lib/mysql/* && \
    mkdir -p /var/lib/mysql /var/run/mysqld /var/log/mysql && \
    chown -R mysql:mysql /var/lib/mysql /var/run/mysqld /var/log/mysql && \
    chmod 777 /var/run/mysqld

# Clone repository
WORKDIR /app
RUN git clone "https://github.com/Ricksanchez-c137-og/techanova.git" .

# Install and build Node.js application
RUN npm install --force
RUN npm run build

# Copy SQL initialization file
COPY database-init.sql /docker-entrypoint-initdb.d/

# Initialize MySQL data directory
RUN mysqld --initialize-insecure --user=mysql --datadir=/var/lib/mysql || cat /var/log/mysql/error.log

EXPOSE 80 3306

# Start MySQL and initialize database
CMD service mysql start && \
    sleep 10 && \
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS contactdb;" && \
    mysql -u root -e "CREATE USER IF NOT EXISTS 'alhosn'@'%' IDENTIFIED BY 'password123';" && \
    mysql -u root -e "GRANT ALL PRIVILEGES ON contactdb.* TO 'alhosn'@'%'; FLUSH PRIVILEGES;" && \
    mysql -u root contactdb < /docker-entrypoint-initdb.d/database-init.sql && \
    npm start
