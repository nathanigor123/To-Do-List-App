# To-Do-List-App
To-Do List App - An application built using Node.js et Angular. This application allows users to manage their tasks.

## Technologies
Project is created with:

- Nodejs: 20.10.0
- Angular: 17.0.7

## Setup
To install this project locally, follow these steps:

- Install Node.js and npm on your computer. You can download the latest version of [Node.js](https://nodejs.org/en/download) from the official Node.js website.
- Install Angular on your computer. You can download the latest version of [Angular] (https://angular.io/guide/setup-local) from the official Angular website.
- Clone the To-Do-List application's GitHub repository on your local computer.
- Open a command prompt and navigate to the application's root directory.
- then access the backend-api-nodejs directory with "cd  backend-api-nodejs"
- Initialize your application by running the "npm install" command. This will install all the necessary dependencies for your application.
- Configure the MongoDB database by installing MongoDB on your local computer. You can download the latest version of [MongoDB](https://www.mongodb.com/try/download/community) from the official MongoDB website 
- Then create a database with the name "toDoListDatabase"
- Start your nodejs server by executing the "npm start" command. This will start your Node.js server and you'll be able to serve the Restful api by accessing the URL `http://localhost:4000/api/v1`.
- Then access the frontend-angular directory with "cd frontend-angular".
- Initialize your application by running the "npm install" command. This will install all the necessary dependencies for your application.
- Run your application by executing the "ng serve" command. This will start your application and you can access it by opening your web browser and accessing the URL `http://localhost:4200`.

## Deploy
To deploy the project on google cloud platform, please follow these steps:

- Sign in to your Google Cloud Platform console.
- Create a new project or select an existing project.
- Set up the necessary resources such as Compute Engine instances, Cloud Storage, and a MongoDB Atlas database.
- Build your Angular application for production by running the command ng build --prod in the frontend-angular directory. This will generate the production-ready files.
- Copy the generated files from the dist directory to a Cloud Storage bucket.
- Set up a Compute Engine instance and configure it to run your Node.js server.
- Install Node.js and npm on the Compute Engine instance.
- Clone the To-Do-List application's GitHub repository on the Compute Engine instance.
- Navigate to the backend-api-nodejs directory.
- Install the necessary dependencies by running the npm install command.
- Configure the MongoDB connection in the .env environment variable file to point to your MongoDB Atlas database.
- Start the Node.js server by running the npm start command.
- Your backend API should now be running on the Compute Engine instance
- Set up a load balancer or a reverse proxy to route incoming requests to the Node.js server.
- Configure DNS settings to map your domain name to the load balancer or reverse proxy.
- Test your deployed application by accessing your domain name in a web browser.

## Use the application
When you start the application, you'll see a dashboard page with a data table and a to-do list title, to which you'll find call-to-action buttons.
- you will be able to add a task 
- view task list
- modify a task 
- delete a task

