from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

from app.auth import (
    ACCESS_TOKEN_EXPIRE_SECONDS,
    authenticate_user,
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
)

app = FastAPI(
    title="JWT Auth Service",
    description="FastAPI service that issues and refreshes JWT tokens.",
    version="0.1.0",
)


# --------------------------------------------------------------------------- #
# Request / Response schemas
# --------------------------------------------------------------------------- #


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS


class RefreshRequest(BaseModel):
    refresh_token: str


class AccessTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #


@app.post("/auth/token", response_model=TokenResponse, status_code=status.HTTP_200_OK)
def login(body: LoginRequest):
    """Authenticate with username/password and receive JWT tokens."""
    user = authenticate_user(body.username, body.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return TokenResponse(
        access_token=create_access_token(user["username"]),
        refresh_token=create_refresh_token(user["username"]),
    )


@app.post(
    "/auth/refresh",
    response_model=AccessTokenResponse,
    status_code=status.HTTP_200_OK,
)
def refresh_token(body: RefreshRequest):
    """Exchange a refresh token for a new access token."""
    try:
        username = decode_refresh_token(body.refresh_token)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    return AccessTokenResponse(access_token=create_access_token(username))


@app.get("/health", status_code=status.HTTP_200_OK)
def health():
    """Health-check endpoint."""
    return {"status": "ok"}
