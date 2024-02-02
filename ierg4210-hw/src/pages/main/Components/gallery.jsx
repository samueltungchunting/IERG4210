// import React from 'react'

import ProductCard from "./productCard"
import productList from "../../../data/ProductList"

const Gallery = () => {

    // const productList = [
    //     {
    //         productId: "1",
    //         name: "Product 1",
    //         price: "99",
    //         img: "https://picsum.photos/200/300"
    //     },
    //     {
    //         productId: "2",
    //         name: "Product 2",
    //         price: "299",
    //         img: "https://picsum.photos/200/300"
    //     },
    //     {
    //         productId: "3",
    //         name: "Product 3",
    //         price: "79",
    //         img: "https://picsum.photos/200/300"
    //     }
    // ]

  return (
    <div className="product_gallery">
        {productList.map((product) => {
            return (
                <ProductCard 
                    key={product.productId} 
                    name={product.name}
                    price={product.price}
                    img={product.img}
                    productId={product.productId}
                />
            )
        })}
    </div>
  )
}

export default Gallery