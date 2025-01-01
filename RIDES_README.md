### Create Ride Endpoint

**URL:** `/rides/create`

**Method:** `POST`

**Description:** Creates a new ride request.

**Authentication:** Required (User)

**Request Body:**

- `pickup` (string, required): Pickup address.
- `destination` (string, required): Destination address.
- `vehicleType` (string, required): Type of vehicle (`auto`, `car`, `bike`).

**Response:**

- `201 Created` with ride details.

**Example Request:**

```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

**Example Response:**

```json
{
  "_id": "rideId",
  "user": "userId",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "otp": "1234",
  "fare": 50,
  "status": "pending",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Error Responses:**

- `400 Bad Request`: Validation errors.
- `401 Unauthorized`: If not authenticated.
- `500 Internal Server Error`: Server errors.

### Get Fare Endpoint

**URL:** `/rides/fare`

**Method:** `GET`

**Description:** Retrieves fare estimation between pickup and destination locations.

**Authentication:** Required (User)

**Query Parameters:**
- `pickup` (string, required): Pickup address.
- `destination` (string, required): Destination address.

**Response:**
- `200 OK` with fare details.

**Example Request:**
```
GET /rides/fare?pickup=123 Main St&destination=456 Elm St
```

**Example Response:**
```json
{
  "auto": 50,
  "car": 70,
  "bike": 30
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors.
- `401 Unauthorized`: If not authenticated.
- `500 Internal Server Error`: Server errors.

### Confirm Ride Endpoint

**URL:** `/rides/confirm`

**Method:** `POST`

**Description:** Confirms a ride request by a captain.

**Authentication:** Required (Captain)

**Request Body:**
- `rideId` (string, required): ID of the ride to confirm.

**Response:**
- `200 OK` with updated ride details.

**Example Request:**
```json
{
  "rideId": "rideId"
}
```

**Example Response:**
```json
{
  "_id": "rideId",
  "user": "userId",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "otp": "1234",
  "fare": 50,
  "status": "accepted",
  "captain": "captainId",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors.
- `401 Unauthorized`: If not authenticated.
- `500 Internal Server Error`: Server errors.

### Socket.io Usage

The application utilizes Socket.io for real-time communication between the server and clients.

- **New Ride Notification:** When a new ride is created, the server emits a `new-ride` event to captains within the specified radius.

- **Ride Confirmation:** When a ride is confirmed by a captain, the server emits a `ride-confirmed` event to the user.

**Example:**

```javascript
// Emitting a new ride to captains
sendMessageToSocketId(captain.socketId, { event: "new-ride", data: rideWithUser });

// Emitting ride confirmation to user
sendMessageToSocketId(ride.user.socketId, { event: "ride-confirmed", data: ride });
```
