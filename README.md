# Diesel Generator Monitoring - Backend

This is the backend API built with **Node.js**, **Express.js**, and **MongoDB** for monitoring Diesel Generators (DGs). It handles DG creation, telemetry data submission, and fetching the latest status.

# Features

- Add & fetch Diesel Generator data
- Submit and retrieve telemetry (fuel %, temperature, running status)
- MongoDB integration using Mongoose
- CORS enabled for frontend communication


# Setup Instructions

 1. Clone the Repo
 2. npm install    {Install all dependencies}
 3. node App.js or npm start

# Make sure MongoDB is running locally on: { mongodb://127.0.0.1:27017/DGmonitor }
# Api Endpoints:
  1. GET	- /api/dgs                       Get all DGs
  2. GET	- /api/dgs	                     Get all DGs
  3. POST	- /api/dgs	                     Create a new DG
  4. POST	- /api/dgs/:dg_id/telemetry	     Add telemetry data
  5. POST	- /api/dgs/:dg_id/gettelemetry	 Get latest telemetry for specific DG
  6. GET	- /api/dgs/telemetry/latest	     Get latest DG with telemetry

# Diesel Generator Monitoring - Frontend

This is the frontend React application for the Diesel Generator Monitoring Dashboard. It shows a list of generators and their live telemetry (fuel level, temperature, status).

# 🧰 Tech Stack

- React.js
- CSS Modules
- Fetch API


# Setup Instructions

 1. Navigate to the frontend folder - {cd Diesel-Generator/dgmonitor}
 2. npm install (install all dependencies)
 3. npm start


# Make sure the Backend server is running







