# Database Design – KisanKonnect Admin Dashboard (Demo)

## Overview
This database is designed for an admin-focused agri-supply platform.
The admin can manage products, view customers, and track orders.
The design uses a relational MySQL database with normalized tables.

---

## Entities and Relationships

### 1. Admin
- Admin can log in to the system
- Admin manages products
- Admin views customers and orders

### 2. Product
- Represents agricultural products (fruits, vegetables, staples)
- Managed only by admin

### 3. Customer
- Represents buyers placing orders
- Customers are read-only for admin

### 4. Order
- Represents purchase made by a customer
- Each order is linked to one customer
- Each order contains multiple products

---

## Tables and Schema

### 1. admins
Stores admin login credentials.

| Column Name | Type | Description |
|------------|------|-------------|
| id | INT (PK) | Unique admin ID |
| name | VARCHAR(100) | Admin full name |
| email | VARCHAR(100) | Admin login email |
| password_hash | VARCHAR(255) | Encrypted password |
| created_at | TIMESTAMP | Account creation time |

---

### 2. products
Stores product information.

| Column Name | Type | Description |
|------------|------|-------------|
| id | INT (PK) | Unique product ID |
| name | VARCHAR(150) | Product name |
| category | VARCHAR(100) | Product category |
| price | DECIMAL(10,2) | Price per unit |
| unit | VARCHAR(50) | kg / dozen / packet |
| stock_quantity | INT | Available stock |
| is_active | BOOLEAN | Product visibility |
| created_at | TIMESTAMP | Created time |
| updated_at | TIMESTAMP | Updated time |

---

### 3. customers
Stores customer details.

| Column Name | Type | Description |
|------------|------|-------------|
| id | INT (PK) | Unique customer ID |
| name | VARCHAR(100) | Customer name |
| phone | VARCHAR(15) | Contact number |
| email | VARCHAR(100) | Email address |
| city | VARCHAR(100) | City |
| state | VARCHAR(100) | State |
| created_at | TIMESTAMP | Registration date |

---

### 4. orders
Stores order summary.

| Column Name | Type | Description |
|------------|------|-------------|
| id | INT (PK) | Unique order ID |
| customer_id | INT (FK) | Linked customer |
| total_amount | DECIMAL(10,2) | Order total |
| order_status | VARCHAR(50) | Pending / Completed |
| created_at | TIMESTAMP | Order date |

---

### 5. order_items
Stores products inside each order.

| Column Name | Type | Description |
|------------|------|-------------|
| id | INT (PK) | Unique item ID |
| order_id | INT (FK) | Linked order |
| product_id | INT (FK) | Linked product |
| quantity | INT | Quantity ordered |
| price | DECIMAL(10,2) | Price at order time |

---

## Relationship Summary
- One customer → many orders
- One order → many order_items
- One product → many order_items
- Admin manages products and views orders/customers
