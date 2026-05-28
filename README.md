# PlayStation Auth App

A full-stack web application with JWT authentication. The **backend** is a FastAPI service that issues JWT tokens, and the **frontend** is a React (Vite) single-page application that implements a PlayStation-themed login and welcome experience.

---

## Repository Structure

```
taller-sesion-02/
├── backend/          # FastAPI JWT authentication service
├── frontend/         # React + Vite SPA (PlayStation design)
├── DESIGN.md         # PlayStation design system specification
└── README.md         # This file
```

---

## Design System

The frontend follows the **PlayStation design system** defined in [`DESIGN.md`](./DESIGN.md):

- **Primary color:** PlayStation Blue (`#0070d1`) for CTAs and brand elements
- **Surfaces:** Alternating dark canvas (`#000000`), light canvas (`#ffffff`), and blue band
- **Typography:** PlayStation SST (falls back to Arial/Helvetica), weight 300 for display headlines
- **Buttons:** Fully-rounded pill shape (`border-radius: 9999px`)
- **Cards:** 8px border radius (`border-radius: 8px`)
- **Inputs:** 4px border radius (`border-radius: 4px`)

---

## Prerequisites

- **Node.js** 18+ and **npm** 9+
- **Python** 3.11+ and [Poetry](https://python-poetry.org/docs/#installation) — **or** Docker + Docker Compose

---

## Running the Application

### Option 1 – Local development (recommended for development)

#### 1. Start the backend

```bash
cd backend

# Install dependencies
poetry install

# Start the server on port 8000
poetry run uvicorn app.main:app --reload --port 8000
```

The API will be available at <http://localhost:8000>.  
Interactive API docs: <http://localhost:8000/docs>

#### 2. Start the frontend (in a separate terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start the development server on port 5173
npm run dev
```

The app will be available at <http://localhost:5173>.

> **Note:** The Vite dev server proxies all `/api/*` requests to the backend at `http://localhost:8000`, so no manual CORS configuration is needed during development.

---

### Option 2 – Docker Compose (backend only)

```bash
cd backend
docker compose up --build
```

Then start the frontend separately as described above.

---

## Usage

### Default credentials

| Field    | Value      |
|----------|------------|
| username | `admin`    |
| password | `admin123` |

### Login flow

1. Open <http://localhost:5173> in your browser.
2. You will be redirected to the **Login page** (`/login`).
3. Enter `admin` / `admin123` and click **Sign In**.
4. On success, the access token and refresh token are saved in **`sessionStorage`** and you are redirected to the **Welcome page** (`/welcome`).
5. The Welcome page is **protected**: navigating directly to `/welcome` without being signed in will redirect you back to `/login`.
6. Click **Sign Out** (in the nav bar or on the hero section) to clear the session and return to the login page.

### Token storage

| Item              | Storage          | Key                   |
|-------------------|------------------|-----------------------|
| `access_token`    | `sessionStorage` | `ps_access_token`     |
| `refresh_token`   | `sessionStorage` | `ps_refresh_token`    |
| `username`        | `sessionStorage` | `ps_username`         |

Tokens are stored in `sessionStorage` (not `localStorage`) so they are automatically cleared when the browser tab is closed.

---

## Frontend Build (production)

```bash
cd frontend
npm run build        # outputs to frontend/dist/
npm run preview      # preview the production build locally
```

---

## Backend API Reference

| Method | Endpoint        | Description                                  |
|--------|-----------------|----------------------------------------------|
| POST   | `/auth/token`   | Authenticate and receive access + refresh tokens |
| POST   | `/auth/refresh` | Exchange a refresh token for a new access token  |
| GET    | `/health`       | Health-check — returns `{"status": "ok"}`    |

### Example: Obtain tokens

```bash
curl -X POST http://localhost:8000/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

```json
{
  "access_token": "<JWT>",
  "refresh_token": "<JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

---

## Environment Variables (backend)

| Variable          | Default                                    | Description                                      |
|-------------------|--------------------------------------------|--------------------------------------------------|
| `SECRET_KEY`      | `change-me-in-production-use-a-long-...`  | JWT signing key                                  |
| `ALLOWED_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Comma-separated list of allowed CORS origins |

Set strong values in production:

```bash
SECRET_KEY=your-very-long-random-secret \
ALLOWED_ORIGINS=https://myapp.example.com \
poetry run uvicorn app.main:app --port 8000
```

---

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Backend  | FastAPI, Uvicorn, python-jose, bcrypt, Poetry |
| Frontend | React 19, Vite, React Router v7 |
| Auth     | JWT (access + refresh token pattern) |
