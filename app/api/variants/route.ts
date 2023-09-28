import connect from "@/mongo";
import { ProductVariantType } from "@/app/types/types";

export async function GET(req:any) {
  try {
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection<ProductVariantType>("productVariants");
    const productVariants = await collection.find().toArray();
    return new Response(JSON.stringify(productVariants), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}
