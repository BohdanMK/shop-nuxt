# Uploads

Base path: `/api/uploads`

**Auth required:** Yes (all endpoints)

**File size limit:** 10 MB

---

## POST `/api/uploads`

Upload a file to the server.

**Content-Type:** `multipart/form-data`

### Form Data

| Field  | Type | Required | Description       |
|--------|------|----------|-------------------|
| `file` | File | Yes      | File to upload    |

### Response `200`

```json
{
  "message": "File uploaded successfully",
  "userId": "664a1f...",
  "fileId": "664b2a...",
  "fileName": "1716200000000-123456789.jpg",
  "filePath": "/uploads/1716200000000-123456789.jpg",
  "fileUrl": "http://localhost:5000/uploads/1716200000000-123456789.jpg",
  "mimeType": "image/jpeg",
  "size": 204800,
  "status": "active"
}
```

### Errors

| Status | Message           |
|--------|-------------------|
| 400    | No file uploaded  |
| 401    | Unauthorized      |

---

## GET `/api/uploads/:fileId`

Retrieve a file by ID. Accessible only by the file owner or an admin.

### Response `200`

Returns the binary file via `sendFile`.

### Errors

| Status | Message                  |
|--------|--------------------------|
| 400    | Invalid file id          |
| 401    | Unauthorized             |
| 403    | Forbidden                |
| 404    | File not found           |
| 404    | Physical file not found  |

---

## DELETE `/api/uploads/:fileId`

Delete a file. Accessible only by the file owner or an admin.

Physically removes the file from disk and sets its status to `deleted` in the database.

### Response `200`

```json
{
  "message": "File deleted successfully",
  "userId": "664a1f...",
  "fileId": "664b2a...",
  "status": "deleted"
}
```

### Errors

| Status | Message          |
|--------|------------------|
| 400    | Invalid file id  |
| 401    | Unauthorized     |
| 403    | Forbidden        |
| 404    | File not found   |
