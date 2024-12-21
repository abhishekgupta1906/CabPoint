## POST /captains/register

**Description**
Register a new captain with the system.

**Request Body**

- `firstname` (string, required): Captain's first name.
- `lastname` (string, optional): Captain's last name.
- `email` (string, required): Captain's email address.
- `password` (string, required): Captain's password.
- `color` (string, required): Vehicle color.
- `plate` (string, required): Vehicle plate number.
- `capacity` (number, required): Vehicle capacity.
- `vehicleType` (string, required): Type of vehicle (`car`, `motorcycle`, `auto`).

**Responses**

- `201 OK`: Returns the authentication token and captain details.
- `400 Bad Request`: Validation errors.
- `401 Unauthorized`: Captain already exists.

**Example Request**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "Blue",
    "plate": "XYZ 1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Example Response**

```json
{
  "token": "jwt-token",
  "captain": {
    "_id": "captain-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ 1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## POST /captains/login

**Description**
Authenticate a captain and obtain an authentication token.

**Request Body**
- `email` (string, required): Captain's email address.
- `password` (string, required): Captain's password.

**Responses**
- `201 OK`: Returns the authentication token and captain details.
- `400 Bad Request`: Validation errors.
- `401 Unauthorized`: Invalid email or password.

**Example Request**
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Example Response**
```json
{
    "token": "jwt-token",
    "captain": {
        "_id": "captain-id",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
            "color": "Blue",
            "plate": "XYZ 1234",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

## GET /captains/profile

**Description**
Retrieve the authenticated captain's profile.

**Headers**
- `Authorization`: Bearer token.

**Responses**
- `201 OK`: Returns the captain's profile details.
- `401 Unauthorized`: Invalid or missing token.

**Example Request**
```http
GET /captains/profile
Authorization: Bearer your-jwt-token
```

**Example Response**
```json
{
    "_id": "captain-id",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
        "color": "Blue",
        "plate": "XYZ 1234",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

## GET /captains/logout

**Description**
Logout the authenticated captain by invalidating the current token.

**Headers**
- `Authorization`: Bearer token.

**Responses**
- `201 OK`: Logout successful.
- `401 Unauthorized`: Invalid or missing token.

**Example Request**
```http
GET /captains/logout
Authorization: Bearer your-jwt-token
```

**Example Response**
```json
{
    "message": "logout success"
}
```
