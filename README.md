# Products API Documentation

Base URL (Production):

```
https://api-gallery-image.vercel.app/api
```

Base URL (Local):

```
http://localhost:3000/api
```

---

## Response Format

All endpoints return a consistent JSON response format:

```json
{
  "success": true,
  "message": "string",
  "data": "object | array | null"
}
```

* **success**: Indicates whether the request was successful
* **message**: Human-readable response message
* **data**: Returned resource data (if applicable)

---

## Product Object

```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "image": "string (URL)",
  "createdAt": "ISO 8601 timestamp",
  "updatedAt": "ISO 8601 timestamp"
}
```

---

## Get All Products

**Endpoint**

```
GET /products
```

**Description**
Retrieve a list of all products.

**Response Example**

```json
{
  "success": true,
  "message": "Get product successfully",
  "data": [
    {
      "id": "10384821-160a-47ca-a687-241ba961cbcd",
      "name": "asdfadfas",
      "description": "asdfasdfasdfasdfas",
      "image": "https://example.com/image.jpeg",
      "createdAt": "2026-01-30T01:48:38.737Z",
      "updatedAt": "2026-01-30T01:48:38.737Z"
    }
  ]
}
```

---

## Create Product

**Endpoint**

```
POST /products
```

**Description**
Create a new product.

**Request Body**

```json
{
  "name": "string",
  "description": "string",
  "image": "string (URL)"
}
```

**Response Example**

```json
{
  "success": true,
  "message": "Add product successfully",
  "data": {
    "id": "b35fdec9-7ee2-4609-88b2-3232b9036447",
    "name": "Gunung Merbabu",
    "description": "Gunung Merbabu (3.145 mdpl)...",
    "image": "https://example.com/image.webp",
    "createdAt": "2026-01-30T06:49:21.511Z",
    "updatedAt": "2026-01-30T06:49:21.511Z"
  }
}
```

---

## Update Product

**Endpoint**

```
PUT /products/:id
```

**Description**
Update an existing product by ID.

**Important Rule**
At least **one field must be provided** in the request body:

* `name`
* `description`
* `image`

**Request Body (Partial Allowed)**

```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "image": "string (URL, optional)"
}
```

**Response Example**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "b35fdec9-7ee2-4609-88b2-3232b9036447",
    "name": "Ici kiwir",
    "description": "Gunung Merbabu (3.145 mdpl)...",
    "image": "https://example.com/image.webp",
    "createdAt": "2026-01-30T06:49:21.511Z",
    "updatedAt": "2026-01-30T06:50:42.839Z"
  }
}
```

---

## Delete Product

**Endpoint**

```
DELETE /products/:id
```

**Description**
Delete a product by ID.

**Response Example**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Notes

* This API follows RESTful principles
* Designed to be deployed as a **serverless backend** (Vercel)
* Stateless request handling
* UUID is used as the primary identifier
