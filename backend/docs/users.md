# Users

Base path: `/api/users`

**Auth required:** Yes (all endpoints)

---

## GET `/api/users`

Get a paginated list of users with optional filters.

### Query Parameters

| Param    | Type                               | Default | Description                    |
|----------|------------------------------------|---------|--------------------------------|
| `page`   | number                             | 1       | Page number                    |
| `limit`  | number                             | 10      | Items per page                 |
| `search` | string                             | —       | Search by name or email        |
| `role`   | `admin` \| `user` \| `moderator`   | —       | Filter by role                 |

### Response `200`

```json
{
  "items": [
    {
      "_id": "664a1f...",
      "name": "John Doe",
      "userName": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

> **Note:** The `password` field is never returned.

---

## GET `/api/users/admin`

Alias for `GET /api/users`. Returns the same list.

> To get only admins use: `GET /api/users?role=admin`

---

## GET `/api/users/:userId`

Get a user by ID.

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

### Errors

| Status | Message         |
|--------|-----------------|
| 400    | Invalid user id |
| 404    | User not found  |

---

## POST `/api/users/create`

Create a new user.

### Request Body

```json
{
  "name": "John Doe",
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "user"
}
```

| Field      | Type                               | Required | Description                       |
|------------|------------------------------------|----------|-----------------------------------|
| `name`     | string                             | Yes      | Full name                         |
| `userName` | string                             | Yes      | Unique username                   |
| `email`    | string                             | Yes      | Email address (must be unique)    |
| `password` | string                             | Yes      | Password (hashed with bcrypt)     |
| `role`     | `admin` \| `user` \| `moderator`   | No       | User role (default: `user`)       |

### Response `201`

Returns the created user (without `password`).

### Errors

| Status | Message                  |
|--------|--------------------------|
| 400    | Name is required         |
| 400    | Email is required        |
| 400    | Email already exists     |
| 400    | UserName already exists  |

---

## PATCH `/api/users/:userId/update`

Update a user.

### Request Body

```json
{
  "name": "New Name",
  "userName": "new_john",
  "email": "new@example.com",
  "password": "newpassword",
  "role": "moderator"
}
```

All fields are optional — pass only those that need to change.

> If a new `password` is provided, it is automatically re-hashed.

### Response `200`

Returns the updated user (without `password`).

---

## DELETE `/api/users/:userId/delete`

Delete a user.

### Response `200`

Returns the deleted user.

### Errors

| Status | Message         |
|--------|-----------------|
| 400    | Invalid user id |
| 404    | User not found  |
