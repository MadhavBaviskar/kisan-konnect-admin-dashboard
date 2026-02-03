import { NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/services/product.service";

export async function GET(request: Request) {
  try {
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
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try { 
    const body = await request.json();
  
    const { name, category, unit, stock_quantity, price } = body;

    if (!name || price == null || stock_quantity == null || !category || !unit) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
  } catch (error) {
    return newFunction(error);
  }

  function newFunction(error: unknown) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
