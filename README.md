🌍 WonderLust – Travel Listing Platform

WonderLust is a full-stack travel listing web application where users can explore places, create listings, upload images, and share reviews.
The project is inspired by modern accommodation platforms and built using MVC architecture for clean and scalable code organization.

This project helped me understand backend development, database relationships, authentication, and deployment of a full-stack application.


---
Live URL 
https://wonderlust-1-8csq.onrender.com/listings

🔗 GitHub Repository
https://github.com/Sarthaktanpure/WonderLust


---

✨ Features

🔐 User Authentication (Login / Signup)

🏡 Create, Edit, and Delete Listings

⭐ Review and Rating System

🖼 Image Upload using Cloud Storage

📍 Interactive Map Integration

🔎 View detailed listing pages

🧾 Flash messages for better UX

🧩 MVC Architecture for organized code



---

🛠 Tech Stack

Frontend

HTML5

CSS3

Bootstrap

EJS (Embedded JavaScript Templates)


Backend

Node.js

Express.js


Database

MongoDB

Mongoose


Other Tools & Services

Cloudinary (Image Storage)

Mapbox (Maps)

Express Session & Passport.js (Authentication)



---

📂 Project Structure (MVC Architecture)

WonderLust
│
├── models/          # Database schemas
│
├── routes/          # Express routes
│
├── controllers/     # Business logic
│
├── views/           # EJS templates (UI)
│
├── public/          # Static files (CSS, JS)
│
├── utils/           # Helper functions
│
├── middleware.js    # Custom middleware
│
├── app.js           # Main server file
│
└── package.json

The project follows the MVC (Model-View-Controller) design pattern:

Model → Database structure

View → Frontend templates

Controller → Application logic


This separation keeps the code clean, maintainable, and scalable.


---

⚙️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/Sarthaktanpure/WonderLust.git

2️⃣ Move into the project folder

cd WonderLust

3️⃣ Install dependencies

npm install

4️⃣ Create .env file

Add the following environment variables:

MONGO_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret

MAP_TOKEN=your_mapbox_token

5️⃣ Run the server

node app.js

or

nodemon app.js

Open in browser:

http://localhost:8080/listings


---

🌐 Deployment

The project can be deployed using:

Render

Railway

Cyclic

Vercel (for frontend)


Make sure to add environment variables in the hosting platform.


---

📚 What I Learned

Through this project I learned:

Building a full-stack web application

Implementing MVC architecture

Managing MongoDB database relationships

Handling authentication and sessions

Uploading images using Cloudinary

Integrating maps with Mapbox

Deploying a Node.js application



---

👨‍💻 Author

Sarthak Tanpure
