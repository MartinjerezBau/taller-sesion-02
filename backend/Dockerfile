# syntax=docker/dockerfile:1
FROM python:3.11-slim

# Install Poetry
RUN pip install --no-cache-dir poetry==1.8.3

WORKDIR /app

# Copy only dependency files first to leverage Docker layer cache
COPY pyproject.toml poetry.lock* ./

# Install dependencies (no dev deps, no virtual env inside container)
RUN poetry config virtualenvs.create false \
    && poetry install --without dev --no-interaction --no-ansi

# Copy application source
COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
