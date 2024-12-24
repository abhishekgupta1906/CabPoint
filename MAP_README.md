## GET /maps/get-coordinates

**Description:**  
Retrieves the geographical coordinates (latitude and longitude) for a specified address.

**Parameters:**

- `address` (query parameter, string, required): The address to geocode.

**Response:**

- **200 OK**
  ```json
  {
    "lat": 40.7128,
    "lng": -74.0060
  }
  ```
- **400 Bad Request**: If the `address` parameter is missing or invalid.
- **404 Not Found**: If coordinates cannot be found for the given address.

**Example Request:**
```
GET /maps/get-coordinates?address=New%20York
```

**Example Response:**
```json
{
  "lat": 40.7128,
  "lng": -74.0060
}
```

## GET /maps/get-distance-time

**Description:**  
Calculates the distance and estimated travel time between an origin and a destination address.

**Parameters:**

- `origin` (query parameter, string, required): The starting address.
- `destination` (query parameter, string, required): The destination address.

**Response:**

- **200 OK**
  ```json
   "distance": {
        "text": "211 km",
        "value": 210632
    },
    "duration": {
        "text": "4 hours 40 mins",
        "value": 16809
    },
    "status": "OK"
  ```
- **400 Bad Request**: If required parameters are missing or invalid.
- **404 Not Found**: If no route is found between the origin and destination.

**Example Request:**
```
GET /maps/get-distance-time?origin=New%20York&destination=Boston
```

**Example Response:**
```json
 "distance": {
        "text": "211 km",
        "value": 210632
    },
    "duration": {
        "text": "4 hours 40 mins",
        "value": 16809
    },
    "status": "OK"
```

## GET /maps/getAutoCompleteSuggestions

**Description:**  
Provides autocomplete suggestions for place names based on the user's input.

**Parameters:**

- `input` (query parameter, string, required): The partial name or address to get suggestions for.

**Response:**

- **200 OK**
  ```json
  [
    "New York, NY, USA",
    "Newark, NJ, USA",
    "Newport, RI, USA"
  ]
  ```
- **400 Bad Request**: If the `input` parameter is missing or invalid.
- **404 Not Found**: If no suggestions are found for the given input.

**Example Request:**
```
GET /maps/getAutoCompleteSuggestions?input=New
```

**Example Response:**
```json
[
  "New York, NY, USA",
  "Newark, NJ, USA",
  "Newport, RI, USA"
]
```
