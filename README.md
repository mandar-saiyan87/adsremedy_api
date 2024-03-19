# Restaurant Order APIs

This repository contains APIs for managing products and placing orders in a restaurant system.

## Product APIs

### Get all products

- **Method:** GET
- **Endpoint:** `http://localhost:3000/api/products`
- **Description:** Gets a list of all products.

### Get product by ID

- **Method:** GET
- **Endpoint:** `http://localhost:3000/api/products/:id`
- **Description:** Retrieves a product by its ID.
- **Example:** `http://localhost:3000/api/products/65f9232715c3b7ba88f3740a`

### Add new product

- **Method:** POST
- **Endpoint:** `http://localhost:3000/api/products`
- **Description:** Adds a new product.
- **Model / API body:**
  ```json
  {
    "name": "New Product Name 8",
    "description": "New product description 8",
    "price": 30
  }

### Edit / Modify existing product record

- **Method:** PUT
- **Endpoint:** `https//loaclhost:3000/api/products/:id`
- **Description:** Edits or modifies an existing product record.
- **API body:**
```json
{
  "name": "New Product Name 8",
  "description": "New product description 8",
  "price": 30
}

### Delete product by ID

- **Method:** DELETE
- **Endpoint:** `http://localhost:3000/api/products/:id`
- **Description:** Deletes a product by its ID.