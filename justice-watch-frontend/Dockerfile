# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
COPY .env.local ./.env  # Copy for build if needed
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env  # Copy for runtime
COPY package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
