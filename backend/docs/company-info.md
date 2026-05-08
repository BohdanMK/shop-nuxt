# Company Info

Base path: `/api/company-info`

---

## GET `/api/company-info`

Get the singleton company info object.

**Auth required:** No

### Response `200`

```json
{
  "aboutDescription": "<p>About company html</p>",
  "bannerContents": [],
  "companyLogo": {
    "src": "",
    "alt": ""
  },
  "companyTitle": ""
}
```

### Errors

| Status | Message                |
|--------|------------------------|
| 404    | Company info not found |

---

## POST `/api/company-info/admin/create`

Create singleton company info object.

**Auth required:** Yes

### Request Body

```json
{
  "aboutDescription": "",
  "bannerContents": [],
  "companyLogo": {
    "src": "",
    "alt": ""
  },
  "companyTitle": ""
}
```

| Field              | Type   | Required | Description                    |
|--------------------|--------|----------|--------------------------------|
| `aboutDescription` | string | No       | HTML content                   |
| `bannerContents`   | array  | No       | Banner content items           |
| `companyLogo`      | object | No       | `{ src: string, alt: string }` |
| `companyTitle`     | string | No       | Company title                  |

### Errors

| Status | Message                                  |
|--------|------------------------------------------|
| 409    | Company info already exists |

---

## PATCH `/api/company-info/admin/update`

Partially update singleton company info object.

**Auth required:** Yes

Pass only changed fields.
