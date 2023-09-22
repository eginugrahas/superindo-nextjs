import connect from "@/mongo";

export async function GET(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection("productVariants");

    const product = await collection.findOne({
      product_id: Number(id),
    });
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


export async function POST(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection("productVariants");
    const product = await collection.insertOne({
      id: Number(id),
    });
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}

export async function PUT(req: any) {
  try {
    const db = await connect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();
    console.log(body)
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection("productVariants");
    const product = await collection.updateOne(
      {
        id: Number(id),
      },
      { $set: body }
    );
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }));
    } else {
      return new Response(JSON.stringify(product), { status: 200 });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}

export async function DELETE(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // console.log(id)
    const db = await connect();
    if (!db) {
      throw new Error("Failed to connect to database");
    }
    const collection = db.collection("productVariants");
    const product = await collection.deleteOne({
      id: Number(id),
    });
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }));
    } else {
      return new Response(JSON.stringify(product), { status: 200 });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }));
  }
}
