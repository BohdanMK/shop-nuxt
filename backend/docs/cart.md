# Cart

Base path: `/api/cart`

The cart is identified by a `cartId` cookie, which is set automatically when the first item is added.

**Auth required:** No (all endpoints are public)

---

## GET `/api/cart`

Get the current cart.

**Cookie:** `cartId` — if not present, returns `null`

### Response `200`

```json
{
  "_id": "664b2a...",
  "items": [
    {
      "_id": "664b2b...",
      "productId": "664a1f...",
      "slug": "philadelphia-salmon",
      "title": "Philadelphia with salmon",
      "image": { "src": "/uploads/photo.jpg", "alt": "Philadelphia" },
      "price": { "amount": 180, "currency": "UAH" },
      "salePrice": 150,
      "itemPrice": 150,
      "selectedOptions": [],
      "quantity": 2
    }
  ],
  "totalPrice": 300,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

Returns `null` if no cart exists.

---

## POST `/api/cart/add`

Add a product to the cart. If the same product with the same options already exists, its quantity is incremented.

### Request Body

```json
{
  "productId": "664a1f...",
  "quantity": 1,
  "selectedOptions": [
    {
      "id": "sauce",
      "label": "Spicy sauce",
      "extraPrice": { "amount": 20, "currency": "UAH" }
    }
  ]
}
```

| Field             | Type              | Required | Description                         |
|-------------------|-------------------|----------|-------------------------------------|
| `productId`       | string (ObjectId) | Yes      | Product ID                          |
| `quantity`        | number            | No       | Quantity to add (default: 1)        |
| `selectedOptions` | array             | No       | Selected product options            |

### Response `200`

Returns the updated cart object. The `cartId` cookie is set automatically on first add.

---

## POST `/api/cart/item/increase`

Set a new quantity for a cart item.

### Request Body

```json
{
  "cartItemId": "664b2b...",
  "quantity": 3
}
```

| Field        | Type              | Required | Description          |
|--------------|-------------------|----------|----------------------|
| `cartItemId` | string (ObjectId) | Yes      | Cart item ID         |
| `quantity`   | number (≥ 1)      | Yes      | New quantity to set  |

### Response `200`

Returns the updated cart object.

---

## POST `/api/cart/item/decrease`

Decrease the quantity of a cart item. If `quantity >= current quantity`, the item is removed.

### Request Body

```json
{
  "cartItemId": "664b2b...",
  "quantity": 1
}
```

| Field        | Type              | Required | Description                          |
|--------------|-------------------|----------|--------------------------------------|
| `cartItemId` | string (ObjectId) | Yes      | Cart item ID                         |
| `quantity`   | number            | No       | Amount to decrease by (default: 1)   |

### Response `200`

Returns the updated cart object. Returns `null` if cart does not exist.

---

## POST `/api/cart/item/delete`

Completely remove an item from the cart regardless of its quantity.

### Request Body

```json
{
  "cartItemId": "664b2b..."
}
```

| Field        | Type              | Required | Description  |
|--------------|-------------------|----------|--------------|
| `cartItemId` | string (ObjectId) | Yes      | Cart item ID |

### Response `200`

Returns the updated cart object. Returns `null` if cart does not exist.
