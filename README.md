# Author 
Mr.Huy
# Owner 
Đinh Văn Huy - 0362 091 356 - 19981226

# Feature
+ Task Scheduler: Cronjob
+ Task Queue: Bull-Redis, Kafka
+ Event Emitter
+ Logger
+ Exception Handler with multiple language support
+ Middleware for Authentication, Permission
+ Cluster
+ Redis microservice
+ Kafka microservice
+ Hybrid Application RestAPI with microservice
+ Embedded C/C++
+ Child process: bash command 
+ Docker:
  PostgreSQL
  Redis
  Kafka
  ZooKeeper
+ Swagger
+ Websocket - Socket IO

# Setup
Step 1:
  + Install docker and docker-compose
  + Run 'docker-compose up -d' in root project
Step 2:
  + Install Node version as well as npm
  + In addition, install 'yarn' package manager as global package
  + Run 'yarn' or 'npm install' in root project
Step 3:
  + Touch .env file
  + Copy everything from .env.example and replace needed information
  + Run 'yarn start:dev' or 'yarn start'
  + Swagger: you can see at http://locallhost:<your_port_in_.env_file>/api/

# Note
Kafka:
  + EventPattern must be defined in Controller
  + In .env file, KAFKA_STATUS = 1. Because the application must connect to microservice to become a hybrid server
Websocket:
  + In .evn modify port of WEBSOCKET_PORT

# Develop
Create module: yarn gen:module --name <module_name> -f   

# Contact
Github: https://github.com/vanhuy2612
Phone Number: 0362091356
email: vanhuy2612@gmail.com