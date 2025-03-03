.PHONY: dev prod build

# Development mode
dev:
	@echo "Starting in development mode..."
	npm run dev

# Production build and start
prod: build
	@echo "Starting in production mode..."
	npm install -g pm2
	pm2 start npm -- start

# Build step
build:
	@echo "Building production bundle..."
	npm run build

# Default target
default: dev
