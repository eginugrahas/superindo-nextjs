import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/mongo";
import { ObjectId } from "mongodb";
import { ProductType } from "@/app/types/types";

export async function GET(req:any) {
  try {
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection<ProductType>("products");
    const products = await collection.find().toArray();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}

export async function POST(req:any) {
  try { 
    const db = await connect();
    const body = await req.json();
    console.log(body)
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection<ProductType>("products");
    const category = await collection.insertOne(body);
    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}

export async function DELETE(req:any) {
  try {
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection<ProductType>("products");
    const product = await collection.findOneAndDelete({
      _id: new ObjectId(req.query.id as string),
    });
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }))
    } else {
     return new Response(JSON.stringify(product), { status: 200 });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}
