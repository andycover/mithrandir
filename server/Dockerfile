# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG PYTHON_VERSION=3.11.4
FROM python:${PYTHON_VERSION}-slim as base
#FROM python:${PYTHON_VERSION}-buster as base

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /mithrandir

# Copy the source code into the container.
COPY . .

RUN pip install -r requirements.txt

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
#CMD python run.py --bind=0.0.0.0:5000
CMD python run.py
