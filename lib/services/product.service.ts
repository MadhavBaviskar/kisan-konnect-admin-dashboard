import pool from "../db";

export async function getAllProducts() {
  const [rows] = await pool.query(
    `SELECT id, name,category,unit, price, stock_quantity, created_at
     FROM products
     ORDER BY created_at DESC`
  );
  return rows;
}

export async function createProduct(data: {
  name: string;
  category: string;
  unit: string;
  price: number;
  stock_quantity: number;
}) {
  const { name,category,unit, price, stock_quantity } = data;

  const [result]: any = await pool.query(
    `INSERT INTO products (name, category,unit, price, stock_quantity)
     VALUES (?, ?, ?, ?, ?)`,
    [name,category,unit, price, stock_quantity]
  );

  return {
    id: result.insertId,
    name,
    category,
    unit,
    price,
    stock_quantity,
  };
}

export async function updateProduct(
  id: number,
  data: Partial<{
    name: string;
    category: string;
    unit: string;
    price: number;
    stock_quantity: number;
  }>
) {
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  const setClause = fields.map(field => `${field} = ?`).join(", ");

  await pool.query(
    `UPDATE products SET ${setClause} WHERE id = ?`,
    [...values, id]
  );

  return { id, ...data };
}


export async function deleteProduct(id: number) {
  await pool.query(`DELETE FROM products WHERE id = ?`, [id]);
  return { id };
}
