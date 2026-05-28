import os
from datetime import datetime, timedelta, timezone

import bcrypt
from jose import JWTError, jwt

SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production-use-a-long-random-string")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 3600

# In a real application these would be stored in a database
USERS_DB: dict[str, dict] = {
    "admin": {
        "username": "admin",
        "hashed_password": bcrypt.hashpw(b"admin123", bcrypt.gensalt()),
    }
}


def verify_password(plain_password: str, hashed_password: bytes) -> bool:
    return bcrypt.checkpw(plain_password.encode(), hashed_password)


def authenticate_user(username: str, password: str) -> dict | None:
    user = USERS_DB.get(username)
    if not user:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    return user


def create_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.now(tz=timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_access_token(username: str) -> str:
    return create_token(
        {"sub": username, "type": "access"},
        timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS),
    )


def create_refresh_token(username: str) -> str:
    return create_token(
        {"sub": username, "type": "refresh"},
        timedelta(seconds=REFRESH_TOKEN_EXPIRE_SECONDS),
    )


def decode_refresh_token(token: str) -> str:
    """Validate a refresh token and return the username it belongs to."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise ValueError("Invalid or expired refresh token") from exc

    if payload.get("type") != "refresh":
        raise ValueError("Token is not a refresh token")

    username: str | None = payload.get("sub")
    if username is None or username not in USERS_DB:
        raise ValueError("User not found")

    return username
