# sample-express-app

A simple Node.js/Express REST API for testing git-to-git pipeline tasks.

## Endpoints

| Method | Path                | Description          |
|--------|---------------------|----------------------|
| GET    | /health             | Health check         |
| GET    | /api/users          | List all users       |
| GET    | /api/users/:id      | Get user by ID       |
| POST   | /api/users          | Create a user        |
| PUT    | /api/users/:id      | Update a user        |
| DELETE | /api/users/:id      | Delete a user        |
| GET    | /api/products       | List all products    |
| GET    | /api/products/:id   | Get product by ID    |
| POST   | /api/products       | Create a product     |
| DELETE | /api/products/:id   | Delete a product     |

## Setup

```bash
npm install
npm start
```

## Branches

- `main` — stable base with users and products routes
- `feature/auth` — adds API key authentication middleware
- `feature/logging` — adds request logging middleware
- `feature/error-handling` — adds centralized error handling and 404 handler
