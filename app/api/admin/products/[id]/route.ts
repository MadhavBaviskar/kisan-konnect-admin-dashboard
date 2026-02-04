import { NextResponse } from "next/server";
import {
  updateProduct,
  deleteProduct,
} from "@/lib/services/product.service";
import { verifyAdminToken } from "@/lib/auth";
import pool from "@/lib/db";

/* =========================
   GET /api/admin/products/:id
   (Protected)
========================= */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 🔐 JWT protection
    verifyAdminToken(request.headers.get("authorization"));

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
  } catch (error: any) {
    console.error("GET BY ID ERROR:", error);

    if (error.message?.includes("token")) {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT /api/admin/products/:id
   (Protected)
========================= */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 🔐 JWT protection
    verifyAdminToken(request.headers.get("authorization"));

    const { id } = await params;
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
  } catch (error: any) {
    console.error("PUT ERROR:", error);

    if (error.message?.includes("token")) {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE /api/admin/products/:id
   (Protected)
========================= */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 🔐 JWT protection
    verifyAdminToken(request.headers.get("authorization"));

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
  } catch (error: any) {
    console.error("DELETE ERROR:", error);

    if (error.message?.includes("token")) {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
