# task-management

Set up the backend.
1. After cloning the project, type cd backend to the terminal.
2. Install composer and nmp dependencies using the following commands:
   - composer install
   - npm install
3. Create a copy of your .env file using the command:
   - cp .env.example .env
     then configure your database connection.
4. Generate an app encryption key using the command:
   - php artisan key:generate
5. Create an empty database for our application.
6. Add database information to allow Laravel to connect to the database.
7. Execute database migration using:
   - php artisan migrate
8. Then execute the command below to run the backend:
   - php artisan serve

Set up the frontend.
1. Go to the frontend folder and type cd frontend to the terminal.
2. Execute the command below to add node_modules:
     - npm install
3. Then run the frontend using:
     - npm start
