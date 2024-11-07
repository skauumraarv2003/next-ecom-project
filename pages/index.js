// pages/index.js
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Product from "@/models/Product";  // Corrected import
import dbConnect from "@/lib/mongoose";
import NewProducts from "@/components/NewProduct";


export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts}/>
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '67283e8bd48bf1c457cab27b';  // Use a valid ID from your database
  await dbConnect();

  let featuredProduct = null;
  let newProducts = [];

  try {
    featuredProduct = await Product.findById(featuredProductId).lean();

    newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 20 }).lean();

  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)) || null,

      newProducts: JSON.parse(JSON.stringify(newProducts)) || [],
    },
  };
}





