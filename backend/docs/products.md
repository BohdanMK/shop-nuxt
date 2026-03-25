# Products

Base path: `/api/products` or `/api/product` (alias)

---

## GET `/api/products`

Get a paginated list of products with optional filters.

**Auth required:** No

### Query Parameters

| Param           | Type                                              | Default     | Description                     |
|-----------------|---------------------------------------------------|-------------|---------------------------------|
| `page`          | number                                            | 1           | Page number                     |
| `limit`         | number                                            | 12          | Items per page (max 100)        |
| `categoryId`    | string (ObjectId)                                 | —           | Filter by category              |
| `subCategoryId` | string (ObjectId)                                 | —           | Filter by subcategory           |
| `isOnSale`      | boolean (`true` / `false`)                        | —           | Show only sale items            |
| `search`        | string                                            | —           | Search by title                 |
| `sortBy`        | `createdAt` \| `title` \| `price` \| `salePrice`  | `createdAt` | Sort field                      |
| `sortOrder`     | `asc` \| `desc`                                   | `desc`      | Sort direction                  |

### Response `200`

```json
{
  "items": [
    {
      "_id": "664a1f...",
      "id": "philadelphia-salmon",
      "title": "Philadelphia with salmon",
      "image": { "src": "/uploads/photo.jpg", "alt": "Philadelphia" },
      "isOnSale": true,
      "salePrice": 150,
      "weightGrams": 250,
      "price": { "amount": 180, "currency": "UAH" },
      "ctaLabel": "Add",
      "categoryId": "664c3b...",
      "categoryName": "Rolls",
      "subCategoryId": "664c4d...",
      "subCategoryName": "Classic",
      "components": [
        { "name": "Salmon", "image": { "src": "/uploads/salmon.jpg" } }
      ],
      "optionGroups": [],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 12,
  "totalPages": 9
}
```

---

## GET `/api/products/admin`

Same as `GET /api/products` but requires authentication.

**Auth required:** Yes

---

## GET `/api/products/:productId`

Get a product by ID.

**Auth required:** No

### Response `200`

Returns the product object (same structure as above).

### Errors

| Status | Message                |
|--------|------------------------|
| 400    | Product id is required |
| 404    | Product not found      |

---

## GET `/api/products/admin/:productId`

Get a product by ID (admin).

**Auth required:** Yes

---

## POST `/api/products/admin/create`

Create a new product.

**Auth required:** Yes

### Request Body

```json
{
  "id": "philadelphia-salmon",
  "title": "Philadelphia with salmon",
  "image": { "src": "/uploads/photo.jpg", "alt": "Philadelphia" },
  "isOnSale": true,
  "salePrice": 150,
  "weightGrams": 250,
  "price": { "amount": 180, "currency": "UAH" },
  "ctaLabel": "Add",
  "categoryId": "664c3b...",
  "categoryName": "Rolls",
  "subCategoryId": "664c4d...",
  "subCategoryName": "Classic",
  "components": [
    { "name": "Salmon", "image": { "src": "/uploads/salmon.jpg", "alt": "Salmon" } }
  ],
  "optionGroups": []
}
```

| Field            | Type    | Required | Description                               |
|------------------|---------|----------|-------------------------------------------|
| `title`          | string  | Yes      | Product name                              |
| `image`          | object  | Yes      | `{ src: string, alt?: string }`           |
| `price`          | object  | Yes      | `{ amount: number, currency: "UAH" }`     |
| `weightGrams`    | number  | Yes      | Weight in grams                           |
| `isOnSale`       | boolean | No       | Whether on sale (default: false)          |
| `salePrice`      | number  | No       | Sale price                                |
| `ctaLabel`       | string  | No       | Button label text                         |
| `categoryId`     | string  | No       | Category ID                               |
| `categoryName`   | string  | No       | Category name                             |
| `subCategoryId`  | string  | No       | Subcategory ID                            |
| `subCategoryName`| string  | No       | Subcategory name                          |
| `components`     | array   | No       | Ingredients `[{ name, image }]`           |
| `optionGroups`   | array   | No       | Option groups (see structure below)       |
| `id`             | string  | No       | Human-readable slug                       |

### Response `201`

Returns the created product.

---

## PATCH `/api/products/admin/:productId/update`

Update a product.

**Auth required:** Yes

### Request Body

Same fields as creation. Pass only those that need to change.

### Response `200`

Returns the updated product.

---

## DELETE `/api/products/admin/:productId/delete`

Delete a product.

**Auth required:** Yes

### Response `200`

Returns the deleted product.

---

## GET `/api/products/:productId/optionGroups`

Get option groups for a product.

**Auth required:** No

### Response `200`

```json
[
  {
    "id": "sauce",
    "name": "Sauce",
    "type": "single",
    "required": false,
    "minSelected": 0,
    "maxSelected": 1,
    "values": [
      {
        "id": "spicy",
        "label": "Spicy sauce",
        "extraPrice": { "amount": 20, "currency": "UAH" }
      }
    ]
  }
]
```

---

## GET `/api/products/admin/:productId/optionGroups`

**Auth required:** Yes — same as above.

---

## POST `/api/products/admin/:productId/optionGroups/add`

Add an option group to a product.

**Auth required:** Yes

### Request Body

```json
{
  "id": "sauce",
  "name": "Sauce",
  "type": "single",
  "required": false,
  "minSelected": 0,
  "maxSelected": 1,
  "values": [
    {
      "id": "spicy",
      "label": "Spicy sauce",
      "extraPrice": { "amount": 20, "currency": "UAH" }
    }
  ]
}
```

| Field         | Type                    | Required | Description                         |
|---------------|-------------------------|----------|-------------------------------------|
| `id`          | string                  | Yes      | Unique group identifier             |
| `name`        | string                  | Yes      | Group display name                  |
| `type`        | `single` \| `multiple`  | Yes      | Selection type                      |
| `required`    | boolean                 | No       | Whether selection is required (default: false) |
| `minSelected` | number                  | No       | Minimum number of selections        |
| `maxSelected` | number                  | No       | Maximum number of selections        |
| `values`      | array                   | Yes      | Option values (see structure below) |

**`values[]` structure:**

| Field         | Type   | Required | Description                           |
|---------------|--------|----------|---------------------------------------|
| `id`          | string | Yes      | Value identifier                      |
| `label`       | string | Yes      | Display label                         |
| `description` | string | No       | Description text                      |
| `image`       | object | No       | `{ src: string, alt?: string }`       |
| `extraPrice`  | object | No       | `{ amount: number, currency: "UAH" }` |
| `components`  | array  | No       | `[{ name: string, image: { src, alt? } }]` |

### Response `201`

Returns the updated product with the added option group.

---

## PATCH `/api/products/admin/:productId/optionGroups/:optionGroupId/update`

Update an option group on a product.

**Auth required:** Yes

### Request Body

Same fields as when adding an option group.

### Response `200`

Returns the updated product.

---

## DELETE `/api/products/admin/:productId/optionGroups/:optionGroupId/delete`

Remove an option group from a product.

**Auth required:** Yes

### Response `200`

Returns the updated product.
