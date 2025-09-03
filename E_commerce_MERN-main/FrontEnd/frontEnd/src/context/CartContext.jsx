import React, { useState, useEffect, useContext, useCallback } from 'react'
import { CartContext } from './CartContext.js'
import axios from 'axios'
import { ProductsContext } from './ProductsContext.js'
import { toast } from 'react-toastify'

export function CartContextProvider({ children }) {
    const { token, backendUrl } = useContext(ProductsContext)
    const [cartData, setCartData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchCartData = useCallback(async () => {
        if (!token) return

        setLoading(true)
        setError(null)
        
        try {
            const response = await axios.get(`${backendUrl}/cart/get`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCartData(response.data)
        } catch (error) {
            console.error('Error fetching cart data:', error)
            setError('Failed to load cart data')
            
            // Try to load from localStorage as fallback
            const savedCart = localStorage.getItem("cartData")
            if (savedCart) {
                try {
                    setCartData(JSON.parse(savedCart))
                } catch (parseError) {
                    console.error('Error parsing saved cart data:', parseError)
                    setCartData({ products: [] })
                }
            } else {
                setCartData({ products: [] })
            }
        } finally {
            setLoading(false)
        }
    }, [token, backendUrl])

    useEffect(() => {
        if (token) {
            fetchCartData()
        } else {
            setCartData(null)
            localStorage.removeItem("cartData")
        }
    }, [token, fetchCartData])

    useEffect(() => {
        if (cartData) {
            localStorage.setItem("cartData", JSON.stringify(cartData))
        }
    }, [cartData])

    const addToCart = async (productId, quantity = 1) => {
        if (!token) {
            const errorMessage = 'Please log in to add items to cart'
            setError(errorMessage)
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            return false
        }

        setLoading(true)
        setError(null)

        try {
            const response = await axios.post(`${backendUrl}/cart/add`, {
                productId, // Match backend parameter name
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setCartData(response.data)
            
            toast.success(`Item added to cart!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            
            return true
        } catch (error) {
            console.error('Error adding to cart:', error)
            const errorMessage = error.response?.data?.message || 'Failed to add item to cart'
            setError(errorMessage)
            
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            
            return false
        } finally {
            setLoading(false)
        }
    }

    const removeFromCart = async (productId) => {
        if (!token) {
            const errorMessage = 'Please log in to manage cart'
            setError(errorMessage)
            toast.error(errorMessage)
            return false
        }

        setLoading(true)
        setError(null)

        try {
            const response = await axios.delete(`${backendUrl}/cart/remove`, {
                data: {
                    productId // Match backend parameter name
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setCartData(response.data)
            
            toast.success('Item removed from cart!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            
            return true
        } catch (error) {
            console.error('Error removing from cart:', error)
            const errorMessage = error.response?.data?.message || 'Failed to remove item from cart'
            setError(errorMessage)
            
            toast.error(errorMessage)
            
            return false
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = async (productId, newQuantity) => {
        if (!token) {
            const errorMessage = 'Please log in to manage cart'
            setError(errorMessage)
            toast.error(errorMessage)
            return false
        }

        if (!Number.isInteger(newQuantity) || newQuantity < 0) {
            const errorMessage = 'Invalid quantity'
            setError(errorMessage)
            toast.error(errorMessage)
            return false
        }

        if (newQuantity === 0) {
            return await removeFromCart(productId)
        }

        setLoading(true)
        setError(null)

        try {
            const response = await axios.put(`${backendUrl}/cart/update`, {
                productId, // Match backend parameter name
                newQuantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setCartData(response.data)
            
            toast.success(`Quantity updated to ${newQuantity}!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            
            return true
        } catch (error) {
            console.error('Error updating quantity:', error)
            const errorMessage = error.response?.data?.message || 'Failed to update quantity'
            setError(errorMessage)
            
            toast.error(errorMessage)
            
            return false
        } finally {
            setLoading(false)
        }
    }

    const clearCart = async () => {
        if (!token) {
            const errorMessage = 'Please log in to manage cart'
            setError(errorMessage)
            toast.error(errorMessage)
            return false
        }

        setLoading(true)
        setError(null)

        try {
            await axios.delete(`${backendUrl}/cart/clear`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            setCartData({ products: [] })
            localStorage.removeItem("cartData")
            
            toast.success('Cart cleared successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            
            return true
        } catch (error) {
            console.error('Error clearing cart:', error)
            const errorMessage = error.response?.data?.message || 'Failed to clear cart'
            setError(errorMessage)
            
            toast.error(errorMessage)
            
            return false
        } finally {
            setLoading(false)
        }
    }

    // Calculate total quantity of all items
    const getTotalQuantity = () => {
        if (!cartData || !cartData.products) return 0
        return cartData.products.reduce((total, item) => total + item.quantity, 0)
    }

    // Calculate total amount
    const getTotalAmount = () => {
        if (!cartData || !cartData.products) return 0
        return cartData.products.reduce((total, item) => {
            if (item.product && item.product.price) {
                return total + (item.product.price * item.quantity)
            }
            return total
        }, 0)
    }

    // Get cart item count for a specific product
    const getProductQuantity = (productId) => {
        if (!cartData || !cartData.products) return 0
        const item = cartData.products.find(item => 
            item.product && item.product._id === productId
        )
        return item ? item.quantity : 0
    }

    // Check if product is in cart
    const isInCart = (productId) => {
        return getProductQuantity(productId) > 0
    }

    const contextValue = {
        cartData,
        setCartData,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalQuantity,
        getTotalAmount,
        getProductQuantity,
        isInCart,
        fetchCartData,
        loading,
        error,
        setError
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}