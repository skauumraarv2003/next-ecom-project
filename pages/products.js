
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import dbConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
} 

export async function getServerSideProps() {
  try {
    await dbConnect();
    const products = await Product.find({}, null, { sort: { '_id': -1 } });
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [], // Return an empty array if fetching fails
      },
    };
  }
}
