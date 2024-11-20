# Specify the base image
FROM node:20.17.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 for Nuxt
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "run", "start"]