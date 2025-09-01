import React, { useState, useEffect } from 'react'
import { ProductsContext } from './ProductsContext.js'

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [token, setToken] = useState("")
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  // Fetch products - don't require token for product fetching
  useEffect(() => {
    fetch(`${backendUrl}/api/products`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data)
        setProducts(data) // backend returns array
      })
      .catch(error => console.error('Error fetching products:', error))
  }, [backendUrl]) // Fetch products on component mount

  return (
    <ProductsContext.Provider value={{ products, setProducts, token, setToken, backendUrl }}>
      {children}
    </ProductsContext.Provider>
  )
}
