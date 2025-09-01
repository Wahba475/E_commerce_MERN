import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { CartContextProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ProductsProvider>
    </BrowserRouter>
  </StrictMode>
)
