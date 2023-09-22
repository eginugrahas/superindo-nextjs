import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/mongo";
import { ProductCategoryType } from "@/app/types/types";

export async function GET(req: any) {
  try {
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection<ProductCategoryType>("productCategories");
    const categories = await collection.find().toArray();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}

export async function POST(req: any) {
  try {
    const db = await connect();
    const body = req.json();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection<ProductCategoryType>("productCategories");
    const category = await collection.insertOne(body);
    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}

export async function DELETE(req: any) {
  try {
    const db = await connect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection("productCategories");
    const category = await collection.deleteOne({id:id});
    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}
