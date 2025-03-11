FROM ubuntu:20.04 
LABEL version="1.0" maintainer="jysonmuchiri@gmail.com" description="This is my first Docker image"
WORKDIR /app
COPY package.json .
RUN apt-get update && apt-get install -y nodejs
EXPOSE 80
CMD [ "nginx", '-g', '' ]

# Make two containers communicate through the same network
# RUN docker run --network jyson_network --name container1 -d nginx
# RUN docker run --network jyson_network --name container2 -d nginx
# create a volume > docker volume create jyson_volume
# use volume to persist container data > docker run -d --name container1 -v jyson_volume:/app nginx:latest