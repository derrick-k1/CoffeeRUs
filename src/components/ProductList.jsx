import React,{useEffect, useState} from 'react'

export const ProductList = () => {
const BASE_URL = ''
const [products, setProducts] = useState([])
useEffect(()=>{
    const fetchProducts = async () =>{
        try {
            const response = await fetch(BASE_URL)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
}, [])

  return (
    <div>
        <ul>
            {products.map(product => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
    </div>
  )
}

