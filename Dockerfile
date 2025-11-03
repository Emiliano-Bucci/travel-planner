# -------- Build Stage --------
    FROM node:20.18.3 AS builder
    # Set working directory
    WORKDIR /app
    
    # Copy all files
    COPY . .
    # Install dependencies and build
    RUN npm ci && npm run build
    
    # -------- Serve Stage --------
    FROM nginx:1.28-bookworm-perl AS production
    # Copy built app from previous stage
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Remove default nginx config
    RUN rm /etc/nginx/conf.d/default.conf
    
    # Copy custom nginx config
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Expose HTTP port
    EXPOSE 80
    
    # Start nginx
    CMD ["nginx", "-g", "daemon off;"]
    