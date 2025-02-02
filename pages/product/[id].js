
// pages/product/[id].js
import { useContext } from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import styled from "styled-components";
import { CartContext } from "@/components/CartContext"; // Correct import
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext); // Access CartContext

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>INR {product.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(product._id)}>
                  <CartIcon /> Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const { id } = context.query;
  const product = await Product.findById(id).lean(); // use .lean() for performance
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

