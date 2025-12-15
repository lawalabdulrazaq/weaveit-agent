# ==========================================
# 1. DEPS STAGE: Install dependencies
# ==========================================
FROM node:20-bullseye AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (frozen-lockfile ensures exact versions)
RUN npm install --legacy-peer-deps

# ==========================================
# 2. BUILDER STAGE: Compile the app
# ==========================================
FROM node:20-bullseye AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry (Best Practice)
ENV NEXT_TELEMETRY_DISABLED 1

# Build the app
RUN npm run build

# ==========================================
# 3. RUNNER STAGE: Production Image
# ==========================================
FROM node:20-bullseye-slim AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for Security (Best Practice)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone build (requires next.config.js change, see below)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

# Run the server
CMD ["node", "server.js"]