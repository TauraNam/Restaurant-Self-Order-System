# Base image
FROM node:20 AS build

# Set working directory
WORKDIR ./

# Copy project files
COPY . .

# Install dependencies and build the project
RUN npm install && npm run build

# Use nginx to serve built files
FROM nginx:alpine
COPY --from=build ./dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
