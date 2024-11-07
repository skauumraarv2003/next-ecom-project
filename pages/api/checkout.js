import dbConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Request method should be POST' });
    return;
  }

  const {
    name, email, city,
    postalCode, streetAddress, country,
    cartProducts,
  } = req.body;

  if (!cartProducts || !Array.isArray(cartProducts) || cartProducts.length === 0) {
    res.status(400).json({ error: "Invalid or empty 'cartProducts' array." });
    return;
  }

  try {
    await dbConnect();

    const uniqueIds = [...new Set(cartProducts)];
    const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

    if (!productsInfos || productsInfos.length === 0) {
      res.status(404).json({ error: "No products found for the provided IDs." });
      return;
    }

    let line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find(p => p._id.toString() === productId);
      const quantity = cartProducts.filter(id => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: 'USD',
            product_data: { name: productInfo.title },
            unit_amount: productInfo.price * 100, // Price in cents
          },
        });
      }
    }

    if (line_items.length === 0) {
      res.status(400).json({ error: "No valid line items to create an order." });
      return;
    }

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });

    res.status(201).json(orderDoc);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order. " + error.message });
  }
}
