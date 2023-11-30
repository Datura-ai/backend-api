# FROM python:3.10
# ENV PYTHONBUFFERED=1
# COPY /.bittensor /root/.bittensor
# WORKDIR /app
# COPY . /app
# RUN pip3 install -r requirements.txt

# Use a specific Python version
FROM python:3.10.3

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Copy only necessary files
WORKDIR /app
COPY . /app

# Install dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy sensitive configuration files
COPY /.bittensor /root/.bittensor

