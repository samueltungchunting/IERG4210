// import React from 'react'

import ProductCard from "./productCard"
import productList from "../../../data/ProductList"

const Gallery = () => {

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