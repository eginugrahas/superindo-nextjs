import connect from "@/mongo";

export async function GET(req:any) {
    try {
      const db = await connect();
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!db) {
        throw new Error("Failed to connect to database");
      }
      const collection = db.collection("products");
      const product = await collection.findOne({
        product_category_id: Number(id),
      });
      return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
      console.error("Error fetching products:", error);
      return new Response(JSON.stringify({ message: "Internal server error" }));
    }
  }