# Auth

Base path: `/api/auth`

---

## POST `/api/auth/login`

Authenticate a user and receive a JWT token.

**Auth required:** No

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "secret123"
}
```

| Field      | Type   | Required | Description    |
|------------|--------|----------|----------------|
| `email`    | string | Yes      | User email     |
| `password` | string | Yes      | User password  |

### Response `200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "664a1f...",
    "name": "Admin",
    "userName": "admin",
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

> **Note:** Token is valid for 3 hours. Pass it in subsequent requests as: `Authorization: Bearer <token>`

### Errors

| Status | Message                         |
|--------|---------------------------------|
| 400    | Email and password are required |
| 400    | User not found                  |
| 400    | Invalid credentials             |
