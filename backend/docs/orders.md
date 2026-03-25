# Orders

Base path: `/api/order`

---

## GET `/api/order/admin/all`

Get all orders with filters and pagination.

**Auth required:** Yes

### Query Parameters

| Param      | Type                                          | Default | Description               |
|------------|-----------------------------------------------|---------|---------------------------|
| `page`     | number                                        | 1       | Page number               |
| `limit`    | number                                        | 10      | Items per page            |
| `status`   | `pending` \| `confirmed` \| `processing`      | —       | Filter by status          |
| `dateFrom` | string (ISO date)                             | —       | Created at — from date    |
| `dateTo`   | string (ISO date)                             | —       | Created at — to date      |
| `name`     | string                                        | —       | Search by customer name   |
| `phone`    | string                                        | —       | Search by phone number    |
| `cityName` | string                                        | —       | Filter by city name       |

### Response `200`

```json
{
  "items": [
    {
      "_id": "664d4c...",
      "name": "John Doe",
      "phone": "+380501234567",
      "street": "Main St",
      "house": "1",
      "cityId": "UA_KYIV",
      "cityName": "Kyiv",
      "deliveryType": "delivery",
      "deliveryTime": "nearest_time",
      "date": "2024-05-01T00:00:00.000Z",
      "time": "14:00",
      "birthdayDiscount": false,
      "comment": "No onion",
      "valuePerson": 2,
      "agreePolicy": true,
      "cartSnapshot": {
        "items": [
          {
            "productId": "664a1f...",
            "title": "Philadelphia",
            "quantity": 2,
            "itemPrice": 180,
            "selectedOptions": []
          }
        ],
        "totalPrice": 360
      },
      "status": "pending",
      "createdAt": "2024-05-01T12:00:00.000Z"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

---

## PATCH `/api/order/admin/:orderId/status`

Update the status of an order.

**Auth required:** Yes

### Request Body

```json
{
  "status": "confirmed"
}
```

| Field    | Type                                      | Required | Description    |
|----------|-------------------------------------------|----------|----------------|
| `status` | `pending` \| `confirmed` \| `processing`  | Yes      | New status     |

### Response `200`

Returns the updated order.

### Errors

| Status | Message              |
|--------|----------------------|
| 400    | Order id is required |
| 400    | Invalid status       |

---

## POST `/api/order/create`

Place an order. Reads `cartId` from cookie, creates a cart snapshot, then clears the cart.

**Auth required:** No

**Cookie:** `cartId` (required to retrieve cart items)

### Request Body

```json
{
  "name": "John Doe",
  "phone": "+380501234567",
  "street": "Main St",
  "house": "1",
  "cityId": "UA_KYIV",
  "cityName": "Kyiv",
  "deliveryType": "delivery",
  "deliveryTime": "nearest_time",
  "date": "2024-05-01",
  "time": "14:00",
  "birthdayDiscount": false,
  "comment": "No onion",
  "valuePerson": 2,
  "agreePolicy": true
}
```

| Field              | Type                             | Required | Description                           |
|--------------------|----------------------------------|----------|---------------------------------------|
| `name`             | string                           | Yes      | Customer name                         |
| `phone`            | string                           | Yes      | Phone number                          |
| `street`           | string                           | Yes      | Street name                           |
| `house`            | string                           | Yes      | House number                          |
| `cityId`           | string                           | No       | City ID                               |
| `cityName`         | string                           | No       | City name                             |
| `deliveryType`     | `delivery` \| `pickup`           | Yes      | Delivery method                       |
| `deliveryTime`     | `in_time` \| `nearest_time`      | Yes      | Delivery time preference              |
| `date`             | string (ISO date)                | Yes      | Delivery date                         |
| `time`             | string                           | Yes      | Delivery time (e.g. `"14:00"`)        |
| `birthdayDiscount` | boolean                          | No       | Apply birthday discount (default: false) |
| `comment`          | string                           | No       | Order comment                         |
| `valuePerson`      | number                           | No       | Number of persons (default: 1)        |
| `agreePolicy`      | boolean                          | Yes      | Agreement to terms                    |

### Response `200`

Returns the created order. The `cartId` cookie is cleared.
