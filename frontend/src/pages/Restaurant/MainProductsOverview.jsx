import { useEffect, useState } from "react"
import RestaurantHeader from "../../components/Restaurant/RestaurantHeader.jsx"
import './Restaurant.css'
import Cart from "../../components/Restaurant/Cart.jsx"
import CategoriesList from "../../components/Restaurant/CategoriesList.jsx"


const MainProductsOverview = () => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [activeCategory, setActiveCategory] = useState("All")
    const [filteredProducts, setFilteredProducts] = useState([])

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }


    const getProducts = () => {
        fetch('/api/products')
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(products => {
                setProducts(products)
            })
            .catch(err => console.log('Error during fetch.', err))
    }

    useEffect(() => {
        getProducts()
    }, [])


    const filterProductsByActiveCategory = () => {
        if (activeCategory === 'All') {
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products.filter(item => item.category === activeCategory._id))
        }  
    }

    useEffect(() => {
        filterProductsByActiveCategory()
    }, [products, activeCategory])


    const addToCart = (product) => {
        try {
            let cartData = JSON.parse(localStorage.getItem('cart')) || []

            const existingProductIndex = cartData.findIndex(item => item._id === product._id)
        
            if (existingProductIndex > -1) {
                cartData[existingProductIndex].quantity += 1;
            } else {
                product.quantity = 1;
                cartData.push(product)
            }

            localStorage.setItem('cart', JSON.stringify(cartData))

            setCart(cartData)
        } catch (err) {
            console.log('Error during fetch', err)
        }
    }

    const clearCartProduct = (productId) => {
        try {
            let cartData = JSON.parse(localStorage.getItem('cart')) || []
    
            const updatedCartData = cartData.filter(item => item._id !== productId)
    
            localStorage.setItem('cart', JSON.stringify(updatedCartData))
    
            setCart(updatedCartData)
        } catch (err) {
            console.log('Error while clearing the product from cart:', err)
        }
    };

    const emptyCart = () => {
        try {
        localStorage.removeItem('cart')
        setCart([])
    } catch (err) {
        console.log('Error while emptying the cart', err)
    }
}

    return (
        <div>
            <RestaurantHeader toggleCart={toggleCart} />
            <CategoriesList activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="products-overview">
                <h2>Products</h2>
                <div className="products-container">
                    {filteredProducts && filteredProducts.map((product, index) => {
                        return <div key={index} product={product} className="products">
                            <img src={`http://localhost:4000/uploads/${product.imagePath}`} alt="product"></img>
                
                                <p className="products-title">{product.title}</p>
                                <div className="products-details">
                                <p className="products-description">{product.description}</p>
                                <p className="products-price">{product.price} €</p>
                                <button className="order-button" onClick={() => addToCart(product)}>Order</button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} emptyCart={emptyCart}  clearCartProduct={clearCartProduct} cart={cart} />
        </div>
    );
}

export default MainProductsOverview;