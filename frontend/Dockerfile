# From next.js example: https://github.com/vercel/next.js/blob/canary/examples/with-docker-multi-env/docker/development/Dockerfile
FROM node:22-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Update paths to include frontend/
COPY frontend/package.json frontend/yarn.lock* frontend/package-lock.json* frontend/pnpm-lock.yaml* frontend/.npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ .

# Add ARG for environment file
ARG ENV_FILE=.env
COPY ${ENV_FILE} .env

# This will do the trick, use the corresponding env file for each environment.
RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.env .env

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD HOSTNAME="0.0.0.0" node server.js
