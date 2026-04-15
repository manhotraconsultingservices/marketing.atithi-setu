# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (including devDeps like tsx, vite, typescript)
# NODE_ENV must NOT be production here, otherwise npm skips devDependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build arguments for environment variables
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

# Build the frontend assets with Vite
RUN npm run build

# Set production mode AFTER build so devDeps were available during build
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Start the server using tsx (required because tsconfig has noEmit:true,
# meaning tsc cannot compile server.ts to JS)
CMD ["npm", "start"]