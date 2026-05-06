# Event Planner — Lab 14

Full-stack app: **React** frontend + **Express** backend + **MongoDB** database.


## Setup & Run

### 1. MongoDB
Make sure MongoDB is running locally:
```bash
mongod
```

### 2. Backend (Express)
```bash
cd server
npm install
npm start         #this will run on http://localhost:5000
```

### 3. Frontend (React)
Open a second terminal:
```bash
# from the event-planner/root
npm install
npm start         #this will run on http://localhost:3000
```
## Environment Variables (`server/.env`)
MONGO_URI=mongodb://localhost:27017/event_planner
PORT=5000