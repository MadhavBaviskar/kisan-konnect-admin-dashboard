import { NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/services/product.service";
import { verifyAdminToken } from "@/lib/auth";

/* =========================
   GET /api/admin/products
   (Protected + Pagination)
========================= */
export async function GET(request: Request) {
  try {
    // 🔐 JWT PROTECTION (added)
    verifyAdminToken(request.headers.get("authorization"));

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const products = await getAllProducts({
      page,
      limit,
      search,
      category,
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("GET PRODUCTS ERROR:", error);

    // JWT errors → 401
    if (error.message?.includes("token")) {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/* =========================
   POST /api/admin/products
   (Protected + Validation)
========================= */
export async function POST(request: Request) {
  try {
    // 🔐 JWT PROTECTION (added)
    verifyAdminToken(request.headers.get("authorization"));

    const body = await request.json();
    const { name, category, unit, stock_quantity, price } = body;

    if (!name || !category || !unit || price == null || stock_quantity == null) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await createProduct({
      name,
      category,
      unit,
      price,
      stock_quantity,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("POST PRODUCT ERROR:", error);

    // JWT errors → 401
    if (error.message?.includes("token")) {
      return NextResponse.json(
        { message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
