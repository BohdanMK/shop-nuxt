# Categories

Base path: `/api/categories`

---

## GET `/api/categories`

Get all active categories.

**Auth required:** No

### Response `200`

```json
[
  {
    "_id": "664a1f...",
    "id": "664a1f...",
    "title": "Rolls",
    "imageId": "664b2a...",
    "image": "/uploads/rolls.jpg",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

## GET `/api/categories/admin`

Get a paginated list of categories for the admin panel.

**Auth required:** Yes

### Query Parameters

| Param       | Type                    | Default | Description                  |
|-------------|-------------------------|---------|------------------------------|
| `page`      | number                  | 1       | Page number                  |
| `limit`     | number                  | 10      | Items per page               |
| `sortBy`    | string                  | `title` | Field to sort by             |
| `sortOrder` | `asc` \| `desc`         | `asc`   | Sort direction               |
| `search`    | string                  | —       | Search by title (regex)      |
| `status`    | `active` \| `inactive`  | —       | Filter by status             |

### Response `200`

```json
{
  "items": [ /* array of categories */ ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

---

## GET `/api/categories/admin/:categoryId`

Get a category by ID (admin).

**Auth required:** Yes

### Response `200`

```json
{
  "_id": "664a1f...",
  "title": "Rolls",
  "imageId": "664b2a...",
  "image": "/uploads/rolls.jpg",
  "status": "active"
}
```

### Errors

| Status | Message                 |
|--------|-------------------------|
| 400    | Category id is required |
| 404    | Category not found      |

---

## POST `/api/categories/admin/create`

Create a new category.

**Auth required:** Yes

### Request Body

```json
{
  "title": "Rolls",
  "imageId": "664b2a...",
  "image": "/uploads/rolls.jpg"
}
```

| Field     | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| `title`   | string | Yes      | Category name        |
| `imageId` | string | No       | Media file ID        |
| `image`   | string | No       | Image path           |

### Response `201`

Returns the created category.

---

## PATCH `/api/categories/admin/:categoryId/update`

Update a category.

**Auth required:** Yes

### Request Body

```json
{
  "title": "New name",
  "imageId": "664b2a...",
  "image": "/uploads/new.jpg"
}
```

All fields are optional — pass only those that need to change.

### Response `200`

Returns the updated category.

---

## DELETE `/api/categories/admin/:categoryId/delete`

Delete a category.

**Auth required:** Yes

### Response `200`

Returns the deleted category.

---

## GET `/api/categories/:categoryId/subCategories`

Get subcategories of a category.

**Auth required:** No

### Response `200`

```json
[
  {
    "_id": "664c3b...",
    "title": "Classic rolls",
    "categoryId": "664a1f...",
    "status": "active"
  }
]
```

---

## POST `/api/categories/admin/:categoryId/subcategories/create`

Create a subcategory.

**Auth required:** Yes

### Request Body

```json
{
  "title": "Classic rolls"
}
```

### Response `201`

Returns the created subcategory.

---

## PATCH `/api/categories/admin/:categoryId/subcategories/:subCategoryId/update`

Update a subcategory.

**Auth required:** Yes

### Request Body

```json
{
  "title": "New name"
}
```

### Response `200`

Returns the updated subcategory.

---

## DELETE `/api/categories/admin/:categoryId/subcategories/:subCategoryId/delete`

Delete a subcategory.

**Auth required:** Yes

### Response `200`

Returns the deleted subcategory.
