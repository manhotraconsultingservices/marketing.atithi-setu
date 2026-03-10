# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# Note: better-sqlite3 will be compiled during this step
RUN npm install

# Copy the rest of the application code
COPY . .

# Build arguments for environment variables needed at build time
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Build the frontend assets
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment variable to production
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]
