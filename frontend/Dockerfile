FROM node:22-alpine AS justicewatch-frontend

# Install make
RUN apk add --no-cache make

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy Makefile first (better layer caching)
COPY Makefile .

# Copy source files (this will be overridden by volume mount in dev)
COPY . .

# Expose port 3000 and 3001
EXPOSE 3000
EXPOSE 3001

# Default to production mode if not specified
CMD ["make", "prod"]
