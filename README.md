# phonebook

A siple app for fullstack development practice. This particular pet project utilizes node.js as a backend server and a small react app as a frontend. Backend stores phonebook entries on MongoDB hosting and fetches them with REST api. It also provides them to the frontend version of the app.

### Running app

To run this app you need:

1. Clone the respository:

	git clone https://github.com/yaripey/phoneapp

2. Get into the new folder:

	cd phoneapp

3. Install packages for both frontend and backend:

	cd frontend
	npm install
	cd ../backend
	npm install

4. Then you need to create a file in the backend directory and name it `.env`. There, you'll need to place your MongoDB api key which you can get for free at **mongodb.com**. It should look like this:

	MONGODB_URI=<your link>

5. Then you need to build the frontend. Just run:

	npm run build:ui

6. Finally you can start your server with:

	npm start