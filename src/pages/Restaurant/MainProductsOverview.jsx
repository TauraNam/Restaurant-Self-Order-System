import { useEffect, useState } from "react"
import RestaurantHeader from "../../components/Restaurant/RestaurantHeader.jsx"
import Cart from "../../components/Restaurant/Cart.jsx"
import CategoriesList from "../../components/Restaurant/CategoriesList.jsx"
import { AiOutlinePlus } from "react-icons/ai"
import Pagination from "../../components/Shared/Pagination.jsx"
import { useSearch } from "../../context/SearchContext.jsx"

const MainProductsOverview = () => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [activeCategory, setActiveCategory] = useState("All")
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const { searchText, setSearchText } = useSearch()

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    useEffect(() => {
        setSearchText('')
    }, [activeCategory])

    const getProducts = () => {
        fetch(`/api/products?page=${currentPage}&limit=12${activeCategory !== "All" ? '&category=' + activeCategory._id : ""}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(({ products, totalPages }) => {
                setProducts(products)
                setTotalPages(totalPages)
            })
            .catch(err => console.log('Error during fetch.', err))
    }

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase()) ||
        String(product.price).includes(searchText)
    )

    useEffect(() => {
        getProducts()
    }, [currentPage, activeCategory])

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            window.scrollTo(0, 0)
        }
    }

    const addToCart = (product) => {
        try {
            let cartData = JSON.parse(localStorage.getItem('cart')) || []

            const existingProductIndex = cartData.findIndex(item => item._id === product._id)

            if (existingProductIndex > -1) {
                cartData[existingProductIndex].quantity += 1
            } else {
                const newProduct = { ...product, quantity: 1 }
                cartData.push(newProduct)
            }

            localStorage.setItem('cart', JSON.stringify(cartData))
            setCart(cartData)

        } catch (err) {
            console.error('Error during addToCart', err)
            alert('Something went wrong when adding to cart')
        }
    }

    const clearCartProduct = (productId) => {
        const updatedCart = cart.filter(item => item._id !== productId)
        setCart(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const emptyCart = () => {
        setCart([])
        localStorage.removeItem('cart')
    }

    return (
        <div>
            <RestaurantHeader toggleCart={toggleCart} cart={cart} />
            <CategoriesList activeCategory={activeCategory} setActiveCategory={setActiveCategory} setCurrentPage={setCurrentPage} />
            <div className="products-overview">
                <div className="products-container">
                    {filteredProducts && filteredProducts.map((product, index) => {
                        return <div key={index} className="product">
                            <img src={`http://localhost:4000/uploads/${product.imagePath}`} alt="product" />
                            <div className="product-details-container">
                                <p className="products-title">{product.title}</p>
                                <p className="products-description">{product.description}</p>
                                <div className="products-details">
                                    <p className="products-price">{product.price}€</p>
                                    <button className="order-button" onClick={() => addToCart(product)}><AiOutlinePlus className="add-icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div className="main-products-overview-pagination">
                    {totalPages > 1 && <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />}
                </div>
            </div>
            <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} cart={cart} clearCartProduct={clearCartProduct} emptyCart={emptyCart} />
        </div>
    );
}

export default MainProductsOverview;
