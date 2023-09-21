import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/mongo";
import { ProductCategoryType } from "@/app/types/types";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
      const db = await connect();
      if (!db) {
        throw new Error("Failed to connect to database");
      }
      const collection = db.collection<ProductCategoryType>("products");
      const category = await collection.insertOne(req.body);
      return new Response(JSON.stringify(category), { status: 201 });   
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
