# Simple MERN Login App

This is a very simple MERN app with:
- Signup page
- Login page
- Home page
- Node/Express backend
- MongoDB connection using Mongoose

## Project Structure

- `backend/` -> Express + MongoDB API
- `frontend/` -> Vite + React app

## Backend Setup

1. Open terminal in `backend/`
2. Install dependencies:
   - `npm install`
3. Update MongoDB URI in `.env`
   - Replace `USERNAME` and `PASSWORD`
4. Run backend:
   - `npm run dev`

Backend runs at `http://localhost:5000`

## Frontend Setup

1. Open terminal in `frontend/`
2. Install dependencies:
   - `npm install`
3. Run frontend:
   - `npm run dev`

Frontend runs at `http://localhost:5173`

## API Endpoints

- `POST /api/auth/signup`
  - body: `{ "email": "test@example.com", "password": "123456" }`
- `POST /api/auth/login`
  - body: `{ "email": "test@example.com", "password": "123456" }`

## Notes

- Passwords are hashed with bcrypt.
- Login state is stored in browser localStorage.
- This is intentionally kept simple for learning/assignment use.
