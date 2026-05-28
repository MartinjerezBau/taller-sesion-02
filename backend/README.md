# JWT Auth Backend

A minimal **FastAPI** Web API that demonstrates JSON Web Token (JWT) authentication.

## Features

- `POST /auth/token` – authenticate with username & password and receive an **access token** (expires in 300 s) plus a **refresh token**.
- `POST /auth/refresh` – exchange a valid refresh token for a new access token.
- `GET /health` – health-check endpoint.

## Default credentials

| Field    | Value      |
|----------|------------|
| username | `admin`    |
| password | `admin123` |

## Tech stack

| Tool      | Purpose                        |
|-----------|--------------------------------|
| FastAPI   | Web framework                  |
| Uvicorn   | ASGI server                    |
| python-jose | JWT encode / decode          |
| passlib   | Password hashing (bcrypt)      |
| Poetry    | Dependency management          |
| Docker    | Containerisation               |

---

## Running locally with Poetry

### Prerequisites

- Python 3.11+
- [Poetry](https://python-poetry.org/docs/#installation)

### Setup

```bash
cd backend

# Install dependencies
poetry install

# Start the development server
poetry run uvicorn app.main:app --reload --port 8000
```

The API will be available at <http://localhost:8000>.  
Interactive docs: <http://localhost:8000/docs>

---

## Running with Docker Compose

```bash
cd backend

# Build and start the service
docker compose up --build
```

The API will be available at <http://localhost:8000>.

### Custom secret key (recommended for production)

```bash
SECRET_KEY=your-very-long-random-secret docker compose up --build
```

---

## API usage examples

### 1. Obtain tokens

```bash
curl -X POST http://localhost:8000/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

**Response**

```json
{
  "access_token": "<JWT>",
  "refresh_token": "<JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

### 2. Refresh the access token

```bash
curl -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "<refresh_token_from_step_1>"}'
```

**Response**

```json
{
  "access_token": "<new_JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

### 3. Health check

```bash
curl http://localhost:8000/health
# {"status":"ok"}
```

---

## Environment variables

| Variable    | Default                                        | Description               |
|-------------|------------------------------------------------|---------------------------|
| `SECRET_KEY` | `change-me-in-production-use-a-long-random-string` | HS256 signing key |

> ⚠️ **Always override `SECRET_KEY` in production with a strong random value.**
