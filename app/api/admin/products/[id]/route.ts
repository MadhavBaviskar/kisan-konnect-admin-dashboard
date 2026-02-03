import { NextResponse } from "next/server";
import {
  updateProduct,
  deleteProduct,
} from "@/lib/services/product.service";
import pool from "@/lib/db";

/* =========================
   GET /api/admin/products/:id
   ========================= */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const [rows]: any = await pool.query(
      "SELECT * FROM products WHERE id = ?",
      [productId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("GET BY ID ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT /api/admin/products/:id
   ========================= */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ correct async params handling
    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedProduct = await updateProduct(productId, body);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE /api/admin/products/:id
   ========================= */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    await deleteProduct(productId);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
