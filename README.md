# Task Management System

## How to Start

1. Clone the repository:

   git clone https://github.com/amitkumar88825/task-management-system.git
    Go to the server directory and add a .env file with the following content:

        MONGO_URI="mongodb://localhost:27017/task-management-system"
        PORT=5000
        JWT_SECRET="afc3f0c1b171b2831dde600c12e01ad8e37d1cf67905805143be04c022d105d139639d043b40942b854d9ef579a5a8e1a05aba96d2d1d2a6d4460578791bff45"

    Navigate to the server folder and run the following commands:

1. Navigate to the server folder and run the following commands:

    cd server
    npm install
    npm run seeds
    npm start

2. Navigate to the client folder and run the following commands:

    cd client
    npm install
    npm start

Notes
    Ensure that MongoDB is running locally on your machine at localhost:27017.
    After following the above steps, the application should be up and running.
    The admin credentials provided below.

Admin Credential:
        Email: admin@gg.cc
        Password: Admin@123


