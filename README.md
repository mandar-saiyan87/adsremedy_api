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


## Order APIs

### Get all orders

- **Method:** GET
- **Endpoint:** `http://localhost:3000/api/orders`
- **Description:** Retrieves a list of all orders.


### Get order by ID

- **Method:** GET
- **Endpoint:** `http://localhost:3000/api/orders/:id`
- **Description:** Retrieves an order by its ID.
- **Example:** `http://localhost:3000/api/orders/65f9232715c3b7ba88f3740a`


### Add new order

- **Method:** POST
- **Endpoint:** `http://localhost:3000/api/orders`
- **Description:** Adds a new order.
- **Model / API body:**
  ```json
  {
    "customername": "Customer5",
    "totalcost": 50,
    "ordersdetails": [
      {
        "product": "65f9232715c3b7ba88f3740a",
        "qty": 1
      },
      {
        "product": "65f9234a15c3b7ba88f37412",
        "qty": 1
      }
    ]
  }

- ***Total cost can be generated at the frontend while adding products, and Product IDs and quantity will be passed from the frontend.***

### How to Run the Project
- Clone this repository to your local machine.
- Navigate to the project directory in your terminal.
- Install dependencies using npm install.
- Set up your MongoDB database and ensure it's running.(I have included MongoDB Atlas with credentials instead of local setup for temporary basis. I will remove credentials and put it in .env later. So you can test existing database instead of setting it up locally.)
- Modify the MongoDB connection settings in your project as required.(db.js)
- Start the server using npm start.
- The server will start running, and you can now make requests to the provided endpoints.
