FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y curl git && apt-get clean

RUN apt-get install -y nodejs && apt-get clean

WORKDIR /app

RUN git clone "https://github.com/Ricksanchez-c137-og/techanova.git" . 

RUN npm install --force

RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]