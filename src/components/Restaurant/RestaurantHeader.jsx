import { AiOutlineShoppingCart } from 'react-icons/ai'
import logo from '../../assets/logo.png'
import { useSearch } from '../../context/SearchContext'

const RestaurantHeader = ({ toggleCart, cart }) => {

    const { searchText, setSearchText } = useSearch()

    const countCartItems = () => {
        let totalCartQuantity = 0

        for (const item of cart) {
            totalCartQuantity += item.quantity
        }

        return totalCartQuantity
    }

    return (
        <header className="restaurant-header">
            <img className="logo" src={logo} alt="Asia House Logo" />
            <input type="search" id="search" placeholder="Search..." value={searchText}
                onChange={(e) => setSearchText(e.target.value)} />
            <div>
                {cart.length > 0 && <span className="cart-total-items">{countCartItems()}</span>}
                <AiOutlineShoppingCart className="main-cart-button header-icon" onClick={toggleCart} />
            </div>
        </header>
    );
}

export default RestaurantHeader;