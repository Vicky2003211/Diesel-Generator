# 🔋 Diesel Generator Monitoring Platform

A full-stack application for real-time monitoring of Diesel Generators (DGs), designed to support multiple organizations, user roles, and secure telemetry tracking.

---

## 🖥️ Frontend - React.js

The frontend is a React-based dashboard that allows users to monitor Diesel Generators, submit telemetry, and manage access based on roles and organizations.

### 🧰 Tech Stack

- React.js
- CSS Modules
- Fetch API

### 🚀 Setup Instructions

1. Navigate to the frontend folder:
   cd Diesel-Generator/dgmonitor

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

✅ Make sure the backend server is running and accessible.

---

## 💻 Backend - Node.js + Express + MongoDB

The backend provides the REST API for managing organizations, users, Diesel Generators, and telemetry data.

### 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT-based authentication
- CORS enabled

### 🚀 Setup Instructions

1. Clone the repository:
   git clone https://github.com/Vicky2003211/Diesel-Generator.git
   cd Diesel-Generator

2. Install backend dependencies:
   npm install

3. Start the backend server:
   node App.js
   or
   npm start

✅ MongoDB must be running

---

## 🔐 Backend Functional Overview

### 📁 Data Models

- Organization: { _id, name }
- User: { _id, username, password_hash, role, org_id, org_name }
- DieselGenerator: { _id, name, serial_number, location, organization_id }
- Telemetry: { _id, dg_id, fuel_level_percent, engine_temperature_celsius, running_status, createdAt }

### 🔗 API Endpoints

#### 🧑 User Authentication

- POST /api/dgs/login  
  Authenticate user and return token + user info


#### 👤 User Management

- POST /api/dgs/register  
  Create a new user in the authenticated user's organization
  

#### ⚙️ Diesel Generator Management

- POST /api/dgs  
  Create a new DG under the user's organization (admin, read-write)

- GET /api/dgs  
  List all DGs in the user's organization (all roles)

#### 📊 Telemetry Management

- POST /api/dgs/:dg_id/telemetry  
  Add telemetry data to a DG (admin, read-write)

- POST /api/dgs/:dg_id/gettelemetry  
  Get the telemetry data for a DG (all roles)


---

## 🎨 Frontend Functional Overview

### 🔐 Authentication

- Login form with username/password
- Stores auth token and user context
- Redirects to dashboard after login

### 📋 DG Monitoring Dashboard

- Lists all DGs in the user's organization
- Displays:
  - Name
  - Serial Number
  - Location
  - Fuel Level %
  - Engine Temperature (°C)
  - Running Status

### 🔄 Real-time Data Refresh

- Automatically refreshes DG data every 5–10 seconds using setInterval()


### 👥 User Context

- Displays current username and organization
- Filters DGs and telemetry by organization automatically



## 📬 Maintainer

**Vigneshwarann V**  
GitHub: https://github.com/Vicky2003211







