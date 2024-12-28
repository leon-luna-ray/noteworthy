# Production Dockerfile for Noteworthy project
# Stage 1: Build the frontend
FROM node:lts-alpine as frontend

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g pnpm

COPY frontend/package.json frontend/pnpm-lock.yaml ./

RUN pnpm install

COPY frontend/ ./

RUN pnpm run build

# Stage 2: Build the backend and serve the frontend build
FROM python:3.12-slim-bullseye

RUN mkdir /app
WORKDIR /app

ENV PATH="${PATH}:/root/.local/bin"
ENV PYTHONPATH=.

RUN pip install --upgrade pip
RUN pip install virtualenv

COPY backend/requirements.txt ./
COPY backend/src/ ./src/

RUN pip install -r requirements.txt

EXPOSE 8080

# Command to run the backend
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]