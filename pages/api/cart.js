import dbConnect from "@/lib/mongoose"; // Ensure this path is correct
import Product from "@/models/Product"; // Ensure this path is correct

export default async function handler(req, res) {
  await dbConnect(); // Ensure database connection is established

  if (req.method === 'POST') {
    const { ids } = req.body;

    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: 'No product IDs provided' });
    }

    try {
      // Retrieve products based on the provided ids
      const products = await Product.find({ _id: { $in: ids } });
      return res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Failed to retrieve products' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
