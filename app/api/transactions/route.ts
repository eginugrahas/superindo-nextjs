import connect from "@/mongo";

export async function GET(req:any) {
  try {
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection("transactions");
    const transactions = await collection.find().toArray();
    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}
