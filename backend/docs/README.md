# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

Most admin endpoints require a JWT token in the header:

```
Authorization: Bearer <token>
```

The token is obtained via `POST /api/auth/login` and is valid for **3 hours**.

---

## Entities

| File | Base Path | Description |
|------|-----------|-------------|
| [auth.md](./auth.md) | `/api/auth` | Authentication |
| [products.md](./products.md) | `/api/products` | Products |
| [categories.md](./categories.md) | `/api/categories` | Categories & subcategories |
| [cart.md](./cart.md) | `/api/cart` | Shopping cart |
| [orders.md](./orders.md) | `/api/order` | Orders |
| [users.md](./users.md) | `/api/users` | User management |
| [profile.md](./profile.md) | `/api/profile` | Current user profile |
| [uploads.md](./uploads.md) | `/api/uploads` | File uploads |
| [product-options.md](./product-options.md) | `/api/product-options` | Global option groups |
| [company-info.md](./company-info.md) | `/api/company-info` | Company public/admin settings |

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error description"
}
```

## Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200  | OK |
| 201  | Created |
| 400  | Bad Request / Validation Error |
| 401  | Unauthorized (missing or invalid token) |
| 403  | Forbidden (insufficient permissions) |
| 404  | Not Found |
| 500  | Internal Server Error |
