// import Center from "@/components/Center";
// import styled from "styled-components";
// import Button from "./Button";
// import ButtonLink from "@/components/ButtonLink";
// import CartIcon from "./icons/CartIcon";
// import { CartContext } from "@/components/CartContext";
// import { useContext } from "react";

// const Bg = styled.div`
//   background-color: #222;
//   color: #fff;
//   padding: 50px 0;
// `;

// const Title = styled.h1`
//   margin: 0;
//   font-weight: normal;
//   font-size: 1.5rem;
//   @media screen and (min-width: 768px) {
//     font-size: 3rem;
//   }
// `;

// const Desc = styled.p`
//   color: #aaa;
//   font-size: 0.8rem;
// `;

// const ColumnsWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 40px;
//   img {
//     max-width: 100%;
//     max-height: 200px;
//     display: block;
//     margin: 0 auto;
//   }
//   div:nth-child(1) {
//     order: 2;
//   }
//   @media screen and (min-width: 768px) {
//     grid-template-columns: 1.1fr 0.9fr;
//     div:nth-child(1) {
//       order: 0;
//     }
//     img {
//       max-width: 100%;
//     }
//   }
// `;

// const Column = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const ButtonsWrapper = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 25px;
// `;

// export default function Featured({ product }) {
//   const { addProduct } = useContext(CartContext);

//   function addFeaturedToCart() {
//     if (product) {
//       addProduct(product._id);
//     }
//   }

//   if (!product) {
//     return null; // Render nothing if the product is not available
//   }

//   return (
//     <Bg>
//       <Center>
//         <ColumnsWrapper>
//           <Column>
//             <div>
//               <Title>{product.title}</Title>
//               <Desc>{product.description}</Desc>
//               <ButtonsWrapper>
//                 <ButtonLink href={`/product/${product._id}`} outline={1} white={1}>
//                   Read more
//                 </ButtonLink>
//                 <Button white onClick={addFeaturedToCart}>
//                   <CartIcon />
//                   Add to cart
//                 </Button>
//               </ButtonsWrapper>
//             </div>
//             <div>
//               <img
//                 src={product.image || "https://saurav-next-ecommerce.s3.amazonaws.com/1730690657470.jpeg"}
//                 alt={product.title || "Product Image"}
//               />
//             </div>
//           </Column>
//         </ColumnsWrapper>
//       </Center>
//     </Bg>
//   );
// }


import Center from "@/components/Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "@/components/CartContext";
import { useContext } from "react";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    if (product) {
      addProduct(product._id);
    }
  }

  if (!product) {
    return null;
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={`/product/${product._id}`} outline={1} white={1}>
                  Read more
                </ButtonLink>
                <Button white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
            <div>
            <img
  src={product.image || "https://saurav-next-ecommerce.s3.amazonaws.com/1730690657470.jpeg"}
  alt={product.title || "Product Image"}
  style={{
    width: "100%",         // Ensures the image takes up the full width of its container
    height: "auto",         // Maintains the aspect ratio
    maxHeight: "80vh",      // Limits height to 80% of the viewport height
    display: "block",
    margin: "0 auto",
    objectFit: "cover",
    borderRadius: "10px"    // Optional rounded corners
  }}
/>

            </div>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

