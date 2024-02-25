/* eslint-disable no-unused-vars */
// import { useState } from 'react'
import React from 'react';
import { useEffect, useState } from 'react'
import ProductCard from './Components/productCard'
import './Main.css'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'

function Main() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allProductList, setAllProductList] = useState([])

  console.log(searchParams.get('cid'));
  const cid = searchParams.get('cid')

  useEffect(() => {
    if(cid) {
      axios.get(`/product/get_all_products/${cid}`)
      .then((res) => {
        setAllProductList(res.data)
      })
    } else {
      axios.get('/product/get_all_products')
      .then((res) => {
        setAllProductList(res.data)
      })
    }
  }, [cid])

  return (
    <>
      <div className="product_gallery">
        {allProductList && allProductList.map((product) => {
            return (
                <ProductCard
                    key={product.name} 
                    name={product.name}
                    price={product.price}
                    img={product.photos.length === 0 ?
                      "https://edenshk.com/cdn/shop/products/redgrapes_900x.jpg?v=1591847193" :
                      product.photos[0]
                    }
                    productId={product.pid}
                />
            )
        })}
    </div>
    </>
  )
}

export default Main
