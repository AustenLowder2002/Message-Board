# ChipedinAssessment

# Installing Node:
    Go to the [Node.js](https://nodejs.org/en/download) website and install the newest version.

# Installing MySQL workbench:
    Go to the [MySQL workbench website](https://dev.mysql.com/downloads/installer/) and install MySQL workbench 8

# Install a text editor like VS code or an IDE:
    Go to [VsCode](https://code.visualstudio.com/download) and install.

# Instructions to use:
## Step 1 Setting up MYSQL:
    * Go through the setup instructions provided by mysql
    * After the server is created, open MYSQL workbench and right click your Connection 
      and click **edit connection** confirm your hostname and port. 
      It will be used in the next step.
    * Also remember your username and password you set.

## Step 2: Finishing MYSQL setup:
    * Once you have created a username and password go to the .env file in the backend 
      and paste your username and password in the spots that say <yourUsername> & <yourPassword>
    * After you do that confirm that you are using the correct port and server for your MYSQL server. 
        This is the localhost:3006 in the env. 
        If you are using a different port or an IP instead of localhost 
        ** REPLACE THEM WITH YOUR INFO **

## Step 3 Starting the project:
    * ** Confirm that ports 3000 && 8080 are free on your machine **
    * When you are done confirming the details are correct in the .env file; 
      Open the backend and frontend in integrated terminals. 
      (You can do this by /cd ...<yourpath>/backend and .../<yourpath>/frontend)
    * When you have both those terminals opened you will first type npm install on both terminals.
    * Once that is finished you will type npm start in both terminals
    * Look at the frontend terminal and open the link that says http://localhost:8080

## Step 4 You opened the project:
    * If all steps were completed properly the server should be open.
    * If it does not work as expected or there is some issue, please submit an issue.



# What was built in this project:
    * This project was built using Node.js and React.js On the frontend it is React + Vite. 
    * On the backend it is Node + Es Modules. 
    * It also uses prisma ORM for MYSQL Connections.

## Design Frontend:
    * The frontend was designed to look semi-modern, simple yet effective. 
       It has very clean feel to it, almost like a polished stone(my words). 
    * The choice for this was because it is simple and I am not that great at designing UI/UX.

## Design Backend:
    * This website was designed to allow anyone to add/create/edit/remove/like messages. 
    * To accomplish this goal it uses a mix of database writing, asynchronous calls, and websockets.
    * The reason for the choice in websockets was to decrease the amount of strain 
      on the server while still providing that peer-to-peer feel -- A.K.A live updates.
    
    


