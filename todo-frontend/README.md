# TODO App


This is a simple and intuitive TODO app built with Nuxt 3, designed for ease of use with Firebase integration for authentication and database management. The app also leverages Pinia as its state management library, Vuetify for UI components, and Tailwind CSS for styling.


## Tech Stack


-   Nuxt 3 - Server-side rendering and routing.
-   Pinia - State management.
-   Vuetify - UI components and layout.
-   Tailwind CSS - Custom styling.
-   Firebase - Used for authentication and as the database.


## Features


-   User authentication (register and login).
-   CRUD operations for TODO items.
-   Real-time updates and a clean, responsive UI.


## Prerequisites


-   Node.js (version 20.17.0 recommended)
-   Docker (if running with Docker)
-   Firebase Project: Set up your Firebase project and add your Firebase configuration.


## Installation


Clone this repository:



```bash
git clone https://github.com/tegarps237/todos-apps.git
cd todo-apps
```


Make sure to install dependencies:



```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```


## Running the App Locally


### *No need .env file


Start the app in development mode:


```bash
npm run dev
```


Navigate to http://localhost:3000 to access the app.

## Running the App with Docker


Build the Docker image:


```bash
docker build -t todo-app .
```


## Run the Docker container:


```bash
docker run -d -p 3000:3000 todo-app
```


Access the app at http://localhost:3000.

## Project Structure
-   /components - Vue components used throughout the app.
-   /layouts - Separate layout for auth and todo
-   /lib - Firebase configuration
-   /middleware - Route middleware for authentication.
-   /pages - App pages for each route.
-   /plugins - Nuxt plugins (e.g., Pinia, Vuetify).
-   /store - Pinia stores for state management.
-   Dockerfile - Docker configuration.
