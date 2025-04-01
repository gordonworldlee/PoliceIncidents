# Use Python 3.11 as the base image
FROM python:3.11-slim
# Install PostgreSQL client dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*
# Set working directory in the container
WORKDIR /app
# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy the application code
COPY . .
# Expose port if your API listens on a specific port (common for web APIs)
# Change this to match your application's port if needed
EXPOSE 5002
# Command to run the application
CMD ["python", "mainAPI.py"]