# Multi-stage Dockerfile for SnapURL (Node.js Express app)
# Use a minimal Node image and install production dependencies
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Ensure environment is production by default
ENV NODE_ENV=production

# Copy package manifests first to leverage Docker cache
COPY package*.json ./

# Install production dependencies. Use npm install to support projects without a lockfile.
RUN npm install --production --silent

# Copy the rest of the application
COPY . .

# Expose the port the app listens on (default in repo is 3333)
EXPOSE 3000

# Default command. Provide DATABASE_URL and optionally PORT when running the container.
CMD ["node", "index.js"]
