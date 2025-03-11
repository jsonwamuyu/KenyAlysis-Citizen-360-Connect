FROM ubuntu:20.04 
LABEL version="1.0" maintainer="jysonmuchiri@gmail.com" description="This is my first Docker image"
WORKDIR /app
COPY package.json .
RUN apt-get update && apt-get install -y nodejs
EXPOSE 80
CMD [ "nginx", '-g', '' ]
