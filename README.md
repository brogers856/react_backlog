# Game Backlog Web Application

Simple backlog organizer for video games. Built using React and Express. Still a WIP.

## Planned features

- Drag and drop reordering of items
- User registration
- Error handling and response
- Style cleanup

## Setup

To run locally, you need:

- mongoDB database
- Cloudinary account (for image upload)
- GiantBomb account (for api key)

The client folder must have an .env file containing the REACT_BACKEND_ADDRESS variable

The api folder must have an .env file containing GIANT_BOMB_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET variables

To start the backend:
```
nodemon app.js
```

To start the frontend:
```
npm start
```
