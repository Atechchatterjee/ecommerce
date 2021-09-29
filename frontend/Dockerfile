# Install dependencies only when needed
FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /frontend
COPY package.json ./
RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /frontend
COPY . .
COPY --from=deps /frontend/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:14-alpine AS runner
WORKDIR /frontend

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /frontend/next.config.js ./

USER nextjs

EXPOSE 3000