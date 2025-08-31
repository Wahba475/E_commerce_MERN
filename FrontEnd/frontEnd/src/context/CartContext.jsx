import React, { useState, useEffect } from 'react'
import { CartContext } from './CartContext.js'

function CartContextProvider({ children }) {
    const [cartData, setCartData] = useState(() => {
        const savedCart = localStorage.getItem("cartData")
        return savedCart ? JSON.parse(savedCart) : []
    })
    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(cartData))
    }, [cartData])

    const addToCart = (product, productIndex) => {
        setCartData((prevCart) => {
          const existingItem = prevCart.find((item) => item.productIndex === productIndex);
      
          if (existingItem) {
           
            return prevCart.map((item) =>
              item.productIndex === productIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
          
            return [...prevCart, { ...product, productIndex, quantity: 1 }];
          }
        });
      };
      

    const removeFromCart = (productIndex) => {
        setCartData(prevCart => prevCart.filter((item) => item.productIndex !== productIndex))
    }
   
    // Calculate total quantity of all items
    const getTotalQuantity = () => {
        return cartData.reduce((total, item) => total + item.quantity, 0)
    }

  return (
    <CartContext.Provider value={{ cartData, setCartData, addToCart, removeFromCart, getTotalQuantity }}>
            {children}
        </CartContext.Provider>
        
  )
}

export default CartContextProvider

