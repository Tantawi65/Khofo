FROM node:18-alpine

# Create app user (required by HF Spaces)
RUN addgroup -g 1000 appgroup && adduser -u 1000 -G appgroup -D appuser

WORKDIR /app

# Copy package files
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN cd client && npm install
RUN cd server && npm install

# Copy source code
COPY . .

# Build client and server
RUN cd client && npm run build
RUN cd server && npm run build

# Change ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Hugging Face Spaces uses port 7860, Render/Railway use PORT env
ENV PORT=7860
EXPOSE 7860

# Start server
CMD ["node", "server/dist/index.js"]
