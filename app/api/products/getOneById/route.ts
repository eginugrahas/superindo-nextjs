import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/mongo";
import { ObjectId } from "mongodb";
import { ProductType } from "@/app/types/types";

export async function GET(req: any, res: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection("products");

    const product = await collection.findOne({
      id: Number(id),
    });
    console.log(product);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }));
    } else {
      return new Response(JSON.stringify(product), { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection<ProductType>("products");
    const product = await collection.insertOne(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection<ProductType>("products");
    const product = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.query.id as string) },
      { $set: req.body }
    );
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
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
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
