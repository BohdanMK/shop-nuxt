# Product Options

Base path: `/api/product-options`

A global catalog of option groups that can be assigned to products.

**Auth required:** Yes (all endpoints)

---

## GET `/api/product-options/admin`

Get all option groups.

### Response `200`

```json
[
  {
    "_id": "664e5d...",
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
        "description": "Very spicy",
        "image": { "src": "/uploads/sauce.jpg", "alt": "Sauce" },
        "extraPrice": { "amount": 20, "currency": "UAH" },
        "components": []
      }
    ]
  }
]
```

---

## GET `/api/product-options/admin/:optionId`

Get an option group by ID.

### Response `200`

Returns the option group object (same structure as above).

### Errors

| Status | Message               |
|--------|-----------------------|
| 400    | Option id is required |
| 404    | Option not found      |

---

## POST `/api/product-options/admin/create`

Create a new option group.

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
      "description": "Very spicy",
      "extraPrice": { "amount": 20, "currency": "UAH" }
    }
  ]
}
```

| Field         | Type                    | Required | Description                              |
|---------------|-------------------------|----------|------------------------------------------|
| `id`          | string                  | Yes      | Unique group identifier                  |
| `name`        | string                  | Yes      | Group display name                       |
| `type`        | `single` \| `multiple`  | Yes      | Selection type                           |
| `required`    | boolean                 | No       | Whether selection is required (default: false) |
| `minSelected` | number                  | No       | Minimum number of selections             |
| `maxSelected` | number                  | No       | Maximum number of selections             |
| `values`      | array                   | Yes      | Option values (see structure below)      |

**`values[]` structure:**

| Field         | Type   | Required | Description                                        |
|---------------|--------|----------|----------------------------------------------------|
| `id`          | string | Yes      | Value identifier                                   |
| `label`       | string | Yes      | Display label                                      |
| `description` | string | No       | Description text                                   |
| `image`       | object | No       | `{ src: string, alt?: string }`                    |
| `extraPrice`  | object | No       | `{ amount: number, currency: "UAH" }`              |
| `components`  | array  | No       | `[{ name: string, image: { src: string, alt?: string } }]` |

### Response `201`

Returns the created option group.

---

## PATCH `/api/product-options/admin/:optionId/update`

Update an option group.

### Request Body

Same fields as creation. Pass only those that need to change.

### Response `200`

Returns the updated option group.

### Errors

| Status | Message               |
|--------|-----------------------|
| 400    | Option id is required |
| 404    | Option not found      |

---

## DELETE `/api/product-options/admin/:optionId/delete`

Delete an option group.

### Response `200`

Returns the deleted option group.

### Errors

| Status | Message               |
|--------|-----------------------|
| 400    | Option id is required |
| 404    | Option not found      |
