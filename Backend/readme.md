# CABPOINT Backend API

## User Registration

### Endpoint

`POST /users/register`

### Description

Registers a new user with the provided firstname, lastname, email, and password.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Example Usage

**Request:**

```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "strongPassword456"
}'
```

**Successful Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "socketId": null
  }
}
```

## User Login

### Endpoint

`POST /users/login`

### Description

Authenticates a user using email and password.

### Request Body

```json
{
  "email": "jane.doe@example.com",
  "password": "strongPassword456"
}
```

### Example Usage

**Request:**

```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "jane.doe@example.com",
  "password": "strongPassword456"
}'
```

**Successful Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "socketId": null
  }
}
```

## User Profile

### Endpoint

`GET /users/profile`

### Description

Retrieves the authenticated user's profile information.

### Example Usage

**Request:**

```bash
curl -X GET http://localhost:3000/users/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer your_jwt_token_here"
```

**Successful Response:**

```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com"
}
```

## User Logout

### Endpoint

`GET /users/logout`

### Description

Logs out the authenticated user by invalidating the user's token and clearing authentication cookies.

### Example Usage

**Request:**

```bash
curl -X GET http://localhost:3000/users/logout \
-H "Content-Type: application/json" \
-H "Authorization: Bearer your_jwt_token_here"
```

**Successful Response:**

```json
{
  "message": "logout success"
}
```

