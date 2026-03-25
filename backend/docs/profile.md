# Profile

Base path: `/api/profile`

---

## GET `/api/profile`

Get the profile of the currently authenticated user.

**Auth required:** Yes

**Headers:**
```
Authorization: Bearer <token>
```

### Response `200`

```json
{
  "_id": "664a1f...",
  "name": "John Doe",
  "userName": "johndoe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

> **Note:** The `password` field is never returned.

### Errors

| Status | Message        |
|--------|----------------|
| 401    | Unauthorized   |
| 404    | User not found |
